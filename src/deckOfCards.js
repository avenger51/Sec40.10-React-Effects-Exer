import React, { useState, useEffect } from 'react';

function DeckOfCards() {
    const [deckId, setDeckId] = useState(null);
    const [currentCard, setCurrentCard] = useState(null);
    const [remaining, setRemaining] = useState(null);

    //ORG
//    useEffect(() => {
//        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
//            .then(response => response.json())
//            .then(data => {
//                setDeckId(data.deck_id);
//                setRemaining(data.remaining);
//            });
//    }, []);

    const fetchNewDeck = () => {
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/')
            .then(response => response.json())
            .then(data => {
                setDeckId(data.deck_id);
                setRemaining(data.remaining);
                setCurrentCard(null);  //to reset..
            });
    };

    useEffect(() => {
        fetchNewDeck();
}, []);

    const drawCard = () => {
        if (remaining === 0) {
            alert("Error: no cards remaining!");
            return;
        }

        fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(response => response.json())
            .then(data => {
                setCurrentCard(data.cards[0].image);
                setRemaining(data.remaining);
            });
    };

    const newDeck = () => {
        fetchNewDeck();
};


    return (
        <div>
            <button onClick={drawCard}>Draw Card To Begin And Continue Drawing</button>
            {currentCard && <img src={currentCard} alt="Card" />}
            <button onClick={newDeck}>Get A New Shuffled Deck</button>
        </div>
    );
}

export default DeckOfCards;
