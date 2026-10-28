import prisma from "../db/db";


export async function createDeck(req, res) {
    try {
        const {
            name,
            userId
        } = req.body;


        if(!name || !userId) {
            return res.status(400).json({ error: "name and user id are required."});
        }

        if (typeof name !== "string" || name.trim() === "") {
            return res.status(400).json({ error: "Name must be a non-empty string."});
        }

        if(!Number.isInteger(userId) || userId <= 0) {
            return res.status(400).json({ error: "User ID must be a positive integer."});
        }

        const deck = await prisma.deck.create({
            data: {
                name: name.trim(),
                user_id: userId
            }
        })

        return res.status(201).json({message: "Deck created successfully", deck});
    } catch(err) {
        if (err?.code === "P2003") {
            return res.status(400).json({
                error: "The referenced user is invalid",
            });
        }

        console.error("Card Creation Error: ", err);
        return res.status(500).json({ error: "Failed to create deck."});
    }
}


//Update deck
export async function updateDeck(req, res) {
    try {
        const { name } = req.body;
        const id = Number(req.params.id);

        //Validate fields
        if (typeof name !== "string" || name.trim() === "") {
            return res.status(400).json({error : "Name must be a non-empty string."});
        }

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: "Deck id must be a positive integer."});
        }
        

        //Update the database
        const deck = await prisma.deck.update({
            where: { id },
            data: {
                name: name.trim()
            }
        })

        return res.status(200).json({ message: "Deck updated.", deck});

    } catch(err) {
        //Prisma error code for no exisiting records
         if(err.code === "P2025") {
            return res.status(404).json({ error: "Deck not found" }); 
        }

        console.error("Deck update error: ", err);
        return res.status(500).json({ error: "Failed to update deck."})
    }
}


//Fetch Decks
export async function fetchDecks(req, res) {
    try {
        //findMany returns an array
        const decks = await prisma.deck.findMany({
            orderBy: { id: "asc"}
        });

        //No checks for whether decks is empty because count will return the number within the array and an empty array is not necessarily an error
        return res.status(200).json({
            message: "Fetched decks successfully.", count: decks.length, decks
        });

    } catch(err) {
        console.error("Deck Fetching Error: ", err);
        return res.status(500).json({error : "Failed to fetch decks"})
    }
}



//Delete Deck

export async function deleteDeck(req,res) {
    try {
       const id = Number(req.params.id);

       if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: "Deck ID must be a positive integer."
            });
       }

       const deck = await prisma.deck.delete({
            where: { id }
       });

       return res.status(200).json({
            message: "Deck deleted successfully.",
            deck
       });

    } catch(err) {
        if (err?.code === "P2025") {
            return res.status(404).json({
                error: "Deck not found"
            });
        }

        console.error("Deck deletion error: ", err);
        return res.status(500).json({ error: "Failed to delete deck."});
    }
}