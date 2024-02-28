import React from 'react';
import './component3.css';
import './component2.css';
import './component.css';
import {useGlobalContext} from '../Context/GlobalContext';
import {collection, deleteDoc, doc, getDocs, query, where} from 'firebase/firestore';
import {db} from '../firebase';
import {useAuth} from '../Context/AuthContext';
import {Link, useNavigate} from "react-router-dom";

const Clubs = () => {
    const {currentUser, logout} = useAuth();
    const navigate = useNavigate()
    const handleSearchEvents = (venueName) => {
        const encodedVenueName = encodeURIComponent(venueName);
        navigate(`/search?eventType=${encodedVenueName}`);
    };
    const {
        venues,
        deleteVenue,
        setVenues,
        setEvents,
        setFavoriteEvents,
        setNewContact,
        setVenueType,
        setNewName,
        setNewHours,
        setNewAddress,
    } = useGlobalContext();


    return (
        <div>
            <h1 style={{fontFamily: 'requema', fontSize: '3rem'}}>
                Night clubs
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

            <div className="venueCard-container">

            {venues
                .filter((venue) => venue.type === 'Clubs')
                .map((venue) => (


                    <div key={venue.id} >
                        <br/>
                        <div className="card" style={{background: 'darkred', marginBottom: '40px'}}>
                            <div className="card__wrapper">
                                <div className="card__back">
                                    <svg xlinkHref="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 24"
                                         height="24" width="14">
                                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="3"
                                              stroke="#000"
                                              d="M12 2L2 12L12 22"></path>
                                    </svg>
                                </div>
                                <div className="card__menu">
                                    <svg xlinkHref="http://www.w3.org/2000/svg" width="29" viewBox="0 0 29 14"
                                         height="14" fill="none">
                                        <path fill="#000"
                                              d="m16.5714 9.16667h10.3572c.5493 0 1.0762.22827 1.4647.6346s.6067.95743.6067 1.53203c0 .5747-.2182 1.1258-.6067 1.5321s-.9154.6346-1.4647.6346h-10.3572c-.5493 0-1.0762-.2283-1.4647-.6346s-.6067-.9574-.6067-1.5321c0-.5746.2182-1.1257.6067-1.53203s.9154-.6346 1.4647-.6346zm-14.49997-8.66667h24.85717c.5493 0 1.0762.228273 1.4647.6346.3885.40633.6067.95743.6067 1.53207 0 .57463-.2182 1.12573-.6067 1.53206s-.9154.6346-1.4647.6346h-24.85717c-.54938 0-1.076254-.22827-1.464722-.6346s-.606708-.95743-.606708-1.53206c0-.57464.21824-1.12574.606708-1.53207.388468-.406327.915342-.6346 1.464722-.6346z"></path>
                                    </svg>
                                </div>
                            </div>
                            <h2 style={{
                                color: 'gray',
                                textAlign: 'center',
                                paddingBottom: '15px',
                                fontSize: '27px',
                                fontFamily: 'requema'
                            }}>{venue.name}</h2>
                            <div className="card__img">
                                <svg xlinkHref="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 24 24">
                                    <linearGradient y2="14.26279" y1="7.881249" x2="18.333574" x1="4.648317"
                                                    gradientUnits="userSpaceOnUse" id="a">
                                        {/*<stop stop-opacity=".2" stop-color="#fff" offset="0"></stop>*/}
                                        {/*<stop stop-opacity="0" stop-color="#fff" offset="1"></stop>*/}
                                    </linearGradient>
                                    <path fill="#303c42"
                                          d="m23.8535156 1.6464844-1.5-1.5c-.1953125-.1953125-.5117188-.1953125-.7070312 0l-1.9173584 1.9173584c-.1885986-.098999-.4240723-.0759277-.5826416.0826416l-3.7880859 3.7880859c-1.9462891-.5317383-4.0078125.0078125-5.4482422 1.4477539l-9.0566406 9.0571289c-.5507813.5498047-.8535157 1.2817383-.8535157 2.0605469s.3027344 1.5107422.8535156 2.0605469l2.5859375 2.5859375c.5507813.5502929 1.2832031.8535156 2.0605469.8535156s1.5097656-.3032227 2.0605469-.8535156l9.0566406-9.0571289c1.4404297-1.4394531 1.9814453-3.5014648 1.4482422-5.4477539l3.7880859-3.7880859c.1585693-.1585693.1816406-.394043.0826416-.5826416l1.9173584-1.9173584c.1953125-.1953126.1953125-.5117188 0-.7070313z"></path>
                                    <path transform="matrix(.7071068 -.7071068 .7071068 .7071068 -8.470512 10.550131)"
                                          fill="#9f614b" d="m4.757184 11.757184h7.485388v7.485388h-7.485388z"></path>
                                    <path fill="#676f4b"
                                          d="m6.8535156 22.4394531c-.7246094.7226562-1.9824219.7226562-2.7070312 0l-2.5859375-2.5859375c-.3613281-.3613281-.5605469-.8417968-.5605469-1.3535156s.1992188-.9921875.5605469-1.3535156l.9394531-.9394532 5.2929688 5.2929688z"></path>
                                    <path fill="#676f4b"
                                          d="m17.1464844 8.1464844c-.1337891.1337891-.1806641.3320312-.1210938.5117188.5576172 1.6699219.1298828 3.4799805-1.1152344 4.7241211l-1.4103394 1.4104614-5.2929687-5.2929688 1.4103394-1.4104614c.8837891-.8833008 2.0527344-1.3549805 3.2548828-1.3549805.4902344 0 .9863281.0786133 1.4697266.2397461.1806641.0615234.3779297.0131836.5117188-.1206055l3.6464843-3.6464844 1.2929688 1.2929688z"></path>
                                    <path opacity=".1"
                                          d="m8.4998169 10.2068481-5.2928467 5.2930909.5092774.5092773 5.2767658-5.3091717z"></path>
                                    <path opacity=".1"
                                          d="m2.0605469 17.6650391.9394531-.9580079-.5-.5-.9394531.9394531c-.3613281.3613282-.5605469.8417969-.5605469 1.3535157s.1992188.9921875.5605469 1.3535156l.4143677.4143677c-.3024903-.3477783-.4749146-.7832642-.4749146-1.2493286 0-.5117188.1992188-.9921875.5605469-1.3535156z"></path>
                                    <path opacity=".1"
                                          d="m14.3720703 7.2529297c.4902344 0 .9863281.0786133 1.4697266.2397461.1806641.0615234.3779297.0131836.5117188-.1206055l3.6578121-3.6537108-.5113278-.5113283-3.6464844 3.6464844c-.1337891.1337891-.3310547.1821289-.5117188.1206055-.4833984-.1611328-.9794922-.2397461-1.4697266-.2397461-1.2021484 0-2.3710938.4716797-3.2548828 1.3549805l-1.4103393 1.4104614.5092773.5092773 1.401062-1.4011841c.8837892-.8833007 2.0527345-1.3549804 3.2548829-1.3549804z"></path>
                                    <g fill="#fff">
                                        <path transform="matrix(.7025585 -.711626 .711626 .7025585 -9.489386 13.071864)"
                                              opacity=".2" d="m7.148615 17.527449h7.487697v.720234h-7.487697z"></path>
                                        <path opacity=".2"
                                              d="m6.3550715 21.9159241c-.7246094.7226562-1.9824219.7226562-2.7070312 0l.5.5185547c.7246094.7226562 1.9824219.7226562 2.7070312 0l.9378973-.9344788-.5113282-.5113277z"></path>
                                        <path opacity=".2"
                                              d="m17.1480408 8.14151 3.6464844-3.6464849-.5125713-.5060406-3.633913 3.6339703c-.1337891.1337891-.1806641.3320312-.1210938.5117192.5576172 1.6699219.1298828 3.4799805-1.1152344 4.7241211l-1.4258442 1.420042.5155048.5089741 1.4103394-1.4104614c1.2451172-1.2441406 1.6728516-3.0541992 1.1152344-4.7241211-.0595704-.1796874-.0126954-.3779296.1210937-.5117187z"></path>
                                    </g>
                                    <path transform="matrix(.7071068 -.7071068 .7071068 .7071068 4.654437 15.986806)"
                                          fill="#fed4a3"
                                          d="m20.533957 1.814287h2.182087v1.121427h-2.182087z"></path>
                                    <path fill="url(#a)"
                                          d="m23.8535156 1.6464844-1.5-1.5c-.1953125-.1953125-.5117188-.1953125-.7070312 0l-1.9173584 1.9173584c-.1885986-.098999-.4240723-.0759277-.5826416.0826416l-3.7880859 3.7880859c-1.9462891-.5317383-4.0078125.0078125-5.4482422 1.4477539l-9.0566406 9.0571289c-.5507813.5498047-.8535157 1.2817383-.8535157 2.0605469s.3027344 1.5107422.8535156 2.0605469l2.5859375 2.5859375c.5507813.5502929 1.2832031.8535156 2.0605469.8535156s1.5097656-.3032227 2.0605469-.8535156l9.0566406-9.0571289c1.4404297-1.4394531 1.9814453-3.5014648 1.4482422-5.4477539l3.7880859-3.7880859c.1585693-.1585693.1816406-.394043.0826416-.5826416l1.9173584-1.9173584c.1953125-.1953126.1953125-.5117188 0-.7070313z"></path>
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
    );
};

export default Clubs;
