import './DeckSection.css'

function DeckSection() {
    return <>
        <div className='section-container'>
            <div className="left-section">
                <h1>My Decks</h1>
                <p>Pick a deck to start your daily review.</p>
            </div>

            <div className="right-section">
                <i className="fa-solid fa-magnifying-glass"></i>
                <i className="fa-solid fa-filter"></i>
            </div>
        </div>
    </>
}

export default DeckSection;