document.addEventListener('DOMContentLoaded', () => {
    // Add random glitch effect to ASCII art
    const asciiArt = document.querySelector('.ascii-art');
    let glitchInterval;

    function startGlitch() {
        if (glitchInterval) return;

        glitchInterval = setInterval(() => {
            const glitchChance = Math.random();
            if (glitchChance > 0.9) {
                asciiArt.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                asciiArt.style.opacity = Math.random() * 0.3 + 0.7;

                setTimeout(() => {
                    asciiArt.style.transform = 'translate(0)';
                    asciiArt.style.opacity = 1;
                }, 50);
            }
        }, 100);
    }

    function stopGlitch() {
        if (glitchInterval) {
            clearInterval(glitchInterval);
            glitchInterval = null;
        }
    }

    // Start glitch effect on hover
    asciiArt.addEventListener('mouseenter', startGlitch);
    asciiArt.addEventListener('mouseleave', stopGlitch);

    // Initial glitch effect
    setTimeout(startGlitch, 3000);
    setTimeout(stopGlitch, 4000);
});