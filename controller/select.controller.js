const db = require('../db');

class SelectController {
    async select(req, res) {
        let result;
        let filter_name
        let keys = Object.keys(req.query);

        if (keys.length > 1) {
            res.end();
            return;
        }

        switch (keys[0]) {
            case 'movie': {
                filter_name = 'm.movie_id';
                break;
            }
            case 'genre': {
                filter_name = 'o.genre_id';
                break;
            }
            default: {
                res.end();
                return;
            }
        }

        result = await db.query(
            `SELECT DISTINCT m.film_name, m.year, g.genre_name
             FROM movie m
                      JOIN genres_of_movies o
                           ON m.movie_id = o.movie_id AND ${filter_name} = $1
                      JOIN genre g
                           ON g.genre_id = o.genre_id`,
            [req.query[keys[0]]]
        )

        res.json(result.rows)

    }

}

module.exports = new SelectController();