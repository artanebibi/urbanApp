import './component2.css';
import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {db} from '../firebase';
import {collection, query, where, getDocs} from 'firebase/firestore';
import {useGlobalContext} from "../Context/GlobalContext";
import {useAuth} from "../Context/AuthContext";


const EventsBySearch = () => {
    const {
        events,
        setEvents,
        favoriteEvents,
        setFavoriteEvents,
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
        onSubmitNewEvent
    } = useGlobalContext()

    const {currentUser, logout} = useAuth();
    const [eventss, setEventss] = useState()
    const location = useLocation();
    const search = new URLSearchParams(location.search).get('eventType');
    const eventCollectionRef = collection(db, 'events');

    const searchData = async () => {
        if (!search) return;

        try {
            if (search.length < 2) {
                setEvents([]);
                return;
            }
            const allEventsQuerySnapshot = await getDocs(eventCollectionRef);
            const allEventsData = allEventsQuerySnapshot.docs.map((doc) => doc.data());
            const filteredEvents = allEventsData.filter((event) => {
                // Convert eventType and search to lowercase for case-insensitive search
                const eventTypeLowerCase = event.eventType.toLowerCase();
                const searchLowerCase = search.toLowerCase();

                // Check if the eventType contains the search substring
                return eventTypeLowerCase.includes(searchLowerCase);
            });

            setEvents(filteredEvents);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };




    useEffect(() => {
        searchData();
    }, [search]);

    return (
        <div>
            {events.length > 0 ? (

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

                            {currentUser ?
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
                                : <> </>}


                            {currentUser && currentUser.email === "artan.ebibi@live.com" ?
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

            ) : (
                <h1>No "{search}" events</h1>
            )}
        </div>
    );

};

export default EventsBySearch;
