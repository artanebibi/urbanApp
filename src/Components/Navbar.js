import './component.css'
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

const Navbar = () => {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/search?eventType=${search}`)
        setSearch("")
    };


    function toggleDropdown() {
        let dropdown = document.getElementById("myTopnav");
        dropdown.classList.toggle("show");
    }

    return (
        <nav>
            <div className="navbar-container">
                <div className="navbar-logo" style={{fontSize: '1.5rem', color: 'floralwhite', cursor: "pointer"}}>
                    Skopje<strong>Urban</strong>
                </div>


                <ul className="navbar-links topnav" id="myTopnav">
                    <li onClick={toggleDropdown}><Link to="/">Home</Link></li>
                    <li onClick={toggleDropdown}>
                        <Link to="/Explore">Explore</Link>
                    </li>
                    <li onClick={toggleDropdown}><Link to="/Events">Events</Link></li>


                    <div className="navbar-search">
                        <div className="search-input-container">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    onChange={(e) => setSearch(e.target.value)}
                                    value={search}

                                />
                            </form>
                            <button className="searchButton">
                                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                                <i className="material-icons profile-icon" style={{
                                    fontSize: '2rem',
                                    color: "black",
                                    // fontWeight: "light"
                                }}>search</i>
                            </button>

                        </div>
                    </div>


                    <li onClick={toggleDropdown}><Link to="/LogIn">Log In</Link></li>
                    <li onClick={toggleDropdown}><Link to="/SignUp">Sign Up</Link></li>
                    {/*<li><a href="#profile"> <img src="../helps/img.png" alt=""/>  </a></li>*/}
                    <li>
                        <Link to="/Account">
                            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                            <i className="material-icons profile-icon" style={{
                                fontSize: '2.2rem', color: "#D9D9D9"
                            }}>account_circle</i>

                        </Link>
                    </li>
                </ul>

                {/*<div>*/}
                    <input type="checkbox" id="checkbox"/>

                    <label htmlFor="checkbox" className="toggle" onClick={toggleDropdown}>
                        <div className="bars" id="bar1"></div>
                        <div className="bars" id="bar2"></div>
                        <div className="bars" id="bar3"></div>
                    </label>

                {/*</div>*/}
            </div>
        </nav>
    );
}

export default Navbar;
