//import { movieDB, type MovieModel } from "../database/mockDb.js";
import { prisma } from "../db/prismaClient.js";
import type { Movie } from "../generated/prisma/client.js";

export class MovieRepository {
  async getAllMovies(filters?: {genre?:string, year?:number}): Promise<Movie[]> {
    const whereClause :any = {};

    if(filters?.genre){ //if the genre is given
      whereClause.genre= {
        equals:filters.genre, //where genre =genre
        mode:"insensitive", //case insensitive match for genre-->same as to lower case
      }
    }
    if(filters?.year){
      whereClause.releasedYear =filters.year;
    }
    return await prisma.movie.findMany({
      where:whereClause
    }); // use prisma client go to movie table find everything
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
