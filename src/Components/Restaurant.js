import './component.css'
import './component2.css'
import './component3.css'
import {useGlobalContext} from "../Context/GlobalContext";
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {useAuth} from "../Context/AuthContext";

const Restaurant = () => {
    const navigate = useNavigate()
    const handleSearchEvents = (venueName) => {
        const encodedVenueName = encodeURIComponent(venueName);
        navigate(`/search?eventType=${encodedVenueName}`);
    };
    const {currentUser, logout} = useAuth();

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

    } = useGlobalContext()

    return <div>
        <h1 style={{fontFamily: 'requema', fontSize: '3rem'}}>
            Restaurants and food places
        </h1>

        <Link to="/Explore">
            <div style={{position: 'sticky', zIndex: '1000', top: '20px', marginRight: '20px', marginLeft: '80%'}}
                 className="goBack">
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <i className="material-icons profile-icon" style={{
                    fontSize: '2rem', color: "black", padding: '3px', borderRadius: '90px', border: '4px solid black'
                }}>arrow_back</i>
            </div>
        </Link>
        <div className="venueCard-container">
            {venues
                .filter((venue) => venue.type === "Restaurant")
                .map((venue) => (
                    <div key={venue.id} className="">
                        <br/>
                        <div className="card" style={{background: 'plum', marginBottom: '40px'}}>
                            <div className="card__wrapper">
                                <div className="card__back">
                                    <svg xlinkHref="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 24"
                                         height="24"
                                         width="14">
                                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="3"
                                              stroke="#fff"
                                              d="M12 2L2 12L12 22"></path>
                                    </svg>
                                </div>
                                <div className="card__menu">
                                    <svg xlinkHref="http://www.w3.org/2000/svg" width="29" viewBox="0 0 29 14"
                                         height="14"
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
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink"
                                     viewBox="0 0 378 384" style={{marginTop: '21px'}}>
                                    <g className="food">
                                        <circle className="food-bg" cx="189" cy="192" r="174"/>
                                        <g id="plate">
                                            <path className="plate" d="M191.3,294c-14.5,0-28.5-3-41.6-8.9c-1.6-0.7-2.3-2.6-1.6-4.2c0.7-1.6,2.6-2.3,4.2-1.6
				                            c12.3,5.5,25.5,8.4,39,8.4c52.5,0,95.3-42.7,95.3-95.3c0-52.5-42.7-95.3-95.3-95.3c-1.8,0-3.3-1.4-3.3-3.2s1.3-3.2,3.1-3.2
				                                c0,0,0,0,0,0c56.3,0,101.9,45.6,101.9,101.6C293,248.4,247.4,294,191.3,294z"/>
                                            <path className="plate" d="M125.3,268.2c-0.7,0-1.5-0.2-2.1-0.8c-22.3-18.8-33.6-44.1-33.6-75.1c0-30.2,10.1-55.8,29.3-73.9
				                                c1.3-1.2,3.3-1.2,4.5,0.1c1.2,1.3,1.2,3.3-0.1,4.5C105.5,140,96,163.9,96,192.3c0,29.1,10.5,52.7,31.3,70.2
				                                c1.4,1.1,1.5,3.2,0.4,4.5C127.1,267.9,126.2,268.2,125.3,268.2z"/>
                                            <path className="plate" d="M191.3,260.7c-1.8,0-3.2-1.4-3.2-3.2s1.4-3.2,3.2-3.2c34.2,0,62-27.8,62-62s-27.8-62-62-62
				                                    c-1.8,0-3.2-1.4-3.2-3.2c0-1.8,1.4-3.2,3.2-3.2c37.7,0,68.4,30.7,68.4,68.4C259.7,230.1,229,260.7,191.3,260.7z"/>
                                        </g>
                                        <g id="utensils">
                                            <path className="utensils" d="M142,280.3h-1.6c-4.2,0-7.6-3.4-7.6-7.6v-79.6h-0.9c-2.2,0-4.2-0.8-5.7-2.4c-1.5-1.5-2.4-3.6-2.3-5.7
		                        		c0.2-36.9,3.4-99.3,22.1-103.4l3.9-0.9v192C149.6,276.9,146.2,280.3,142,280.3z M143.2,90.7c-7.7,10.3-12.9,46-13.1,94.3
		                        		c0,0.4,0.2,0.9,0.5,1.2c0.3,0.3,0.7,0.5,1.2,0.5h7.3v86c0,0.7,0.6,1.2,1.2,1.2h1.6c0.7,0,1.2-0.6,1.2-1.2V90.7z"/>
                                            <path className="utensils" d="M172.1,280.3h-6.8c-1.8,0-3.2-1.4-3.2-3.2s1.4-3.2,3.2-3.2h5.2V134.6c0-2.7,2.2-4.8,4.8-4.8h1.9V89.3
		                        		c0-1.8,1.4-3.2,3.2-3.2c1.8,0,3.2,1.4,3.2,3.2v42.1c0,2.7-2.2,4.8-4.8,4.8h-1.9v139.3C176.9,278.1,174.7,280.3,172.1,280.3z"/>
                                            <path className="utensils" d="M172.6,280.3h-6.8c-2.7,0-4.8-2.2-4.8-4.8V136.2h-1.9c-2.7,0-4.8-2.2-4.8-4.8V89.3c0-1.8,1.4-3.2,3.2-3.2
		                        		s3.2,1.4,3.2,3.2v40.5h1.9c2.7,0,4.8,2.2,4.8,4.8v139.3h5.2c1.8,0,3.2,1.4,3.2,3.2S174.4,280.3,172.6,280.3z"/>
                                            <path className="utensils" d="M172.8,127.3c-1.4,0-2.6-1.1-2.6-2.6V86.5c0-1.4,1.1-2.6,2.6-2.6c1.4,0,2.6,1.1,2.6,2.6v38.3
		                        		C175.4,126.2,174.2,127.3,172.8,127.3z"/>
                                            <path className="utensils" d="M165.3,127.3c-1.4,0-2.6-1.1-2.6-2.6V86.5c0-1.4,1.1-2.6,2.6-2.6c1.4,0,2.6,1.1,2.6,2.6v38.3
		                        		C167.8,126.2,166.7,127.3,165.3,127.3z"/>
                                        </g>
                                    </g>
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

export default Restaurant;