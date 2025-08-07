document.addEventListener('DOMContentLoaded', function() {
    // Typing animation
    const typingElement = document.querySelector('.typing');
    const words = ['Web Developer', 'AI Enthusiast', 'Robotics Learner'];
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, letterIndex - 1);
            letterIndex--;
            if (letterIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        } else {
            typingElement.textContent = currentWord.substring(0, letterIndex + 1);
            letterIndex++;
            if (letterIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, 1500); // Pause before deleting
                return;
            }
        }
        setTimeout(type, isDeleting ? 100 : 200);
    }

    type();

    // Fade-in on scroll
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
});
