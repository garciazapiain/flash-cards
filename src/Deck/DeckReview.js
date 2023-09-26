import React, { useContext, useEffect } from "react";
import CardReview from "./Card/CardReview";
import { DeckContext } from "./index"
import { updateCard } from "../api";

function DeckReview({deckInReview}) {
    const { cards, setCards } = useContext(DeckContext)
    const [cardInReview, setCardInReview] = React.useState(0)
    const [reviewInProgress, setReviewInProgress] = React.useState(true)

    async function correctCard() {
        // Increment the "deck" property for the current card
        const lastDeck = (deckInReview == 4)
        try {
            !lastDeck && await updateCard(cards[cardInReview].id, 1);
            if (cardInReview < cards.length - 1) {
                setCardInReview(prev => prev + 1);
            }
            else {
                setReviewInProgress(false);
            }
        }
        catch {
            console.error('error')
        }
    }

    async function wrongCard() {
        // Increment the "deck" property for the current card
        const firstDeck = (deckInReview == 1)
        console.log(firstDeck)
        try {
            !firstDeck && await updateCard(cards[cardInReview].id, -1);
            if (cardInReview < cards.length - 1) {
                setCardInReview(prev => prev + 1);
            }
            else {
                setReviewInProgress(false);
            }
        }
        catch {
            console.error('error')
        }
    }

    useEffect(() => {
        if (cards.length > 0) {
            if (cards.length === cardInReview) {
                setReviewInProgress(false);
            }
        }
    }, [cardInReview, cards.length]);

    return (
        reviewInProgress && cards.length ? (
            <div>
                <h1>Deck Review</h1>
                <CardReview card={cards[cardInReview].data} />
                <button onClick={correctCard}>Correct</button>
                <button onClick={wrongCard}>Wrong</button>
            </div>
        ) : (
            <div>
                <h1>Finished</h1>
            </div>
        )
    );
}

export default DeckReview;
