import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getEvents } from "./EventManager.js"

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
                    </section>
                )
            })}
        </article>
    )
}