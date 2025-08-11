// Certificate Slideshow Functionality
let slideIndex = 1;
showSlide(slideIndex);

function changeSlide(n) {
  showSlide((slideIndex += n));
}

function currentSlide(n) {
  showSlide((slideIndex = n));
}

function showSlide(n) {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active");
}

// Auto-play slideshow
setInterval(function () {
  changeSlide(1);
}, 5000);

// Loading Screen
window.addEventListener("load", function () {
  const loadingScreen = document.getElementById("loadingScreen");
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 2000);
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 1s ease forwards";
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll(".section").forEach((section) => {
  observer.observe(section);
});

// Add some interactive elements
document.querySelectorAll(".skill-card, .contact-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.05)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add typing effect to hero subtitle
const subtitle = document.querySelector(".hero-subtitle");
const text = subtitle.textContent;
subtitle.textContent = "";

setTimeout(() => {
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      subtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  typeWriter();
}, 3000);

 const texts = [
        "Web Developer",
        "AI Enthusiast",
        "Problem Solver",
        "Lifelong Learner",
      ];
      let count = 0;
      let index = 0;
      let currentText = "";
      let isDeleting = false;
      const speed = 150;

      function type() {
        const typedText = texts[count];
        if (isDeleting) {
          currentText = typedText.substring(0, index--);
        } else {
          currentText = typedText.substring(0, index++);
        }
        document.getElementById("typing-text").textContent = currentText;

        if (!isDeleting && index === typedText.length + 1) {
          isDeleting = true;
          setTimeout(type, 1000);
        } else if (isDeleting && index === 0) {
          isDeleting = false;
          count = (count + 1) % texts.length;
          setTimeout(type, 500);
        } else {
          setTimeout(type, speed);
        }
      }

      type();