import type { Request, Response } from "express";
import { MovieService } from "../service/movie.service.js";
import { error } from "node:console";

export class MovieController {
  private movieService = new MovieService();

  getAllMovies = (req: Request, res: Response) => {
    const genreQuery = req.query.genre as string;
    const yearquery = req.query.year as string;

    const movies = this.movieService.getMovies(genreQuery, yearquery);
    res.json({
      success: true,
      data: movies,
      count: movies.length,
    });
  };
  getById = (req: Request, res: Response) => {
    const movieIdAsString = req.params.id as string;
    const movieID = parseInt(movieIdAsString); //to get no

    if (isNaN(movieID)) {
      res.status(400).json({
        success: false,
        message: `InvalidMovie Id`,
      });
      return;
    }
    try {
      const movie = this.movieService.getMovieById(movieID); //created methods in service layer calles here

      res.json({
        success: true,
        data: movie,
      });
    } catch (error: any) {
      if (error.message === "Not_Found") {
        res.status(404).json({
          success: false,
          message: `Movie not found for ID ${movieID}`,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  };

  // In MovieController
  getByTitle = (req: Request, res: Response) => {
    const titleAsString = req.query.title as string;

    if (!titleAsString) {
      return res.status(400).json({
        success: false,
        message: "Title parameter is required",
      });
    }

    try {
      const movie = this.movieService.getMovieByTitle(titleAsString);
      return res.json({
        success: true,
        data: movie,
        message: "Movie Found",
      });
    } catch (error: any) {
      if (error.message === "Title Not Found") {
        return res.status(404).json({
          success: false,
          message: `Movie not found for title ${titleAsString}`,
        });
      }
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

  createMovie = (req: Request, res: Response) => {
    const { title, genre, releasedYear } = req.body;

    if (!title || !genre || !releasedYear) {
      res.status(400).json({
        //400- bad req
        success: false,
        message: "Missing required fields",
      });
      return;
    }
    const newMovie = this.movieService.addMovie(title, genre, releasedYear);
    res.status(201).json({
      success: true,
      message: "Movie added successfully",
      data: newMovie,
    });
  };

  deleteMovie = (req: Request, res: Response) => {
    const deleteIdAsString = req.params.id as string;
    const movieId = parseInt(deleteIdAsString);

    if (isNaN(movieId)) {
      res.status(400).json({
        success: false,
        message: `Invalid movie id , It should be a number`,
      });
      return;
    }
    try {
      const deletedMovie = this.movieService.deleteMovie(movieId);
      res.json({
        success: true,
        message: `Movie with ID ${movieId} deleted successfully`,
        data: deletedMovie,
      });
    } catch (error: any) {
      if (error.message === "Movie not found") {
        res.status(404).json({
          success: false,
          message: `Movie not found for Id ${movieId}`,
        });
      } else {
        res.status(500).json({
          success: false,
          message: `Internal server error`,
        });
      }
    }
  };
  // In MovieController
  updateMovie = (req: Request, res: Response) => {
    const movieIdAsString = req.params.id as string;
    const movieID = parseInt(movieIdAsString);

    if (isNaN(movieID)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Movie ID",
      });
    }

    const { title, genre, releasedYear } = req.body;

    if (!title || !genre || !releasedYear) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    try {
      const updatedMovie = this.movieService.updateMovie(
        movieID,
        title,
        genre,
        releasedYear,
      );

      return res.json({
        success: true,
        data: updatedMovie,
        message: "Movie updated successfully",
      });
    } catch (error: any) {
      if (error.message === "Not_Found") {
        return res.status(404).json({
          success: false,
          message: `Movie not found for ID ${movieID}`,
        });
      }
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
}
