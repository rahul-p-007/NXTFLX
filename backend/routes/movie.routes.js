import express from "express";
import {
  getMovieByCategory,
  getMovieDetails,
  getMovieTrailers,
  getSimilarMovies,
  getTreadingMovies,
} from "../controller/movie.controller.js";
const router = express.Router();
router.get("/trending", getTreadingMovies);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMovieByCategory);
export default router;
