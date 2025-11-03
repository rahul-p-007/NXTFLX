import express from "express";
import {
  getSimilarTvs,
  getTreadingTv,
  getTvByCategory,
  getTvDetails,
  getTvTrailers,
} from "../controller/tv.controllers.js";
const router = express.Router();

router.get("/trending", getTreadingTv);
router.get("/:id/trailers", getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTvs);
router.get("/:category", getTvByCategory);
export default router;
