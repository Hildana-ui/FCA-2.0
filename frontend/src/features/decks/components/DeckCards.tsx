import './DeckCards.css'

interface Deck {
    id: string,
    name: string,
    no_of_cards: number,
    to_review: number
}

interface DeckCardsListProps {
    decks: Deck[];
}

function DeckCards({ decks }: DeckCardsListProps) {
    console.log(decks);
    return (
        <div className='deck-container'>
            {decks?.map((deck) => (
                <div key={deck.id} className='card-container'>
                    {deck.to_review > 0 && <div className='due-review'>{deck.to_review} DUE</div>}

                    <div>
                        <h2 className='deck-title'>{deck.name}</h2>
                        <p className='deck-number'><i className="fa-solid fa-layer-group"></i> {deck.no_of_cards}</p>
                    </div>

                    {deck.to_review > 0 ? <button className='btn study-btn'>Study Now <i className="fa-solid fa-chevron-right"></i></button> :
                        <button className='btn view-deck-btn'>View Deck</button>
                    }
                </div>
            ))}
        </div>
    )
}

export default DeckCards;