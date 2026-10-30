import express from 'express';

import { createCard,
    updateCard,
    deleteCard,
    fetchCard
 } from '../controllers/cardController';

const cardRouter = express.Router();


cardRouter.post('/', createCard);

cardRouter.get('/:id', fetchCard);

cardRouter.put('/:id', updateCard);
cardRouter.delete('/:id', deleteCard)