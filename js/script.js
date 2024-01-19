/************************************************** VARIABLES **************************************************/

// Intro screen
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

// Buttons
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


/************************************************** FUNCTIONS **************************************************/

// Return a random character from a string
function getRandomChar(str) {
  return chars.charAt(Math.floor(Math.random() * str.length));
}

// Shuffle the characters in a line
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

// Reveal a line of text
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

// Disable scrolling during intro, enable after
function disableIntroScrolling() {
  if (window.location.href.endsWith('index.html')) {
    $('body').css('overflow', 'hidden');
    setTimeout(() => { $('body').css('overflow', 'auto'); }, introDelay);
  }
}

// Rotate logo as user scrolls
function rotateLogo(scrollTop) {
  logo.css('transform', 'rotate(' + scrollTop + 'deg)');
}

// Display/hide arrows for project description pages
function handleArrows(scrollTop) {
  // Fade out project arrow
  if (scrollTop > 20)
    arrow.fadeTo(120, 0);
  else
    arrow.fadeTo(120, 1);
}

// Reveal projects as user scrolls
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

// Animate logo, arrows and projects
function animateContent() {
  let scrollTop = $(window).scrollTop();
  let windowHeight = $(window).height();

  rotateLogo(scrollTop);

  handleArrows(scrollTop);
  animateProjects(scrollTop, windowHeight);
}

// Button styling and hover effects
function handleButtons() {
  logoDark.css('background-color', '#FFF');
  logoLight.css('background-color', '#1C1C1C');
  nameDark.css('color', '#FFF');
  nameLight.css('color', '#1C1C1C');

  logo.mouseenter(() => {
      nameBasic.css('display', 'block');
      logo.css('transform', 'rotate(180deg)');
      logoDark.css('background-color', '#1C1C1C');
      logoLight.css('background-color', '#FFF');
      logoLight.find('a').css('color', '#1C1C1C');
  });
  
  logo.mouseleave(() => {
      nameBasic.css('display', 'none');
      logoDark.css('background-color', '#FFF');
      logoLight.css('background-color', '#1C1C1C');
      logoLight.find('a').css('color', '#FFF');
  });

  menuButtonDark.css('background-color', '#FFF');
  menuButtonDark.find('h1').css('color', '#1C1C1C');

  menuButtonLight.css('background-color', '#1C1C1C');
  menuButtonLight.find('h1').css('color', '#FFF');

  // Menu button expands nav on hover
  menuButton.mouseenter(() => {
    menuButton.css('transform', 'rotate(90deg)');
    menuButtonDark.css('background-color', '#1C1C1C');
    menuButtonDark.find('h1').css('color', '#FFF');
    menuButtonLight.css('background-color', '#FFF');
    menuButtonLight.find('h1').css('color', '#1C1C1C');
    nav.css('display', 'block');
  });

  menu.mouseleave(function() {
    if (!navFlag) {
      menuButton.css('transform', 'rotate(180deg)');
      menuButtonDark.css('background-color', '#FFF');
      menuButtonDark.find('h1').css('color', '#1C1C1C');
      menuButtonLight.css('background-color', '#1C1C1C');
      menuButtonLight.find('h1').css('color', '#FFF');
      nav.css('display', 'none');
    }
  });

  // Keep nav open when menu button clicked
  menuButton.click(() => { navFlag = !navFlag; });
}

// Display and animate project titles
function handleProjectTitles() {
  let projects = $('.flex-item');
  let projectTitles = [];
  const numProjects = projects.length;
  
  // Display title on hover
  for (let i = 0; i < numProjects; i++) {
    projectTitles[i] = projects.eq(i).children('.project-title');

    projects.eq(i).mouseenter(function() {
      projectTitles[i].show();
    }).mouseleave(function() {
        projectTitles[i].hide();
    });
  }
  
  // Titles all have same height but different widths
  const height = projectTitles[0].height() / 2;
  let widths = [];
  
  for (let i = 0; i < numProjects; i++)
    widths[i] = projectTitles[i].width() / 2;
  
  // Make title follows mouse
  $(document).mousemove(function(e) {
      for (let i = 0; i < numProjects; i++) {
        projectTitles[i].css({
            left: e.pageX - widths[i],
            top: e.pageY - height,
            zIndex: 100
        });
      }
  });
}

// Take user to appropriate project description page when a project is clicked
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


/************************************************** FUNCTION CALLS **************************************************/

// Intro screen
disableIntroScrolling();
revealLine(textContainer1, line1, chars, 0, 160);
revealLine(textContainer2, line2, chars, 0, 160);
fadeOut(introScreen, 0.1, 50, 3500);
setTimeout(() => { introScreen.css('style', 'none'); }, introDelay);

// Display/animate project page content once automatically after intro, then subsequently call function on scroll
setTimeout(() => { animateContent(); }, introDelay);
$(window).scroll(function() { animateContent(); });

// Buttons
handleButtons();

// Animate project titles
handleProjectTitles();
