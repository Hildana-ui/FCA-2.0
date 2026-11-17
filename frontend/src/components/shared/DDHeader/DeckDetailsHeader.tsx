import React from 'react';
import './DeckDetailsHeader.css';

interface Card {
    id: number,
    name: string,
    chapters: number,
    no_of_cards: number
}

interface DeckDetailsHeaderProps {
    cards: Card[]
}


function DeckDetailsHeader({cards} : DeckDetailsHeaderProps) {
    return (

        <div className='ddheader-container'>
            {cards?.map((card) => (
                <React.Fragment key={card.id}>
                <div className='left-container'>
                    <div className='back-btn'><i className="fa-solid fa-chevron-left"></i></div>
                    <div className='left-text-container'>
                        <h1 className='deck-title'>{card.name}</h1>
                        <div className='card-info-container'>
                            <p className='chapter'><i className="fa-solid fa-copy"></i>{card.chapters} Chapters</p>
                            <span className='dot'></span>
                            <p className='card-number'><i className="fa-solid fa-layer-group"></i>{card.no_of_cards} Cards</p>
                        </div>
                    </div>
                </div>

                <div className='right-container'>
                    <button className='review-all-btn'><i className="fa-solid fa-play"></i> Review All</button>
                    <img className='profile-img'></img>
                </div>
                </React.Fragment>
            ))}
        </div>
    
    )
}

export default DeckDetailsHeader;