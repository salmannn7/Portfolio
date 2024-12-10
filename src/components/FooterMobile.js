import { useEffect, useCallback, useRef } from "react";
import reactLogo from "../resources/react-logo.svg";
import "../css/App.css";

function FooterMobile() {
    const sectionsRefs = useRef(null)

    useEffect(() => {
        const canvas = document.getElementById("backgroundCanvas");
        const ctx = canvas.getContext("2d");
        let particlesArray = [];

        // Adjust canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const numberOfParticles = 250;

        // Particle class
        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
                this.alpha = Math.random() * 0.5 + 0.3;  // Initial random opacity
            }

            // Draw each particle
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = this.size * 2;  // Add blur effect to the edges
                ctx.shadowColor = this.color;  // Set color for the blur shadow
                ctx.globalAlpha = this.alpha;  // Set the opacity
                ctx.fill();
            }

            // Update particle position and opacity for fade-in/out effect
            update() {
                if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                    this.directionY = -this.directionY;
                }

                this.x += this.directionX;
                this.y += this.directionY;

                // Randomize opacity to create fade-in/out effect
                this.alpha += Math.random() * 0.1 - 0.05;  // Random small change in alpha
                if (this.alpha <= 0) this.alpha = 0.3;  // Min opacity
                if (this.alpha >= 1) this.alpha = 1;    // Max opacity

                this.draw();
            }
        }

        // Initialize particles
        function init() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                const size = Math.random() * 3 + 1;
                const x = Math.random() * (canvas.width - size * 2) + size;
                const y = Math.random() * (canvas.height - size * 2) + size;
                const directionX = Math.random() * 0.5 - 0.25;
                const directionY = Math.random() * 0.5 - 0.25;
                let colour;
                if (i % 50 === 0) {
                    colour = `rgba(140, 213, 61, 0.7)`; // Green particles
                } else {
                    colour = `rgba(150, 150, 150, 0.5)`; // Grey particles
                }
                particlesArray.push(new Particle(x, y, directionX, directionY, size, colour));
            }
        }

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.forEach((particle) => particle.update());
            requestAnimationFrame(animate);
        }

        // Handle resize
        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });

        init();
        animate();

        return () => window.removeEventListener("resize", null);
    }, []);

    const handleScroll = useCallback(() => {
        const section = sectionsRefs.current; // Corrected reference here
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                // Apply fade-in with delay to each child
                const children = section.querySelectorAll('.fade-child');
                children.forEach((child, childIndex) => {
                    child.classList.add('fade-in');
                });
            }
        }
    }, []);

    useEffect(() => {
        // Add scroll event listener when the component is mounted
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <footer ref={sectionsRefs} className="w-full h-screen snap-start bg-zinc-950 py-24 relative overflow-hidden font-poppins">
            <canvas id="backgroundCanvas" className="absolute top-0 left-0 fade-child"></canvas>
            <div className="absolute w-full h-screen top-0 left-0 text-3xl flex flex-col items-center justify-center">
                <div className="w-full h-full flex flex-col items-center justify-center px-24">
                    <p className="fade-child my-8 text-5xl font-bold text-center" style={{ animationDelay: `1s` }}>THANK YOU FOR VIEWING MY PORTFOLIO</p>
                    <div className="fade-child w-full h-fit flex flex-col items-center justify-evenly">
                        <p className="fade-child font-semibold text-nowrap" style={{ animationDelay: `3s` }}>CREATED USING:</p>
                        <div className="flex fade-child" style={{ animationDelay: `4s` }}>
                            <img className="w-12 h-auto" src={reactLogo} alt="React logo" />
                            <p>REACT</p>
                        </div>
                    </div>
                    <div className="fade-child w-full h-full flex flex-col items-center justify-evenly">
                        <p className="fade-child font-semibold text-nowrap" style={{ animationDelay: `6s` }}>CREATED BY:</p>
                        <p className="fade-child" style={{ animationDelay: `7s` }}>Salman Talib</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterMobile;
