import React, { useEffect, useState, useRef } from "react";
import uniResults from "../resources/json/uni-results.json";
import collegeResults from "../resources/json/college-results.json";
import secondaryResults from "../resources/json/secondary-results.json";

const UnitPopUp = ({ isOpen, onClose, id, type }) => {
    const sectionRefs = [useRef(null), useRef(null), useRef(null)];
    const [unitName, setUnitName] = useState();
    const [unitCode, setUnitCode] = useState();
    const [unitMark, setUnitMark] = useState();
    const [unitGrade, setUnitGrade] = useState();
    const [unitYear, setUnitYear] = useState();
    const [unitCredits, setUnitCredits] = useState();
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        if (isOpen) {
            freezeScroll();
            console.log(id + " " + type)
        } else {
            unfreezeScroll();
        }

        return () => {
            unfreezeScroll(); // Cleanup when component unmounts
        };
    }, [isOpen]);

    const freezeScroll = () => {
        document.documentElement.style.overflowY = 'hidden'; // Change to 'scroll' or 'hidden'

    };

    const unfreezeScroll = () => {
        document.documentElement.style.overflowY = 'scroll'; // Change to 'scroll' or 'hidden'
    };

    useEffect(() => {
        if (type !== undefined) {
            sectionRefs.forEach((ref, index) => {
                if (ref.current) {
                    if (index === type) {
                        ref.current.style.display = "block";
                    } else {
                        ref.current.style.display = "none";
                    }
                }
            });
        }
    }, [type]);

    useEffect(() => {
        let obj = {};
        if(type === 0) {
            obj = uniResults.find((x) => x.id === id);
            if (obj) {
                setUnitName(obj.unit);
                setUnitMark(obj.finalMark);
                setUnitCredits(obj.credits);
                setSubmissions(obj.submissions);
            } else {
                console.log("No unit found with the given ID");
            }
        } else if(type === 1) {
            obj = collegeResults.find((x) => x.id === id);
            if (obj) {
                setUnitName(obj.unit);
                setUnitGrade(obj.finalMark);
                setUnitCode(obj.unitcode);
                setUnitYear(obj.year);
            } else {
                console.log("No unit found with the given ID");
            }
        } else if(type === 2) {
            obj = secondaryResults.find((x) => x.id === id);
            if (obj) {
                setUnitName(obj.subject);
                setUnitGrade(obj.grade);
                setUnitCode(obj.code);
                setUnitYear(obj.year);
            } else {
                console.log("No unit found with the given ID");
            }
        }
    }, [id]);

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="w-96 h-96 max-w-96 max-h-96 overflow-hidden bg-zinc-900 opacity-100 rounded-xl">
                <div className="w-full h-fit grid grid-cols-2">
                    <div className="w-full h-full flex justify-start items-center ml-2">
                        <p className="text-white text-xl ml-0">UNIT INFORMATION</p>
                    </div>
                    <div className="h-full w-full flex justify-end">
                        <button className="text-white m-2" onClick={onClose}>
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        </button>
                    </div>
                </div>
                <div className="w-full h-80 p-2 overflow-hidden scroller">
                    <div className="w-full h-full overflow-y-auto overflow-hidden text-white">
                        {/* University */}
                        <div ref={sectionRefs[0]} className="w-full h-full divide-y-2 divide-white p-1">
                            <div>
                                <p>Unit:</p>
                                <div className="pl-2">
                                    <p>{unitName}</p>
                                </div>
                            </div>
                            <div>
                                <p>Mark:</p>
                                <div className="pl-2">
                                    <p>{unitMark}</p>
                                </div>
                            </div>
                            <div>
                                <p>Credits:</p>
                                <div className="pl-2">
                                    <p>{unitCredits}</p>
                                </div>
                            </div>
                            <div>
                                <p>Submissions:</p>
                                <div className="pl-2 divide-y-2 divide-white">
                                    {submissions.map((submission, index) => (
                                        <div key={index}>
                                            <p>Document - {submission.name}</p>
                                            <p>Weight - {submission.weight}</p>
                                            <p>Mark - {submission.mark}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* College */}
                        <div ref={sectionRefs[1]} className="w-full h-full divide-y-2 divide-white p-1 hidden">
                            <div>
                                <p>Unit:</p>
                                <div className="pl-2">
                                    <p>{unitName}</p>
                                </div>
                            </div>
                            <div>
                                <p>Unit Code:</p>
                                <div className="pl-2">
                                    <p>{unitCode}</p>
                                </div>
                            </div>
                            <div>
                                <p>Grade:</p>
                                <div className="pl-2">
                                    <p>{unitGrade}</p>
                                </div>
                            </div>
                            <div>
                                <p>Year:</p>
                                <div className="pl-2">
                                    <p>{unitYear}</p>
                                </div>
                            </div>
                        </div>
                        {/* School */}
                        <div ref={sectionRefs[2]} className="w-full h-full divide-y-2 divide-white p-1 hidden">
                            <div>
                                <p>Unit:</p>
                                <div className="pl-2">
                                    <p>{unitName}</p>
                                </div>
                            </div>
                            <div>
                                <p>Code:</p>
                                <div className="pl-2">
                                    <p>{unitCode}</p>
                                </div>
                            </div>
                            <div>
                                <p>Grade:</p>
                                <div className="pl-2">
                                    <p>{unitGrade}</p>
                                </div>
                            </div>
                            <div>
                                <p>Year:</p>
                                <div className="pl-2">
                                    <p>{unitYear}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnitPopUp;
