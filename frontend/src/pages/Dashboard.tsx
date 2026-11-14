import DashboardHeader from "../components/shared/DashboardHeader/DashboardHeader";
import DeckSection from "../features/decks/components/DeckSection";
import DeckCards from "../features/decks/components/DeckCards";

function Dashboard() {
    const decks = [
        {id: "deck-1", name: "Anthropology", no_of_cards: 23, to_review: 3},
        {id: "deck-2", name: "Statistical Methods", no_of_cards: 74, to_review: 20},
        {id: "deck-3", name: "Enterprise System", no_of_cards: 30, to_review: 0}
    ];

    return <>
        <DashboardHeader
            profileName={"Hildana"}
            studyStatus={"active"}
            dueCards={32}
            activeDecks={4}
        />

        <DeckSection />


        <DeckCards decks={decks} />
    </>
}

export default Dashboard;