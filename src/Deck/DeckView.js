import React, { useContext } from "react";
import { DeckContext } from "./index"

function DeckView() {
    const { cards, setCards } = useContext(DeckContext)
    return (
        <div>
            <h1>Deck View</h1>
            <table className="card-table">
                <thead>
                    <tr>
                        <th>Front</th>
                        <th>Back</th>
                    </tr>
                </thead>
                <tbody>
                    {cards.map((card) => (
                        <tr key={card.id}>
                            <td>{card.data.front}</td>
                            <td>{card.data.back}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DeckView;
