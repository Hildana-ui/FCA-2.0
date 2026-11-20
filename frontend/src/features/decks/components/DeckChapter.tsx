import { useState } from "react"

interface Chapter {
    id: string,
    deck_id: string,
    title: string,
    no_of_subsections: number,
    no_of_cards: number
}

interface Subsection {
    id: string,
    chapter_id: string,
    title: string
}

interface DeckChapterProps {
    chapters: Chapter[],
    subsections: Subsection[]
}

function DeckChapter({ chapters, subsections }:DeckChapterProps) {
    const [dropDown, setDropDown] = useState("open");

    

    return (
        <main className="main-container">
            {chapters?.map((chapter) => (
                <div className="chapter-container">
                    <div className="top-container">
                        <div className="left">
                            <div className="drop-down" onClick={() => 
                                dropDown === "open" ? setDropDown("closed") : setDropDown("open")
                            }>
                                <i className={dropDown === "open" ? "fa-solid fa-chevron-down" : "fa-solid fa-chevron-right"}></i>
                            </div>

                            <div className="chapter-info">
                                <div className="chapter-title">{chapter.title}</div>
                                <div className="subsection-card-container">
                                    <div className="no-subsection">{chapter.no_of_subsections}</div>
                                    <div className="no-cards">{chapter.no_of_cards}</div>
                                </div>
                            </div>
                        </div>

                        <div className="right">
                            <button className="review-btn">Review</button>
                            <button className="three-dot-menu"><i className="fa-solid fa-ellipsis-vertical"></i></button>
                        </div>
                    </div>

                    {dropDown === "open" && <>
                        {subsections?.map((subsection) => (
                            <div className="subsection-container">
                            <div className="left">
                                <div className="drop-down" onClick={() => 
                                    dropDown === "open" ? setDropDown("closed") : setDropDown("open")
                                }>
                                    <i className={dropDown === "open" ? "fa-solid fa-chevron-down" : "fa-solid fa-chevron-right"}></i>
                                </div>

                                <div className="subsection-title">{subsection.title}</div>
                            </div>
                            <div className="right"> 
                                <button className="review-btn">Review</button>
                                <button className="delete-btn"><i className="fa-solid fa-trash-can"></i></button>
                            </div>
                        </div>
                        ))}
                    </>}
                </div>
            ))}
        </main>
    )
}

export default DeckChapter;