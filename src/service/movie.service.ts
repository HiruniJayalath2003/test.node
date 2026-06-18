import { error } from "node:console";
import type { Movie } from "../database/mockDb.js";
import { MovieRepository } from "../repository/movie.repository.js";

export class MovieService {
  private movieRepository = new MovieRepository(); // movie service needs a movie repo to get raw data from repository

  //new method
  getMovies(genre?: string, year?: string): Movie[] {
    let movies = this.movieRepository.getAllMovies();

    if (genre) {
      movies = movies.filter(
        (m) => m.genre.toLowerCase() === genre.toLocaleLowerCase(),
      );
    }
    if (year) {
      const releasedYear = parseInt(year);
      if (!isNaN(releasedYear)) {
        movies = movies.filter((m) => m.releasedYear === releasedYear);
      }
    }
    return movies;
  }
  getMovieByTitle(title: string): Movie {
    const foundTitle = this.movieRepository.getByTitle(title);

    if (!foundTitle) {
      throw new Error("Title Not Found");
    }

    return foundTitle;
  }
  //new method
  getMovieById(id: number): Movie {
    //return movie
    const foundMovie = this.movieRepository.getById(id);

    if (!foundMovie) {
      //if not found movie throw an error
      throw new Error("Not_Found");
    }
    return foundMovie;
  }

  //receive movie info and pass it to repository to create new movie
  addMovie(title: string, genre: string, releasedYear: number): Movie {
    const createNew = this.movieRepository.create({
      //calls the create method in movie repo and immediately return what it returns
      title,
      genre,
      releasedYear, //create objects
    });
    return createNew;
  }

  deleteMovie(id: number): Movie {
    const deleteMovie = this.movieRepository.deleteById(id);

    if (!deleteMovie) {
      throw new Error("Movie not found");
    }
    return deleteMovie;
  }
  updateMovie(id:number,title: string, genre: string, releasedYear: number): Movie {
    const movie = this.movieRepository.getById(id);

    if (!movie) {
      throw new Error("Not_Found");
    }
    const updateNew = this.movieRepository.update(id, {
      title,
      genre,
      releasedYear,
    });
    return updateNew
  }
}
