import express from 'express';
import { calculateReview,cardReviewHistory } from '../controllers/reviewController.js';

const reviewRouter = express.Router();


reviewRouter.post('/', calculateReview);
reviewRouter.get('/', cardReviewHistory);

export default reviewRouter;