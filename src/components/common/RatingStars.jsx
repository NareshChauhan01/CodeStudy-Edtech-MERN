import { Rating } from "@mui/material";
import React from "react";

export function RatingStars() {
  return (
    <div className="place-items-center">
      <Rating
        value={0}
        name="read-only"
        readOnly
        className="text-yellow-100"
      />
    </div>
  )
}