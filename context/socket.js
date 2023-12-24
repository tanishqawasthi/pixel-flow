import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Creating a React context to provide the socket instance to components
const SocketContext = createContext(null);

// Custom hook to easily access the socket instance within components
export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
}

// SocketProvider component responsible for setting up and managing the socket connection
export const SocketProvider = (props) => {
    const { children } = props;

    // State to hold the socket instance
    const [socket, setSocket] = useState(null);

    // useEffect hook to run the socket connection setup when the component mounts
    useEffect(() => {
        // Creating a new socket connection using the io function from the "socket.io-client" library
        const connection = io();
        console.log("Socket connection", connection)
        // Updating the socket state with the newly created socket connection
        setSocket(connection);

        // The useEffect cleanup function, which is called when the component unmounts
        return () => {
            // Closing the socket connection to prevent memory leaks
            connection.disconnect();
        };
    }, []);  // The empty dependency array ensures that this effect runs only once when the component mounts

    // Adding an event listener for the 'connect_error' event on the socket
    socket?.on('connect_error', async(err) => {
        console.log("Error in establishing socket with server", err)

        // In case of a connection error, attempt to fetch a specific API endpoint ('/api/socket')
        await fetch('/api/socket')
    })

    // Providing the socket instance to the components through the SocketContext.Provider
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
