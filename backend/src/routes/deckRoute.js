import express from 'express';

import { createDeck,
    updateDeck,
    deleteDeck,
    fetchDecks
 } from '../controllers/deckController';

const deckRouter = new express.Router();



deckRouter.post('/', createDeck);

deckRouter.get('/', fetchDecks);

deckRouter.put('/:id', updateDeck);

deckRouter.delete('/:id', deleteDeck);

export default deckRouter;

