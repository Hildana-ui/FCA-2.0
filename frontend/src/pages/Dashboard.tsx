import DashboardHeader from "../components/shared/DashboardHeader/DashboardHeader";
import DeckSection from "../features/decks/components/DeckSection";

function Dashboard() {
    return <>
        <DashboardHeader
            profileName={"Hildana"}
            studyStatus={"active"}
            dueCards={32}
            activeDecks={4}
        />

        <DeckSection />
    </>
}

export default Dashboard;