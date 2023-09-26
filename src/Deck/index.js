import React, { useEffect, useState, createContext } from "react"
import DeckView from "./DeckView"
import DeckReview from "./DeckReview"
import { useParams } from "react-router-dom"
import { getDeckCards } from "../api"

const DeckContext = createContext();

function Index() {
    const { id } = useParams(); // Get the 'id' parameter from the URL
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    useEffect(() => {
        // Fetch cards based on the 'id' parameter from the URL
        async function loadDeckCards(id) {
            setLoading(true)
            try {
                const data = await getDeckCards(id)
                setCards(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadDeckCards(id)
    }, [id]);

    const contextValue = {
        cards,
        setCards,
    };
    return (
        <DeckContext.Provider value={contextValue}>
            <div>
                <DeckReview cards={cards} deckInReview={id} />
                <DeckView cards={cards} />
            </div>
        </DeckContext.Provider>
    );
}

export { Index, DeckContext };
