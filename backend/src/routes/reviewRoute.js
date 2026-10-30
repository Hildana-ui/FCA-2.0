import express from 'express';
import { calculateReview } from '../controllers/reviewController';

const reviewRouter = express.Router();


reviewRouter.post('/', calculateReview);


export default reviewRouter;