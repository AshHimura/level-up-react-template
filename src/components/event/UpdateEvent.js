import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { getEventById, updateEvent } from './EventManager.js'
import { getGames } from "../game/GameManager.js"


export const UpdateEventForm = () => {
    const history = useHistory()
    const [game, setGames] = useState([])
    const { eventId } = useParams()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        game: 0,
        description: "",
        date: "",
        time: "",
    })


    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGames().then(data => setGames(data))
    }, [])
    
    useEffect(() => {
        // TODO: Get the game types, then set the state
        getEventById(eventId)
        .then(data => setCurrentEvent({
            game: data.game.id,
            description: data.description,
            date: data.date,
            time: data.time}))
    }, [eventId])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        domEvent.preventDefault()
        const copy = {...currentEvent}
        let ki = domEvent.target.name
        copy[ki] = domEvent.target.value
        setCurrentEvent(copy)
    }

    return (
        <form method="post" enctype="multipart/form-data" className="gameForm">
            <h2 className="eventForm__title">Update event!</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select name="game" className="form-control"
                        value={currentEvent.game}
                        onChange={changeEventState}>

                        <option value="0">Select a game please</option>
                        {
                            game.map(g => (
                                <option kgy={g.id} value={g.id}>
                                    {g.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Description: </label>
                    <textarea type="text" name="description" required autoFocus className="form-control"
                        defaultValue={currentEvent.description}
                        onChange={changeEventState}
                    ></textarea>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        defaultValue={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        defaultValue={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            
            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        game: parseInt(currentEvent.game),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time
                    }

                    // Send POST request to your API
                    updateEvent(event, eventId)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}