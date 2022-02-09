import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "./EventManager.js"

export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {events.map((event) => {
                return (
                    <section>
                        <h1>{event.game.title}</h1>

                        {event.description}

                        {event.date} at {event.time}

                        {
                            event.joined ? <button onClick={() => { leaveEvent(event.id).then(res => setEvents(res))}}>Leave</button> : <button onClick={() => { joinEvent(event.id).then(res => setEvents(res))}}>Join</button>
                        }
                        <button onClick={() => {
                    history.push({ pathname: `/events/${event.id}/update`})
                        }}>Edit</button>
                        <button onClick={() => {
                    deleteEvent(event, event.id)
                    .then(res => setEvents(res))
                        }}>EXTERMINATE</button>
                    </section>
                )
            })}
        </article>
    )
}