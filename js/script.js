// Star rotate on scroll, and logo styling affected by user interactions
let logo = $(".logo");
let nameBasic = $(".name");
let logoDark = $('.logo-dark');
let logoLight = $('.logo-light');
let nameDark = $('.name-dark');
let nameLight = $('.name-light');
let arrow = $('.arrow');

logoDark.css('background-color', '#FFF');
logoLight.css('background-color', '#1C1C1C');
nameDark.css('color', '#FFF');
nameLight.css('color', '#1C1C1C');

$(window).scroll(function() {
  let scrollTop = $(window).scrollTop();
  let windowHeight = $(window).height();

  // Logo (star) spin
  logo.css('transform', 'rotate(' + scrollTop + 'deg)');

  // Fade out project arrow
  if (scrollTop > 20)
    arrow.fadeTo(120, 0);
  else
    arrow.fadeTo(120, 1);

  // Project reveal (slide in animation) on scroll
  $('.flex-item').each(function() {
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
});

$(window).trigger('scroll');

logo.mouseenter(function() {
    nameBasic.css('display', 'block');
    logo.css('transform', 'rotate(180deg)');
    logoDark.css('background-color', '#1C1C1C');
    logoLight.css('background-color', '#FFF');
    logoLight.find("a").css('color', '#1C1C1C');
  }
);
logo.mouseleave(function() {
    nameBasic.css('display', 'none');
    logoDark.css('background-color', '#FFF');
    logoLight.css('background-color', '#1C1C1C');
    logoLight.find("a").css('color', '#FFF');
  }
);

// Menu styling, affected by user interactions
let menu = $(".menu");
let menuButton = $(".menu button");
let navLinks = $(".menu a");
let nav = $("nav");
let menuButtonDark = $(".menu-dark button");
let menuButtonLight = $(".menu-light button");

menuButtonDark.css('background-color', '#FFF');
menuButtonDark.find("h1").css('color', '#1C1C1C');

menuButtonLight.css('background-color', '#1C1C1C');
menuButtonLight.find("h1").css('color', '#FFF');

let navFlag = false;

// Menu button expands nav on hover, and menu button logo rotates 90deg
menuButton.mouseenter(function() {
    menuButton.css('transform', 'rotate(90deg)');
    menuButtonDark.css('background-color', '#1C1C1C');
    menuButtonDark.find("h1").css('color', '#FFF');
    menuButtonLight.css('background-color', '#FFF');
    menuButtonLight.find("h1").css('color', '#1C1C1C');
    nav.css('display', 'block');
  }
);
menu.mouseleave(function() {
  if (!navFlag) {
    menuButton.css('transform', 'rotate(180deg)');
    menuButtonDark.css('background-color', '#FFF');
    menuButtonDark.find("h1").css('color', '#1C1C1C');
    menuButtonLight.css('background-color', '#1C1C1C');
    menuButtonLight.find("h1").css('color', '#FFF');
    nav.css('display', 'none');
  }
  }
);

// Keep nav open when menu button clicked
menuButton.click(function() { navFlag = !navFlag; });

// Project title follow mouse on hover code
let numProjects = $(".flex-item").length;
let projects = [];

for (let i = 0; i < numProjects; i++)
  projects[i] = ($(".flex-item").eq(i));

// Project titles always have same height (same font and size) but width changes
let height = projects[0].children('.project-title').height() / 2;
let widths = [];

for (let i = 0; i < numProjects; i++)
  widths[i] = projects[i].children('.project-title').width() / 2;

$(document).mousemove(function(e){
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