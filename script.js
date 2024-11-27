function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const yearElement = document.getElementById("year");
yearElement.innerText = new Date().getFullYear();

function addProject({ imgSrcList, imgAlt, title, links, technologies }) {
  // Find the container to append the new project
  const aboutContainers = document.getElementById("project-container");

  if (!aboutContainers) {
    console.error("Container not found.");
    return;
  }

  // Create the project container
  const projectContainer = document.createElement("div");
  projectContainer.classList.add("details-container", "color-container");

  // Project image container
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("article-container");
  const image = document.createElement("img");
  image.src = `${imgSrcList[0]}`;
  image.alt = imgAlt;
  image.classList.add("project-img");
  imageContainer.appendChild(image);

  // Rotate images every 2 seconds
  let currentIndex = 0;
  setInterval(() => {
    currentIndex = (currentIndex + 1) % imgSrcList.length; // Loop back to the first image
    image.src = `${imgSrcList[currentIndex]}`;
  }, 2000);

  // Project title
  const projectTitle = document.createElement("h2");
  projectTitle.classList.add("experience-sub-title", "project-title");
  projectTitle.textContent = title;

  // Button container
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");

  links.forEach((link) => {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-color-2", "project-btn");
    button.textContent = link.label;
    button.onclick = () => window.open(link.url);
    btnContainer.appendChild(button);
  });

  // Technologies container
  const techContainer = document.createElement("div");
  techContainer.classList.add("technologies");
  const techList = document.createElement("ul");
  techList.classList.add("technologies-container");

  technologies.forEach((tech) => {
    const techItem = document.createElement("li");
    techItem.textContent = tech;
    techList.appendChild(techItem);
  });

  techContainer.appendChild(techList);

  // Append all created elements to the project container
  projectContainer.appendChild(imageContainer);
  projectContainer.appendChild(projectTitle);
  projectContainer.appendChild(btnContainer);
  projectContainer.appendChild(techContainer);

  // Append the project container to the aboutContainers
  aboutContainers.appendChild(projectContainer);
}

function addExperienceSection({ title, experiences }) {
  // Find the container to append the new section
  const experienceContainer = document.getElementById("experience-container");

  if (!experienceContainer) {
    console.error("Experience container not found.");
    return;
  }

  // Create the new section container
  const sectionContainer = document.createElement("div");
  sectionContainer.classList.add("details-container");

  // Add the section title
  const sectionTitle = document.createElement("h2");
  sectionTitle.classList.add("experience-sub-title");
  sectionTitle.textContent = title;

  // Create the article container
  const articleContainer = document.createElement("div");
  articleContainer.classList.add("article-container");

  // Loop through the experiences and create articles
  experiences.forEach((exp) => {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.src = exp.iconSrc || "./assets/checkmark.png"; // Default icon if not provided
    img.alt = exp.iconAlt || "Experience icon";
    img.classList.add("icon");

    const div = document.createElement("div");

    const h3 = document.createElement("h3");
    h3.textContent = exp.skill;

    const p = document.createElement("p");
    p.textContent = exp.level;

    div.appendChild(h3);
    div.appendChild(p);

    article.appendChild(img);
    article.appendChild(div);
    articleContainer.appendChild(article);
  });

  // Append the title and article container to the section container
  sectionContainer.appendChild(sectionTitle);
  sectionContainer.appendChild(articleContainer);

  // Append the new section container to the main experience container
  experienceContainer.appendChild(sectionContainer);
}

fetch("./skills.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((skill) => addExperienceSection(skill));
  });

// Example usage
fetch("./projects.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((project) => addProject(project));
  });
