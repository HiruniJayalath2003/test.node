import {Router} from "express";
import { MovieController} from "../controller/movie.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createMovieSchema } from "../Schema/movie.schema.js";
import { getMoviesQuerySchema } from "../Schema/movie.query.schema.js";
// import { getMoviesQuerySchema } from "../schemas/movie.query.schema.js";

const movieRouter =Router();
const movieController = new MovieController();

movieRouter.get("/movies", validate(getMoviesQuerySchema), movieController.getAllMovies);
movieRouter.get('/movies/title', movieController.getByTitle); 
movieRouter.get('/movies/:id',movieController.getById);
movieRouter.post("/movies", validate(createMovieSchema), movieController.createMovie);
movieRouter.delete('/movies/:id',movieController.deleteMovie)
 movieRouter.put('/movies/:id', movieController.updateMovie); 


export default movieRouter