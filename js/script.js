$(document).ready(function() {
  
/************************************************** VARIABLES **************************************************/

  // Intro screen
  const body = $('body');
  const textContainer1 = $('#intro-line1');
  const textContainer2 = $('#intro-line2');
  const line1 = 'amanda';
  const line2 = 'clement';
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&()+=<>?/:;{}[]~|';
  const introScreen = $('#intro-overlay');
  const introDelay = 4000, maxShuffles = 3;
  let shuffles = 0;

  // Buttons
  const logo = $('.logo button');
  // const arrow = $('.arrow');
  const menuButton = $('.menu button');
  const menu = $('.menu');
  const nav = $('nav');
  let navFlag = false;

  // Project data
  const projectData = [
    { 
      title: 'Raytracer', 
      type: 'Computer Graphics', 
      technologies: 'C++', 
      year: 2023, 
      description: 'A raytracer built from scratch using C++. It supports sphere and rectangle primitives, local illumination (point and area lights) using Blinn-Phong shading, anti-aliasing using stratified random subpixel sampling, and global illumination using Monte Carlo path-tracing.', 
      links: [
        {type: 'source code', url: 'https://github.com/amandaclement/raytracer', name: 'GitHub'}
      ], 
      videoPath: 'assets/videos/raytracer.mp4',
      images: [
        {path: 'assets/images/raytracer_1.jpg', alt: 'Rendered scene of empty room showcasing global illumination', caption: 'Rendered scene showcasing global illumination'},
        {path: 'assets/images/raytracer_2.jpg', alt: 'Rendered scene of empty room showcasing local illumination', caption: 'Rendered scene showcasing local illumination'}
      ]
    },
    { 
      title: 'Heterogeneous Fog', 
      type: 'Computer Graphics', 
      technologies: 'C++ &ensp;/&ensp; OpenGL',
      year: 2023, 
      description: 'A real-time rendering of heterogeneous fog in OpenGL. The objective was to strike a balance between the uniformity of homogeneous fog, which often lacks realism, and the computational demands of volumetric fog, known for its realistic appearance.<br><br>The heterogeneous fog model augments exponential fog by integrating Perlin turbulence (the layering of Perlin noise octaves) into the equation to achieve a greater amount of shape and detail.', 
      links: [
        {type: 'video demo', url: 'https://youtu.be/fq2PMKXnA8Q', name: 'YouTube'},
        {type: 'source code', url: 'https://github.com/amandaclement/heterogeneous_fog', name: 'GitHub'}
      ],
      videoPath: 'assets/videos/heterogeneousfog.mp4' ,
      images: [
        {path: 'assets/images/heterogeneous_fog_1.jpg', alt: 'Heterogeneous fog on four cubes', caption: 'Real-time rendering of heterogeneous fog using 0 Perlin noise octaves'},
        {path: 'assets/images/heterogeneous_fog_2.jpg', alt: 'Heterogeneous fog on four cubes', caption: 'Real-time rendering of heterogeneous fog using 4 Perlin noise octaves'},
        {path: 'assets/images/heterogeneous_fog_3.jpg', alt: 'Perlin turbulence', caption: 'Perlin turbulence sample, used for the heterogeneous fog effect'}
      ]
    },
    { 
      title: 'COVID-19 Emotion Map', 
      type: 'Web Development &ensp;/&ensp; Web Design &ensp;/&ensp; Data Visualization &ensp;/&ensp; Natural Language Processing', 
      technologies: 'JavaScript &ensp;/&ensp; Node.js &ensp;/&ensp; Express &ensp;/&ensp; p5.js &ensp;/&ensp; HTML &ensp;/&ensp; CSS &ensp;/&ensp; MongoDB &ensp;/&ensp; Twitter API', 
      year: 2022, 
      description: 'An interactive web-based data visualization illustrating the emotional impact of the COVID-19 pandemic. Each dot represents a Tweet posted on March 11th, 2020, the day the WHO declared the COVID-19 outbreak a global pandemic, coloured by emotion.<br><br>The visualization invites users to witness the emotions embedded within global discourse, painting a picture of collective sentiment in the face of adversity.', 
      links: [
        {type: 'video demo', url: 'https://youtu.be/_VWklTNBtbU', name: 'YouTube'},
        {type: 'source code', url: 'https://github.com/amandaclement/cart451/tree/master/prototype', name: 'GitHub'}
      ],
      videoPath: 'assets/videos/covid19emotionmap.mp4',
      images: [
        {path: 'assets/images/covid19_emotion_analysis_1.jpg', alt: 'Intro page prompting the user to choose sample size for visualization', caption: 'Intro page prompting the user to choose a sample size for the visualization'},
        {path: 'assets/images/covid19_emotion_analysis_2.jpg', alt: 'Primary visualization featuring data from 30,000 Tweets', caption: 'Primary visualization featuring data from 30,000 Tweets'},
        {path: 'assets/images/covid19_emotion_analysis_3.jpg', alt: 'Secondary visualization with Tweets clustered by location data and coloured according to predominant emotion', caption: 'Secondary visualization with Tweets clustered by location data and coloured according to predominant emotion'},
        {path: 'assets/images/covid19_emotion_analysis_4.jpg', alt: 'Schema detailing web app files and data flow', caption: 'Schema detailing web app files and data flow'}
      ]
    },
    { 
      title: 'Traces of You', 
      type: 'Game Development &ensp;/&ensp; Game Design', 
      technologies: 'C# &ensp;/&ensp; Unity &ensp;/&ensp; Blender &ensp;/&ensp; Mixamo', 
      year: 2022, 
      description: 'A short narrative game about love, loss and the enduring power of reminiscence. Players are invited to explore the home of a lost loved one, toggling between past and present, uncovering the heartache and beauty that linger within the walls of memory.', 
      links: [
        {type: 'video demo', url: 'https://www.youtube.com/watch?v=nL7VJ2ocClI', name: 'YouTube'}
      ],
      videoPath: 'assets/videos/tracesofyou.mp4',
      images: [
        {path: 'assets/images/traces_of_you_1.jpg', alt: 'Dining room scene', caption: 'Dining room scene'},
        {path: 'assets/images/traces_of_you_2.jpg', alt: 'Ceiling fan in Blender', caption: 'Creation of the living room ceiling fan in Blender'},
        {path: 'assets/images/traces_of_you_3.jpg', alt: 'Digital sketch of the game scenes', caption: 'Sketch of the game scenes, created in Adobe Illustrator'},
        {path: 'assets/images/traces_of_you_4.jpg', alt: 'Digital sketch depicting the game scene navigation and colour scheme', caption: 'Sketch depicting the game navigation and colour scheme, created in Adobe Illustrator'},
        {path: 'assets/images/traces_of_you_5.jpg', alt: '3D scene sketch of a ball bouncing down a foggy staircase', caption: 'Scene sketch representing an earlier concept, created in Unity'},
        {path: 'assets/images/traces_of_you_6.jpg', alt: '3D scene sketch of a cube in a dark room lit by a ray of light', caption: 'Scene sketch representing an earlier concept, created in Unity'}
      ]
    },
    { 
      title: 'Body Controller', 
      type: 'Game Development &ensp;/&ensp; Game Design &ensp;/&ensp; Research-Creation', 
      technologies: 'C# &ensp;/&ensp; C++ &ensp;/&ensp; Arduino &ensp;/&ensp; Unity', 
      year: 2021, 
      description: 'Guided by the question "how can a system be designed to engage the lived body during play?" this research-creation project explores embodied interaction within digital games. The system, comprising a body controller and a computer-based game, challenges our sense of balance — an aspect often overlooked in virtual gameplay experiences.<br><br>Ultimately, this project examines the potential of unconventional interfaces between humans and digital games to promote situated and enacted forms of cognition through heightened bodily awareness.', 
      links: [
        {type: 'video demo', url: 'https://youtu.be/tfeZZ38HUl0', name: 'YouTube'}
      ],
      videoPath: 'assets/videos/bodycontroller.mp4',
      images: [
        {path: 'assets/images/body_controller_1.jpg', alt: 'Person standing on balance board using body controller', caption: 'Person using body controller'},
        {path: 'assets/images/body_controller_2.jpg', alt: 'Hand wearing body controller piece around palm', caption: 'Body controller hand attachment'},
        {path: 'assets/images/body_controller_3.jpg', alt: 'A digital scene of a skateboard rolling down a city street', caption: 'Screenshot of the digital game'}
      ]
    },
    { 
      title: 'Fly Me to the Moon', 
      type: 'Game Development &ensp;/&ensp; Game Design', 
      technologies: 'C# &ensp;/&ensp; Unity &ensp;/&ensp; Blender', 
      year: 2021, 
      description: 'A short, lighthearted game where players help their astronaut friend rebuild their spaceship after crashing in an unfamiliar area. They must navigate a vibrant landscape to collect the scattered spaceship parts.', 
      links: [
        {type: 'game link', url: 'https://amandaclement.itch.io/fly-me-to-the-moon', name: 'itch.io'}
      ],
      videoPath: 'assets/videos/flymetothemoon.mp4',
      images: [
        {path: 'assets/images/fly_me_to_the_moon_1.jpg', alt: 'A digital scene of an astronaut collecting a spacecraft wing', caption: 'Screenshot of the game'},
        {path: 'assets/images/fly_me_to_the_moon_2.jpg', alt: 'A digital scene of an island', caption: 'Screenshot showing part of the game map'}
      ]
    },
    { 
      title: 'Escape', 
      type: 'Game Development &ensp;/&ensp; Game Design', 
      technologies: 'C# &ensp;/&ensp; Unity', 
      year: 2021, 
      description: 'A short game set in an eerie abandoned campsite. Players must navigate the darkness and escape before their flashlight battery drains.', 
      links: [
        {type: 'game link', url: 'https://amandaclement.itch.io/escape', name: 'itch.io'}
      ],
      videoPath: 'assets/videos/escape.mp4',
      images: [
        {path: 'assets/images/escape_1.jpg', alt: 'A digital scene of a radio on a dark campsite', caption: 'Screenshot of the game'},
        {path: 'assets/images/escape_2.jpg', alt: 'A digital scene of some junk and a sledgehammer on a dark campsite', caption: 'Screenshot of the game'},
        {path: 'assets/images/escape_3.jpg', alt: 'A digital scene of a campsite illuminated by a flare gun', caption: 'Screenshot of the game'}
      ]
    },
    { 
      title: 'Drawing With Sound', 
      type: 'Web Development &ensp;/&ensp; Web Design &ensp;/&ensp; Generative Art', 
      technologies: 'JavaScript &ensp;/&ensp; PHP &ensp;/&ensp; jQuery &ensp;/&ensp; p5.js &ensp;/&ensp; HTML &ensp;/&ensp; CSS &ensp;/&ensp; SQLite', 
      year: 2020, 
      description: 'An interactive web-based experience that illustrates sound using visual patterns. Changes in specific audio characteristics picked up by the user\'s microphone are translated into visual elements that combine to create a symphony of shapes and colors. The gallery page features a subset of each contributor\'s pattern, merged to form collective designs.', 
      links: [
        {type: 'video demo', url: 'https://youtu.be/2Wt3PrNOahQ', name: 'YouTube'},
        {type: 'source code', url: 'https://github.com/amandaclement/drawingWithSound', name: 'GitHub'}
      ],
      videoPath: 'assets/videos/drawingwithsound.mp4',
      images: [
        {path: 'assets/images/drawing_with_sound_1.jpg', alt: 'Visualization creation page', caption: 'Visualization creation page'},
        {path: 'assets/images/drawing_with_sound_2.jpg', alt: 'Visualization creation page pop-up', caption: 'Visualization creation page pop-up'},
        {path: 'assets/images/drawing_with_sound_3.jpg', alt: 'Collective design page', caption: 'Collective design page'}
      ]
    },
    { 
      title: 'When the Sun Goes Down', 
      type: 'Game Design', 
      technologies: 'Bitsy (HTML5)', 
      year: 2019, 
      description: 'A narrative pixel-art game about restless self-searching and solitude. It portrays a journey of wandering through empty yet evocative spaces in the night, where one yearns for comfort and closeness amidst the darkness.', 
      links: [
        {type: 'game link', url: 'https://amandaclement.itch.io/when-the-sun-goes-down', name: 'itch.io'}
      ],
      videoPath: 'assets/videos/whenthesun.mp4',
      images: [
        {path: 'assets/images/when_the_sun_goes_down_1.jpg', alt: 'A pixel-art city', caption: 'Screenshot of the game'},
        {path: 'assets/images/when_the_sun_goes_down_2.jpg', alt: 'A pixel-art corridor', caption: 'Screenshot of the game'},
        {path: 'assets/images/when_the_sun_goes_down_3.jpg', alt: 'A pixel-art moon', caption: 'Screenshot of the game'}
      ]
    },
    { 
      title: 'Musical Shapes', 
      type: 'Web Design &ensp;/&ensp; Creative Coding', 
      technologies: 'JavaScript &ensp;/&ensp; p5.js &ensp;/&ensp; HTML &ensp;/&ensp; CSS', 
      year: 2019, 
      description: 'An interactive web-based experience centred on visual stimulation. In this dynamic exploration of shape and sound, the characteristics of each scene change in response to mouse interactions.', 
      links: [
        {type: 'project website', url: 'https://amandaclement.github.io/cart253/projects/project3/index.html', name: 'Link'},
        {type: 'source code', url: 'https://github.com/amandaclement/cart253/tree/master/projects/project3', name: 'GitHub'}
      ],
      videoPath: 'assets/videos/musicalshapes.mp4',
      images: [
        {path: 'assets/images/musical_shapes_1.jpg', alt: 'A wireframe depiction of two concentric spheres', caption: 'First project scene'},
        {path: 'assets/images/musical_shapes_2.jpg', alt: 'A wireframe depiction of a group of diamonds', caption: 'Second project scene'},
        {path: 'assets/images/musical_shapes_3.jpg', alt: 'A wireframe depiction of flower', caption: 'Sketch of a responsive web scene representing an earlier concept'},
        {path: 'assets/images/musical_shapes_4.jpg', alt: 'Concentric ellipses made up of fine lines', caption: 'Sketch of a responsive web scene representing an earlier concept'}
      ]
    }
  ];

  // Index page
  const numProjects = projectData.length;
  const projectContainer = $('.project-container');
  const template = $('.project-template');
  const projectContent = $('#project-content');
  const projectContentVideo = $('#carousel video');
  const projectInfo = $('#project-info');

  // Carousel 
  const carousel = $('#carousel');
  let carouselElements, totalCarouselElements;
  const carouselDelay = 500;
  const carouselForwardButton = $('#carousel-forward-button');
  const carouselBackButton = $('#carousel-back-button');

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

    // handleArrows(scrollTop);
    animateProjects(scrollTop, windowHeight);
  }

  // Toggle nav on menu button click and preserve button styling when nav open
  function handleMenu() {
    menuButton.mouseenter(() => {
      menuButton.addClass('menu-active');
      nav.css('display', 'block');
    });

    menu.mouseleave(() => {
      if (!navFlag) {
        menuButton.removeClass('menu-active');
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

  // Create a row consisting of a heading and content element
  function createRow(headingText, contentElement) {
    const rowElement = $('<div>').addClass('row');
    const heading = $('<h4>').text(headingText);
    const contentContainer = $('<div>');
    contentContainer.append(contentElement);
    rowElement.append(heading, contentContainer);
    projectInfo.append(rowElement);
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

    // Loop over each key/value pair in selected project data, creating corresponding rows
    $.each(data, function(key, value) {
      if (key === 'links') {
        $.each(data.links, function(i, link) {
          const content = $('<a>').attr('href', link.url).attr('target', '_blank').text(link.name);
          createRow(link.type, content);
        });
      } else if (key !== 'videoPath' && key !== 'images') {
        const content = $('<p>').html(value);
        createRow(key, content);
      }
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

    // Display appropriate description and carousel on project click
    video.click(function() {
      window.scrollTo(0, 0);
      displayProjectDescription(index);
      populateCarousel(index);
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

  // Populate project carousel with images
  function populateCarousel(index) {
    // Get project data
    const project = projectData[index];

    // Loop through the images array of the current project
    $.each(project.images, function(index, image) {
      // Create new figure, img and figcaption elements, assigning the appropriate data
      let figure = $('<figure>').addClass('figure-img');
      let img = $('<img>').attr('src', image.path).attr('alt', image.alt);
      let figcaption = $('<figcaption>').text(image.caption);

      // Append the the image and figcaption to the figure, and the figure to the carousel container
      figure.append(img);
      figure.append(figcaption);
      carousel.append(figure);
    });

    // Update related variables
    carouselElements = $('#carousel figure');
    totalCarouselElements = carouselElements.length;
  }

  // Update project carousel by either moving forwards or backwards one element based on value of passed variable
  function updateCarousel(forward) {
    const currentIndex = carouselElements.filter('.current').index();
    const nextIndex = (currentIndex + (forward ? 1 : -1) + totalCarouselElements) % totalCarouselElements;
    carouselElements.eq(currentIndex).removeClass('reveal-from-top').addClass('hide-from-bottom');

    setTimeout(function() {
      carouselElements.eq(currentIndex).removeClass('current hide-from-bottom');
      carouselElements.eq(nextIndex).addClass('current reveal-from-top');
    }, carouselDelay);
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

  // Menu
  handleMenu();

  // Populate index with projects
  populateIndex();

  // Animate project titles
  handleProjectTitles();

  // Handle forward and backward button clicks on project description page
  carouselForwardButton.on('click', function() {
    updateCarousel(true);
  });
  carouselBackButton.on('click', function() {
    updateCarousel(false);
  });

  // Type/erase bio titles on about page
  typeBioTitle();
});
