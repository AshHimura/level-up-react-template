import React, { useState, useEffect } from "react"
import { useHistory,useParams } from 'react-router-dom'
import { getGameById, getGameTypes, updateGame } from './GameManager.js'


export const UpdateGameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const { gameId } = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skill_level: 1,
        number_of_players: 0,
        title: "",
        maker: "",
        game_type: 0
    })


    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameById(gameId)
        .then(data => setCurrentGame({ 
            skill_level: data.skill_level,
            number_of_players: data.number_of_players,
            title: data.title,
            maker: data.maker,
            game_type: data.game_type.id}))
        .then(getGameTypes()
        .then(data => setGameTypes(data)))
    }, [gameId])
    
    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        domEvent.preventDefault()
        const copy = {...currentGame}
        let ki = domEvent.target.name
        copy[ki] = domEvent.target.value
        setCurrentGame(copy)
    }

    return (
        <form method="post" enctype="multipart/form-data" className="gameForm">
            <h2 className="gameForm__title">UPDATE Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        defaultValue={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        defaultValue={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" name="skill_level" required autoFocus className="form-control"
                        defaultValue={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="number_of_players" required autoFocus className="form-control"
                        defaultValue={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type">Game Type: </label>
                    <select name="game_type" className="form-control"
                        value={currentGame.game_type}
                        onChange={changeGameState}>

                        <option value="0">Select a game type</option>
                        {
                            gameTypes.map(e => (
                                <option key={e.id} value={e.id}>
                                    {e.label}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    // TODO: Call the update function & route to the Game list  

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level),
                        game_type: parseInt(currentGame.game_type)
                    }
                    updateGame(game, gameId)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}