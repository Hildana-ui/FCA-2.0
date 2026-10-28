
import prisma from "../db/db";

// CREATE SUBSECTION
export async function createSubsection(req, res) {
  try {
    const { name, deckId, chapterId } = req.body ?? {};

    if (typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        error: "Name must be a non-empty string."
      });
    }

    if (!Number.isInteger(deckId) || deckId <= 0) {
      return res.status(400).json({
        error: "Deck ID must be a positive integer."
      });
    }

    if (
      chapterId !== undefined &&
      chapterId !== null &&
      (!Number.isInteger(chapterId) || chapterId <= 0)
    ) {
      return res.status(400).json({
        error: "Chapter ID must be a positive integer or null."
      });
    }

    const subsection = await prisma.subsection.create({
      data: {
        name: name.trim(),
        deck_id: deckId,
        chapter_id: chapterId ?? null
      }
    });

    return res.status(201).json({
      message: "Subsection created successfully.",
      subsection
    });
  } catch (err) {
    if (err?.code === "P2002") {
      return res.status(409).json({
        error: "Subsection name already exists in this location."
      });
    }

    if (err?.code === "P2003") {
      return res.status(404).json({
        error: "Deck or chapter not found, or the chapter does not belong to this deck."
      });
    }

    console.error("Subsection Creation Error:", err);
    return res.status(500).json({
      error: "Failed to create subsection."
    });
  }
}

// FETCH SUBSECTIONS
// GET /decks/:deckId/subsections
// Optional: GET /decks/:deckId/subsections?chapterId=2
export async function fetchSubsections(req, res) {
  try {
    const deckId = Number(req.params.deckId);

    if (!Number.isInteger(deckId) || deckId <= 0) {
      return res.status(400).json({
        error: "Deck ID must be a positive integer."
      });
    }

    const where = { deck_id: deckId };
    const { chapterId } = req.query;

    if (chapterId !== undefined) {
      const id = Number(chapterId);

      if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
          error: "Chapter ID must be a positive integer."
        });
      }

      //creating chapter_id property by assigning a value using dot notation
      where.chapter_id = id;
    }

    const subsections = await prisma.subsection.findMany({
      where,
      orderBy: { id: "asc" }
    });

    return res.status(200).json({
      message: "Subsections fetched successfully.",
      count: subsections.length,
      subsections
    });
  } catch (err) {
    console.error("Fetch Subsections Error:", err);
    return res.status(500).json({
      error: "Failed to fetch subsections."
    });
  }
}

// UPDATE SUBSECTION
export async function updateSubsection(req, res) {
  try {
    const id = Number(req.params.id);
    const { name } = req.body ?? {};

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "Subsection ID must be a positive integer."
      });
    }

    if (typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        error: "Name must be a non-empty string."
      });
    }

    const subsection = await prisma.subsection.update({
      where: { id },
      data: { name: name.trim() }
    });

    return res.status(200).json({
      message: "Subsection updated successfully.",
      subsection
    });
  } catch (err) {
    if (err?.code === "P2025") {
      return res.status(404).json({
        error: "Subsection not found."
      });
    }

    if (err?.code === "P2002") {
      return res.status(409).json({
        error: "Subsection name already exists in this location."
      });
    }

    console.error("Subsection Update Error:", err);
    return res.status(500).json({
      error: "Failed to update subsection."
    });
  }
}

// DELETE SUBSECTION
export async function deleteSubsection(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: "Subsection ID must be a positive integer."
      });
    }

    const subsection = await prisma.subsection.delete({
      where: { id }
    });

    return res.status(200).json({
      message: "Subsection deleted successfully.",
      subsection
    });
  } catch (err) {
    if (err?.code === "P2025") {
      return res.status(404).json({
        error: "Subsection not found."
      });
    }

    console.error("Subsection Deletion Error:", err);
    return res.status(500).json({
      error: "Failed to delete subsection."
    });
  }
}



