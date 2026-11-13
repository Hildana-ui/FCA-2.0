import { BrowserRouter, Routes, Route } from "react-router";

import SessionComplete from "./pages/SessionComplete";
import StudySession from "./pages/StudySession";
import DeckDetails from "./pages/DeckDetails";
import Dashboard from "./pages/Dashboard";



function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/decks/:deckId" element={<DeckDetails />} />
            <Route path="/study/:deckId" element={<StudySession />} />
            <Route path="/complete" element={<SessionComplete />} />
        </Routes>
    </BrowserRouter>
  
}


export default App;