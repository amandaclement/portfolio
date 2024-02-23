$(document).ready(function() {
  
/************************************************** VARIABLES **************************************************/

  // Intro screen
  const body = $('body');
  const textContainer1 = $('#intro-line1');
  const textContainer2 = $('#intro-line2');
  const line1 = 'AMANDA';
  const line2 = 'CLEMENT';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&()+=<>?/:;{}[]~|';
  const introScreen = $('#intro-overlay');
  const introDelay = 4000;
  const maxShuffles = 3;
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
  const nav = $('nav');
  const menuButtonDark = $('.menu-dark button');
  const menuButtonLight = $('.menu-light button');
  let navFlag = false;

  // Index page
  const numProjects = 10;
  let projectContainer = $('.project-container');
  let template = $('.project-template');

  // Project descriptions
  let projectDesc = $('.project-desc');
  let projectDescVideo = $('#project-desc-video');
  let projectDescTitle = $('#project-desc-title');
  let projectDescType = $('#project-desc-type');
  let projectDescDescription = $('#project-desc-description');
  let projectDescTechnologies = $('#project-desc-technologies');
  let projectDescYear = $('#project-desc-year');
  let projectDescLinkType = $('#project-desc-link-type');
  let projectDescLink = $('#project-desc-link a');

  const videoPaths = [
    'assets/videos/raytracer.mp4',
    'assets/videos/heterogeneousfog.mp4',
    'assets/videos/covid19emotionmap.mp4',
    'assets/videos/tracesofyou.mp4',
    'assets/videos/bodycontroller.mp4',
    'assets/videos/flymetothemoon.mp4',
    'assets/videos/escape.mp4',
    'assets/videos/drawingwithsound.mp4',
    'assets/videos/whenthesun.mp4',
    'assets/videos/musicalshapes.mp4'
  ];

  const titles = [
    'Raytracer',
    'Heterogeneous Fog',
    'COVID-19 Emotion Map',
    'Traces of You',
    'Body Controller',
    'Fly Me to the Moon',
    'Escape',
    'Drawing With Sound',
    'When the Sun Goes Down',
    'Musical Shapes'
  ];

  const types = [
    'Computer Graphics',
    'Computer Graphics',
    'Data Visualization / Web Design',
    'Game Design / Game Development',
    'Research-Creation / Game Design / Game Development',
    'Game Design / Game Development',
    'Game Design / Game Development',
    'Generative Art / Creative Coding / Web Design',
    'Game Design',
    'Creative Coding / Web Design'
  ];

  const descriptions = [
    'A raytracer built from scratch using C++. It supports sphere and rectangle primitives, local illumination (point and area lights) using Blinn-Phong shading, and anti-aliasing using stratified random subpixel sampling. Integration of global illumination via path-tracing still in progress.',
    'A real-time rendering of heterogeneous fog in OpenGL. The objective was to strike a balance between the uniformity of homogeneous fog, which often lacks realism, and the computational demands of volumetric fog, known for its realistic appearance.<br><br>The heterogeneous fog model augments exponential fog by integrating Perlin turbulence (the layering of Perlin noise octaves) into the equation to achieve a greater amount of shape and detail.',
    'An interactive web-based data visualization illustrating the emotional impact of the COVID-19 pandemic. Each dot represents a Tweet posted on March 11th, 2020, the day the WHO declared the COVID-19 outbreak a global pandemic, coloured by emotion.<br><br>The visualization invites users to witness the emotions embedded within global discourse, painting a picture of collective sentiment in the face of adversity.',
    'A short narrative game about love, loss and the enduring power of reminiscence. Players are invited to explore the home of a lost loved one, toggling between past and present, uncovering the heartache and beauty that linger within the walls of memory.',
    'Guided by the question "how can a system be designed to engage the lived body during play?" this research-creation project explores embodied interaction within digital games. The system, comprising a body controller and a computer-based game, challenges our sense of balance — an aspect often overlooked in virtual gameplay experiences.<br><br>Ultimately, this project examines the potential of unconventional interfaces between humans and digital games to promote situated and enacted forms of cognition through heightened bodily awareness.',
    'A short, lighthearted game where players help their astronaut friend rebuild their spaceship after crashing in an unfamiliar area. They must navigate a vibrant landscape to collect the scattered spaceship parts.',
    'A short game set in an eerie abandoned campsite. Players must navigate the darkness and escape before their flashlight battery drains.',
    'An interactive web-based experience that visualizes sound through patterns. Changes in specific audio characteristics picked up by the user\'s microphone are translated into visual elements that combine to create a symphony of shapes and colors.',
    'A narrative pixel-art game about restless self-searching and solitude. It portrays a journey of wandering through empty yet evocative spaces in the night, where one yearns for comfort and closeness amidst the darkness.',
    'An interactive web-based experience centred on visual stimulation. In this dynamic exploration of shape and sound, the characteristics of each scene change in response to mouse interactions.'
  ];

  const technologies = [
    'C++',
    'C++ / OpenGL',
    'JavaScript / Node.js / Express.js / MongoDB / p5.js / HTML / CSS',
    'C# / Unity',
    'C# / C++ / Arduino / Unity',
    'C# / Unity',
    'C# / Unity',
    'JavaScript / Node.js / Express.js / MongoDB / p5.js / HTML / CSS',
    'Bitsy (HTML5)',
    'JavaScript / p5.js / HTML / CSS'
  ];

  const years = [
    '2023',
    '2023',
    '2022',
    '2022',
    '2021',
    '2021',
    '2021',
    '2020',
    '2019',
    '2019'
  ];

  const links = [
    {
      type: 'source code',
      url: 'https://github.com/amandaclement/raytracer',
      name: 'GitHub'
    },
    {
      type: 'source code',
      url: 'https://github.com/amandaclement/heterogeneous_fog',
      name: 'GitHub'
    },
    {
      type: 'source code',
      url: 'https://github.com/amandaclement/cart451/tree/master/prototype',
      name: 'GitHub'
    },
    {
      type: 'video demo',
      url: 'https://www.youtube.com/watch?v=nL7VJ2ocClI',
      name: 'YouTube'
    },
    {
      type: 'video demo',
      url: 'https://youtu.be/tfeZZ38HUl0',
      name: 'YouTube'
    },
    {
      type: 'game link',
      url: 'https://amandaclement.itch.io/fly-me-to-the-moon',
      name: 'itch.io'
    },
    {
      type: 'game link',
      url: 'https://amandaclement.itch.io/escape',
      name: 'itch.io'
    },
    {
      type: 'source code',
      url: 'https://github.com/amandaclement/drawingWithSound',
      name: 'GitHub'
    },
    {
      type: 'game link',
      url: 'https://amandaclement.itch.io/when-the-sun-goes-down',
      name: 'itch.io'
    },
    {
      type: 'project website',
      url: 'https://amandaclement.github.io/cart253/projects/project3/index.html',
      name: 'Link'
    }
  ];

  // Bio title on about page
  let bioContainer = $('#bio-container');
  let bioTitles = [
    'front-end developer', 
    'back-end developer', 
    'web developer', 'game developer', 
    'creative technologist', 
    'designer too'
  ];

  const typingSpeed = 100;
  const erasingSpeed = 30;
  const titleDelay = 1000;
  let titleIndex = 0;
  let charIndex = 0;


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
      body.css('overflow', 'hidden');
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
    $('.project-item-animated').each(function() {
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

  // Display and animate project title for a single project item
  function handleProjectTitle(projectItem) {
    projectItem = $(projectItem);
    let projectTitle = projectItem.find('.project-title');
    projectTitle.text(projectTitle.text().toLowerCase());

    // Display title on hover
    $(projectItem).mouseenter(function() {
        projectTitle.show();
    }).mouseleave(function() {
        projectTitle.hide();
    });

    // Make title follow mouse
    $(document).mousemove(function(e) {
      const height = projectTitle.height() / 2;
      const width = projectTitle.width() / 2;

      projectTitle.css({
          left: e.pageX - width,
          top: e.pageY - height,
          zIndex: 100
      });
    });    
  }

  // Display and animate all project titles
  function handleProjectTitles() {
    let projectItems = $('.project-item');

    // Display title on hover and calculate height and widths
    for (let i = 0; i < projectItems.length; i++) {
      handleProjectTitle(projectItems[i]);
    }
  }

  // Display and update project description
  function displayProjectDescription(index) {
    projectContainer.css('display', 'none');
    projectDesc.css('display', 'block');

    projectDescVideo.attr('src', videoPaths[index]);
    projectDescTitle.append(titles[index]);
    projectDescType.append(types[index]);
    projectDescDescription.append(descriptions[index]);
    projectDescTechnologies.append(technologies[index]);
    projectDescYear.append(years[index]);
    projectDescLinkType.append(links[index].type);
    projectDescLink.attr('href', links[index].url);
    projectDescLink.append(links[index].name);
  }

  // Create a new project
  function createProject(index) {
    // Clone the template and populate its content
    let project = template.clone();
    project.removeClass('project-template').addClass('project-cell');
    project.find('.project-title').text(titles[index]);

    let video =  project.find('.project-video');
    video.attr('src', videoPaths[index]);

    // Display appropriate description on project click
    video.click(function() {
      window.scrollTo(0, 0);
      displayProjectDescription(index);
    });

    return project;
  }

  // Populate index page with projects
  function populateIndex() {
    for (let i = 0; i < numProjects; i++) {
      let project = createProject(i);
      projectContainer.append(project);
    }
  }

  // Type bio titles
  function typeBioTitle() {
    if (titleIndex < bioTitles.length) {
        // Get current bio title
        let currentTitle = bioTitles[titleIndex];
        
        // Type each character of current title
        if (charIndex < currentTitle.length) {
            // Append the next character to bio container
            bioContainer.text(bioContainer.text() + currentTitle[charIndex]);
            charIndex++;

            // Recursive call to continue typing current title
            setTimeout(typeBioTitle, typingSpeed);
        } else {
            // Erase current title
            setTimeout(eraseBioTitle, titleDelay);
        }
    } else {
        // Reset the title index to 0 for continuous loop
        titleIndex = 0;

        // Start typing bio titles again
        setTimeout(typeBioTitle, typingSpeed);
    }
  }

  // Erase bio titles
  function eraseBioTitle() {
    // Get the current text in the bio container
    let currentText = bioContainer.text();
    
    // Erase one character at a time
    if (currentText.length > 0) {
        // Remove last character from bio container
        bioContainer.text(currentText.substring(0, currentText.length - 1));

        // Recursive call to continue erasing text
        setTimeout(eraseBioTitle, erasingSpeed);
    } else {
        // Move to next title after erasing
        setTimeout(nextTitle, erasingSpeed);
    }
  }

  // Move to next bio title
  function nextTitle() {
    bioContainer.empty();

    // Reset the character index and move to next title
    charIndex = 0;
    titleIndex++;

    // Start typing next title
    setTimeout(typeBioTitle, typingSpeed);
  }


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

  // Populate index with projects
  populateIndex();

  // Animate project titles
  handleProjectTitles();

  // Type/erase bio titles on about page
  typeBioTitle();

});
