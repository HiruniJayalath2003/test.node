export interface MovieModel {
  id: number;
  title: string;
  genre: string;
  releasedYear: number;
}
export const movieDB: MovieModel[] = [
  { id: 1, title: "The Matrix", genre: "Sci-Fi", releasedYear: 1999 },
  { id: 2, title: "Inception", genre: "Action", releasedYear: 2010 },
  { id: 3, title: "Interstellar", genre: "Sci-Fi", releasedYear: 2014 },
  { id: 4, title: "Dune", genre: "Sci-Fi", releasedYear: 2021 },
  { id: 5, title: "Penthouse", genre: "Action", releasedYear: 2021 },
];