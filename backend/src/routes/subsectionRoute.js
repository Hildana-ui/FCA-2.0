import express from 'express';
import { createSubsection,
    updateSubsection,
    deleteSubsection
 } from "../controllers/subsectionController";


const subsectionRouter = express.Router();



subsectionRouter.post('/', createSubsection);
subsectionRouter.put('/:id', updateSubsection);
subsectionRouter.delete('/:id', deleteSubsection);


export default subsectionRouter;