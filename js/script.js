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
  const introDelay = 4000, maxShuffles = 3;
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

  // Project data
  const projectData = [
    { 
      title: 'Raytracer', 
      type: 'Computer Graphics', 
      technologies: 'C++', 
      year: 2023, 
      description: 'A raytracer built from scratch using C++. It supports sphere and rectangle primitives, local illumination (point and area lights) using Blinn-Phong shading, anti-aliasing using stratified random subpixel sampling, and global illumination using Monte Carlo path-tracing.', 
      link: {type: 'source code', url: 'https://github.com/amandaclement/raytracer', name: 'GitHub'}, 
      videoPath: 'assets/videos/raytracer.mp4' 
    },
    { 
      title: 'Heterogeneous Fog', 
      type: 'Computer Graphics', 
      technologies: 'C++ / OpenGL',
      year: 2023, 
      description: 'A real-time rendering of heterogeneous fog in OpenGL. The objective was to strike a balance between the uniformity of homogeneous fog, which often lacks realism, and the computational demands of volumetric fog, known for its realistic appearance.<br><br>The heterogeneous fog model augments exponential fog by integrating Perlin turbulence (the layering of Perlin noise octaves) into the equation to achieve a greater amount of shape and detail.', 
      link: {type: 'source code', url: 'https://github.com/amandaclement/heterogeneous_fog', name: 'GitHub'},
      videoPath: 'assets/videos/heterogeneousfog.mp4' 
    },
    { 
      title: 'COVID-19 Emotion Map', 
      type: 'Web Development / Web Design / Data Visualization / Natural Language Processing', 
      technologies: 'JavaScript / Node.js / Express.js / p5.js / MongoDB / HTML / CSS', 
      year: 2022, 
      description: 'An interactive web-based data visualization illustrating the emotional impact of the COVID-19 pandemic. Each dot represents a Tweet posted on March 11th, 2020, the day the WHO declared the COVID-19 outbreak a global pandemic, coloured by emotion.<br><br>The visualization invites users to witness the emotions embedded within global discourse, painting a picture of collective sentiment in the face of adversity.', 
      link: {type: 'source code', url: 'https://github.com/amandaclement/cart451/tree/master/prototype', name: 'GitHub'},
      videoPath: 'assets/videos/covid19emotionmap.mp4' 
    },
    { 
      title: 'Traces of You', 
      type: 'Game Development / Game Design', 
      technologies: 'C# / Unity / Blender / Mixamo', 
      year: 2022, 
      description: 'A short narrative game about love, loss and the enduring power of reminiscence. Players are invited to explore the home of a lost loved one, toggling between past and present, uncovering the heartache and beauty that linger within the walls of memory.', 
      link: {type: 'video demo', url: 'https://www.youtube.com/watch?v=nL7VJ2ocClI', name: 'YouTube'},
      videoPath: 'assets/videos/tracesofyou.mp4' },
    { 
      title: 'Body Controller', 
      type: 'Game Development / Game Design / Research-Creation', 
      technologies: 'C# / C++ / Arduino / Unity', 
      year: 2021, 
      description: 'Guided by the question "how can a system be designed to engage the lived body during play?" this research-creation project explores embodied interaction within digital games. The system, comprising a body controller and a computer-based game, challenges our sense of balance — an aspect often overlooked in virtual gameplay experiences.<br><br>Ultimately, this project examines the potential of unconventional interfaces between humans and digital games to promote situated and enacted forms of cognition through heightened bodily awareness.', 
      link: {type: 'video demo', url: 'https://youtu.be/tfeZZ38HUl0', name: 'YouTube'},
      videoPath: 'assets/videos/bodycontroller.mp4' 
    },
    { 
      title: 'Fly Me to the Moon', 
      type: 'Game Development / Game Design', 
      technologies: 'C# / Unity / Blender', 
      year: 2021, 
      description: 'A short, lighthearted game where players help their astronaut friend rebuild their spaceship after crashing in an unfamiliar area. They must navigate a vibrant landscape to collect the scattered spaceship parts.', 
      link: {type: 'game link', url: 'https://amandaclement.itch.io/fly-me-to-the-moon', name: 'itch.io'},
      videoPath: 'assets/videos/flymetothemoon.mp4' },
    { 
      title: 'Escape', 
      type: 'Game Development / Game Design', 
      technologies: 'C# / Unity', 
      year: 2021, 
      description: 'A short game set in an eerie abandoned campsite. Players must navigate the darkness and escape before their flashlight battery drains.', 
      link: {type: 'game link', url: 'https://amandaclement.itch.io/escape', name: 'itch.io'},
      videoPath: 'assets/videos/escape.mp4' 
    },
    { 
      title: 'Drawing With Sound', 
      type: 'Web Development / Web Design / Generative Art', 
      technologies: 'JavaScript / PHP / p5.js / HTML / CSS', 
      year: 2020, 
      description: 'An interactive web-based experience that illustrates sound using visual patterns. Changes in specific audio characteristics picked up by the user\'s microphone are translated into visual elements that combine to create a symphony of shapes and colors.', 
      link: {type: 'source code', url: 'https://github.com/amandaclement/drawingWithSound', name: 'GitHub'},
      videoPath: 'assets/videos/drawingwithsound.mp4' 
    },
    { 
      title: 'When the Sun Goes Down', 
      type: 'Game Design', 
      technologies: 'Bitsy (HTML5)', 
      year: 2019, 
      description: 'A narrative pixel-art game about restless self-searching and solitude. It portrays a journey of wandering through empty yet evocative spaces in the night, where one yearns for comfort and closeness amidst the darkness.', 
      link: {type: 'game link', url: 'https://amandaclement.itch.io/when-the-sun-goes-down', name: 'itch.io'},
      videoPath: 'assets/videos/whenthesun.mp4' },
    { 
      title: 'Musical Shapes', 
      type: 'Web Design / Creative Coding', 
      technologies: 'JavaScript / p5.js / HTML / CSS', 
      year: 2019, 
      description: 'An interactive web-based experience centred on visual stimulation. In this dynamic exploration of shape and sound, the characteristics of each scene change in response to mouse interactions.', 
      link: {type: 'project website', url: 'https://amandaclement.github.io/cart253/projects/project3/index.html', name: 'Link'},
      videoPath: 'assets/videos/musicalshapes.mp4' 
    }
  ];

  // Index page
  const numProjects = projectData.length;
  const projectContainer = $('.project-container');
  const template = $('.project-template');
  const projectContent = $('#project-content');
  const projectContentVideo = $('.project-content-video');
  const projectInfo = $('#project-info');

  // Bio title on about page
  const bioContainer = $('#bio-container');
  const bioTitles = [
    'front-end developer', 
    'back-end developer', 
    'web developer', 'game developer', 
    'creative technologist', 
    'designer too'
  ];
  const typingSpeed = 100, erasingSpeed = 30, titleDelay = 1000;
  let titleIndex = 0, charIndex = 0;


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

  // Update and display project description
  function displayProjectDescription(index) {
    // Hide project list and display project description container
    projectContainer.css('display', 'none');
    projectContent.css('display', 'block');

    // Get project info based on index
    const data = projectData[index];

    // Update video
    projectContentVideo.attr('src', data.videoPath);

    // Loop over each key/value pair in selected project data, creating corresponding elements
    $.each(data, function(key, value) {
      const rowElement = $('<div>').addClass('row');
      const leftCell = $('<div>').addClass('cell-left');
      const rightCell = $('<div>').addClass('cell-right');
      let leftContent, rightContent;

      if (key === 'link') {
        leftContent = $('<h4>').text(value.type);
        rightContent = $('<a>')
          .attr('href', value.url)
          .attr('target', '_blank')
          .text(value.name);
      } else if (key !== 'videoPath') {
        leftContent = $('<h4>').text(key);
        rightContent = $('<p>').html(value);
      }
      
      // Append the content to the appropriate elements
      leftCell.append(leftContent);
      rightCell.append(rightContent);
      rowElement.append(leftCell, rightCell);
      projectInfo.append(rowElement);
    });
  }

  // Create a new project
  function createProject(index) {
    // Clone the template and populate its content
    let project = template.clone();
    project.removeClass('project-template').addClass('project-cell');
    project.find('.project-title').text(projectData[index].title);

    let video =  project.find('.project-video');
    video.attr('src', projectData[index].videoPath);

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
