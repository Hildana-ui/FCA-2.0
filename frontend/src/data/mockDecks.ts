export const decks = [
        {id: "deck-1", name: "Anthropology", chapters: 12, no_of_cards: 23, to_review: 3},
        {id: "deck-2", name: "Statistical Methods", chapters: 14, no_of_cards: 74, to_review: 20},
        {id: "deck-3", name: "Enterprise System", chapters: 8, no_of_cards: 30, to_review: 0}
    ];


export const chapters = [
    {id: "chapter-1",deck_id: "deck-1", title: "Primates", no_of_subsections: 2, no_of_cards: 10},
    {id: "chapter-2",deck_id: "deck-1", title: "Cultural Living", no_of_subsections: 0, no_of_cards: 12},
    {id: "chapter-3",deck_id: "deck-1", title: "Ethnicity and Occupation Association",no_of_subsections: 0, no_of_cards: 11}
];

export const subsections = [
    {id: "cs11", chapter_id: "chapter-1", title: "Difference of Humans from Primates"},
    {id: "cs11", chapter_id: "chapter-1", title: "Human Intelligence"}
];