import DeckDetailsHeader from "../components/shared/DDHeader/DeckDetailsHeader";

function DeckDetails() {
    const cards = [
        {id: 1, name: "Enterprise", chapters: 12, no_of_cards: 43}
    ]


    return <>
    <div>
        <DeckDetailsHeader cards={cards} />
    </div>
    </>
}

export default DeckDetails;