import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import projects from "../resources/projects.json";

const ProjectPopUp = ({ isOpen, onClose, id }) => {
    // Initialize imageRefs as an array of refs
    const imageRefs = useRef([]);
    const sectionRefs = useRef(null);
    const wholeRef = useRef(null);
    const [widthPic, setWidthPic] = useState();
    const [obj, setObj] = useState(null);
    const [frameworks, setFrameworks] = useState(null);
    const [languages, setLanguages] = useState(null);
    const [environments, setEnvironments] = useState(null);

    // Apply fade-in effect when isOpen changes
    useEffect(() => {
        if (wholeRef.current) {
            if (isOpen) {
                // Apply fade-in animation to all children with class "fade-child-p"
                const fadeChildren = wholeRef.current.querySelectorAll('.fade-child-p');
                fadeChildren.forEach((child, index) => {
                    child.classList.add('fade-in');
                    child.style.animationDelay = `${index * 0.2}s`; // Stagger delay by 0.2s
                });
            } else {
                // Optional: reset the fade-in class when the popup is closed
                const fadeChildren = wholeRef.current.querySelectorAll('.fade-child-p');
                fadeChildren.forEach(child => {
                    child.classList.remove('fade-in');
                    child.style.animationDelay = ''; // Reset the delay
                });
            }
        }
    }, [isOpen]); // Run when isOpen changes

    const setProjects = () => {
        setObj(projects.find((x) => x.id === id));
        if (obj) {
            setFrameworks(obj.frameworks);
            setLanguages(obj.languages);
            setEnvironments(obj.environments);
        }
    }

    const carousel = () => {
        // Check if imageRefs.current is populated and contains at least one element
        if (imageRefs.current && imageRefs.current[0]) {
            const width = window.getComputedStyle(imageRefs.current[0]).width; // Get computed width
            setWidthPic(parseFloat(width));
            sectionRefs.current.style.transform = `translateX(${widthPic}px)`;
        } else {
            console.log("Image refs are not available yet.");
        }
    };

    useEffect(() => {
        carousel();
        setProjects();
    })

    // Use useLayoutEffect to ensure refs are assigned before executing any logic
    useLayoutEffect(() => {
        if (isOpen) {
            freezeScroll();
            // Call carousel once the refs are populated
        } else {
            unfreezeScroll();
        }

        return () => {
            unfreezeScroll(); // Cleanup when component unmounts
        };
    }, [isOpen]); // Dependency on isOpen to run when the component opens

    const freezeScroll = () => {
        document.documentElement.style.overflowY = 'hidden'; // Disable scrolling
    };

    const unfreezeScroll = () => {
        document.documentElement.style.overflowY = 'scroll'; // Re-enable scrolling
    };

    const arrows = (direction) => {
        // Add smooth transition class
        sectionRefs.current.classList.add("smooth-transition");

        const transformValue = sectionRefs.current.style.transform;
        const match = transformValue.match(/translateX\(([-\d.]+)px\)/);
        const currentX = match ? parseFloat(match[1]) : 0;

        if (direction === 0) {
            const newX = currentX + widthPic;
            if (newX > 0 + widthPic) {
                console.log("can't go further");
            } else {
                sectionRefs.current.style.transform = `translateX(${newX}px)`;
            }
        } else if (direction === 1) {
            const newX = currentX - widthPic;
            if (newX < 0 - widthPic) {
                console.log("can't go further");
            } else {
                sectionRefs.current.style.transform = `translateX(${newX}px)`;
            }
        }

        // Remove the transition class after the animation is complete (optional)
        setTimeout(() => {
            sectionRefs.current.classList.remove("smooth-transition");
        }, 500); // Match the duration in the CSS transition
    };



    if (!isOpen) return null; // Return null to not render the component if isOpen is false

    return (
        <div ref={wholeRef} className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="w-[80vw] h-[80vh] overflow-hidden bg-zinc-900 opacity-100 rounded-xl">
                <div className="w-full h-fit grid grid-cols-2">
                    <div className="w-full h-full flex justify-start items-center ml-2">
                        <p className="text-white text-xl ml-0">PROJECT OVERVIEW</p>
                    </div>
                    <div className="h-full w-full flex justify-end">
                        <button className="text-white m-2" onClick={onClose}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                </div>
                <div className="w-full h-96 px-2 overflow-hidden scroller">
                    <div className="w-full h-full rounded-b-xl overflow-y-auto overflow-hidden flex flex-col gap-2 text-white">
                        <div className="w-full h-64 relative flex justify-center">
                            <div className="absolute w-full h-56 z-50 grid grid-cols-3 pointer-events-none">
                                <div className="w-full h-full bg-gradient-to-r from-zinc-900 to-transparent flex items-center justify-start fade-child-p">
                                    <button onClick={() => arrows(0)} className="pointer-events-auto">
                                        <span className="text-8xl m-4">&lt;</span>
                                    </button>
                                </div>
                                <div></div>
                                <div className="w-full h-full bg-gradient-to-l from-zinc-900 to-transparent flex items-center justify-end fade-child-p">
                                    <button onClick={() => arrows(1)} className="pointer-events-auto">
                                        <span className="text-8xl m-4">&gt;</span>
                                    </button>
                                </div>
                            </div>
                            <div ref={sectionRefs} className="w-fit h-56 flex justify-center relative">
                                {obj ? (
                                    <>
                                        <img className="w-auto h-full mask-l fade-child-p" src={`/resources/project-images/${obj.tags}-3.png`} />
                                        <img ref={(el) => (imageRefs.current[0] = el)} className="w-auto h-full fade-child-p" src={`/resources/project-images/${obj.tags}-1.png`} />
                                        <img ref={(el) => (imageRefs.current[1] = el)} className="w-auto h-full fade-child-p" src={`/resources/project-images/${obj.tags}-2.png`} />
                                        <img ref={(el) => (imageRefs.current[2] = el)} className="w-auto h-full fade-child-p" src={`/resources/project-images/${obj.tags}-3.png`} />
                                        <img className="w-auto h-full mask-r fade-child-p" src={`/resources/project-images/${obj.tags}-1.png`} />
                                    </>
                                ) : (
                                    <p>Loading images...</p>
                                )}
                            </div>

                        </div>
                        <div className="w-full h-fit text-2xl bg-zinc-700 p-2 rounded-xl fade-child-p">
                            <p>{obj ? obj.name : 'Loading...'}</p>
                        </div>
                        <div className="w-full h-fit text-md bg-zinc-700 p-2 rounded-xl flex flex-col gap-1">
                            <div className="w-full h-fit flex">
                                <p className="pr-2 fade-child-p">Frameworks:</p>
                                <div className="flex gap-1">
                                    {frameworks ? (
                                        frameworks.map((framework, index) => (
                                            <div key={index} className="bg-gradient-to-r from-green-500 to-lime-500 px-2 py-0.5 text-sm rounded-full flex fade-child-p">
                                                <p>{framework.name}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Loading Frameworks...</p>
                                    )}
                                </div>
                            </div>
                            <div className="w-full h-fit flex">
                                <p className="pr-2 fade-child-p">Languages: </p>
                                <div className="flex gap-1">
                                    {languages ? (
                                        languages.map((language, index) => (
                                            <div key={index} className="bg-gradient-to-r from-blue-500 to-cyan-500 px-2 py-0.5 text-sm rounded-full flex fade-child-p">
                                                <p>{language.name}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Loading Languages...</p>
                                    )}
                                </div>
                            </div>
                            <div className="w-full h-fit flex">
                                <p className="pr-2 fade-child-p">Environments: </p>
                                <div className="flex gap-1">
                                    {environments ? (
                                        environments.map((environment, index) => (
                                            <div key={index} className="bg-gradient-to-r from-red-500 to-rose-500 px-2 py-0.5 text-sm rounded-full flex fade-child-p">
                                                <p>{environment.name}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Loading Environments...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-fit">
                            <div className="w-full h-fit text-2xl fade-child-p">
                                <p>DESCRIPTION</p>
                            </div>
                            <div className="w-full min-h-80 text-justify p-2">
                                <p className="text-yellow-100 fade-child-p" style={{ whiteSpace: 'pre-wrap' }}>{obj ? obj.note : 'Loading...'}</p>
                                <p className="fade-child-p" style={{ whiteSpace: 'pre-wrap' }}>{obj ? obj.desc : 'Loading...'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectPopUp;
