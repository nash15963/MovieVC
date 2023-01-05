/** @format */

import { createContext } from "react";
import { movieBrief } from "./Interfaces/MovieInterfaces"; //interface

export interface AppContextInterface {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  movieData: movieBrief[];
  setMovieData: React.Dispatch<React.SetStateAction<movieBrief[]>>;
  accessRight: boolean;
  useAccessRight: React.Dispatch<React.SetStateAction<boolean>>;
} // type for hooks variable

const AppState: AppContextInterface = {
  message: "",
  setMessage: () => {},
  count: 1,
  setCount: () => {},
  movieData: [],
  setMovieData: () => {},
  accessRight: false,
  useAccessRight: () => {},
};

export const AppCtx = createContext(AppState);

// build global context
