import type { Movie } from "../generated/prisma/client.js";
import { MovieRepository } from "../repository/movie.repository.js";

export class MovieService {
  private movieRepository = new MovieRepository(); // movie service needs a movie repo to get raw data from repository

  //new method
  async getMovies(genre?: string, year?: string): Promise<Movie[]> {
    const filters: { genre?: string; year?: number } = {}; //just create filters first

    if (genre) {
      filters.genre = genre;
    }
    if (year) {
      const parseYear = parseInt(year);
      if (!isNaN(parseYear)) {
        filters.year = parseYear;
      }
    }
    return await this.movieRepository.getAllMovies(filters);
  }

  async getMovieByTitle(title: string): Promise<Movie> {
    const foundTitle = await this.movieRepository.getByTitle(title);

    if (!foundTitle) {
      throw new Error("Title Not Found");
    }

    return foundTitle;
  }
  //new method
  async getMovieById(id: number): Promise<Movie> {
    //return movie
    const foundMovie = await this.movieRepository.getById(id);

    if (!foundMovie) {
      //if not found movie throw an error
      throw new Error("Not_Found");
    }
    return foundMovie;
  }
  async addMovie(
    title: string,
    genre: string,
    releasedYear: number,
    rating?: number,
    description?: string,
  ): Promise<Movie> {
    const existingMovie = await this.movieRepository.getByTitle(title);

    if (existingMovie) {
      throw new Error("Movie already exist");
    }
    return await this.movieRepository.create({
      title,
      genre,
      releasedYear,
      rating: rating ?? 0.0,
      description: description || "",
    });
  }

  async deleteMovie(id: number): Promise<Movie> {
    const deleteMovie = await this.movieRepository.deleteById(id);

    if (!deleteMovie) {
      throw new Error("Movie not found");
    }
    return deleteMovie;
  }
  async updateMovie(
    id: number,
    title: string,
    genre: string,
    releasedYear: number,
    rating?: number,
    description?: string,
  ): Promise<Movie> {
    const movie = await this.movieRepository.getById(id);

    if (!movie) {
      throw new Error("Not_Found");
    }
    const updateNew = await this.movieRepository.update(id, {
      title,
      genre,
      releasedYear,
      rating: rating ?? 0.0,
      description: description || "",
    });
    return updateNew;
  }
}
