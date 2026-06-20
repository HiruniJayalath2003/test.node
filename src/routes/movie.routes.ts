import {Router} from "express";
import { MovieController} from "../controller/movie.controller.js";

const movieRouter =Router();
const movieController = new MovieController();

movieRouter.get('/movies',movieController.getAllMovies);
movieRouter.get('/movies/title', movieController.getByTitle); 
movieRouter.get('/movies/:id',movieController.getById);
movieRouter.post('/movies',movieController.createMovie)
// movieRouter.delete('/movies/:id',movieController.deleteMovie)
// movieRouter.put('/movies/:id', movieController.updateMovie); 


export default movieRouter