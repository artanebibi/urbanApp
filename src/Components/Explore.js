import React from 'react';
import {Link} from "react-router-dom";
import './component.css';
import {useGlobalContext} from "../Context/GlobalContext";
import {collection, deleteDoc, doc, getDocs, query, where} from "firebase/firestore";
import {db} from "../firebase";
import {useAuth} from "../Context/AuthContext";

const Explore = () => {
const {currentUser, logOut} = useAuth()

    const {
        events,
        favoriteEvents,
        getEvents,
        getUserFavoriteEvents,
        deleteEvent,
        addToFavorites,
        removeFromFavorites,
        setNewType,
        setNewDate,
        setNewTime,
        setNewLocation,
        setNewPerformers,
        setNewPhoneNumber,
        onSubmitNewEvent,
        setNewContact,
        setVenueType,
        setNewName,
        setNewHours,
        setNewAddress,
        onSubmitNewVenue,

    } = useGlobalContext()



    return (
        <div className="exploreContainer">
            {(currentUser && currentUser.email === "artan.ebibi@live.com") ? (

            <div style={{textAlign: 'center'}}>
                <h3 style={{textAlign: 'center'}}>add new venues</h3>

                <input type="text" placeholder="Type of venue..."
                       onChange={(e) => setVenueType(e.target.value)}/> <br/>
                <input type="text"
                       placeholder="Contact of venue..." onChange={(e) => setNewContact(e.target.value)}/>
                <br/>
                <input type="text" placeholder="Name of venue..."
                       onChange={(e) => setNewName(e.target.value)}/> <br/>
                <input type="text" placeholder="Working hours of venue..."
                       onChange={(e) => setNewHours(e.target.value)}/> <br/>
                <input type="text" placeholder="Address of venue..."
                       onChange={(e) => setNewAddress(e.target.value)}/>

                <br/><br/>
                <button style={{background: 'black'}} onClick={onSubmitNewVenue}>Add new venue</button>

                <br/>
            </div>
            ) :
            <>
            <h4>Only developer with email: artan.ebibi@live.com can add new events and delete events</h4>
        </>}

            <p style={{fontFamily: "against", fontSize: "30px", fontWeight: "bold", marginTop: "50px"}}>
                Where do you feel like going today?
            </p>

            <div className="cardContainer">

                <article className="body c1">
                    <Link className="cardC Coffee" to="/CoffeeShop">
                        <div className="overlayC"></div>
                        <div className="circleC">
                            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                            <i className="material-icons profile-icon" style={{
                                fontSize: '3.2rem', color: "black", marginLeft: "-18px"
                            }}>coffee</i>
                        </div>
                        <p><strong>COFFEE</strong></p>
                    </Link>
                </article>

                <article className="body c2">
                    <Link className="cardS Sports" to="/Sports">
                        <div className="overlayS"></div>
                        <div className="circleS">
                            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                            <i className="material-icons profile-icon" style={{
                                fontSize: '3.2rem', color: "black", marginLeft: "-18px"
                            }}>sports_volleyball</i>
                        </div>
                        <p><strong>SPORTS</strong></p>
                    </Link>
                </article>

                <article className="body c3">
                    <Link className="cardF Festival" to="/Restaurant">
                        <div className="overlayF"></div>
                        <div className="circleF">
                            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                            <i className="material-icons profile-icon" style={{
                                fontSize: '3.2rem', color: "black", marginLeft: "-18px"
                            }}>restaurant</i>
                        </div>
                        <p><strong>RESTAURANT</strong></p>
                    </Link>
                </article>

                <article className="body c4">
                    <Link className="cardP Pub" to="/PubNbar">
                        <div className="overlayP"></div>
                        <div className="circleP">
                            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                            <i className="material-icons profile-icon" style={{
                                fontSize: '3.2rem', color: "black", marginLeft: "-18px"
                            }}>sports_bar</i>
                        </div>
                        <p><strong>PUBS & BARS</strong></p>
                    </Link>
                </article>

                <article className="body c5">
                    <Link className="cardCl Club" to="/Clubs">
                        <div className="overlayCl"></div>
                        <div className="circleCl">
                            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                            <i className="material-icons profile-icon" style={{
                                fontSize: '3.2rem', color: "black", marginLeft: "-18px"
                            }}>liquor</i>
                        </div>
                        <p><strong>Clubs</strong></p>
                    </Link>
                </article>


            </div>
        </div>
    );
};


export default Explore;