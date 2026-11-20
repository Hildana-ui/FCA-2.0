import DeckDetailsHeader from "../components/shared/DDHeader/DeckDetailsHeader";
import { decks } from "../data/mockDecks";

function DeckDetails() {

    return <>
    <div>
        <DeckDetailsHeader decks={decks}/>
    </div>
    </>
}

export default DeckDetails;