import "./DashboardHeader.css"

interface DashboardHeaderProps {
    profileName: string;
    studyStatus: string;
    dueCards: number;
    activeDecks: number;
}


function DashboardHeader({
    profileName,
    studyStatus,
    dueCards,
    activeDecks
} : DashboardHeaderProps) {
    return <>
        <div className="header-container">
            <div className="profile-container">
                <img className="profile-img"></img>
                <div>
                    <div className="profile-name">{profileName}</div>
                    <div className="study-status">Study session {studyStatus}</div>
                </div>
            </div>
            <div className="study-info-container">
                <div>
                    <p>CARDS DUE TODAY</p>
                    <div className="cards-due">{dueCards}</div>
                </div>
                <span className="divider"></span>
                <div>
                    <p>DECKS ACTIVE</p>
                    <div className="decks-active">{activeDecks}</div>
                </div>
            </div>
        </div>
    </>
}

export default DashboardHeader;