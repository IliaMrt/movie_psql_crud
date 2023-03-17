const Router = require('express');
const router=new Router();

const genreController=require('../controller/genre.controller');
router.post('/genre',genreController.createGenre);
router.get('/genre',genreController.getGenreByMovie);
router.put('/genre',genreController.updateGenre);

module.exports=router;