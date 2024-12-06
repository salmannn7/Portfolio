import React, { useEffect, useState, useRef } from "react";
import technicalSkills from "../resources/json/technical-skills.json";
import interpersonalSkills from "../resources/json/interpersonal-skills.json";

const SkillPopUp = ({ isOpen, onClose, positionX, positionY, id, typeSkill }) => {
    const buttonRef = useRef(null);
    const divRef = useRef(null);
    const sectionsRef = [useRef(null), useRef(null)];
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [link, setLink] = useState("");
    const [level, setLevel] = useState("");
    const [info, setInfo] = useState("");

    // Effect that handles opening and closing animations
    useEffect(() => {
        if (isOpen) {
            freezeScroll();
            // First remove the 'begin' class immediately to reset the animation
            if (buttonRef.current) {
                buttonRef.current.classList.remove("begin");
                divRef.current.classList.remove("active");
            }
            if (divRef.current) {
                divRef.current.style.top = "";
                divRef.current.style.bottom = "";
                divRef.current.style.left = "";
                divRef.current.style.right = "";
            }

            // Then add the 'begin' class with a small delay to trigger the animation
            const timeoutId = setTimeout(() => {
                if (buttonRef.current) {
                    dimensions();
                    buttonRef.current.classList.add("begin");
                    divRef.current.classList.add("active");
                }
            }, 50); // Slight delay to ensure transition triggers after render


            // Cleanup the timeout when the component is unmounted or `isOpen` changes
            return () => clearTimeout(timeoutId);
        } else {
            if (buttonRef.current) {
                buttonRef.current.classList.remove("begin");
                divRef.current.classList.remove("active");
            }
            if (divRef.current) {
                divRef.current.style.top = "";
                divRef.current.style.bottom = "";
                divRef.current.style.left = "";
                divRef.current.style.right = "";
            }
            unfreezeScroll();
        }
    }, [isOpen]); // Runs every time `isOpen` changes

    const freezeScroll = () => {
        document.documentElement.style.overflowY = 'hidden'; // Prevent scrolling
    };

    const unfreezeScroll = () => {
        document.documentElement.style.overflowY = 'scroll'; // Allow scrolling again
    };

    const dimensions = () => {
        const rect = buttonRef.current.getBoundingClientRect(); // Get the bounding rect of the button
        const T = rect.top;
        const B = rect.bottom;
        const L = rect.left;
        const R = rect.right;

        // Get the center of the screen
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;

        console.log("Dimensions: ", { T, B, L, R });

        if (T < screenCenterY) {
            divRef.current.style.top = `${T}px`;
            divRef.current.style.paddingTop = "2.5rem"
            divRef.current.style.paddingBottom = "1rem"
            if (R < screenCenterX) {
                divRef.current.style.left = `${L}px`;
            } else if (R > screenCenterX) {
                divRef.current.style.right = `${window.innerWidth - R}px`;
            }
        } else if (T > screenCenterY) {
            divRef.current.style.paddingTop = "1rem"
            divRef.current.style.paddingBottom = "2.5rem"
            divRef.current.style.bottom = `${window.innerHeight - B}px`;
            if (R < screenCenterX) {
                divRef.current.style.left = `${L}px`;
            } else if (R > screenCenterX) {
                divRef.current.style.right = `${window.innerWidth - R}px`;
            }
        } else {
            divRef.current.style.paddingTop = "2.5rem"
            divRef.current.style.paddingBottom = "1rem"
            divRef.current.style.top = `${T}px`;
            divRef.current.style.left = `${L}px`;
        }
    };

    // Effect to load name and type based on the skill id
    useEffect(() => {
        let obj;
        if (typeSkill === 0) {
            obj = technicalSkills.find((x) => x.id === id);
            if (obj) {
                setName(obj.name);
                setType(obj.type);
                setLink(obj.link);
            } else {
                console.log("No unit found with the given ID");
            }
        } else if (typeSkill === 1) {
            obj = interpersonalSkills.find((x) => x.id === id);
            if (obj) {
                setName(obj.name);
                if (obj.lvl === 2) {
                    setType("framework")
                } else if (obj.lvl === 1) {
                    setType("os")
                } else if (obj.lvl === 0) {
                    setType("environment")
                } else {
                    setType("methodology")
                }
                setLevel(obj.lvl);
                setInfo(obj.info);
            } else {
                console.log("No unit found with the given ID");
            }
        }
    }, [id]); // Update skill name/type whenever `id` changes

    if (!isOpen) return null; // Do not render popup if not open

    return (
        <div onClick={onClose} className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex">
            <div
                ref={buttonRef}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the popup
                className={`absolute w-fit h-fit text-nowrap cursor-pointer flex px-2 py-1 rounded-full aura skills z-20 ${type}`}
                style={{ top: `${positionY}px`, left: `${positionX}px` }} // Set dynamic position
            >
                <p className="pointer-events-none text-white">{name}</p>
            </div>
            <div
                ref={divRef}
                onClick={(e) => e.stopPropagation()}
                className={`absolute max-w-96 max-h-40 text-nowrap flex rounded-3xl bg-zinc-950 z-10 resize px-2`}
            >
                <div className="w-full h-full p-2 text-white capitalize text-lg overflow-hidden scroller">
                    <div ref={sectionsRef[0]} className={`w-full h-full ${typeSkill === 0 ? "block" : "hidden"} fade-in overflow-auto pr-2`}>
                        <p>Type: {type}</p>
                        <p>Documentation For More Information: </p>
                        <a className="text-blue-500" href={link} target="_blank" rel="noopener noreferrer">Click Here</a>
                    </div>
                    <div ref={sectionsRef[1]} className={`w-full h-full ${typeSkill === 1 ? "block" : "hidden"} fade-in overflow-auto pr-2`}>
                        <p>Information: </p>
                        <div className="w-full h-full text-wrap">
                            <p>{info}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillPopUp;
