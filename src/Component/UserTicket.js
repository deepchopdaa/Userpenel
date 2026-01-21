import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [games, setGames] = useState([]);

    // Fetch games
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const res = await axios.get("https://gamezone-r2eq.onrender.com/game/getUserGame", {
                    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
                });
                setGames(res.data);
            } catch (error) {
                console.error("Error fetching games:", error);
                toast.error("Failed to fetch game data.");
            }
        };
        fetchGames();
    }, []);

    // Fetch user tickets
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const res = await axios.get('https://gamezone-r2eq.onrender.com/ticket/bookedTicket', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                });
                setTickets(res.data);
            } catch (error) {
                toast.error('Failed to fetch tickets');
            } finally {
                setLoading(false);
            }
        };
        fetchTickets();
    }, []);

    // Get game name by ID
    const getGameName = (gameId) => {
        const game = games.find(g => g._id === gameId);
        return game ? game.title : "Unknown Game";
    };

    if (loading) {
        return (
            <div className="text-center text-light mt-5">
                <div className="spinner-border text-light" role="status"></div>
                <p className="mt-3">Loading your tickets...</p>
            </div>
        );
    }

    return (
        <div className="container  text-light">
            <div className="card bg-dark shadow-lg border-light">
                <div className="card-header text-center">
                    <h2 className="mb-0 text-light">🎟️ Your Ticket Booking Details</h2>
                </div>
                <div className="card-body">

                    {tickets.length === 0 ? (
                        <div className="alert alert-warning text-center">
                            You haven't booked any tickets yet.
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-dark table-bordered table-hover text-center">
                                <thead className="table-primary text-dark">
                                    <tr>
                                        <th>Game</th>
                                        <th>Tickets</th>
                                        <th>Date</th>
                                        <th>Time Slot</th>
                                        <th>Total (₹)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map((ticket) => (
                                        <tr key={ticket._id}>
                                            <td>{getGameName(ticket.Game_id)}</td>
                                            <td>{ticket.SeatNumber}</td>
                                            <td>{new Date(ticket.date).toLocaleDateString()}</td>
                                            <td>{ticket.time_slot}</td>
                                            <td>₹{ticket.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <ToastContainer position="bottom-right" theme="dark" />
        </div>
    );
};

export default UserTickets;
