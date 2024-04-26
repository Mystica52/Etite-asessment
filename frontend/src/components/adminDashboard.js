import React, { useState } from 'react';

const AddPage = () => {
 const [events, setEvents] = useState([
    {
      id: 1,
      title: "Event Title 1",
      location: "New York, NY",
      date: "January 1, 2023",
      ticketsAvailable: 100,
      description: "This is a description for Event Title 1."
    },
    // Add more initial events as needed
 ]);

 const [newEvent, setNewEvent] = useState({
    title: '',
    location: '',
    date: '',
    ticketsAvailable: '',
    description: ''
 });

 const [editingEvent, setEditingEvent] = useState(null);

 const handleAddEvent = () => {
    const newEventId = events.length + 1;
    setEvents([...events, { ...newEvent, id: newEventId }]);
    setNewEvent({ title: '', location: '', date: '', ticketsAvailable: '', description: '' });
 };

 const handleUpdateEvent = (id, updatedEvent) => {
    setEvents(events.map(event => event.id === id ? updatedEvent : event));
 };

 const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
 };

 return (
    <div className="container mx-auto p-4">
      {/* Form to add a new event */}
      <form onSubmit={(e) => { e.preventDefault(); handleAddEvent(); }} className="mb-4">
        <input type="text" placeholder="Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} className="border rounded-lg p-2 mb-2 w-full" />
        <input type="text" placeholder="Location" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} className="border rounded-lg p-2 mb-2 w-full" />
        <input type="text" placeholder="Date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className="border rounded-lg p-2 mb-2 w-full" />
        <input type="number" placeholder="Tickets Available" value={newEvent.ticketsAvailable} onChange={(e) => setNewEvent({ ...newEvent, ticketsAvailable: e.target.value })} className="border rounded-lg p-2 mb-2 w-full" />
        <textarea placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} className="border rounded-lg p-2 mb-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add Event</button>
      </form>

      {/* List of events */}
      <ul>
        {events.map(event => (
          <li key={event.id} className="border rounded-lg p-4 mb-4">
            <h3 className="text-xl font-bold">{event.title}</h3>
            <p>Location: {event.location}</p>
            <p>Date: {event.date}</p>
            <p>Tickets Available: {event.ticketsAvailable}</p>
            <p>Description: {event.description}</p>
            <button onClick={() => handleDeleteEvent(event.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2">Delete</button>
            <button onClick={() => setEditingEvent(event)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg mt-2">Update</button>
            {editingEvent && editingEvent.id === event.id && (
              <form onSubmit={(e) => { e.preventDefault(); handleUpdateEvent(event.id, { ...editingEvent, ...newEvent }); setEditingEvent(null); }} className="mt-4">
                <input type="text" placeholder="Title" value={editingEvent.title} onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })} className="border rounded-lg p-2 mb-2 w-full" />
                <input type="text" placeholder="Location" value={editingEvent.location} onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })} className="border rounded-lg p-2 mb-2 w-full" />
                <input type="text" placeholder="Date" value={editingEvent.date} onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })} className="border rounded-lg p-2 mb-2 w-full" />
                <input type="number" placeholder="Tickets Available" value={editingEvent.ticketsAvailable} onChange={(e) => setEditingEvent({ ...editingEvent, ticketsAvailable: e.target.value })} className="border rounded-lg p-2 mb-2 w-full" />
                <textarea placeholder="Description" value={editingEvent.description} onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })} className="border rounded-lg p-2 mb-2 w-full" />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2">Update Event</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
 );
};

export default AddPage;
