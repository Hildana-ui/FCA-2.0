import NotFoundPage from '../../../pages/NotFoundPage';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import './DeckDetailsHeader.css';


interface Deck {
    id: string,
    name: string,
    chapters: number,
    no_of_cards: number,
}

interface DeckCardsListProps {
    decks: Deck[];
}


function DeckDetailsHeader({ decks }: DeckCardsListProps) {
    const { deckId } = useParams();
    const deck = decks.find((d) => d.id === deckId);

    if (!deck) {
        return (
            <NotFoundPage page='Deck' />
        )
    }

    return (

        <div className='ddheader-container'>
                <div className='left-container'>
                    <Link to="/" className='back-btn'><i className="fa-solid fa-chevron-left"></i></Link>
                    <div className='left-text-container'>
                        <h1 className='deck-title'>{deck?.name}</h1>
                        <div className='card-info-container'>
                            <p className='chapter'><i className="fa-solid fa-copy"></i>{deck?.chapters} Chapters</p>
                            <span className='dot'></span>
                            <p className='card-number'><i className="fa-solid fa-layer-group"></i>{deck?.no_of_cards} Cards</p>
                        </div>
                    </div>
                </div>

                <div className='right-container'>
                    <button className='review-all-btn'><i className="fa-solid fa-play"></i> Review All</button>
                    <img className='profile-img'></img>
                </div>
        </div>
    
    )
}

export default DeckDetailsHeader;