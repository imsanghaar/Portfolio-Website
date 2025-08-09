      // Scroll progress indicator
      window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        document.getElementById("scrollProgress").style.width =
          scrollPercent + "%";
      });

      // Navbar background change on scroll
      window.addEventListener("scroll", () => {
        const navbar = document.getElementById("navbar");
        if (window.scrollY > 100) {
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

      // Form submission
      document
        .getElementById("contactForm")
        .addEventListener("submit", function (e) {
          e.preventDefault();

          // Get form data
          const formData = new FormData(this);
          const name = formData.get("name");
          const email = formData.get("email");
          const message = formData.get("message");

          // Simple validation
          if (name && email && message) {
            // Simulate form submission
            const submitBtn = this.querySelector(".submit-btn");
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            setTimeout(() => {
              alert("Thank you for your message! I'll get back to you soon.");
              this.reset();
              submitBtn.textContent = originalText;
              submitBtn.disabled = false;
            }, 2000);
          }
        });

      // Add intersection observer for animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animation = "fadeInUp 0.8s ease forwards";
          }
        });
      }, observerOptions);

      // Observe all cards and sections
      document
        .querySelectorAll(".skill-card, .education-card, .project-card")
        .forEach((card) => {
          observer.observe(card);
        });

      // Add mouse move effect for 3D tilt
      document
        .querySelectorAll(".project-card, .skill-card, .education-card")
        .forEach((card) => {
          card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
          });

          card.addEventListener("mouseleave", () => {
            card.style.transform =
              "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
          });
        });

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
