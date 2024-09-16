import React from "react";
import OverviewRating from "./components/OverviewRating";
import TableRating from "./components/TableRating";

const RatingPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 mb-10">
      <OverviewRating />

      <TableRating />
    </div>
  );
};

export default RatingPage;
