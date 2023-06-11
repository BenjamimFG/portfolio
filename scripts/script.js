/**
 * Project
 * @typedef {Object} Project
 * @property {string} name - Project name
 * @property {string} image - Project's image source
 * @property {string} sourceCodeUrl - Project's source code URL
 * @property {string | null} liveDemoUrl - Project's live demo URL
 * @property {string} description - Project's description
 * @property {string[]} tags - Project's relevant tags
 */

let screenWidth =
  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

let isMobile = screenWidth < 800;

/**
 * Convert a number from 'rem' unit to 'px' used for css calculations in js
 * @param {number} rem
 * @returns {number} Value of 'rem' in pixels
 */
function remToPx(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

/**
 * Toggles menu display
 */
function toggleMenu() {
  if (!isMobile) return;

  const menu = document.querySelector('#menu');

  menu.classList.toggle('open');
}

/**
 * Generates HTML template for projects for Mobile display
 * @returns {string[]} Array of project's HTML templates
 */
function getProjectsTemplateMobile() {
  return projects.map(
    (project) => `
    <article class="project">
        <h4>${project.name}</h4>
        <div class="img-wrapper">
            <img src="${project.image}" alt="${project.name} project image">
            <div class="project-links">
                <span class="link-wrapper">
                    <svg class="feather"><use href="assets/icons/feather-sprite.svg#github" /></svg>
                    <a href="${project.sourceCodeUrl}">Source Code</a>
                </span>
                ${
                  project.liveDemoUrl
                    ? `<span class="link-wrapper">
                    <svg class="feather"><use href="assets/icons/feather-sprite.svg#link" /></svg>
                        <a href="${project.liveDemoUrl}">Live Demo</a>
                    </span>`
                    : ''
                }
            </div>
        </div>
        <p class="description">${project.description}</p>
        <div class="tags">
            ${project.tags.map((tag) => `<span class="tag">#${tag}</span>`).join('\n')}
        </div>
    </article>
`
  );
}

/**
 * Generates HTML template for projects for Desktop display
 * @returns {string[]} Array of project's HTML templates
 */
function getProjectsTemplateDesktop() {
  return projects.map(
    (project) => `
    <article class="project">
        <section class="left">
            <div class="project-header">
                <h4>${project.name}</h4>
                <div class="project-links">
                    <span class="link-wrapper">
                        <svg class="feather"><use href="assets/icons/feather-sprite.svg#github" /></svg>
                        <a href="${project.sourceCodeUrl}">Source Code</a>
                    </span>
                    ${
                      project.liveDemoUrl
                        ? `<span class="link-wrapper">
            <svg class="feather"><use href="assets/icons/feather-sprite.svg#link" /></svg>
                            <a href="${project.liveDemoUrl}">Live Demo</a>
                        </span>`
                        : ''
                    }
                </div>
            </div>
            <div class="description-container">
                <p class="description">${project.description}</p>
            </div>
            <div class="tags">
                ${project.tags.map((tag) => `<span class="tag">#${tag}</span>`).join('\n')}
            </div>
        </section>

        <section class="right">
            <img src="${project.image}" alt="${project.name} project image">
        </section>
    </article>
    `
  );
}

/**
 * Populates the #project-slider div
 */
function populateProjects() {
  const projectsHtml = isMobile ? getProjectsTemplateMobile() : getProjectsTemplateDesktop();

  // Copy first and last elements for the slider's cycle effect
  const firstClone = projectsHtml[0].replace('class="project"', 'class="project" id="first-clone"');
  const lastClone = projectsHtml[projectsHtml.length - 1].replace(
    'class="project"',
    'class="project" id="last-clone"'
  );

  projectsHtml.unshift(lastClone);
  projectsHtml.push(firstClone);

  const projectSlider = document.querySelector('#project-slider');

  projectSlider.innerHTML = projectsHtml.join('\n');
}

// Start at index 1 since index 0 is a clone of the last
let curProject = 1;

/**
 * Translates the #project-slider div according to the curProject
 * variable value.
 * @param {boolean} useTransition If true uses transition effect
 */
function setShownProject(useTransition) {
  const projectSlider = document.querySelector('#project-slider');
  const projectElements = document.querySelectorAll('.project');

  const size = projectElements[0].offsetWidth;

  if (useTransition) projectSlider.classList.add('transition');
  else projectSlider.classList.remove('transition');

  projectSlider.style.transform = `translateX(${(-size - remToPx(2)) * curProject}px)`;
}

/**
 * Increments curProject and call setShownProject again using transition.
 */
function nextProject() {
  if (curProject >= projects.length + 1) return;

  curProject++;
  setShownProject(true);
}

/**
 * Decrements curProject and call setShownProject again using transition.
 */
function prevProject() {
  if (curProject <= 0) return;

  curProject--;
  setShownProject(true);
}

populateProjects();
setShownProject(false);

// On transition end, if current project is first or last (clones)
// go back to the original first or last
// e.g. project[0] is a clone of project[projects.length] so if current is 0
// change it to projects.length
document.querySelector('#project-slider').addEventListener('transitionend', (_event) => {
  if (curProject !== 0 && curProject !== projects.length + 1) return;

  if (curProject === 0) curProject = projects.length;
  else curProject = 1;

  setShownProject(false);
});

/// Swipe functionality stuff

let xDown = null;
let yDown = null;

/**
 * Function to handle touchstart event. It will save the X and Y positions of the
 * first touch to xDown and yDown variables.
 * @param {TouchEvent} event
 */
function handleTouchStart(event) {
  const touch = event.touches[0];

  xDown = touch.clientX;
  yDown = touch.clientY;
}

/**
 * Function to handle touchmove event.
 * @param {TouchEvent} event
 */
function handleTouchMove(event) {
  if (!xDown || !yDown) {
    return;
  }

  const touch = event.touches[0];

  let xUp = touch.clientX;
  let yUp = touch.clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;

  // If horizontal movement is most significant than vertical
  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      // right swipe
      nextProject();
    } else {
      // left swipe
      prevProject();
    }
  }

  /* reset values */
  xDown = null;
  yDown = null;
}

document.querySelector('#project-slider').addEventListener('touchstart', handleTouchStart);
document.querySelector('#project-slider').addEventListener('touchmove', handleTouchMove);

window.addEventListener(
  'resize',
  (_event) => {
    screenWidth =
      window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    isMobile = screenWidth < 800;

    // On resize add touch event listeners again to work in case of resizing from desktop to
    // mobile screen on browser developer tools since touch event doesn't work on browser by default
    if (isMobile) {
      document.querySelector('#project-slider').addEventListener('touchstart', handleTouchStart);
      document.querySelector('#project-slider').addEventListener('touchmove', handleTouchMove);
    }

    // on resize set shown project again to fix responsiveness based on the new screen size
    populateProjects();
    setShownProject(false);
  },
  true
);
