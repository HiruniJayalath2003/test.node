import { movieDB, type MovieModel } from "../database/mockDb.js";
import { prisma } from "../db/prismaClient.js"
import type { Movie } from "../generated/prisma/client.js";

export class MovieRepository {
  async getAllMovies():Promise<Movie[]> {
    return prisma.movie.findMany(); // use prisma client go to movie table find everything
  }//insted of returning data from raw db we are getting movie modal from prisma client
  
  //we have get all func which await prisma return all the movies as a promise
  
  
  async getById(id: number): Promise<Movie | null> {
    //return movie or undefine
    return await prisma.movie.findUnique({
      where: {id},  //select * from movie where id =1
    }); //
  }
  async getByTitle(title: string): Promise <Movie | null> {
    return await prisma.movie.findUnique({
      where:{title:title},
    });
  }
  async create(movieData: Omit<MovieModel, "id"|"createAt">): Promise<Movie>{
    return await prisma.movie.create({
      data:movieData
    })
  }
  deleteById(id:number):MovieModel|null{
    const movieIndex =movieDB.findIndex((m)=>m.id===id);

    if(movieIndex===-1){
        return null
    }
    return movieDB.splice(movieIndex,1)[0] ||null;
  }
  update(id:number, movieData:Omit<MovieModel,'id'>):MovieModel{//except id received other details
    const index = movieDB.findIndex((m)=>m.id===id);

    if(index===-1){
        throw new Error('Not Found')
    }
    movieDB[index]={ id,...movieData}
    return movieDB[index]
  }
}
