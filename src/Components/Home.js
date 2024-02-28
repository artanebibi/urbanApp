import './component.css'
import {Link} from "react-router-dom";
import React from "react";

const Intro = () => {
    return (
        <div className="intro-container">
            <p className="intro-heading" style={{fontFamily: "franchise", fontSize: "90px", color: "black",}}>Welcome to
                SkopjeUrban</p>
            <div className="intro-text">
                <p>
                    <em>Unlock the City's Hidden Treasures</em>
                </p>
                <p>
                    This is SkopjeUrban, your ultimate companion for exploring the heartbeat of the capital city.
                    Whether you're a curious traveler or a seasoned local, SkopjeUrban is your ticket to unlocking
                    the true essence of urban living.
                </p>
            </div>
            <div className="homeImage"></div>
            <div className="intro-text">

                <h2>Why Choose SkopjeUrban?</h2>
                <ul>
                    <li>
                        <strong>Discover the Unseen:</strong> We believe that every city has its secrets waiting
                        to be revealed. SkopjeUrban is here to guide you off the beaten path, uncovering the hidden
                        gems that make each city unique.
                    </li>
                    <li>
                        <strong>Live Like a Local:</strong> Immerse yourself in the local culture and lifestyle.
                        From trendy cafes to underground art scenes, SkopjeUrban gives you insider access to the
                        experiences that locals cherish.
                    </li>
                    <li>
                        <strong>Real-Time Exploration:</strong> Say goodbye to outdated guides. With SkopjeUrban,
                        you get real-time updates on events, happenings, and the latest hotspots, ensuring you
                        never miss a beat.
                    </li>
                </ul>

                <p style={{marginTop: '100px', fontSize: '2.2rem'}}><strong>EXPLORE THE CITY</strong></p>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <Link to="/Explore"><i className="material-icons profile-icon" style={{
                    fontSize: '3rem', color: "black", marginLeft: '-10px', marginTop: '-20px'
                }}>explore</i> </Link>

                <h2 style={{marginTop: '100px'}}>Get started with us</h2>

                <div className="cta-buttons">
                    <button className="signup-button" ><Link style={{textDecoration: "none", color: "floralwhite "}} to="/SignUp">Sign Up</Link></button>
                    <button className="download-button">Download App</button>
                </div>
            </div>


            <compnenet></compnenet>
        </div>
    );
}

export default Intro;
