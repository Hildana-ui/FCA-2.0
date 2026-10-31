import express from 'express';

import { createDeck,
    updateDeck,
    deleteDeck,
    fetchDecks
 } from '../controllers/deckController.js';
import { fetchCards } from '../controllers/cardController.js';
import { fetchChapters } from '../controllers/chapterController.js';
import { fetchSubsections } from '../controllers/subsectionController.js';

const deckRouter = new express.Router();


deckRouter.post('/', createDeck);
deckRouter.get('/', fetchDecks);
deckRouter.get('/:deckId/cards', fetchCards);
deckRouter.get('/:deckId/chapters', fetchChapters);
deckRouter.get('/:deckId/subsections', fetchSubsections);
deckRouter.put('/:id', updateDeck);
deckRouter.delete('/:id', deleteDeck);



export default deckRouter;

