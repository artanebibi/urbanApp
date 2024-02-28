import {createContext, useContext, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {db} from '../firebase';
import {getDocs, collection, addDoc, doc, deleteDoc, where, query} from 'firebase/firestore';
import {useAuth} from './AuthContext';


const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const ContextProvider = ({children}) => {

    const [venues, setVenues] = useState([]);
    const [events, setEvents] = useState([]);
    const [favoriteEvents, setFavoriteEvents] = useState([]); // State to store favorite events
    const venueCollectionRef = collection(db, 'venues');
    const eventCollectionRef = collection(db, 'events');
    const favoriteEventsRef = collection(db, 'Favourite events');
    const [error, setError] = useState("");
    const {currentUser, logout} = useAuth();
    const navigate = useNavigate()


    const getVenues = async () => {
        try {
            const data = await getDocs(venueCollectionRef)
            const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setVenues(filteredData);
        } catch (err){
            console.error(err);
        }
    };


    const getEvents = async () => {
        try {
            const data = await getDocs(eventCollectionRef);
            const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setEvents(filteredData);
        } catch (err) {
            console.error(err);
        }
    };

    const getUserFavoriteEvents = async () => {
        try {
            const userFavoriteEventsQuery = query(favoriteEventsRef, where("userEmail", "==", currentUser.email));
            const data = await getDocs(userFavoriteEventsQuery);
            const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setFavoriteEvents(filteredData);
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        getVenues();
        // Call function to get events data when the component mounts
        getEvents();

        // Call function to get user's favorite events when the component mounts
        getUserFavoriteEvents();

    }, []);


    // -----------------------------------------


    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate('/LogIn')
        } catch {
            setError("Failed to log out")
        }
    }


    //adding new venues

    const [newAddress, setNewAddress] = useState("")
    const [newHours, setNewHours] = useState("")
    const [newName, setNewName] = useState("")
    const [venueType, setVenueType] = useState("")
    const [newContact, setNewContact] = useState("");

    const onSubmitNewVenue = async () => {
        try {
            const venueData = {
                type: venueType,
                contact: newContact,
                name: newName,
                hours: newHours,
                address: newAddress,
            };

            // Add the new venue data to the local state
            setVenues((prevVenues) => [venueData, ...prevVenues]);

            // Clear the input fields
            setVenueType('');
            setNewContact('');
            setNewName('');
            setNewHours('');
            setNewAddress('');

            // Add the new venue data to Firestore
            const docRef = await addDoc(collection(db, 'venues'), venueData);
            console.log('Document written with ID: ', docRef.id);
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };



    //adding new events
    const [newType, setNewType] = useState("")
    const [newDate, setNewDate] = useState("")
    const [newTime, setNewTime] = useState("")
    const [newLocation, setNewLocation] = useState("")
    const [newPerformers, setNewPerformers] = useState("")
    const [newPhoneNumber, setNewPhoneNumber] = useState("")

    const onSubmitNewEvent = async () => {
        try {
            await addDoc(eventCollectionRef, {
                eventType: newType,
                date: newDate,
                time: newTime,
                location: newLocation,
                performers: newPerformers,
                pnumber: newPhoneNumber
            })
            getEvents();
        } catch (err) {
            console.error(err)
        }
    }

    const deleteVenue = async (id) => {
        const venueDoc = doc(db, 'venues', id); // Assuming the collection name is 'venues'

        try {
            console.log('Deleting venue from Firestore...');
            await deleteDoc(venueDoc);

            console.log('Venue deleted from Firestore.');

            // Update local state
            setVenues((prevVenues) => prevVenues.filter((venue) => venue.id !== id));

            console.log('Local state updated.');
        } catch (error) {
            console.error('Error deleting venue:', error);
        }
    };

//ive left off here: when i favour the event it goes well, after i delete the event for the first time, it doesnt delete it from any of the collections
    //but when i delete it for the second time it deletes it well from both of the collections
    //the delete function works on second time only idk why

    const deleteEvent = async (id) => {
        const eventDoc = doc(db, "events", id);
        console.log('Deleting event with id:', id);

        console.log('eventDoc:', eventDoc);

        try {
            console.log("Deleting event from Firestore...");
            await deleteDoc(eventDoc);

            // Check if the event exists in favorite events
            const favEventQuery = query(collection(db, "Favourite events"), where("eventId", "==", id));
            const favEventSnapshot = await getDocs(favEventQuery);

            if (!favEventSnapshot.empty) {
                const favEventDoc = favEventSnapshot.docs[0];
                await deleteDoc(favEventDoc.ref);
            }

            console.log("Event deleted from Firestore.");

            // Update local state
            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
            setFavoriteEvents((prevFavoriteEvents) => prevFavoriteEvents.filter((event) => event.id !== id));

            console.log("Local state updated.");
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };



    //currently it adds to the favorite collection but when I delete an event it doesn't delete it from that collection

    const addToFavorites = async (event) => {
        try {
            const favoriteEventsCollectionRef = collection(db, "Favourite events");

            // Add the entire event to the "Favorite events" collection and include the user's email
            const newDocRef = await addDoc(favoriteEventsCollectionRef, {
                ...event,
                userEmail: currentUser.email,
                eventId: event.id, // Add the eventId field to link the events
            });
            event.id = newDocRef.id;
            setFavoriteEvents((prevFavoriteEvents) => [...prevFavoriteEvents, event]);

            console.log("Event added to favorites:", event);
        } catch (error) {
            console.error("Error adding event to favorites:", error);
        }
    };



    const removeFromFavorites = async (event) => {
        try {
            const favoriteEventId = favoriteEvents.find((favEvent) => favEvent.id === event.id)?.id;
            if (favoriteEventId) {
                const favoriteEventDocRef = doc(db, "Favourite events", favoriteEventId);
                await deleteDoc(favoriteEventDocRef); // Delete the document from Firestore

                event.isFavorited = false; // Mark the event as not favorited
                setFavoriteEvents(favoriteEvents.filter((favEvent) => favEvent.id !== event.id)); // Update the state
            }

            console.log("Event removed from favorites:", event);
        } catch (error) {
            console.error("Error removing event from favorites:", error);
        }
    };


    return (
        <GlobalContext.Provider value={{
            venues,
            setVenues,
            events,
            setEvents,
            favoriteEvents,
            getEvents,
            getVenues,
            getUserFavoriteEvents,
            onSubmitNewEvent,
            addToFavorites,
            removeFromFavorites,
            deleteEvent,
            deleteVenue,
            setNewType,
            setNewDate,
            setNewTime,
            setNewLocation,
            setNewPerformers,
            setNewPhoneNumber,
            setNewAddress,
            setNewHours,
            setNewName,
            setVenueType,
            setNewContact,
            onSubmitNewVenue,

        }}>
            {children}
        </GlobalContext.Provider>
    )

}


