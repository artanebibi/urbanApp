import './component.css'
import './component2.css'
import './component3.css'
import {useGlobalContext} from "../Context/GlobalContext";
import {useAuth} from "../Context/AuthContext";
import React from "react";
import {Link, useNavigate} from "react-router-dom";

const PubNBar = () => {
    const {currentUser, logout} = useAuth()
    const navigate = useNavigate()

    const handleSearchEvents = (venueName) => {
        const encodedVenueName = encodeURIComponent(venueName);
        navigate(`/search?eventType=${encodedVenueName}`);
    };
    const {
        venues,
        deleteVenue,
        events,
        favoriteEvents,
        getVenues,
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

    } = useGlobalContext();

    return <div>
        <h1 style={{fontFamily: 'requema', fontSize: '3rem'}}>
            Pubs n' bars
        </h1>        <Link to="/Explore">
        <div style={{position: 'sticky', zIndex: '1000', top: '20px', marginRight: '20px', marginLeft: '85%'}}
             className="goBack">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <i className="material-icons profile-icon" style={{
                fontSize: '2rem', color: "black", padding: '3px', borderRadius: '90px', border: '4px solid black'
            }}>arrow_back</i>
        </div>
    </Link>
        <div className="venueCard-container">

        {venues
            .filter((venue) => venue.type === 'Pub and Bar')
            .map((venue) => (
                <div key={venue.id}>
                    <br/>
                    <div className="card" style={{background: 'hsla(172, 95%, 18%, 1)', marginBottom: '40px'}}>
                        <div className="card__wrapper">
                            <div className="card__back">
                                <svg xlinkHref="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 24" height="24"
                                     width="14">
                                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="3" stroke="#fff"
                                          d="M12 2L2 12L12 22"></path>
                                </svg>
                            </div>
                            <div className="card__menu">
                                <svg xlinkHref="http://www.w3.org/2000/svg" width="29" viewBox="0 0 29 14" height="14"
                                     fill="none">
                                    <path fill="#fff"
                                          d="m16.5714 9.16667h10.3572c.5493 0 1.0762.22827 1.4647.6346s.6067.95743.6067 1.53203c0 .5747-.2182 1.1258-.6067 1.5321s-.9154.6346-1.4647.6346h-10.3572c-.5493 0-1.0762-.2283-1.4647-.6346s-.6067-.9574-.6067-1.5321c0-.5746.2182-1.1257.6067-1.53203s.9154-.6346 1.4647-.6346zm-14.49997-8.66667h24.85717c.5493 0 1.0762.228273 1.4647.6346.3885.40633.6067.95743.6067 1.53207 0 .57463-.2182 1.12573-.6067 1.53206s-.9154.6346-1.4647.6346h-24.85717c-.54938 0-1.076254-.22827-1.464722-.6346s-.606708-.95743-.606708-1.53206c0-.57464.21824-1.12574.606708-1.53207.388468-.406327.915342-.6346 1.464722-.6346z"></path>
                                </svg>
                            </div>
                        </div>
                        <h2 style={{
                            color: 'lightgoldenrodyellow',
                            textAlign: 'center',
                            paddingBottom: '15px',
                            fontFamily: 'requema'
                        }}>{venue.name}</h2>
                        <div className="card__img" style={{background: 'lightgoldenrodyellow'}}>
                            <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg"
                                 xmlns="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                 width="100%" height="500px" viewBox="0 0 560 960"
                                 xml="preserve" style={{marginLeft: '-8px', marginTop: '15px'}}>

                                <path className="beer" d="M147,386.582c0,0,0.833,235.875,0.833,257.209S168.333,668,172.667,668s145.667,0,154.333,0s17-11,17-28
                            	s0-253,0-253L147,386.582z"/>
                                <path className="schaum" d="M344,387l-132-0.418V422c0,0-2,16.75-20.75,16.75S171,428.25,171,423.5c0-5.25,0-36.5,0-36.5
                            	s-12.25-0.334-24-0.418c-19.625-2.457-23-25.332-3.625-38.832c-7.5-30.25,64.063-94.25,107.896-16.418
                            	c15.333-15.5,39.781-19,49.115,14.168c3.666-24.834,10.437-43.25,42.974-43.25c28.668,0,41.457,27.082,41.457,41.422
                            	C384.814,375,356.732,387,346.215,387H344z"/>
                                <path className="handle" d="M348,597c0,0,27.75,0,53,0c14,0,20.5-16.5,20.5-25.5c0-4.25,0.355-99,0.355-113.75S407.75,437,399.25,437
                            	S348,437,348,437"/>
                                <path className="outline" d="M147,385.481c0,0,0.833,235.875,0.833,257.209s20.5,24.209,24.834,24.209s145.667,0,154.333,0s17-11,17-28
                            	s0-48,0-48v-4v-201l-132-0.418v35.418c0,0-2,16.75-20.75,16.75s-20.25-10.5-20.25-15.25c0-5.25,0-36.5,0-36.5
                            	S158.75,385.565,147,385.481c-19.625-2.457-23-25.332-3.625-38.832c-7.5-30.25,64.063-94.25,107.896-16.418
                            	c15.332-15.5,39.78-19,49.114,14.168c3.666-24.834,10.437-43.25,42.974-43.25c28.668,0,41.457,27.082,41.457,41.422
                            	c-0.002,31.328-28.084,43.328-38.602,43.328"/>
                                <line className="lines" x1="196" y1="480" x2="196" y2="562"/>
                                <line className="lines" x1="250" y1="480" x2="250" y2="562"/>
                                <line className="lines" x1="304" y1="480" x2="304" y2="562"/>

                            </svg>

                        </div>
                        <p style={{marginBottom: '-20px', fontFamily: 'fira', fontWeight: 'bold'}}><span
                            style={{color: 'lightgoldenrodyellow'}}>Working hours: </span>{venue.hours}</p>
                        <p style={{marginBottom: '-20px', fontFamily: 'fira', fontWeight: 'bold'}}><span
                            style={{color: 'lightgoldenrodyellow'}}>Address: </span>{venue.address}</p>
                        <p style={{marginBottom: '-20px', fontFamily: 'fira', fontWeight: 'bold'}}><span
                            style={{color: 'lightgoldenrodyellow'}}>Contact: </span>{venue.contact}</p>

                        <div/>
                        <div className="cta-buttons">
                            <button
                                className="download-button"
                                style={{border: '2px solid black'}}
                                onClick={() => handleSearchEvents(venue.name)}>
                                Search events in this venue
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    </div>
}

export default PubNBar;