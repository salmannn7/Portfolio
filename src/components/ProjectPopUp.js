import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import uniProjects from "../resources/json/uni-projects.json";
import personalProjects from "../resources/json/personal-projects.json";

const ProjectPopUp = ({ isOpen, onClose, id, type }) => {
    // Initialize imageRefs as an array of refs
    const sectionRef = useRef(null);
    const wholeRef = useRef(null);
    const imgRefs = useRef([]);
    const [obj, setObj] = useState(null);
    const [frameworks, setFrameworks] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [environments, setEnvironments] = useState([]);
    const [links, setLinks] = useState([]);
    const [projects, setProjects] = useState([]);

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

    const projectsSetUp = () => {
        setObj(projects.find((x) => x.id === id));
        if (obj) {
            setFrameworks(obj.frameworks);
            setLanguages(obj.languages);
            setEnvironments(obj.environments);
            setLinks(obj.links);
        }
    }

    useEffect(() => {
        projectsSetUp();
    })

    // Use useLayoutEffect to ensure refs are assigned before executing any logic
    useLayoutEffect(() => {
        if (isOpen) {
            freezeScroll();
            if(type === 0) {
                setProjects(uniProjects);
            } else if(type === 1) {
                setProjects(personalProjects);
            }
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

    const handleArrows = (direction) => {
        const scrollAmount = 100; // Adjust scroll amount as needed
        if (sectionRef.current) {
            sectionRef.current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth',
            });
        }
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
                    <div className="w-full h-full pr-1 rounded-b-xl overflow-y-auto overflow-hidden flex flex-col gap-2 text-white">
                        <div className="w-full h-64 relative flex justify-center">
                            <div className="absolute w-full h-56 z-50 grid grid-cols-3 pointer-events-none">
                                <div className="w-full h-full bg-gradient-to-r from-zinc-900 to-transparent flex items-center justify-start fade-child-p">
                                    <button onClick={() => handleArrows('left')} className="pointer-events-auto">
                                        <span className="text-8xl m-4">&lt;</span>
                                    </button>
                                </div>
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="w-2 h-full bg-white opacity-0"></div>
                                </div>
                                <div className="w-full h-full bg-gradient-to-l from-zinc-900 to-transparent flex items-center justify-end fade-child-p">
                                    <button onClick={() => handleArrows('right')} className="pointer-events-auto">
                                        <span className="text-8xl m-4">&gt;</span>
                                    </button>
                                </div>
                            </div>
                            {obj ? (
                                <div ref={sectionRef} className="w-fit h-56 bg-black flex overflow-x-auto snap-mandatory snap-x carousel gap-1">
                                    <img className="w-auto h-full fade-child-p mask-l" src={`Portfolio/resources/project-images/${obj.tags}-3.png`} />
                                    {["1", "2", "3"].map((suffix, index) => (
                                        <img
                                            ref={(el) => (imgRefs.current[index] = el)}
                                            key={index}
                                            className="w-auto h-full fade-child-p snap-center"
                                            src={`Portfolio/resources/project-images/${obj.tags}-${suffix}.png`}
                                        />
                                    ))}
                                    <img className="w-auto h-full fade-child-p mask-r" src={`Portfolio/resources/project-images/${obj.tags}-1.png`} />
                                </div>
                            ) : (
                                <p>Loading images...</p>
                            )}

                        </div>
                        <div className="w-full h-fit text-2xl bg-zinc-950 p-2 rounded-xl fade-child-p">
                            <p>{obj ? obj.name : 'Loading...'}</p>
                        </div>
                        <div className="w-full h-fit text-md bg-zinc-950 p-2 rounded-xl flex flex-col gap-1 fade-child-p">
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
                        <div className="fade-child-p">
                            {obj ? (
                                <div className="w-full min-h-24">
                                    <div className="w-full h-fit text-2xl fade-child-p">
                                        <p>LINKS</p>
                                    </div>
                                    {links.map((link, index) => (
                                        <div key={index} className="w-full h-24 bg-zinc-950 rounded-xl mb-2 flex items-center p-2 fade-child-p">
                                            <div className="mr-2">
                                                {link.site === "GitHub" ? (
                                                    <span className="material-symbols-outlined" style={{ fontSize: `64px` }}>code</span>
                                                ) : link.site === "Hosted" ? (
                                                    <span className="material-symbols-outlined" style={{ fontSize: `64px` }}>preview</span>
                                                ) : (
                                                    <span className="material-symbols-outlined" style={{ fontSize: `64px` }}>link</span>  // Default icon for unknown types
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-2xl">{link.type} - {link.site}</p>
                                                <p>Link: {link.link ===  "N/A" ? ( <span className="text-zinc-500">{link.link}</span> ):( <a className="text-blue-500" href={link.link} target="_blank" rel="noopener noreferrer">{link.link}</a> )}</p>
                                            </div>
                                            <div className="w-fit h-full ml-auto uppercase flex flex-col justify-center text-center">
                                                <p>STATUS:</p>
                                                <p
                                                    className={`text-xl 
                                                ${link.status === "available" ? "text-green-500" : link.status === "unavailable" ? "text-red-500" : "text-zinc-500"}`}
                                                >
                                                    {link.status}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Loading links...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectPopUp;
