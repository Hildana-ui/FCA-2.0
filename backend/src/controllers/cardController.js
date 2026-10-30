import prisma from "../db/db";


// Create Card
export async function createCard(req, res){
    try{
        const {
            question,
            answer,
            status,
            deckId,
            chapterId,
            subsectionId
        }  = req.body;

        //Validate incoming data
        if (!question || !answer || !deckId) {
            return res.status(400).json({
                error: "question, answer, and deck_id are required"
            });
        }

        const card =  await prisma.card.create({
            data: {
                question: question.trim(),
                answer: answer.trim(),
                ...(status !== undefined && {status}),
                deck_id: deckId,
                ...(chapterId !== undefined && { chapter_id: chapterId}),
                ...(chapterId !== undefined && {subsection_id: subsectionId})
            }
        })

        return res.status(201).json(card);
    } catch(err) {
        if (err?.code === "P2003") {
            return res.status(400).json({
                error: "The referenced deck, chapter, or subsection is invalid",
            });
        }

        console.error("Card Creation Error: " + err);
        return res.status(500).json({ error: "Failed to create card" });
    }
}


//Update Card
export async function updateCard(req, res) {
    try {

        const card = await prisma.card.update({
        where: { id: Number(req.params.id) },
        data: {
            question: req.body.question,
            answer: req.body.answer
        }
        });

        return res.status(200).json({ message: "Card updated successfully", card });
    } catch(err) {
        if(err.code === "P2025") {
            return res.status(404).json({ error: "Card not found" }); 
        }

        console.error("Updating Card Error:", err);
        return res.status(500).json({error: "Failed to update card."});
    }
}


// Delete Card
export async function deleteCard(req, res) {
    
    try {
        const id = Number(req.params.id);

        const card = await prisma.card.delete({
            where: { id}
        })

        return res.status(200).json({
            message: "Card deleted successfully",
            card
        })
    } catch(err) {
        //Prisma's error code when a requested record doesnt exist
        if (err.code === "P2025") {
            return res.status(404).json({
                error: "Card not found"
            });
        }

        console.error("Card Deletion Error:", err);

        return res.status(500).json({ error: "Failed to delete card" });
    }
}



export async function fetchCard(req,res) {
    try {
        const cardId = Number(req.params.id);


        if (!Number.isInteger(cardId) || cardId <= 0) {
            return res.status(400).json({
                error: "Card ID must be a positive integer."
            });
        }

        const card = await prisma.card.findUnique({
            where: { id: cardId}
        })

        if (!card) {
            return res.status(404).json({ message: "Card not found."});
        }

        return res.status(200).json({ message: "Fetched card successfully.", card});

    } catch(err) {
         console.error("Card Fetch Error:", err);

        return res.status(500).json({
            error: "Failed to fetch card",
        });
    }
}



export async function fetchCards(req,res) {
    try {

        const deckId = Number(req.params.deckId);

   
        if (!Number.isInteger(deckId) || deckId <= 0) {
            return res.status(400).json({
                error: "Deck ID must be a positive integer."
            });
        }

        
        const cards = await prisma.card.findMany({
            where: { deck_id: deckId},
            orderBy: { id: "asc"}
        });

        return res.status(200).json({ message: "Cards fetched successfully", count: cards.length, cards});
    } catch(err) {
        console.error("Fetch Cards Error:", err);

        return res.status(500).json({
            error: "Failed to fetch cards",
        });

    }
}

