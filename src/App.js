import React from 'react';
import {BrowserRouter as Router, Switch, Route, Routes} from 'react-router-dom';

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Explore from './Components/Explore';
import Events from './Components/Events';
import SignUp from './Components/SignUp';
import LogIn from './Components/LogIn';
import Account from './Components/Account';
import CoffeeShop from './Components/CoffeeShop';
import Sports from './Components/Sports';
import Restaurant from './Components/Restaurant';
import PubNbar from './Components/PubNbar';
import Clubs from './Components/Clubs';
import EventsBySearch from './Components/EventsBySearch';
import {AuthProvider} from "./Context/AuthContext";
import {ContextProvider} from "./Context/GlobalContext";

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <ContextProvider>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/Explore" element={<Explore/>}/>
                        <Route path="/Events" element={<Events/>}/>
                        <Route path="/SignUp" element={<SignUp/>}/>
                        <Route path="/LogIn" element={<LogIn/>}/>
                        <Route path="/Account" element={<Account/>}/>
                        <Route path="/CoffeeShop" element={<CoffeeShop/>}/>
                        <Route path="/Sports" element={<Sports/>}/>
                        <Route path="/Restaurant" element={<Restaurant/>}/>
                        <Route path="/PubNbar" element={<PubNbar/>}/>
                        <Route path="/Clubs" element={<Clubs/>}/>
                        <Route path="/search" element={<EventsBySearch/>}/>
                    </Routes>
                </ContextProvider>

            </AuthProvider>
        </div>
    );
}

export default App;
