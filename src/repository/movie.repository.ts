import { movieDB, type Movie } from "../database/mockDb.js";

export class MovieRepository {
  getAllMovies(): Movie[] {
    return movieDB;
  }
  getById(id: number): Movie | undefined {
    //return movie or undefine
    return movieDB.find((m) => m.id === id); //m.id equals to the id given by user
  }
  getByTitle(title: string): Movie | undefined {
    return movieDB.find(
      (m) => m.title.toLocaleLowerCase() === title.toLocaleLowerCase(),
    );
  }
  create(movieData: Omit<Movie, "id">): Movie {
    let newId = 1;
    if (movieDB.length > 0) {
      const lastMovie = movieDB[movieDB.length - 1];//length-1 --> array start counting from 0,length 1, index is 0 here we need index
      if (lastMovie) {
        newId = lastMovie.id + 1;
      }
    }
    const newMovie: Movie = {
      id: newId,
      ...movieData,
    };
    movieDB.push(newMovie);
    return newMovie;
  }
  deleteById(id:number):Movie|null{
    const movieIndex =movieDB.findIndex((m)=>m.id===id);

    if(movieIndex===-1){
        return null
    }
    return movieDB.splice(movieIndex,1)[0] ||null;
  }
  update(id:number, movieData:Omit<Movie,'id'>):Movie{//except id received other details
    const index = movieDB.findIndex((m)=>m.id===id);

    if(index===-1){
        throw new Error('Not Found')
    }
    movieDB[index]={ id,...movieData}
    return movieDB[index]
  }
}
