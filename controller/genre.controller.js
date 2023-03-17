const db = require('../db');

class PostController {
    async createGenre(req, res) {
        const {id, name} = req.body;
        const newGenre = await db.query('INSERT INTO genre (genre_id, genre_name) values ($1, $2) RETURNING *', [id, name]);
        res.json(newGenre.rows);
    }

    async getGenreByMovie(req, res) {
        let genres;
        const movie_id = req.query.id;
        if (movie_id != undefined) {
            genres = await db.query(
                'SELECT * FROM genres_of_movies WHERE movie_id=$1', [movie_id]);
        } else {
            genres = await db.query(
                'SELECT * FROM genres_of_movies');
        }
        res.json(genres.rows);

    }

    async updateGenre(req, res) {
        const {id, genre_name} = req.body;
        const genre = db.query('UPDATE genre set genre_name = $2 where genre_id = $1', [id, genre_name]);
        res.json(genre.rows);

    }


}

module.exports = new PostController();