import React, { useEffect, useState, useRef, useCallback } from 'react';
import aviPro from '../resources/avi-professional.jpg';
import mmuLogo from '../resources/mmu-logo.png';
import osfcLogo from '../resources/osfc-logo.png';
import trsLogo from '../resources/trs-logo.png';
import cvImage from "../resources/salman-talib-cv.png";
import myCV from "../resources/downloadable-files/Salman_Talib_Software_Engineer.pdf"
import uniResults from "../resources/json/uni-results.json";
import collegeResults from "../resources/json/college-results.json";
import secondaryResults from "../resources/json/secondary-results.json";
import uniProjects from "../resources/json/uni-projects.json";
import personalProjects from "../resources/json/personal-projects.json";
import technicalSkills from "../resources/json/technical-skills.json";
import interpersonalSkills from "../resources/json/interpersonal-skills.json"
import UnitPopUp from "./UnitPopUp";
import ProjectPopUp from "./ProjectPopUp";
import SkillPopUp from "./SkillPopUp"
import '../css/App.css';

function Home() {
    const sectionsRefs = useRef([]);
    const tSkillRefs = useRef([]);
    const iSkillRefs = useRef([]);
    const aboutRef = useRef([]);
    const aboutSectionRef = useRef(null);
    // About
    const [centered, setCentered] = useState(false);
    // Education
    const [isLevel6Visible, setIsLevel6Visible] = useState(false);
    const [isCollegeVisible, setIsCollegeVisible] = useState(false);
    const [isSecondaryVisible, setIsSecondaryVisible] = useState(false);
    // Animation
    const [isAnimating, setIsAnimating] = useState(false);
    const [isAnimatingCollege, setIsAnimatingCollege] = useState(false);
    const [isAnimatingSecondary, setIsAnimatingSecondary] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    // Units
    const [isUnitPopupOpen, setisUnitPopupOpen] = useState(false);
    const [UnitPopUpId, setUnitPopUpId] = useState(0);
    const [UnitPopUpType, setUnitPopUpType] = useState(0);
    // Projects
    const [isProjectPopupOpen, setisProjectPopupOpen] = useState(false);
    const [ProjectPopUpId, setProjectPopUpId] = useState(0);
    const [ProjectPopUpType, setProjectPopUpType] = useState(0);
    const [check, setCheck] = useState("Portfolio/");
    // Skills
    const [advancedSkills, setAdvancedSkills] = useState([]);
    const [intermediateSkills, setIntermediateSkills] = useState([]);
    const [foundationalSkills, setFoundationalSkills] = useState([]);
    const [strongSkills, setStrongSkills] = useState([]);
    const [moderateSkills, setModerateSkills] = useState([]);
    const [growthSkills, setGrowthSkills] = useState([]);
    const [skillPopUpId, setSkillPopUpId] = useState(0);
    const [skillPopUpType, setSkillPopUpType] = useState(0);
    const [skillPopUpPositionX, setSkillPopUpPositionX] = useState(0);
    const [skillPopUpPositionY, setSkillPopUpPositionY] = useState(0);
    const [isSkillPopupOpen, setisSkillPopupOpen] = useState(false);

    // Define toggleUnitPopup outside useEffect
    const toggleUnitPopup = (id, type) => {
        setUnitPopUpId(id);
        setUnitPopUpType(type);
        setisUnitPopupOpen((prevState) => !prevState); // Properly toggle popup state
    };

    const toggleProjectPopup = (id, type) => {
        setProjectPopUpId(id);
        setProjectPopUpType(type);
        setisProjectPopupOpen((prevState) => !prevState); // Properly toggle popup state
    };

    const toggleSkillPopup = (id, type) => {
        setSkillPopUpId(id);
        setSkillPopUpType(type);
        setisSkillPopupOpen((prevState) => !prevState); // Properly toggle popup state
        if (isSkillPopupOpen === false) {
            let positionX;
            let positionY;
            if (type === 0) {
                positionX = tSkillRefs.current[id].getBoundingClientRect().left;
                positionY = tSkillRefs.current[id].getBoundingClientRect().top;
            } else if (type === 1) {
                positionX = iSkillRefs.current[id].getBoundingClientRect().left;
                positionY = iSkillRefs.current[id].getBoundingClientRect().top;
            }
            console.log(positionX + " " + positionY);
            setSkillPopUpPositionX(positionX);
            setSkillPopUpPositionY(positionY);
        } else {
            console.log("none");
        }
    };

    const handleScroll = useCallback(() => {
        sectionsRefs.current.forEach((ref) => {
            const section = ref;
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {

                    // Apply fade-in with delay to each child
                    const children = section.querySelectorAll('.fade-child');
                    children.forEach((child, childIndex) => {
                        child.classList.add('fade-in');
                        child.style.animationDelay = `${childIndex * 0.1}s`; // Stagger delay by 0.1s
                    });
                }
            }
        });
    }, []);

    window.addEventListener('scroll', handleScroll);

    const toggleLevel6Visibility = () => {
        if (!isAnimating) {
            if (!hasAnimated) setHasAnimated(true);
            setIsAnimating(true);
            setIsLevel6Visible((prev) => !prev);
        }
    };

    const toggleCollegeVisibility = () => {
        if (!isAnimatingCollege) {
            if (!hasAnimated) setHasAnimated(true);
            setIsAnimatingCollege(true);
            setIsCollegeVisible((prev) => !prev);
        }
    };

    const toggleSecondaryVisibility = () => {
        if (!isAnimatingCollege) {
            if (!hasAnimated) setHasAnimated(true);
            setIsAnimatingSecondary(true);
            setIsSecondaryVisible((prev) => !prev);
        }
    };

    const handleAnimationEnd = () => {
        setIsAnimating(false);
    };

    const handleAnimationEndCollege = () => {
        setIsAnimatingCollege(false);
    };

    const handleAnimationEndSecondary = () => {
        setIsAnimatingSecondary(false);
    };

    useEffect(() => {
        setAdvancedSkills(technicalSkills.filter(x => x.exp === 2));
        setIntermediateSkills(technicalSkills.filter(x => x.exp === 1));
        setFoundationalSkills(technicalSkills.filter(x => x.exp === 0));
        setStrongSkills(interpersonalSkills.filter(x => x.lvl === 2));
        setModerateSkills(interpersonalSkills.filter(x => x.lvl === 1));
        setGrowthSkills(interpersonalSkills.filter(x => x.lvl === 0));
    }, [])

    const handleEmailClick = () => {
        // Construct the mailto link
        const subject = encodeURIComponent("");
        const body = encodeURIComponent("Hi Salman, ");
        const mailtoLink = `mailto:salmantalib@outlook.com?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
    };

    const handlePhoneClick = () => {
        const telLink = `tel:+447393690181`;
        window.location.href = telLink;
    };

    const toggleCentered = () => {
        const newCentered = !centered; // Compute the new centered state
        setCentered(newCentered); // Update the state

        if (aboutRef.current) {
            for (let x = 0; x < aboutRef.current.length; x++) {
                const aboutElement = aboutRef.current[x];

                if (newCentered) {
                    // Center the elements
                    const height = aboutSectionRef.current.offsetHeight;
                    const aboutHeight = aboutElement.offsetHeight;
                    const margin = height - aboutHeight;
                    aboutElement.style.marginTop = `${margin / 2}px`;
                    aboutElement.style.marginBottom = `${margin / 2}px`;
                } else {
                    // Reset to default margins
                    if (x === 0 || x === 2) {
                        aboutElement.style.marginTop = `auto`;
                        aboutElement.style.marginBottom = `0`;
                    } else {
                        aboutElement.style.marginTop = `0`;
                        aboutElement.style.marginBottom = `auto`;
                    }
                }

                // Toggle the class
                aboutElement.classList.toggle("centered");
            }
        }
    };

    useEffect(() => {
        // Check if the background image exists
        const img = new Image();
        img.src = `Portfolio/resources/project-images/tba-1.png`;
        img.onerror = () => {
            setCheck("")
        };
    }, []);

    return (
        <div className="w-full font-poppins font-light">
            <div className="w-full min-h-screen h-screen grid grid-rows-3 text-7xl py-32 text-white snap-start">
                <div className="w-full h-auto flex justify-start pl-[25%] text-nowrap">
                    <p className="">
                        <span className="highlighted-text-1 fade-in" style={{ animationDelay: '1s' }}>Welcome</span> <span className="fade-in" style={{ animationDelay: '0.2s' }}>to</span>
                    </p>
                </div>
                <div className="w-full h-auto flex justify-end pr-[25%] text-nowrap">
                    <p>
                        <span className="fade-in" style={{ animationDelay: '0.2s' }}>the</span> <span className="highlighted-text-2 fade-in" style={{ animationDelay: '1.2s' }}>Portfolio</span> <span className="fade-in" style={{ animationDelay: '0.2s' }}>of</span>
                    </p>
                </div>
                <div className="w-full h-auto flex justify-center text-nowrap">
                    <p className="highlighted-text-3 fade-in" style={{ animationDelay: '1.4s' }}>Salman Talib</p>
                </div>
            </div>
            <div data-section="about" className="w-full min-h-screen">
                <div ref={(el) => (sectionsRefs.current[1] = el)} className="w-full h-screen flex flex-col items-center justify-center text-white text-8xl snap-start">
                    <p className="p-16 font-medium fade-child">ABOUT</p>
                    <div className="text-xl flex flex-col items-center bopping">
                        <p>Scroll Down</p>
                        <span className="material-symbols-outlined">arrow_downward</span>
                    </div>
                </div>
                <div className="w-full min-h-screen">
                    <div ref={(el) => (sectionsRefs.current[2] = el)} className="w-full h-screen max-h-screen pt-24 snap-start">
                        <div className="w-full h-12 text-5xl text-white font-medium flex items-center pl-4 fade-child">
                            <p>ABOUT ME</p>
                        </div>
                        <div className="w-full h-[calc(100vh-12rem)] flex p-4">

                            <div ref={aboutSectionRef} className="h-full w-full flex justify-center text-white text-justify fade-child about-div relative">
                                <div ref={(el) => (aboutRef.current[0] = el)} className="min-w-1/4 max-w-72 w-1/4 overflow-hidden rounded-xl aspect-square bg-zinc-950 text-sm p-2 flex items-center z-50 about-box relative fade-child">
                                    <img className="h-full w-auto rounded-xl fade-child" src={aviPro} alt="graduation picture" />
                                </div>
                                <div ref={(el) => (aboutRef.current[1] = el)} className="min-w-1/4 max-w-72 max-h-72 w-1/4 rounded-xl aspect-square bg-zinc-950 text-sm p-2 flex items-center z-40 about-box relative fade-child">
                                    <p className="fade-child">Hi, I'm Salman, a recent Software Engineering graduate actively seeking a role in my field, open to junior-level opportunities. I have a strong foundation in Full Stack Development, Cloud Computing, and Software Testing. I'm also proficient in frameworks and platforms like Vue.js, React.js, and AWS, as well as programming languages including Java, Python, JavaScript, HTML, and CSS, among others.</p>
                                </div>
                                <div ref={(el) => (aboutRef.current[2] = el)} className="min-w-1/4 max-w-72 max-h-72 w-1/4 rounded-xl aspect-square bg-zinc-950 text-sm p-2 flex items-center z-30 about-box relative fade-child">
                                    <p className="fade-child">I have always been passionate about technology, particularly in software. From a young age, I was captivated by tech, which led me to shape my career path accordingly. I chose Computer Science as one of my GCSE options, followed by BTEC Information Technology at Oldham Sixth Form College, and recently pursued a BSc in Software Engineering at Manchester Metropolitan University.</p>
                                </div>
                                <div ref={(el) => (aboutRef.current[3] = el)} className="min-w-1/4 max-w-72 max-h-72 w-1/4 rounded-xl aspect-square bg-zinc-950 text-sm p-2 flex items-center z-20 about-box relative fade-child">
                                    <p className="fade-child">I am based in Oldham, just outside of Manchester, and am actively seeking a role within the Greater Manchester area, or alternatively, a fully remote opportunity. Given my limited professional experience in this field, I am particularly interested in graduate or junior positions that offer the opportunity kickstart my career and also to develop and grow.</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-12 flex items-center justify-center p-2">
                            <p className="text-white text-xl mr-1">READABILITY: </p>
                            <div className={`cursor-pointer rounded-full h-full w-14 p-1 transition-all ${centered ? "border-4 bg-white border-zinc-950" : "border-4 bg-zinc-950"}`} onClick={toggleCentered}>
                                <div className={`rounded-full h-full aspect-square transition-all ${centered ? "bg-zinc-950 ml-auto" : "bg-white mr-auto"}`}></div>
                            </div>
                        </div>
                    </div>
                    <div ref={(el) => (sectionsRefs.current[3] = el)} className="w-full min-h-screen pt-24 snap-start">
                        <div className="w-full h-12 text-5xl text-white font-medium flex items-center pl-4 fade-child">
                            <p>EDUCATION</p>
                        </div>
                        <div className="w-full flex flex-col gap-4 p-4">
                            <div>
                                <div className={`w-full h-32 bg-zinc-950 text-white grid grid-cols-2 items-center fade-child ${hasAnimated ? 'fade-in' : ''} ${isLevel6Visible ? "rounded-t-xl" : "rounded-xl"}`}>
                                    <div className="w-full h-32 flex">
                                        <img src={mmuLogo} className="h-full w-auto p-4 fade-child" />
                                        <div className="flex flex-col justify-center">
                                            <p className="fade-child">Manchester Metropolitan University</p>
                                            <p className="fade-child">2021-2024</p>
                                            <p className="fade-child">BSc Software Engineering</p>
                                        </div>
                                    </div>
                                    <div className="h-fit w-fit flex items-center justify-self-end p-4 gap-1 cursor-pointer" onClick={toggleLevel6Visibility}>
                                        <p className="pointer-events-none fade-child">Click to see {isLevel6Visible ? "more" : "less"}</p>
                                        <span className="material-symbols-outlined pointer-events-none fade-child">
                                            {isLevel6Visible ? 'expand_circle_up' : 'expand_circle_down'}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className={`w-full h-fit bg-zinc-950 rounded-b-xl p-4 ${isLevel6Visible ? 'down' : 'up'
                                        }`}
                                    style={{
                                        display: isLevel6Visible || isAnimating ? 'block' : 'none',
                                        visibility: isLevel6Visible ? 'visible' : 'hidden',
                                    }}
                                    onAnimationEnd={handleAnimationEnd}
                                >
                                    <p className="text-white text-2xl pb-4">Level 6 (3rd Year) Results</p>
                                    <div className="w-full h-full flex flex-wrap gap-2 place-content-start justify-center">
                                        {uniResults.map((units) => (
                                            <div onClick={() => toggleUnitPopup(units.id, 0)} key={units.id} className="w-fit h-fit bg-white p-2 rounded-full edu-button cursor-pointer">
                                                <p className="pointer-events-none">{units.unit}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full h-fit py-4 text-white text-2xl flex items-center justify-center gap-4">
                                        <p>Average Mark: 72.63</p>
                                        <p>
                                            Award: <span className="text-yellow-600">First Class Honours</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={`w-full h-32 bg-zinc-950 text-white grid grid-cols-2 items-center fade-child ${hasAnimated ? 'fade-in' : ''} ${isCollegeVisible ? "rounded-t-xl" : "rounded-xl"}`}>
                                    <div className="w-full h-32 flex">
                                        <img src={osfcLogo} className="h-full w-auto p-4 fade-child" />
                                        <div className="flex flex-col justify-center">
                                            <p className="fade-child">Oldham Sixth Form College</p>
                                            <p className="fade-child">2019-2021</p>
                                            <p className="fade-child">BTEC Information Technology</p>
                                        </div>
                                    </div>
                                    <div className="h-fit w-fit flex items-center justify-self-end p-4 gap-1 cursor-pointer" onClick={toggleCollegeVisibility}>
                                        <p className="pointer-events-none fade-child">Click to see {isCollegeVisible ? "more" : "less"}</p>
                                        <span className="material-symbols-outlined pointer-events-none fade-child">
                                            {isLevel6Visible ? 'expand_circle_up' : 'expand_circle_down'}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className={`w-full h-fit bg-zinc-950 rounded-b-xl p-4 ${isCollegeVisible ? 'down' : 'up'
                                        }`}
                                    style={{
                                        display: isCollegeVisible || isAnimatingCollege ? 'block' : 'none',
                                        visibility: isCollegeVisible ? 'visible' : 'hidden',
                                    }}
                                    onAnimationEnd={handleAnimationEndCollege}
                                >
                                    <p className="text-white text-2xl pb-4">College Results</p>
                                    <div className="w-full h-full flex flex-wrap gap-2 place-content-start justify-center">
                                        {collegeResults.map((units) => (
                                            <div onClick={() => toggleUnitPopup(units.id, 1)} key={units.id} className="w-fit h-fit bg-white p-2 rounded-full edu-button cursor-pointer">
                                                <p className="pointer-events-none">{units.unit}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full h-fit py-4 text-white text-2xl flex items-center justify-center gap-4">
                                        <p>
                                            Grade: <span className="text-yellow-600">Distinction*; Distinction*; Distinction*;</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={`w-full h-32 bg-zinc-950 text-white grid grid-cols-2 items-center fade-child ${hasAnimated ? 'fade-in' : ''} ${isSecondaryVisible ? "rounded-t-xl" : "rounded-xl"}`}>
                                    <div className="w-full h-32 flex">
                                        <img src={trsLogo} className="h-full w-auto p-4 fade-child" />
                                        <div className="flex flex-col justify-center">
                                            <p className="fade-child">The Radclyffe School</p>
                                            <p className="fade-child">2014-2019</p>
                                            <p className="fade-child">GSCE (Various)</p>
                                        </div>
                                    </div>
                                    <div className="h-fit w-fit flex items-center justify-self-end p-4 gap-1 cursor-pointer" onClick={toggleSecondaryVisibility}>
                                        <p className="pointer-events-none fade-child">Click to see {isSecondaryVisible ? "more" : "less"}</p>
                                        <span className="material-symbols-outlined pointer-events-none fade-child">
                                            {isSecondaryVisible ? 'expand_circle_up' : 'expand_circle_down'}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className={`w-full h-fit bg-zinc-950 rounded-b-xl p-4 ${isSecondaryVisible ? 'down' : 'up'
                                        }`}
                                    style={{
                                        display: isSecondaryVisible || isAnimatingSecondary ? 'block' : 'none',
                                        visibility: isSecondaryVisible ? 'visible' : 'hidden',
                                    }}
                                    onAnimationEnd={handleAnimationEndSecondary}
                                >
                                    <p className="text-white text-2xl pb-4">GCSE Subjects</p>
                                    <div className="w-full h-full flex flex-wrap gap-2 place-content-start justify-center">
                                        {secondaryResults.map((subjects) => (
                                            <div onClick={() => toggleUnitPopup(subjects.id, 2)} key={subjects.id} className="w-fit h-fit bg-white p-2 rounded-full edu-button cursor-pointer">
                                                <p className="pointer-events-none">{subjects.subject}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="w-full h-fit py-4 text-white text-2xl flex items-center justify-center gap-4">
                                        <p>
                                            Passed: <span className="text-yellow-600">7/8</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div data-section="projects" className="w-full min-h-screen">
                <div ref={(el) => (sectionsRefs.current[4] = el)} className="w-full h-screen flex flex-col items-center justify-center text-white text-8xl snap-start">
                    <p className="p-16 font-medium fade-child">PROJECTS</p>
                    <div className="text-xl flex flex-col items-center bopping">
                        <p>Scroll Down</p>
                        <span className="material-symbols-outlined">arrow_downward</span>
                    </div>
                </div>
                <div className="w-full min-h-screen">
                    <div ref={(el) => (sectionsRefs.current[5] = el)} className="w-full min-h-screen pt-24 snap-start">
                        <div className="w-full h-12 text-5xl text-white font-medium flex items-center pl-4 fade-child">
                            <p>UNIVERSITY PROJECTS</p>
                        </div>
                        <div className="w-full h-full grid grid-cols-2 gap-4 p-4">
                            {uniProjects.map((project) => (
                                <div key={project.id} className="w-full h-64 rounded-xl bg-zinc-700 relative overflow-hidden cursor-pointer zoom-in fade-child">
                                    <div className="absolute top-0 left-0 right-0 bottom-0 z-0 bg-cover bg-bottom image" style={{ backgroundImage: `url('${check}resources/project-images/${project.tags}-1.png')` }}></div>
                                    <div onClick={() => toggleProjectPopup(project.id, 0)} className="w-full h-full proj-overlay relative flex items-center z-10">
                                        <div className="bg-white w-full text-2xl text-white text-center flex items-center justify-center centre-animation">
                                            <p className="child-centre fade-child">{project.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div ref={(el) => (sectionsRefs.current[6] = el)} className="w-full min-h-screen pt-24 snap-start">
                        <div className="w-full h-12 text-5xl text-white font-medium flex items-center pl-4 fade-child">
                            <p>PERSONAL PROJECTS</p>
                        </div>
                        <div className="w-full h-full grid grid-cols-2 gap-4 p-4">
                            {personalProjects.map((project) => (
                                <div key={project.id} className="w-full h-64 rounded-xl bg-zinc-700 relative overflow-hidden cursor-pointer zoom-in fade-child">
                                    <div className="absolute top-0 left-0 right-0 bottom-0 z-0 bg-cover bg-bottom image" style={{ backgroundImage: `url('${check}resources/project-images/${project.tags}-1.png')` }}></div>
                                    <div onClick={() => toggleProjectPopup(project.id, 1)} className="w-full h-full proj-overlay relative flex items-center z-10">
                                        <div className="bg-white w-full text-2xl text-white text-center flex items-center justify-center centre-animation">
                                            <p className="child-centre fade-child">{project.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div data-section="skills" className="w-full min-h-screen">
                <div ref={(el) => (sectionsRefs.current[7] = el)} className="w-full h-screen flex flex-col items-center justify-center text-white text-8xl snap-start">
                    <p className="p-16 font-medium fade-child">SKILLS</p>
                    <div className="text-xl flex flex-col items-center bopping">
                        <p>Scroll Down</p>
                        <span className="material-symbols-outlined">arrow_downward</span>
                    </div>
                </div>
                <div className="w-full min-h-screen">
                    <div ref={(el) => (sectionsRefs.current[8] = el)} className="w-full min-h-screen pt-24 snap-start">
                        <div className="w-full h-12 text-5xl text-white font-medium flex items-center pl-4 fade-child">
                            <p>TECHNICAL SKILLS</p>
                        </div>
                        <div className="w-full h-[calc(100vh-9rem)] grid grid-rows-3 gap-4 p-4 text-white">
                            <div className="w-full h-full bg-zinc-950 rounded-xl p-2 flex flex-col fade-child">
                                <div className="w-full h-8 fade-child">
                                    <p className="text-2xl">ADVANCED</p>
                                </div>
                                <div className="w-full h-full flex gap-1 items-center flex-wrap">
                                    {advancedSkills.map((advSkill) => (
                                        <div ref={(el) => (tSkillRefs.current[advSkill.id] = el)} key={advSkill.id} onClick={() => toggleSkillPopup(advSkill.id, 0)} className={`w-fit h-fit text-nowrap cursor-pointer flex px-2 py-1 rounded-full skill-button skills ${advSkill.type} fade-child`}>
                                            <p className="pointer-events-none flex">{advSkill.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full h-full bg-zinc-950 rounded-xl p-2 flex flex-col fade-child">
                                <div className="w-full h-8">
                                    <p className="text-2xl">INTERMEDIATE</p>
                                </div>
                                <div className="w-full h-full flex gap-1 items-center flex-wrap">
                                    {intermediateSkills.map((intSkill) => (
                                        <div ref={(el) => (tSkillRefs.current[intSkill.id] = el)} key={intSkill.id} onClick={() => toggleSkillPopup(intSkill.id, 0)} className={`w-fit h-fit text-nowrap cursor-pointer flex px-2 py-1 rounded-full skill-button skills ${intSkill.type} fade-child`}>
                                            <p className="pointer-events-none flex">{intSkill.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full h-full bg-zinc-950 rounded-xl p-2 flex flex-col fade-child">
                                <div className="w-full h-8">
                                    <p className="text-2xl">FOUNDATIONAL</p>
                                </div>
                                <div className="w-full h-full flex gap-1 items-center flex-wrap">
                                    {foundationalSkills.map((foundSkill) => (
                                        <div ref={(el) => (tSkillRefs.current[foundSkill.id] = el)} key={foundSkill.id} onClick={() => toggleSkillPopup(foundSkill.id, 0)} className={`w-fit h-fit text-nowrap cursor-pointer flex px-2 py-1 rounded-full skill-button skills ${foundSkill.type} fade-child`}>
                                            <p className="pointer-events-none flex">{foundSkill.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={(el) => (sectionsRefs.current[9] = el)} className="w-full min-h-screen pt-24 snap-start">
                        <div className="w-full h-12 text-5xl text-white font-medium flex items-center pl-4 fade-child">
                            <p>INTERPERSONAL SKILLS</p>
                        </div>
                        <div className="w-full h-[calc(100vh-9rem)] grid grid-rows-3 gap-4 p-4 text-white">
                            <div className="w-full h-full bg-zinc-950 rounded-xl p-2 flex flex-col fade-child">
                                <div className="w-full h-8 fade-child">
                                    <p className="text-2xl">STRONGLY CAPABLE</p>
                                </div>
                                <div className="w-full h-full flex gap-1 items-center flex-wrap">
                                    {strongSkills.map((strongSkill) => (
                                        <div ref={(el) => (iSkillRefs.current[strongSkill.id] = el)} key={strongSkill.id} onClick={() => toggleSkillPopup(strongSkill.id, 1)} className={`w-fit h-fit text-nowrap cursor-pointer flex px-2 py-1 rounded-full skill-button skills framework fade-child`}>
                                            <p className="pointer-events-none flex">{strongSkill.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full h-full bg-zinc-950 rounded-xl p-2 flex flex-col fade-child">
                                <div className="w-full h-8 fade-child">
                                    <p className="text-2xl">MODERATELY PROFICIENT</p>
                                </div>
                                <div className="w-full h-full flex gap-1 items-center flex-wrap">
                                    {moderateSkills.map((modSkill) => (
                                        <div ref={(el) => (iSkillRefs.current[modSkill.id] = el)} key={modSkill.id} onClick={() => toggleSkillPopup(modSkill.id, 1)} className={`w-fit h-fit text-nowrap cursor-pointer flex px-2 py-1 rounded-full skill-button skills os fade-child`}>
                                            <p className="pointer-events-none flex">{modSkill.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full h-full bg-zinc-950 rounded-xl p-2 flex flex-col fade-child">
                                <div className="w-full h-8 fade-child">
                                    <p className="text-2xl">ROOM FOR GROWTH</p>
                                </div>
                                <div className="w-full h-full flex gap-1 items-center flex-wrap">
                                    {growthSkills.map((growSkill) => (
                                        <div ref={(el) => (iSkillRefs.current[growSkill.id] = el)} key={growSkill.id} onClick={() => toggleSkillPopup(growSkill.id, 1)} className={`w-fit h-fit text-nowrap cursor-pointer flex px-2 py-1 rounded-full skill-button skills environment fade-child`}>
                                            <p className="pointer-events-none flex">{growSkill.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div data-section="contact" className="w-full min-h-screen">
                <div ref={(el) => (sectionsRefs.current[10] = el)} className="w-full h-screen flex flex-col items-center justify-center text-white text-8xl snap-start">
                    <p className="p-16 font-medium fade-child">CONTACT</p>
                    <div className="text-xl flex flex-col items-center bopping">
                        <p>Scroll Down</p>
                        <span className="material-symbols-outlined">arrow_downward</span>
                    </div>
                </div>
                <div className="w-full min-h-screen">
                    <div ref={(el) => (sectionsRefs.current[11] = el)} className="w-full min-h-screen pt-24 snap-start">
                        <div className="w-full h-12 text-5xl text-white font-medium flex items-center pl-4 fade-child">
                            <p>MAIN CONTACT INFORMATION</p>
                        </div>
                        <div className="w-full h-[calc(100vh-9rem)] p-4 grid grid-cols-2 grid-rows-2 gap-4 text-white">
                            <div className="w-full h-full bg-zinc-950 rounded-xl p-4 grid grid-rows-4 fade-child">
                                <p className="text-3xl italic font-bold fade-child">CONTACT ME USING...</p>
                                <div className="w-full h-full row-span-3 flex flex-col place-content-evenly">
                                    <p className="text-xl fade-child"><span className="font-semibold">EMAIL:</span> <span className="cursor-pointer hover:text-blue-500 transition-all" onClick={handleEmailClick}>SALMANTALIB@OUTLOOK.COM</span></p>
                                    <p className="text-xl fade-child"><span className="font-semibold">PHONE NUMBER:</span> <span className="cursor-pointer hover:text-green-500 transition-all" onClick={handlePhoneClick}>(+44) 07393 690181</span></p>
                                </div>
                            </div>
                            <div className="w-full h-full bg-zinc-950 rounded-xl p-4 row-span-2 grid grid-rows-5 fade-child">
                                <div>
                                    <p className="text-3xl italic font-bold fade-child">I AM LOCATED IN...</p>
                                    <p className="text-xl fade-child">OLDHAM, GREATER MANCHESTER</p>
                                </div>
                                <div className="w-full h-full rounded-xl overflow-hidden row-span-4 fade-child">
                                    <iframe className="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d75878.62558101698!2d-2.176078880922154!3d53.536217204349015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb0aa67777af1%3A0x18b3b8d9a96b3258!2sOldham!5e0!3m2!1sen!2suk!4v1733243341221!5m2!1sen!2suk" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </div>
                            <div className="w-full h-full bg-zinc-950 rounded-xl p-4 grid grid-rows-4 fade-child">
                                <p className="text-3xl italic font-bold fade-child">SEE MORE CONTACTS...</p>
                                <div className="w-full h-full row-span-3 flex flex-col place-content-evenly">
                                    <p className="place-self-center fade-child">BY SCROLLING DOWN TO ACCESS THESE PLATFORMS:</p>
                                    <div className="flex h-12 place-content-evenly">
                                        <img className="h-full w-auto aspect-square rounded-2xl app-pic fade-child" src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/24/d6/34/24d634ef-e355-7e9d-900a-9e9663c25977/AppIcon-0-1x_U007emarketing-0-8-0-85-220-0.png/434x0w.webp" />
                                        <img className="h-full w-auto aspect-square rounded-2xl app-pic fade-child" src="https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/d2/4a/1d/d24a1dc1-80c2-4388-9503-7d7b7d40f23d/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/434x0w.webp" />
                                        <img className="h-full w-auto aspect-square rounded-2xl app-pic fade-child" src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/ba/cb/8d/bacb8db4-f1cb-a36b-067d-6e6210772d26/MediumWordmarkBlack-0-0-1x_U007epad-0-1-0-85-220.png/434x0w.webp" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={(el) => (sectionsRefs.current[12] = el)} className="w-full min-h-screen pt-24 snap-start">
                        <div className="w-full h-12 text-5xl text-white font-medium flex items-center pl-4 fade-child">
                            <p>PROFESSIONAL SOCIAL MEDIA & CV</p>
                        </div>
                        <div className="w-full h-[calc(100vh-9rem)] grid grid-cols-2 grid-rows-2 gap-4 p-4 text-white">
                            <div className="w-full h-full rounded-xl bg-white overflow-hidden relative flex items-end fade-child whole-social">
                                <a
                                    href="https://www.linkedin.com/in/salman-talib-2b5487258/"
                                    className="absolute w-full h-full overlay-hover bg-black cursor-pointer z-50 p-2"
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="linkedin-logo fade-child" viewBox="0 0 291 79.459999">
                                        <g transform="translate(-200.55198,-393.96227)">
                                            <g transform="matrix(1.018827,0,0,-1.018827,170.5996,498.03288)">
                                                <path d="m 239.3298,95.036 c 0,2.96 2.4604,5.361 5.4956,5.361 l 63.376,0 c 3.0351,0 5.4956,-2.401 5.4956,-5.361 l 0,-64.117 c 0,-2.961 -2.4605,-5.361 -5.4956,-5.361 l -63.376,0 c -3.0352,0 -5.4956,2.4 -5.4956,5.361 l 0,64.117 z" fill="#000000" />
                                                <path d="m 31.1516,37.709 31.0356,0 0,10.189 -19.8042,0 0,38.874 -11.2314,0 0,-49.063 z" fill="#FFFFFF" />
                                                <path d="m 77.9001,37.709 0,33.793 -11.2324,0 0,-33.793 11.2324,0 z m -5.6162,38.407 c 3.917,0 6.355,2.595 6.355,5.84 -0.073,3.315 -2.438,5.837 -6.2803,5.837 -3.8428,0 -6.355,-2.522 -6.355,-5.837 0,-3.245 2.4375,-5.84 6.207,-5.84 l 0.073,0 z" fill="#FFFFFF" />
                                                <path d="m 83.1154,37.709 11.2325,0 0,18.872 c 0,1.01 0.073,2.019 0.3701,2.741 0.8115,2.017 2.6596,4.107 5.7627,4.107 4.0649,0 5.6909,-3.1 5.6909,-7.64 l 0,-18.08 11.2314,0 0,19.377 c 0,10.38 -5.542,15.21 -12.9321,15.21 -6.0591,0 -8.7197,-3.387 -10.1978,-5.694 l 0.075,0 0,4.9 -11.2325,0 c 0.1475,-3.171 0,-33.793 0,-33.793 z" fill="#FFFFFF" />
                                                <path d="m 133.2487,86.772 -11.2329,0 0,-49.063 11.2329,0 0,10.956 2.8072,3.534 8.7939,-14.49 13.8179,0 -14.7783,20.977 12.9316,14.272 -13.5225,0 c 0,0 -9.2368,-12.769 -10.0498,-14.283 l 0,28.097 z" fill="#FFFFFF" />
                                                <path d="m 188.7062,51.805 c 0.1475,0.868 0.3697,2.533 0.3697,4.415 0,8.736 -4.4346,17.604 -16.1094,17.604 -12.4888,0 -18.2524,-9.877 -18.2524,-18.835 0,-11.08 7.02,-18 19.2866,-18 4.8774,0 9.3843,0.72 13.0796,2.234 l -1.4785,7.418 c -3.0293,-1.005 -6.1329,-1.507 -9.9751,-1.507 -5.2466,0 -9.8277,2.153 -10.1978,6.743 l 23.2773,-0.07 z m -23.3505,7.599 c 0.2954,2.884 2.2168,7.138 7.02,7.138 5.0976,0 6.2807,-4.543 6.2807,-7.138 l -13.3007,0 z" fill="#FFFFFF" />
                                                <path d="m 216.801,86.772 0,-16.984 -0.1475,0 c -1.626,2.377 -5.0259,3.963 -9.5322,3.963 -8.6465,0 -16.2573,-6.92 -16.1841,-18.741 0,-10.958 6.8726,-18.094 15.4443,-18.094 4.6553,0 9.0889,2.019 11.3057,5.912 l 0.2222,0 0.4433,-5.119 9.9766,0 c -0.148,2.379 -0.2969,6.488 -0.2969,10.524 l 0,38.539 -11.2314,0 z m 0,-33.421 c 0,-0.864 -0.074,-1.73 -0.2222,-2.45 -0.6641,-3.1 -3.3252,-5.262 -6.5757,-5.262 -4.6557,0 -7.6855,3.748 -7.6855,9.659 0,5.55 2.5869,10.019 7.7588,10.019 3.4726,0 5.9116,-2.378 6.5771,-5.333 0.1475,-0.65 0.1475,-1.371 0.1475,-2.019 l 0,-4.614 z" fill="#FFFFFF" />
                                                <path d="m 261.8728,37.749 0,33.794 -11.2325,0 0,-33.794 11.2325,0 z m -5.6163,38.408 c 3.917,0 6.355,2.595 6.355,5.838 -0.073,3.316 -2.438,5.839 -6.2807,5.839 -3.8423,0 -6.3545,-2.523 -6.3545,-5.839 0,-3.243 2.4375,-5.838 6.207,-5.838 l 0.073,0 z" fill="#FFFFFF" />
                                                <path d="m 268.0881,37.749 11.2324,0 0,18.872 c 0,1.01 0.073,2.019 0.3696,2.741 0.812,2.018 2.6602,4.108 5.7632,4.108 4.0645,0 5.6904,-3.099 5.6904,-7.642 l 0,-18.079 11.2315,0 0,19.377 c 0,10.38 -5.5415,15.21 -12.9316,15.21 -6.0596,0 -8.7198,-3.387 -10.1978,-5.694 l 0.075,0 0,4.901 -11.2324,0 c 0.1474,-3.171 0,-33.794 0,-33.794 z" fill="#FFFFFF" />
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                                <img className="absolute top-0 left-0 right-0 bottom-0 z-0 bg-cover bg-center fade-child social" src="https://media.licdn.com/dms/image/v2/D4E16AQEPNpgV9imr_Q/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1732723478670?e=1738195200&v=beta&t=k9ozCthJ41eMWA1jnx9QekOGpARSElCAb5xXEy1kKt8" />
                                <div className="w-full h-1/2 bg-white relative px-2 flex z-30 social">
                                    <div className="h-full aspect-square fade-child">
                                        <div className="h-full aspect-square bg-white shadow-sm rounded-full p-1 translate-y-[-50%]">
                                            <img className="w-full h-full rounded-full" src="https://media.licdn.com/dms/image/v2/D4E03AQGdlYpUoyuXww/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1721224736188?e=1738195200&v=beta&t=7Rjw0haiUwhryvu12Y80jjPVRgqPrbNTUXb2a7m2QO8" />
                                        </div>
                                    </div>
                                    <div className="w-full h-full grid grid-rows-4">
                                        <div className="w-full h-full text-black text-xl font-medium fade-child">
                                            <p>Salman Talib <span className="material-symbols-outlined" style={{ fontSize: "1.75rem", verticalAlign: "top" }}>verified_user</span> <span className="text-zinc-500 text-sm font-light">(He/Him)</span></p>
                                        </div>
                                        <div className="w-full h-full text-black text-md fade-child">
                                            <p>BSc Software Engineering Graduate</p>
                                        </div>
                                        <div className="w-full h-full text-zinc-500 text-md fade-child">
                                            <p>Oldham, England, United Kingdom</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-full rounded-xl bg-slate-900 overflow-hidden relative flex items-end fade-child whole-social">
                                <a
                                    href="https://github.com/salmannn7"
                                    className="absolute w-full h-full overlay-hover bg-black cursor-pointer z-50 p-2"
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1024px-Octicons-mark-github.svg.png" />
                                </a>
                                <div className="w-full h-full relative px-2 flex z-30 social">
                                    <div className="h-full aspect-square fade-child p-1">
                                        <div className="h-full aspect-square bg-zinc-500 shadow-sm rounded-full p-0.5">
                                            <img className="w-full h-full rounded-full" src="https://avatars.githubusercontent.com/u/124281135?v=4" />
                                        </div>
                                    </div>
                                    <div className="w-full h-full grid grid-rows-6 pl-2">
                                        <div className="row-span-2"></div>
                                        <div className="w-full h-full text-white text-xl font-medium fade-child">
                                            <p>Salman Talib</p>
                                        </div>
                                        <div className="w-full h-full text-zinc-500 text-md fade-child">
                                            <p>salmannn7 · he/him</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-full rounded-xl bg-white overflow-hidden relative flex items-end fade-child whole-social">
                                <a
                                    href="https://medium.com/@salmantalib_94925"
                                    className="absolute w-full h-full overlay-hover bg-black cursor-pointer z-50 p-2"
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 491.06667 75.141664" className="svg-custom-class fade-child" width="1856" height="284">
                                        <g id="layer1">
                                            <path d="m 73.62375,37.865 c 0,20.47 -16.48125,37.065 -36.8125,37.065 C 16.48,74.93 0,58.34 0,37.865 0,17.39 16.48125,0.80125 36.81125,0.80125 c 20.33,0 36.8125,16.59375 36.8125,37.06375 m 40.38375,0 c 0,19.27 -8.24125,34.89 -18.40625,34.89 -10.165,0 -18.40625,-15.625 -18.40625,-34.89 0,-19.265 8.24125,-34.89 18.40625,-34.89 10.165,0 18.40625,15.625 18.40625,34.89 m 16.5175,0 c 0,17.265 -2.89875,31.26 -6.47375,31.26 -3.575,0 -6.47375,-14 -6.47375,-31.26 0,-17.26 2.89875,-31.26 6.475,-31.26 3.57625,0 6.4725,13.99625 6.4725,31.26 m 101.59625,-33.85 0.1025,-0.0225 V 3.19875 h -20.935 L 191.85,48.88625 172.41125,3.19875 h -22.56 V 3.9925 l 0.10125,0.0225 c 3.82125,0.8625 5.76125,2.14875 5.76125,6.7875 v 54.30625 c 0,4.63875 -1.9475,5.925 -5.76875,6.7875 l -0.10125,0.0225 V 72.715 H 165.15 v -0.79375 l -0.10125,-0.0225 C 161.2275,71.03625 159.2875,69.75 159.2875,65.11125 V 13.9525 L 184.25875,72.715 H 185.675 L 211.37375,12.31375 V 66.4525 c -0.3275,3.66375 -2.25,4.795 -5.71,5.57625 l -0.1025,0.02375 V 72.84 h 26.6625 v -0.7875 l -0.1025,-0.02375 c -3.46375,-0.78125 -5.4325,-1.9125 -5.76,-5.57625 l -0.0175,-55.65 h 0.0175 c 0,-4.63875 1.94,-5.925 5.76,-6.7875 M 244.3,39.99 c 0.43625,-9.7575 3.94,-16.8 9.82,-16.92125 1.81375,0.03 3.335,0.625 4.5175,1.77 2.5125,2.43875 3.69375,7.535 3.51125,15.15125 z m -0.26375,2.75 h 31.25 v -0.13125 c -0.0888,-7.46125 -2.25,-13.265 -6.4175,-17.25 C 265.26625,21.915 259.9325,20.02 254.33,20.02 h -0.125 c -2.9075,0 -6.47375,0.705 -9.01125,1.9825 -2.88875,1.3375 -5.43625,3.3375 -7.55625,5.9625 -3.4125,4.22875 -5.48,9.94375 -5.9825,16.36625 -0.0163,0.1925 -0.03,0.385 -0.0437,0.5775 -0.0138,0.1925 -0.0225,0.365 -0.0312,0.54875 a 41.58,41.58 0 0 0 -0.045,2.71125 C 231.87375,62.715 239.73125,74.34 253.6875,74.34 c 12.25,0 19.38375,-8.955 21.1625,-20.975 l -0.89875,-0.31625 c -3.125,6.46 -8.7375,10.375 -15.125,9.8975 -8.72,-0.6525 -15.4,-9.49375 -14.79375,-20.20375 m 66.58625,19.71 c -1.025,2.43125 -3.16375,3.76875 -6.03,3.76875 -2.86625,0 -5.48625,-1.9675 -7.3475,-5.5425 -2,-3.8375 -3.0525,-9.2625 -3.0525,-15.68875 0,-13.375 4.16,-22.02625 10.59875,-22.02625 2.69625,0 4.81875,1.3375 5.83125,3.67125 z m 20.73,9.535 c -3.82125,-0.90375 -5.76125,-2.25 -5.76125,-7.125 V 0 l -23.21625,6.84 v 0.8375 l 0.1425,-0.01125 c 3.2025,-0.25875 5.375,0.18375 6.63625,1.34875 0.9875,0.9125 1.46875,2.3125 1.46875,4.2825 V 22.19 c -2.28875,-1.46125 -5.01125,-2.1725 -8.315,-2.1725 -6.7,0 -12.82375,2.82125 -17.24,7.945 -4.60375,5.34 -7.0375,12.6375 -7.0375,21.10125 -0.002,15.11625 7.44,25.27625 18.515,25.27625 6.47875,0 11.69125,-3.55 14.0775,-9.5375 V 72.84 H 331.45 V 72.0075 Z M 351.26,8.82125 c 0,-4.72 -3.55875,-8.28 -8.28,-8.28 -4.69875,0 -8.375,3.6375 -8.375,8.28 0,4.6425 3.68,8.28 8.375,8.28 4.72125,0 8.28,-3.56 8.28,-8.28 m 5.48,63.16625 c -3.82125,-0.90375 -5.76125,-2.25 -5.76125,-7.125 h -0.0163 V 20.17125 L 330.13,26.1525 v 0.8125 l 0.125,0.01125 c 4.5075,0.40125 5.74125,1.95375 5.74125,7.22125 V 72.84 h 20.85 v -0.8325 z m 53.38125,0 C 406.3,71.08375 404.36,69.7375 404.36,64.8625 V 20.17125 L 384.525,25.955 v 0.815 l 0.1175,0.0125 c 3.685,0.3875 4.75,2.02875 4.75,7.32 v 28.25 c -1.22875,2.43125 -3.53375,3.875 -6.32625,3.9725 -4.52875,0 -7.0225,-3.05875 -7.0225,-8.6125 v -37.54 l -20.8325,5.98125 V 26.965 l 0.125,0.01125 c 4.5075,0.4 5.7425,1.9525 5.7425,7.22125 v 23.90875 a 26.81,26.81 0 0 0 0.43375,4.9775 l 0.375,1.63125 c 1.76375,6.32 6.385,9.625 13.625,9.625 6.1325,0 11.5075,-3.79625 13.875,-9.73625 v 8.25 H 410.22 v -0.8325 z M 491.05,72.84 v -0.83375 l -0.10125,-0.02375 c -4.14625,-0.95625 -5.76125,-2.75875 -5.76125,-6.42875 v -30.4 c 0,-9.47875 -5.32375,-15.13625 -14.24125,-15.13625 -6.5,0 -11.98125,3.75625 -14.09125,9.6075 -1.67625,-6.2 -6.5,-9.6075 -13.6325,-9.6075 -6.265,0 -11.175,3.30625 -13.28125,8.89125 V 20.175 l -20.8325,5.73625 v 0.8175 l 0.125,0.01125 c 4.45375,0.395 5.74125,1.9925 5.74125,7.125 V 72.84 h 19.4375 v -0.8325 l -0.1025,-0.025 c -3.3075,-0.7775 -4.375,-2.195 -4.375,-5.8325 V 31.305 c 0.875,-2.04375 2.63875,-4.465 6.125,-4.465 4.33,0 6.525,3 6.525,8.91 v 37.09 h 19.4425 v -0.8325 l -0.1025,-0.025 C 458.6175,71.205 457.55,69.7875 457.55,66.15 v -31 a 20.05625,20.05625 0 0 0 -0.275,-3.46 c 0.9275,-2.22125 2.7925,-4.85 6.42125,-4.85 4.39125,0 6.525,2.91375 6.525,8.91 v 37.09 z" id="path857" />
                                        </g>
                                    </svg>
                                </a>
                                <div className="w-full h-full bg-white relative px-2 grid grid-cols-5 z-30 social divide-x-2">
                                    <div className="w-full h-full col-span-3">
                                        <div className="w-full h-full text-black text-3xl font-medium fade-child flex items-center justify-start">
                                            <p>Salman Talib</p>
                                        </div>
                                    </div>
                                    <div className="w-full h-full col-span-2 flex items-center pl-4">
                                        <div>
                                            <div className="w-1/3 aspect-square fade-child">
                                                <div className="w-full aspect-square bg-white shadow-sm rounded-full p-1">
                                                    <img className="w-full h-full rounded-full" src="https://media.licdn.com/dms/image/v2/D4E03AQGdlYpUoyuXww/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1721224736188?e=1738195200&v=beta&t=7Rjw0haiUwhryvu12Y80jjPVRgqPrbNTUXb2a7m2QO8" />
                                                </div>
                                            </div>
                                            <div className="w-full h-full py-4 fade-child">
                                                <p className="text-black text-sm font-semibold">Salman Talib <span className="text-xs text-zinc-500 font-light">he/him</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-full rounded-xl bg-white overflow-hidden relative flex items-end fade-child whole-social">
                                <a
                                    href={myCV}
                                    className="absolute w-full h-full overlay-hover bg-black cursor-pointer z-50 p-2"
                                    target="_blank" download="Salman_Talib_Software_Engineer"
                                >
                                    <span className="material-symbols-outlined fade-child">download</span>
                                </a>
                                <img className="absolute top-0 left-0 right-0 bottom-0 z-0 bg-cover bg-center fade-child social" src={cvImage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UnitPopUp isOpen={isUnitPopupOpen} onClose={toggleUnitPopup} id={UnitPopUpId} type={UnitPopUpType}></UnitPopUp>
            <ProjectPopUp isOpen={isProjectPopupOpen} onClose={toggleProjectPopup} id={ProjectPopUpId} type={ProjectPopUpType}></ProjectPopUp>
            <SkillPopUp isOpen={isSkillPopupOpen} onClose={toggleSkillPopup} positionX={skillPopUpPositionX} positionY={skillPopUpPositionY} id={skillPopUpId} typeSkill={skillPopUpType}></SkillPopUp>
        </div>
    );
}

export default Home;
