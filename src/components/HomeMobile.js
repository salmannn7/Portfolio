import React from "react";
import logo from "../resources/logo.png";

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