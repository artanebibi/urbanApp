import React from 'react';
import './component2.css';
import './component3.css';
import {useGlobalContext} from '../Context/GlobalContext';
import {collection, deleteDoc, doc, getDocs, query, where} from 'firebase/firestore';
import {db} from '../firebase';
import {useAuth} from '../Context/AuthContext';
import {Link, useNavigate} from 'react-router-dom';


const CoffeeShop = () => {
    const {currentUser, logout} = useAuth();
    const navigate = useNavigate()
    const {
        venues,
        deleteVenue,
        setVenues,
        setEvents,
        setFavoriteEvents, // You can remove this line if there's no "favorite events" collection
        setNewContact,
        setVenueType,
        setNewName,
        setNewHours,
        setNewAddress,
    } = useGlobalContext();

    const handleSearchEvents = (venueName) => {
        const encodedVenueName = encodeURIComponent(venueName);
        navigate(`/search?eventType=${encodedVenueName}`);
    };


    return (
        <div>
            <h1 style={{fontFamily: 'requema', fontSize: '3rem'}}>Coffee shops

            </h1>
            <Link to="/Explore">
                <div style={{position: 'sticky', zIndex: '1000', top: '20px', marginRight: '20px', marginLeft: '85%'}}
                     className="goBack">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                    <i className="material-icons profile-icon" style={{
                        fontSize: '2rem',
                        color: "black",
                        padding: '3px',
                        borderRadius: '90px',
                        border: '4px solid black'
                    }}>arrow_back</i>
                </div>
            </Link>
            {/*<div style={{marginBottom: '120px'}}></div>*/}
            <div className="venueCard-container">
                {venues
                    .filter((venue) => venue.type === 'Coffee Shop')
                    .map((venue) => (
                        <div key={venue.id}>
                            <br/>
                            <div className="card" style={{background: 'rgba(100, 60, 30, 1)', marginBottom: '40px'}}>
                                <div className="card__wrapper">
                                    <div className="card__back">
                                        <svg xlinkHref="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 24"
                                             height="24" width="14">
                                            <path stroke-linejoin="round" stroke-linecap="round" stroke-width="3"
                                                  stroke="#fff"
                                                  d="M12 2L2 12L12 22"></path>
                                        </svg>
                                    </div>
                                    <div className="card__menu">
                                        <svg xlinkHref="http://www.w3.org/2000/svg" width="29" viewBox="0 0 29 14"
                                             height="14" fill="none">
                                            <path fill="#fff"
                                                  d="m16.5714 9.16667h10.3572c.5493 0 1.0762.22827 1.4647.6346s.6067.95743.6067 1.53203c0 .5747-.2182 1.1258-.6067 1.5321s-.9154.6346-1.4647.6346h-10.3572c-.5493 0-1.0762-.2283-1.4647-.6346s-.6067-.9574-.6067-1.5321c0-.5746.2182-1.1257.6067-1.53203s.9154-.6346 1.4647-.6346zm-14.49997-8.66667h24.85717c.5493 0 1.0762.228273 1.4647.6346.3885.40633.6067.95743.6067 1.53207 0 .57463-.2182 1.12573-.6067 1.53206s-.9154.6346-1.4647.6346h-24.85717c-.54938 0-1.076254-.22827-1.464722-.6346s-.606708-.95743-.606708-1.53206c0-.57464.21824-1.12574.606708-1.53207.388468-.406327.915342-.6346 1.464722-.6346z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <h2 style={{
                                    color: 'floralwhite',
                                    textAlign: 'center',
                                    paddingBottom: '15px',
                                    fontSize: '27px',
                                    fontFamily: 'requema'
                                }}>{venue.name}</h2>
                                <div className="card__img" style={{background: 'black'}}>
                                    <div className="smoke" style={{marginTop: '130px'}}></div>
                                    <div className="cup" style={{marginTop: '120px'}}>
                                        <div className="coffee"></div>

                                    </div>
                                </div>
                                <p style={{marginBottom: '-20px', fontFamily: 'fira', fontWeight: 'bold'}}><span
                                    style={{color: 'floralwhite'}}>Working hours: </span>{venue.hours}</p>
                                <p style={{marginBottom: '-20px', fontFamily: 'fira', fontWeight: 'bold'}}><span
                                    style={{color: 'floralwhite'}}>Address: </span>{venue.address}</p>
                                <p style={{marginBottom: '-20px', fontFamily: 'fira', fontWeight: 'bold'}}><span
                                    style={{color: 'floralwhite'}}>Contact: </span>{venue.contact}</p>

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
    );
};

export default CoffeeShop;
