import express from 'express';

import { createDeck,
    updateDeck,
    deleteDeck,
    fetchDecks
 } from '../controllers/deckController';
import { fetchCards } from '../controllers/cardController';

const deckRouter = new express.Router();


deckRouter.post('/', createDeck);
deckRouter.get('/', fetchDecks);
deckRouter.get('/:id/cards', fetchCards);
deckRouter.put('/:id', updateDeck);
deckRouter.delete('/:id', deleteDeck);



export default deckRouter;

