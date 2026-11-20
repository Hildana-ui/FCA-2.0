import DashboardHeader from "../components/shared/DashboardHeader/DashboardHeader";
import DeckSection from "../features/decks/components/DeckSection";
import DeckCards from "../features/decks/components/DeckCards";
import "./Dashboard.css"
import FAB from "../components/shared/FAB/FAB";
import { decks } from "../data/mockDecks";

function Dashboard() {

    
    return <>
        <main className="dashboard">
            <div className="orb-pink"></div>
            <div className="orb-purple"></div>

            <div className="dashboard-content">
                <DashboardHeader
                    profileName="Hildana"
                    studyStatus="active"
                    dueCards={32}
                    activeDecks={2}
                />
                <DeckSection />
                <DeckCards decks={decks} />
                <FAB />
            </div>
        </main>
    </>
}

export default Dashboard;