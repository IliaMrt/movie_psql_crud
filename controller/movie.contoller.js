const db = require('../db');
class MovieController {
    async createMovie(req, res) {
        const {id, film_name, year} = req.body;
        const newFilm = await db.query('INSERT INTO movie (movie_id, film_name, year) values ($1, $2, $3) RETURNING *', [id, film_name, year])
        res.json(newFilm.rows);
    }

    async getMovie(req, res) {
        const movies = await db.query('SELECT * FROM movie');
        res.json(movies.rows);
    }

    async getOneMovie(req, res) {
        const movie_id = req.params.id;
        const movie = await db.query('SELECT * FROM movie where movie_id = $1', [movie_id]);
        res.json(movie.rows);
    }

    async updateMovie(req, res) {
        const {id, film_name, year} = req.body;
        const movie = db.query('UPDATE movie set film_name = $1, year = $2 where movie_id = $3', [film_name, year, id]);
        res.json(movie.rows);
    }

    async deleteMovie(req, res) {
        const id = req.params.id;
        const dub_actors = await db.query(
            'DELETE FROM dubbing_actors_in_movies where movie_id = $1 RETURNING *', [id]);
        const stars = await db.query(
            'DELETE FROM stars_in_movies where movie_id = $1;', [id]);
        const genres = await db.query(
            'DELETE FROM genres_of_movies where movie_id = $1;', [id]);
        const viewers = await db.query(
            'DELETE FROM viewers_by_countries where movie_id = $1;', [id]);

        const movie = await db.query(
            'DELETE FROM movie where movie_id = $1;', [id]);


        res.json(dub_actors.rows[0]);
    }
}


module.exports = new MovieController();