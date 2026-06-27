import type { Request, Response } from "express";
import { MovieService } from "../service/movie.service.js";
import { error } from "node:console";

export class MovieController {
  private movieService = new MovieService();

  getAllMovies = async (req: Request, res: Response) => {
    const genreQuery = req.query.genre as string;
    const yearquery = req.query.year as string;

    const movies = await this.movieService.getMovies(genreQuery, yearquery); //we have to wait
    res.json({
      success: true,
      data: movies,
      count: movies.length,
    });
  };
  getById = async (req: Request, res: Response) => {
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
      const movie = await this.movieService.getMovieById(movieID); //created methods in service layer calles here

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
  getByTitle = async (req: Request, res: Response) => {
    const titleAsString = req.query.title as string;

    if (!titleAsString) {
      return res.status(400).json({
        success: false,
        message: "Title parameter is required",
      });
    }

    try {
      const movie = await this.movieService.getMovieByTitle(titleAsString);
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

  createMovie = async (req: Request, res: Response): Promise<void> => {
    //why promise void  - we are not return anything we only attach value to the response
    const { title, genre, releasedYear, rating, description } = req.body;

    if (!title || !genre || !releasedYear) {
      res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
      return;
    }
    try {
      const newMovie = await this.movieService.addMovie(
        title,
        genre,
        releasedYear,
        rating, 
        description,
      );
      res.status(201).json({
        success: true,
        message: "Movie Created",
        data: newMovie,
      });
    } catch (error: any) {
      if (error.message === "Not_Found") {
        res.status(409).json({
          success: false,
          message: `Movie With a title ${title} already exist`,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  };

  deleteMovie = async (req: Request, res: Response) => {
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
      const deletedMovie = await this.movieService.deleteMovie(movieId);
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

  updateMovie =async (req: Request, res: Response) => {
    const movieIdAsString = req.params.id as string;
    const movieID = parseInt(movieIdAsString);

    if (isNaN(movieID)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Movie ID",
      });
    }

    const { title, genre, releasedYear,rating, description } = req.body;

    if (!title || !genre || !releasedYear) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    try {
      const updatedMovie = await this.movieService.updateMovie(
        movieID,
        title,
        genre,
        releasedYear,
        rating, description,
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

