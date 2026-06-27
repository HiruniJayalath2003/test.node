//import { movieDB, type MovieModel } from "../database/mockDb.js";
import { prisma } from "../db/prismaClient.js";
import type { Movie } from "../generated/prisma/client.js";

interface FetchMovieArgs {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  genre?: string | undefined;
  year?: number | undefined;
}//to fetch movies

export class MovieRepository {
  async getAllMovies(
    args: FetchMovieArgs,
  ): Promise<{ movies: Movie[]; total: number }> {
    const { page, limit, sortBy, sortOrder, genre, year } = args;

    const whereClause: any = {};

    if (genre) {
      whereClause.genre = {
        equals: genre, // where genre = genre
        mode: "insensitive", // case-insensitive match for the genre - Action, action
      };
    }

    if (year) {
      whereClause.releasedYear = year; // where releasedYear = year
    }

    const skip = (page - 1) * limit;

    const [movies, total] = await prisma.$transaction([
      prisma.movie.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),
      prisma.movie.count({ where: whereClause }),
    ]);

    return { movies, total };

    // use prisma client go to movie table find everything
  } //insted of returning data from raw db we are getting movie modal from prisma client

  //we have get all func which await prisma return all the movies as a promise

  async getById(id: number): Promise<Movie | null> {
    //return movie or undefine
    return await prisma.movie.findUnique({
      where: { id }, //select * from movie where id =1
    }); //
  }
  async getByTitle(title: string): Promise<Movie | null> {
    return await prisma.movie.findUnique({
      where: { title: title },
    });
  }
  async create(movieData: Omit<Movie, "id" | "createdAt">): Promise<Movie> {
    return await prisma.movie.create({
      data: movieData,
    });
  }
  async deleteById(id: number): Promise<Movie> {
    return await prisma.movie.delete({
      where: { id: id },
    });
  }

  async update(
    id: number,
    movieData: Omit<Movie, "id" | "createdAt">,
  ): Promise<Movie> {
    //except id received other details
    return await prisma.movie.update({
      where: { id: id },
      data: movieData,
    });
  }
}
