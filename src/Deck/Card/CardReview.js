import React, { useState } from "react";

function CardReview({card}) {
    const [showFront, setShowFront] = useState(true)
    const front = card && card.front 
    const back = card && card.back

    return (
        <div>
            <h1>{showFront ? front : back}</h1>
            <button onClick={()=>setShowFront(!showFront)}>Turn</button>
        </div>
    );
}

export default CardReview;
