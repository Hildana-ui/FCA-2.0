import express from 'express';
import reviewRouter from './routes/reviewRoute.js';
import cardRouter from './routes/cardRoute.js';
import deckRouter from './routes/deckRoute.js';
import chapterRouter from './routes/chapterRoute.js';
import subsectionRouter from './routes/subsectionRoute.js';
import userRouter from './routes/userRoute.js';


const app = express();

app.use(express.json());


app.use('/cards', cardRouter);
app.use('/decks', deckRouter);
app.use('/subsections', subsectionRouter);
app.use('/chapters', chapterRouter);
app.use('/reviews', reviewRouter);
app.use('/users', userRouter);


export default app;