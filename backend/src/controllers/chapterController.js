import prisma from "../db/db";

//Create Chapter within Deck
export async function createChapter(req, res) {
   try {
		const {
			name,
			deckId
		} = req.body;

		if (typeof name !== "string" || name.trim() === "") {
			return res.status(400).json({
				error: "Name must be a non-empty string."
			});
		}

		if (!Number.isInteger(deckId) || deckId <= 0) {
			return res.status(400).json({
				error: "Deck Id must be a postive integer."
			});
		}

		const chapter = await prisma.chapter.create({
			data: {
				name: name.trim(),
				deck_id: deckId
			}
		});

		return res.status(201).json({ message: "Chapter created successfully", chapter});
    } catch(err) {
		//Prisma error code when a query violates a unique constraint
		if (err?.code === "P2002") {
			return res.status(409).json({
				error: "Chapter name already exists within deck."
			});
		}

		if (err?.code === "P2003") {
			return res.status(404).json({
				error: "Deck not found."
			});
		}


		console.error("Chapter Creation Error: ", err);
		return res.status(500).json({ error: "Failed to create chapter."});
    }
}


// FETCH CHAPTERS
export async function fetchChapters(req, res) {
  try {
    const { deckId } = Number(req.params.deckId);

   
	if (!Number.isInteger(id) || id <= 0) {
	return res.status(400).json({
		error: "Deck ID must be a positive integer."
	});
	}


    const chapters = await prisma.chapter.findMany({
      where : { deck_id: deckId },
      orderBy: { id: "asc" }
    });

    return res.status(200).json({
      message: "Chapters fetched successfully.",
      count: chapters.length,
      chapters
    });
  } catch (err) {
    console.error("Chapter Fetching Error:", err);
    return res.status(500).json({
      error: "Failed to fetch chapters."
    });
  }
}



