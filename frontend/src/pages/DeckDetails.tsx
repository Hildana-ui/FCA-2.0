import DeckDetailsHeader from "../components/shared/DDHeader/DeckDetailsHeader";
import { decks, chapters, subsections } from "../data/mockDecks";
import DeckChapter from "../features/decks/components/DeckChapter";

function DeckDetails() {

    return <>
    <div>
        <DeckDetailsHeader decks={decks}/>
        <DeckChapter chapters={chapters} subsections={subsections} />
    </div>
    </>
}

export default DeckDetails;