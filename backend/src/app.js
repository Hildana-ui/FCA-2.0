import express from 'express';
import reviewRouter from './routes/reviewRoute';
import cardRouter from './routes/cardRoute';
import deckRouter from './routes/deckRoute';
import chapterRouter from './routes/chapterRoute';
import subsectionRouter from './routes/subsectionRoute';


const app = express();

app.use(express.json());


app.use('/cards', cardRouter);
app.use('/decks', deckRouter);
app.use('/subsections', subsectionRouter);
app.use('/chapters', chapterRouter);
app.use('/reviews', reviewRouter);


export default app;