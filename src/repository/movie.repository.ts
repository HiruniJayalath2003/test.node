import { movieDB, type MovieModel } from "../database/mockDb.js";
import { prisma } from "../db/prismaClient.js"

export class MovieRepository {
  getAllMovies(): MovieModel[] {
    return  prisma.movie.findMany();;
  }
  getById(id: number): MovieModel | undefined {
    //return movie or undefine
    return movieDB.find((m) => m.id === id); //m.id equals to the id given by user
  }
  getByTitle(title: string): MovieModel | undefined {
    return movieDB.find(
      (m) => m.title.toLocaleLowerCase() === title.toLocaleLowerCase(),
    );
  }
  create(movieData: Omit<MovieModel, "id">): MovieModel {
    let newId = 1;
    if (movieDB.length > 0) {
      const lastMovie = movieDB[movieDB.length - 1];
      if (lastMovie) {
        newId = lastMovie.id + 1;
      }
    }
    const newMovie: MovieModel = {
      id: newId,
      ...movieData,
    };
    movieDB.push(newMovie);
    return newMovie;
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
