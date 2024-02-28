// import './component.css';
// import './component2.css'

import {Link, useNavigate} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import {useAuth} from '../Context/AuthContext';
import {getDocs, collection, addDoc, deleteDoc, doc} from "firebase/firestore"
import {db} from "../firebase";
import {useGlobalContext} from "../Context/GlobalContext";


const Account = () => {
    const [error, setError] = useState("");
    const {currentUser, logout} = useAuth();
    const navigate = useNavigate()
    const {
        events,
        favoriteEvents,
        getEvents,
        getUserFavoriteEvents,
        deleteEvent,
        addToFavorites,
        removeFromFavorites
    } = useGlobalContext()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate('/LogIn')
        } catch {
            setError("Failed to log out")
        }
    }


    return (
        <div>

            <div className="account">


                {error && <div className="error-message">{error}</div>}
                {currentUser ? (
                    <>
                        {/*<h5>Account Profile</h5>*/}
                        <div className="profileContainer" style={{background: "gray", marginTop: "10px", borderRadius: "10px", boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"}}>
                            <h3 style={{textAlign: "left", display: "inline", float: "left", fontFamily: "against", paddingLeft: "15px"}}>Profile</h3>
                            <h3 style={{textAlign: 'left', clear: "both", fontFamily: "fira",  paddingLeft: "15px"}}><strong>Email:</strong> {currentUser.email}</h3>
                            <br/>
                            <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center'}}></div>
                            <br/>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignContent: 'center',
                                marginTop: '10px', paddingBottom: "12px"
                            }}>
                                <button className="logout" style={{background: 'black', fontWeight: 'light', marginTop: "-30px"}}
                                        onClick={handleLogout}>
                                    Log Out
                                </button>
                            </div>
                        </div>


                        <div className="favEventsContainer" style={{background: "gray", borderRadius: "10px", boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"}}>
                        <div style={{}}>
                            <h2 style={{marginTop: '100px',fontFamily: "against", padding: "10px" }}>Favourite events </h2></div>
                        <div>
                            <div><h3 style={{marginTop: '70px', fontFamily: "fira", paddingLeft: "15px"}}>Go to <Link to="/Events">events</Link> to see more
                                events </h3></div>
                            <div className="event-card-container">

                                {favoriteEvents.map((event) => (
                                    <div style={{
                                        border: '2px solid darkgreen',
                                        marginTop: '30px',
                                        padding: '10px',
                                        width: '320px',
                                        height: '500px'
                                    }}
                                         className="event-card">
                                        <h1 style={{
                                            color: "rgb(139,0,0)",
                                            textAlign: "center",
                                            fontWeight: "bolder",
                                            fontSize: "45px",
                                            fontFamily: "franchise",
                                            marginTop: "190px"
                                        }}>{event.eventType}

                                        </h1>

                                        <h3 style={{marginTop: "-20px"}} className="dateC">

                                            <div style={{
                                                display: "inline-block",
                                                marginTop: "-8px",
                                                position: "absolute"
                                            }}>
                                                <i className="material-icons profile-icon" style={{
                                                    fontSize: '2.3rem', color: "black",

                                                }}>calendar_month</i>
                                            </div>

                                            <div style={{
                                                marginLeft: "40px",
                                                fontSize: "24px",
                                                marginTop: '-23px'
                                            }}>{event.date} </div>
                                            <br/>
                                        </h3>

                                        <h3 className="timeC" style={{display: 'inline'}}>
                                            <div style={{
                                                display: "inline-block",
                                                marginTop: "-5px",
                                                position: "absolute"
                                            }}>
                                                <i className="material-icons profile-icon" style={{
                                                    fontSize: '2.3rem', color: "black",

                                                }}>schedule</i>
                                            </div>
                                            <div className="timeCdisplay" style={{
                                                marginLeft: "40px",
                                                fontSize: "24px",
                                                marginTop: "-45px"
                                            }}>{event.time}</div>
                                        </h3>
                                        <h2 style={{display: 'block'}}>
                                            <div style={{
                                                display: "inline-block",
                                                marginTop: "-6px",
                                                marginLeft: '-161px',
                                                position: "absolute"
                                            }}>
                                                <i className="material-icons profile-icon" style={{
                                                    fontSize: '2.3rem', color: "black",

                                                }}>location_on</i>
                                            </div>
                                            <div style={{
                                                marginLeft: "-70px",
                                                fontSize: "24px",

                                                marginTop: "-17px"
                                            }}>{event.location}</div>
                                        </h2>
                                        <h2 style={{display: 'block'}}>
                                            <div style={{
                                                display: "inline",
                                                marginTop: "-5px",
                                                position: "absolute",
                                                marginLeft: '-161px'
                                            }}>
                                                <i className="material-icons profile-icon" style={{
                                                    fontSize: '2.3rem', color: "black",

                                                }}>music_note</i>
                                            </div>
                                            <div style={{
                                                marginLeft: "-130px",
                                                fontSize: "24px",
                                                marginTop: "-17px"
                                            }}>{event.performers}</div>
                                        </h2>

                                        <h2 style={{display: '', marginTop: '22px', marginLeft: '-320px'}}>
                                            <div style={{
                                                display: "inline-block",
                                                marginTop: "-5px",
                                                position: "absolute"
                                            }}>
                                                <i className="material-icons profile-icon" style={{
                                                    fontSize: '2.3rem', color: "black",

                                                }}>phone</i>
                                            </div>
                                            <div style={{
                                                marginLeft: "240px",
                                                fontSize: "24px",
                                                marginTop: "-17px"
                                            }}>{event.pnumber}</div>

                                        </h2>

                                        <div className="heart-container" title="Like" style={{marginTop: '25px'}}>

                                            <input type="checkbox" checked={true} className="checkbox"
                                                   id="Give-It-An-Id"
                                                   onChange={() => removeFromFavorites(event)}/>

                                            <div className="svg-container">
                                                <svg viewBox="0 0 24 24" className="svg-outline"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                                                    </path>
                                                </svg>
                                                <svg viewBox="0 0 24 24" className="svg-filled"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                                                    </path>
                                                </svg>
                                                <svg className="svg-celebrate" width="100" height="100"
                                                     xmlns="http://www.w3.org/2000/svg">

                                                </svg>

                                            </div>
                                        </div>

                                        {currentUser.email === "artan.ebibi@live.com" ?
                                            <button style={{
                                                background: 'black',
                                                marginTop: '-46px',
                                                position: 'absolute',
                                                marginLeft: '155px'
                                            }}
                                                    onClick={() => deleteEvent(event.id, event.eventId)}>Delete event
                                            </button> : <> </>}


                                    </div>

                                ))}
                            </div>


                        </div>
                        </div>
                    </>
                ) : (
                    <h3 style={{fontFamily: "fira"}}>Please <Link to="/LogIn">log in</Link> or <Link to="/SignUp">sign up</Link> to view your
                        profile and favour events so you dont miss on anything you like .</h3>

                )}
            </div>
        </div>
    );
};

export default Account;
