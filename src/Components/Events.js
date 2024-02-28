import './component2.css'
import {db} from '../firebase';
import React, {useEffect, useState} from 'react';
import {getDocs, collection, addDoc, doc, deleteDoc, where, query} from 'firebase/firestore';
import {useAuth} from '../Context/AuthContext';
import {useNavigate} from 'react-router-dom';
import {useGlobalContext} from "../Context/GlobalContext";
import {Link} from 'react-router-dom'


const Events = () => {
    // ----------------------------------
    const [error, setError] = useState("");
    const {currentUser, logout} = useAuth();
    const navigate = useNavigate()
    const eventCollectionRef = collection(db, 'events');

    const scheduleEventDeletion = async () => {
        const currentDate = new Date();

        // Fetch all events
        const data = await getDocs(eventCollectionRef);
        const events = data.docs.map((doc) => ({...doc.data(), id: doc.id}));

        // Check and delete expired events
        for (const event of events) {
            const eventDate = new Date(event.date); // Assuming event.date is a date string

            if (eventDate < currentDate) {
                // Event has expired, delete it
                await deleteEvent(event.id, event.eventId);
            }
        }
    }

// Call the function immediately
    scheduleEventDeletion();


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
        onSubmitNewEvent
    } = useGlobalContext()


    // -----------------------------------------


    return <div>

        {(currentUser && currentUser.email === "artan.ebibi@live.com") ? (<div>
            <h2>Add a new event bro</h2>
            <div style={{textAlign: 'center'}}>
                <input type="text" placeholder="Type of event..."
                       onChange={(e) => setNewType(e.target.value)}/> <br/>
                <input type="text"
                       placeholder="Date of event..." onChange={(e) => setNewDate(e.target.value)}/>
                <br/>
                <input type="text" placeholder="Time of event..."
                       onChange={(e) => setNewTime(e.target.value)}/> <br/>
                <input type="text" placeholder="Location of event..."
                       onChange={(e) => setNewLocation(e.target.value)}/> <br/>
                <input type="text" placeholder="Performers of event..."
                       onChange={(e) => setNewPerformers(e.target.value)}/> <br/>
                <input type="text" placeholder="Phone number of place..."
                       onChange={(e) => setNewPhoneNumber(e.target.value)}/>

                <br/><br/>
                <button style={{background: 'black'}} onClick={onSubmitNewEvent}>Add new event</button>
                <br/>
            </div>


        </div>
        ) : <>
            <h4>Only developer with email: artan.ebibi@live.com can add new events and delete events</h4>
        </>}

        <div>
            {!currentUser ? <div>
                    <h2>Display of events</h2>
                    <h5>only signed in users can favour the events</h5>
                    <div className="event-card-container">

                        {events.map((event) => (
                            <div style={{
                                border: '2px solid darkgreen !important',
                                marginTop: '30px',
                                padding: '10px',
                                width: '320px',
                                height: '1550px !important'
                            }} className="event-card">
                                <h1 style={{
                                    color: "rgb(139,0,0)",
                                    textAlign: "center",
                                    fontWeight: "bolder",
                                    fontSize: "45px",
                                    marginTop: '153px',
                                    fontFamily: "franchise"
                                }}>{event.eventType}</h1>
                                <h3>

                                    <div style={{display: "inline-block", marginTop: "-4px", position: "absolute"}}>
                                        <i className="material-icons profile-icon" style={{
                                            fontSize: '2.3rem', color: "black",

                                        }}>calendar_month</i>
                                    </div>

                                    <div style={{marginLeft: "40px", fontSize: "24px"}}>{event.date} </div>
                                    <br/>


                                    <div style={{display: "inline-block", marginTop: "-28px", position: "absolute"}}>
                                        <i className="material-icons profile-icon" style={{
                                            fontSize: '2.3rem', color: "black",

                                        }}>schedule</i>
                                    </div>
                                    <div style={{
                                        marginLeft: "40px",
                                        fontSize: "24px",
                                        marginTop: "-25px"
                                    }}>{event.time}</div>
                                </h3>
                                <h2>
                                    <div style={{display: "inline-block", marginTop: "-6px", position: "absolute"}}>
                                        <i className="material-icons profile-icon" style={{
                                            fontSize: '2.3rem', color: "black",

                                        }}>location_on</i>
                                    </div>
                                    <div style={{
                                        marginLeft: "40px",
                                        fontSize: "24px",
                                        marginTop: "-17px"
                                    }}>{event.location}</div>
                                </h2>
                                <h2 style={{display: 'block'}}>
                                    <div style={{display: "inline", marginTop: "-5px", position: "absolute"}}>
                                        <i className="material-icons profile-icon" style={{
                                            fontSize: '2.3rem', color: "black",

                                        }}>music_note</i>
                                    </div>
                                    <div style={{
                                        marginLeft: "40px",
                                        fontSize: "24px",
                                        marginTop: "-17px"
                                    }}>{event.performers}</div>
                                </h2>

                                <h2 style={{display: '', marginTop: '-10px'}}>
                                    <div style={{display: "inline-block", marginTop: "-10px", position: "absolute"}}>
                                        <i className="material-icons profile-icon" style={{
                                            fontSize: '2.3rem', color: "black",

                                        }}>phone</i>
                                    </div>
                                    <div style={{
                                        marginLeft: "40px",
                                        fontSize: "24px",
                                        marginTop: "-15px"
                                    }}>{event.pnumber}</div>

                                </h2>


                            </div>

                        ))}
                    </div>

                </div>

                :
                //here are the logged-in users_________________________________-___________________________________________________________________

                <div>
                    <div><h3 style={{marginTop: '200px'}}>Go to <Link to="/Account">Profile</Link> to see your favourite
                        events </h3></div>
                    <div className="event-card-container">

                        {events.map((event) => (
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

                                    <div style={{display: "inline-block", marginTop: "-8px", position: "absolute"}}>
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

                                <h3 className="timeC">
                                    <div style={{display: "inline-block", marginTop: "-5px", position: "absolute"}}>
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
                                <h2>
                                    <div style={{display: "inline-block", marginTop: "-6px", position: "absolute"}}>
                                        <i className="material-icons profile-icon" style={{
                                            fontSize: '2.3rem', color: "black",

                                        }}>location_on</i>
                                    </div>
                                    <div style={{
                                        marginLeft: "40px",
                                        fontSize: "24px",
                                        marginTop: "-17px"
                                    }}>{event.location}</div>
                                </h2>
                                <h2 style={{display: 'block'}}>
                                    <div style={{display: "inline", marginTop: "-5px", position: "absolute"}}>
                                        <i className="material-icons profile-icon" style={{
                                            fontSize: '2.3rem', color: "black",

                                        }}>music_note</i>
                                    </div>
                                    <div style={{
                                        marginLeft: "40px",
                                        fontSize: "24px",
                                        marginTop: "-17px"
                                    }}>{event.performers}</div>
                                </h2>

                                <h2 style={{display: '', marginTop: '-10px'}}>
                                    <div style={{display: "inline-block", marginTop: "-5px", position: "absolute"}}>
                                        <i className="material-icons profile-icon" style={{
                                            fontSize: '2.3rem', color: "black",

                                        }}>phone</i>
                                    </div>
                                    <div style={{
                                        marginLeft: "40px",
                                        fontSize: "24px",
                                        marginTop: "-17px"
                                    }}>{event.pnumber}</div>

                                </h2>

                                <div className="heart-container" title="Like" style={{marginTop: '25px'}}>

                                    <input type="checkbox" className="checkbox" id="Give-It-An-Id"
                                           onChange={() => addToFavorites(event)}/>

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

            }
        </div>


    </div>
}

export default Events;
