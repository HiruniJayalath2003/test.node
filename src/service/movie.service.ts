import { error } from "node:console";
import type { Movie } from "../generated/prisma/client.js";
import type { MovieModel } from "../database/mockDb.js";
import { MovieRepository } from "../repository/movie.repository.js";

export class MovieService {
  private movieRepository = new MovieRepository(); // movie service needs a movie repo to get raw data from repository

  //new method
  async getMovies(genre?: string, year?: string):Promise <Movie[]> {//promis to give us a movie array
    let movies = await this.movieRepository.getAllMovies();//gives us a promis so we have to await
// we have to wait until gives us movies so we use await we can't use await alone so we need to use async 

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
  getMovieByTitle(title: string): MovieModel {
    const foundTitle = this.movieRepository.getByTitle(title);

    if (!foundTitle) {
      throw new Error("Title Not Found");
    }

    return foundTitle;
  }
  //new method
  getMovieById(id: number): MovieModel {
    //return movie
    const foundMovie = this.movieRepository.getById(id);

    if (!foundMovie) {
      //if not found movie throw an error
      throw new Error("Not_Found");
    }
    return foundMovie;
  }

  //receive movie info and pass it to repository to create new movie
  addMovie(title: string, genre: string, releasedYear: number): MovieModel {
    const createNew = this.movieRepository.create({
      //calls the create method in movie repo and immediately return what it returns
      title,
      genre,
      releasedYear, //create objects
    });
    return createNew;
  }

  deleteMovie(id: number): MovieModel {
    const deleteMovie = this.movieRepository.deleteById(id);

    if (!deleteMovie) {
      throw new Error("Movie not found");
    }
    return deleteMovie;
  }
  updateMovie(id:number,title: string, genre: string, releasedYear: number): MovieModel {
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
