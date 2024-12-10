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
import logo from "../resources/logo.png"
import '../css/App.css';

function HomeMobile() {
    return (
        <div className="bg-zinc-950 w-full h-screen font-poppins snap-start snap-mandatory text-white flex flex-col items-center text-center justify-center px-4">
            <p>THIS WEBSITE IS NOT YET AVAILABLE ON MOBILE PHONE BROWSERS.</p>
            <p>DUE TO RESPONSIVE ISSUES, I RECOMMEND YOU USE A DESKTOP.</p>
            <p>HOWEVER, IF YOU WISH TO VIEW THE WEBSITE, REQUEST DESKTOP MODE VIA THE BROWSER.</p>
            <div className="flex items-center gap-2">
                <p>THANK YOU,</p>
                <img src={logo} className="h-12 w-auto" />
            </div>
        </div>
    );
};

export default HomeMobile;