import React from "react";
import arrow from '../assets/arrow.png'
import './BackArrow.css'
import { useNavigate } from "react-router-dom";


const BackArrow = () => {
const navigate = useNavigate()

    return ( 
    <div className="back">
        <button 
        className="backButton"
        onClick={() => navigate(-1)}>
            <img src={arrow} className="arrow" alt="back-arrow"></img>
            Back
        </button>
    </div>
    );
}

export default BackArrow;
