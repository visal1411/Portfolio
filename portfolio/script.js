gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.1,
  smoothWheel: true,
  smoothTouch: false
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

document.getElementById("year").textContent = new Date().getFullYear();

const profileImage = document.getElementById("profileImage");
const PORTFOLIO_CONTENT = {
  profile: {
    imageUrl: "image1.png",
    imageAlt: "Kuy Visal profile photo"
  },
  projects: [
    {
      title: "Walk Over Weight System",
      url: "https://example.com",
      description: "A smart walk-over system that captures cow weight and displays real-time records on a dashboard.",
      techStack: "ESP32, Load Cell, LoRa, Express.js, React.js",
      imageUrl: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=900&q=80",
      imageAlt: "Cow livestock weight monitoring concept"
    },
    {
      title: "HavJeang",
      url: "https://example.com",
      description: "A service finder app to locate nearby mechanic shops on a map, supporting two user roles: mechanic and customer.",
      techStack: "React.js, Express.js, OpenStreetMap",
      imageUrl: "image2.png",
      imageAlt: "HavJeang app signup and role selection screen"
    },
    {
      title: "Movie Detail App",
      url: "https://example.com",
      description: "A mobile app that shows movie details, including descriptions and ratings.",
      techStack: "React Native, NativeWind CSS, The Movie Database, Appwrite",
      imageUrls: ["image3.png", "image4.png"],
      imageAlt: "Movie Detail App home screen"
    }
  ]
};

profileImage.src = PORTFOLIO_CONTENT.profile.imageUrl;
profileImage.alt = PORTFOLIO_CONTENT.profile.imageAlt;

const projectsData = PORTFOLIO_CONTENT.projects;

const projectsGrid = document.getElementById("projectsGrid");

function normalizeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function buildProjectCard({ title, url, description, techStack, imageUrl, imageUrls, imageAlt }) {
  const card = document.createElement("article");
  card.className = "project-card flip-card";
  card.tabIndex = 0;

  const inner = document.createElement("div");
  inner.className = "project-card-inner";

  const front = document.createElement("div");
  front.className = "project-card-face project-card-front";

  const imageWrap = document.createElement("div");
  imageWrap.className = "project-image-wrap";

  const projectImage = document.createElement("img");
  const availableImages = Array.isArray(imageUrls) && imageUrls.length ? imageUrls : [imageUrl];
  const firstImage = availableImages.find((value) => Boolean(value));

  projectImage.src = firstImage || "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80";
  projectImage.alt = imageAlt || title || "Project image";
  projectImage.addEventListener("error", () => {
    projectImage.src = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80";
  });

  if (availableImages.length > 1) {
    let currentIndex = 0;
    setInterval(() => {
      currentIndex = (currentIndex + 1) % availableImages.length;
      projectImage.src = availableImages[currentIndex];
    }, 2500);
  }

  const frontOverlay = document.createElement("div");
  frontOverlay.className = "project-front-overlay";

  const label = document.createElement("span");
  label.className = "project-label";
  label.textContent = "Project";

  const frontTitle = document.createElement("h3");
  frontTitle.textContent = title || "Untitled Project";

  frontOverlay.appendChild(label);
  frontOverlay.appendChild(frontTitle);
  imageWrap.appendChild(projectImage);
  imageWrap.appendChild(frontOverlay);
  front.appendChild(imageWrap);

  const back = document.createElement("div");
  back.className = "project-card-face project-card-back";

  const backTitle = document.createElement("h3");
  backTitle.textContent = title || "Untitled Project";

  const details = document.createElement("p");
  details.textContent = description || "Add a short project description.";

  const tech = document.createElement("p");
  tech.className = "project-tech";
  tech.textContent = techStack ? `Tech: ${techStack}` : "Tech stack will be added soon.";

  const actions = document.createElement("div");
  actions.className = "project-actions";

  const viewButton = document.createElement("a");
  viewButton.className = "btn btn-ghost";
  viewButton.textContent = "View Project";
  viewButton.target = "_blank";
  viewButton.rel = "noopener noreferrer";

  const safeUrl = normalizeUrl(url || "");
  if (safeUrl) {
    viewButton.href = safeUrl;
  } else {
    viewButton.removeAttribute("href");
    viewButton.style.pointerEvents = "none";
    viewButton.style.opacity = "0.6";
    viewButton.textContent = "Add URL in script.js";
  }

  actions.appendChild(viewButton);
  back.appendChild(backTitle);
  back.appendChild(details);
  back.appendChild(tech);
  back.appendChild(actions);

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  projectsGrid.appendChild(card);

  gsap.from(card, {
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: "power2.out"
  });
}

projectsData.forEach(buildProjectCard);

const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactStatus");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

  contactStatus.textContent = "Opening your email app to send the message...";
  window.location.href = `mailto:kuyvisal413@gmail.com?subject=${subject}&body=${body}`;

  setTimeout(() => {
    contactStatus.textContent = "If your mail app did not open, email me directly at kuyvisal413@gmail.com.";
  }, 1200);
});

const revealElements = gsap.utils.toArray(".reveal");

revealElements.forEach((element) => {
  gsap.to(element, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      start: "top 86%"
    }
  });
});

gsap.from(".skill-card", {
  y: 18,
  opacity: 0,
  duration: 0.7,
  stagger: 0.08,
  delay: 0.4,
  ease: "power2.out"
});

gsap.to(".orb-1", {
  y: 110,
  x: 60,
  ease: "none",
  scrollTrigger: {
    scrub: 1
  }
});

gsap.to(".orb-2", {
  y: -90,
  x: -30,
  ease: "none",
  scrollTrigger: {
    scrub: 1
  }
});

const storySteps = gsap.utils.toArray(".story-step");
const storyScreens = gsap.utils.toArray(".story-screen");

function activateStoryStep(stepNumber) {
  storySteps.forEach((step, index) => {
    step.classList.toggle("is-active", index + 1 === stepNumber);
  });

  storyScreens.forEach((screen, index) => {
    screen.classList.toggle("active", index + 1 === stepNumber);
  });
}

if (storySteps.length && storyScreens.length) {
  activateStoryStep(1);

  storySteps.forEach((step) => {
    const stepNumber = Number(step.dataset.step || 1);

    ScrollTrigger.create({
      trigger: step,
      start: "top 62%",
      end: "bottom 40%",
      onEnter: () => activateStoryStep(stepNumber),
      onEnterBack: () => activateStoryStep(stepNumber)
    });
  });

  gsap.from(".story-visual", {
    y: 30,
    opacity: 0,
    duration: 0.9,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".scroll-story",
      start: "top 78%"
    }
  });
}
