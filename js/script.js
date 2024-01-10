// Intro screen variables
const textContainer1 = $('#intro-line1');
const textContainer2 = $('#intro-line2');
const line1 = 'AMANDA';
const line2 = 'CLEMENT';
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&()+=<>?/:;{}[]~|';
const introScreen = $('#intro-overlay');
const introDelay = 4000;
const maxShuffles = 3;
let numShuffles = 0;
let shuffles = 0;

// Returns a random character from a string
function getRandomChar(str) {
  return chars.charAt(Math.floor(Math.random() * str.length));
}

function shuffleCharacters(textContainer, line, str, index) {
  let text = textContainer.text();

  if (index < line.length && shuffles < maxShuffles) {
      textContainer.text(text.substring(0, index) + getRandomChar(str) + text.substring(index + 1));

      // Shuffle again after revealing random character
      setTimeout(() => shuffleCharacters(textContainer, line, str, index), 100);
      shuffles++;
  } else {
    textContainer.text(text.substring(0, index) + line.charAt(index) + text.substring(index + 1));
    shuffles = 0;
  }
}

function revealLine(textContainer, line, str, index, delay) {
  setTimeout(() => {
    if (index < line.length) {
      let text = textContainer.text();
      textContainer.text(text.substring(0, index) + line.charAt(index) + text.substring(index + 1));

      // Start shuffling characters after revealing current letter
      shuffleCharacters(textContainer, line, str, index); 
      revealLine(textContainer, line, str, index + 1, delay);
    }
  }, delay);
}

// Fade out effect
function fadeOut(x, speed, i, delay) {
  setTimeout(() => {
    let opacity = 1;
    const interval = setInterval(() => {
      if (opacity <= 0) 
        clearInterval(interval);

      $(x).css('opacity', opacity);
      opacity -= speed;
    }, i); 
  }, delay);
  setTimeout(() => {$(x).css('display', 'none')}, delay + 600);
}

// Button variables
const logo = $('.logo');
const nameBasic = $('.name');
const logoDark = $('.logo-dark');
const logoLight = $('.logo-light');
const nameDark = $('.name-dark');
const nameLight = $('.name-light');
const arrow = $('.arrow');
const menu = $('.menu');
const menuButton = $('.menu button');
const navLinks = $('.menu a');
const nav = $('nav');
const menuButtonDark = $('.menu-dark button');
const menuButtonLight = $('.menu-light button');
let navFlag = false;

function buttonStyling() {
  logoDark.css('background-color', '#FFF');
  logoLight.css('background-color', '#1C1C1C');
  nameDark.css('color', '#FFF');
  nameLight.css('color', '#1C1C1C');
}

function handleIntroScrolling() {
  // Disable intro screen scrolling
  if (window.location.href.endsWith("index.html")) {
    // Disable scrolling initially
    $('body').css('overflow', 'hidden');

    // Enable scrolling after intro
    setTimeout(() => { $('body').css('overflow', 'auto'); }, introDelay);
  }
}

revealLine(textContainer1, line1, chars, 0, 160);
revealLine(textContainer2, line2, chars, 0, 160);
buttonStyling();
handleIntroScrolling();

// Star rotate on scroll, and logo styling affected by user interactions
// logoDark.css('background-color', '#FFF');
// logoLight.css('background-color', '#1C1C1C');
// nameDark.css('color', '#FFF');
// nameLight.css('color', '#1C1C1C');

// Fade out intro screen
fadeOut(introScreen, 0.1, 50, 3500);
setTimeout(() => { introScreen.css('style', 'none'); }, introDelay);

function rotateLogo(scrollTop) {
  logo.css('transform', 'rotate(' + scrollTop + 'deg)');
}

function handleArrows(scrollTop) {
  // Fade out project arrow
  if (scrollTop > 20)
    arrow.fadeTo(120, 0);
  else
    arrow.fadeTo(120, 1);
}

function animateProjects(scrollTop, windowHeight) {
  $('.flex-item-animated').each(function() {
    let topOffset = $(this).offset().top;
  
    if (topOffset < scrollTop + windowHeight && !$(this).hasClass('project-animate')) {
      let boxDelay = Math.random() * 0.75;
      let videoDelay = boxDelay + 1;
  
      $(this).css('animation-delay', boxDelay + 's');
      $(this).addClass('project-animate');
  
      $(this).children('.project-video').css('animation-delay', videoDelay + 's');
      $(this).children('.project-video').addClass('project-video-animate');
    }
  });
}

function animateContent() {
  let scrollTop = $(window).scrollTop();
  let windowHeight = $(window).height();

  rotateLogo(scrollTop);

  handleArrows(scrollTop);
  animateProjects(scrollTop, windowHeight);
}

// Call for content to be displayed once automatically after intro, then subsequently call on scroll
setTimeout(() => { animateContent(); }, introDelay);
$(window).scroll(function() { animateContent(); });

// Mostly styling and some hover effects
function handleButtons() {
  logo.mouseenter(() => {
      nameBasic.css('display', 'block');
      logo.css('transform', 'rotate(180deg)');
      logoDark.css('background-color', '#1C1C1C');
      logoLight.css('background-color', '#FFF');
      logoLight.find("a").css('color', '#1C1C1C');
  });
  
  logo.mouseleave(() => {
      nameBasic.css('display', 'none');
      logoDark.css('background-color', '#FFF');
      logoLight.css('background-color', '#1C1C1C');
      logoLight.find("a").css('color', '#FFF');
  });

  menuButtonDark.css('background-color', '#FFF');
  menuButtonDark.find("h1").css('color', '#1C1C1C');

  menuButtonLight.css('background-color', '#1C1C1C');
  menuButtonLight.find("h1").css('color', '#FFF');

  // Menu button expands nav on hover, and menu button logo rotates 90deg
  menuButton.mouseenter(() => {
    menuButton.css('transform', 'rotate(90deg)');
    menuButtonDark.css('background-color', '#1C1C1C');
    menuButtonDark.find("h1").css('color', '#FFF');
    menuButtonLight.css('background-color', '#FFF');
    menuButtonLight.find('h1').css('color', '#1C1C1C');
    nav.css('display', 'block');
  });

  menu.mouseleave(function() {
    if (!navFlag) {
      menuButton.css('transform', 'rotate(180deg)');
      menuButtonDark.css('background-color', '#FFF');
      menuButtonDark.find("h1").css('color', '#1C1C1C');
      menuButtonLight.css('background-color', '#1C1C1C');
      menuButtonLight.find('h1').css('color', '#FFF');
      nav.css('display', 'none');
    }
  });

  // Keep nav open when menu button clicked
  menuButton.click(() => { navFlag = !navFlag; });

}

handleButtons();

// Project title follow mouse on hover code
let numProjects = $('.flex-item').length;
let projects = [];

for (let i = 0; i < numProjects; i++)
  projects[i] = $('.flex-item').eq(i);

// Project titles always have same height (same font and size) but width changes
let height = projects[0].children('.project-title').height() / 2;
let widths = [];

for (let i = 0; i < numProjects; i++)
  widths[i] = projects[i].children('.project-title').width() / 2;

$(document).mousemove(function(e) {
    for (let i = 0; i < numProjects; i++) {
      projects[i].children('.project-title').css({
          left: e.pageX - widths[i],
          top: e.pageY - height
      });
      projects[i].children('.project-title').css('z-index', '100');
    }
});

for (let i = 0; i < numProjects; i++) {
  projects[i].mouseenter(function() { projects[i].children('.project-title').show(); });
  projects[i].mouseleave(function() { projects[i].children('.project-title').hide(); });
}

// Take user to appropriate project description page based on clicked project
function raytracer() { window.location.href = 'projects/raytracer.html'; }
function heterogeneousFog() { window.location.href = 'projects/heterogeneousfog.html'; }
function covid19EmotionAnalysis() { window.location.href = 'projects/covid19emotionanalysis.html'; }
function tracesOfYou() { window.location.href = 'projects/tracesofyou.html'; }
function bodyController() { window.location.href = 'projects/bodycontroller.html'; }
function flyMeToTheMoon() { window.location.href = 'projects/flymetothemoon.html'; }
function escape() { window.location.href = 'projects/escape.html'; }
function drawingWithSound() { window.location.href = 'projects/drawingwithsound.html'; }
function whenTheSun() { window.location.href = 'projects/whenthesun.html'; }
function shapes() { window.location.href = 'projects/shapes.html'; }
