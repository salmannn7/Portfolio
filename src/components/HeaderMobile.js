import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../resources/logo.png';
import '../css/App.css';

function HeaderMobile() {
    const logoRef = useRef(null);
    const [activeSection, setActiveSection] = useState(null);
    const [sectionBoundaries, setSectionBoundaries] = useState([]);
    const [fadeTimeout, setFadeTimeout] = useState(null);

    useEffect(() => {

        const defineBoundaries = () => {
            const scrollTop = window.scrollY; // Get the current scroll position
            const sections = document.querySelectorAll('[data-section]');
            let newBoundaries = [];
            sections.forEach((section) => {
                const name = section.dataset.section;
                const boundariesTop = section.getBoundingClientRect().top + scrollTop;
                const boundariesBottom = section.getBoundingClientRect().bottom + scrollTop;
                newBoundaries.push({ name, boundariesTop, boundariesBottom });
            });

            if (JSON.stringify(newBoundaries) !== JSON.stringify(sectionBoundaries)) {
                setSectionBoundaries(newBoundaries);
            }
        }

        const handleScroll = () => {
            const scrollTop = window.scrollY; // Get the current scroll position
            const logoElement = logoRef.current;
            defineBoundaries();

            // Check if the footer is at or above the screen's top
            const footer = document.querySelector("footer");
            const footerTop = footer.getBoundingClientRect().top;

            // Handle fade-out logic
            if (footerTop <= window.innerHeight) {
                if (fadeTimeout) clearTimeout(fadeTimeout); // Clear existing timeout
                logoElement.classList.add("fade-out");
                logoElement.style.animationDelay = "0s";
                logoElement.classList.remove("go");

                // Fade-in after 10 seconds
                const timeout = setTimeout(() => {
                    logoElement.classList.remove("fade-out");
                    logoElement.classList.add("fade-in");
                }, 10000);
                setFadeTimeout(timeout);
            } else if (scrollTop === 0) {
                logoElement.classList.remove("go", "fade-out");
                if (fadeTimeout) clearTimeout(fadeTimeout); // Clear existing timeout
            } else if (scrollTop > 0) {
                logoElement.classList.add("go");
                logoElement.classList.remove("fade-out");
                if (fadeTimeout) clearTimeout(fadeTimeout); // Clear existing timeout
            }

            if (sectionBoundaries.length > 0) {
                if (sectionBoundaries.length > 0) {
                    const active = sectionBoundaries.find(
                        (section) => scrollTop >= section.boundariesTop && scrollTop < section.boundariesBottom
                    );

                    if (active) {
                        setActiveSection(active.name);
                    } else {
                        setActiveSection(null);
                    }
                }
            }
        };

        // Attach scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [sectionBoundaries]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToSection = (sectionName) => {
        const targetSection = document.querySelector(`[data-section="${sectionName}"]`);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <header className="h-24 w-full flex items-center justify-center fixed z-50 font-poppins font-light uppercase pointer-events-none">
            <img ref={logoRef} className="test-mobile fade-in pointer-events-auto" style={{ animationDelay: "2s" }} src={logo} alt="logo" onClick={scrollToTop} />
            <nav className="h-auto w-auto rounded-full overflow-hidden pointer-events-auto">
                <div className="h-auto w-auto flex text-white text-sm divide-x-2 divide-zinc-900">
                    <div onClick={() => scrollToSection("about")} className={`flex items-center justify-center w-full h-full py-2 px-3 cursor-pointer fade-in ${activeSection === "about" ? "nav-button-active" : "nav-button"}`} style={{ animationDelay: "0.2s" }}>
                        <p className="pointer-events-none">About</p>
                    </div>
                    <div onClick={() => scrollToSection("projects")} className={`flex items-center justify-center w-full h-full py-2 px-3 cursor-pointer fade-in ${activeSection === "projects" ? "nav-button-active" : "nav-button"}`} style={{ animationDelay: "0.4s" }}>
                        <p className="pointer-events-none">Projects</p>
                    </div>
                    <div onClick={() => scrollToSection("skills")} className={`flex items-center justify-center w-full h-full py-2 px-3 cursor-pointer fade-in ${activeSection === "skills" ? "nav-button-active" : "nav-button"}`} style={{ animationDelay: "0.6s" }}>
                        <p className="pointer-events-none">Skills</p>
                    </div>
                    <div onClick={() => scrollToSection("contact")} className={`flex items-center justify-center w-full h-full py-2 px-3 cursor-pointer fade-in ${activeSection === "contact" ? "nav-button-active" : "nav-button"}`} style={{ animationDelay: "0.8s" }}>
                        <p className="pointer-events-none">Contact</p>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default HeaderMobile;
