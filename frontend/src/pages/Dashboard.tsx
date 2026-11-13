import DashboardHeader from "../components/shared/DashboardHeader/DashboardHeader";

function Dashboard() {
    return <>
        <DashboardHeader
            profileName={"Hildana"}
            studyStatus={"active"}
            dueCards={32}
            activeDecks={4}
        />
    </>
}

export default Dashboard;