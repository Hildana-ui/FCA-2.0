import express from 'express';
import { createChapter,
    deleteChapter,
    updateChapter
 } from '../controllers/chapterController.js';


const chapterRouter = express.Router();


chapterRouter.post('/', createChapter);
chapterRouter.put('/:id', updateChapter);
chapterRouter.delete('/:id', deleteChapter);


export default chapterRouter;
