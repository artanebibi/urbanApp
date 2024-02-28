import './component.css'
import './component3.css'
import {useGlobalContext} from "../Context/GlobalContext";
import React from "react";
import {useAuth} from "../Context/AuthContext";
import {Link, useNavigate} from "react-router-dom";

const Sports = () => {
    const {currentUser, logout} = useAuth();
    const navigate = useNavigate()
    const handleSearchEvents = (venueName) => {
        // if (currentUser && currentUser.email == null) {
            const encodedVenueName = encodeURIComponent(venueName);
            navigate(`/search?eventType=${encodedVenueName}`);
        // }
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

    // {currentUser && currentUser.email === "artan.ebibi@live.com" ?
    //     <button style={{
    //         background: 'black',
    //         marginTop: '-46px',
    //         position: 'absolute',
    //         marginLeft: '155px'
    //     }}
    //             onClick={() => deleteVenue(venue.id)}>Remove venue
    //     </button> : <> </>}

    return <div>
        <h1 style={{fontFamily: 'requema', fontSize: '3rem'}}>
            Sport halls and places
        </h1>
        <Link to="/Explore">
            <div style={{position: 'sticky', zIndex: '1000', top: '20px', marginRight: '20px', marginLeft: '85%'}}
                 className="goBack">
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <i className="material-icons profile-icon" style={{
                    fontSize: '2rem', color: "black", padding: '3px', borderRadius: '90px', border: '4px solid black'
                }}>arrow_back</i>
            </div>
        </Link>
        <div style={{marginBottom: '120px'}}></div>
        <div className="venueCard-container">

        {venues
            .filter((venue) => venue.type === "Sports")
            .map((venue) => (
                <div key={venue.id}>

                <div className="card" style={{background: 'lightblue', marginBottom: '40px'}}>
                        <div className="card__wrapper">
                            <div className="card__back">
                                <svg xlinkHref="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 24" height="24"
                                     width="14">
                                    <path stroke-linejoin="round" stroke-linecap="round" stroke-width="3" stroke="#000"
                                          d="M12 2L2 12L12 22"></path>
                                </svg>
                            </div>
                            <div className="card__menu">
                                <svg xlinkHref="http://www.w3.org/2000/svg" width="29" viewBox="0 0 29 14" height="14"
                                     fill="none">
                                    <path fill="#000"
                                          d="m16.5714 9.16667h10.3572c.5493 0 1.0762.22827 1.4647.6346s.6067.95743.6067 1.53203c0 .5747-.2182 1.1258-.6067 1.5321s-.9154.6346-1.4647.6346h-10.3572c-.5493 0-1.0762-.2283-1.4647-.6346s-.6067-.9574-.6067-1.5321c0-.5746.2182-1.1257.6067-1.53203s.9154-.6346 1.4647-.6346zm-14.49997-8.66667h24.85717c.5493 0 1.0762.228273 1.4647.6346.3885.40633.6067.95743.6067 1.53207 0 .57463-.2182 1.12573-.6067 1.53206s-.9154.6346-1.4647.6346h-24.85717c-.54938 0-1.076254-.22827-1.464722-.6346s-.606708-.95743-.606708-1.53206c0-.57464.21824-1.12574.606708-1.53207.388468-.406327.915342-.6346 1.464722-.6346z"></path>
                                </svg>
                            </div>
                        </div>
                        <h2 style={{
                            color: 'black',
                            textAlign: 'center',
                            paddingBottom: '15px',
                            fontSize: '27px',
                            fontFamily: 'requema'
                        }}>{venue.name}</h2>
                        <div className="card__img" style={{background: 'floralwhite'}}>
                            <svg className="football" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"
                                 style={{marginLeft: '45px', marginTop: '10px'}}>
                                <g fill="brown" fill-rule="evenodd">
                                    <path
                                        d="M10.4711111 39.0044444c.04894-3.8343887.4176255-7.6580143 1.1022222-11.4311111L17.7777778 24.32c-.9652971 4.8356205-1.459461 9.753444-1.4755556 14.6844444h7.52v-3.8577777c.6036632-.3993489 1.2909413-.6547974 2.0088889-.7466667v3.5555556h5.3333333V34.4h1.9911112v3.5555556h5.3333333V34.4h2.0088889v3.5555556h5.3333333V34.4H47.84v3.5555556h5.1733333V34.4c.7179476.0918693 1.4052258.3473178 2.0088889.7466667v3.8577777h7.8222222c-.0156475-4.9310235-.5098156-9.8488902-1.4755555-14.6844444l6.1866667 3.2533333c.6839429 3.7731874 1.0526232 7.5967584 1.1022222 11.4311111h10.2933333C77.7422222 31.36 61.1377778 16 39.3955556 16 17.6533333 16 1.3688889 31.1466667 0 39.0044444h10.4711111z"/>
                                    <path
                                        d="M68.7288889 40.7822222c-.078548 3.8418891-.4709654 7.6709317-1.1733333 11.4488889l-6.2222223 3.04c.9481791-4.7782102 1.4422316-9.6354013 1.4755556-14.5066667h-7.6977778V44.32c-.5981237.3973855-1.2791754.6527799-1.9911111.7466667v-3.5555556h-5.2444444v3.5555556h-1.9911112v-3.5555556h-5.3333333v3.5555556h-2.0266667v-3.5555556h-5.3333333v3.5555556h-2.0088889v-3.5555556h-5.3333333v3.5555556c-.7140552-.0507373-1.4071584-.2635321-2.0266667-.6222223v-3.5555555H16.32c.0341662 4.8350461.5222341 9.6562045 1.4577778 14.4l-6.2222222-3.04C10.8764915 48.469044 10.5078542 44.6399717 10.4533333 40.8H0c1.0311111 7.7688889 17.4933333 22.8444444 39.6266667 22.8444444 22.1333333 0 38.24-15.2533333 39.4133333-22.8622222H68.7288889z"
                                        opacity=".8"/>
                                </g>
                            </svg>
                        </div>
                        <p style={{marginBottom: '-20px', fontFamily: 'fira', fontWeight: 'bold'}}>Working
                            hours: {venue.hours}</p>
                        <p style={{
                            marginBottom: '-20px',
                            fontFamily: 'fira',
                            fontWeight: 'bold'
                        }}>Address: {venue.address}</p>
                        <p style={{
                            marginBottom: '-20px',
                            fontFamily: 'fira',
                            fontWeight: 'bold'
                        }}>Contact: {venue.contact}</p>

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

export default Sports;