const express = require('express');
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());

const movieRouter = require('./routes/movie.routes');
const genreRouter = require('./routes/genre.routes');
const selectRouter = require('./routes/select.routes');

app.use('/api', movieRouter);
app.use('/api', genreRouter);
app.use('/api', selectRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

