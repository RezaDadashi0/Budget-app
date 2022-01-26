import React from "react";
import _ from "lodash";

export default function Pagination({ length, pageSize, currentPage, onClick }) {
  let pages = _.range(1, Math.ceil(length / pageSize) + 1);
  if (pages.length === 1) pages = [];

  console.log(pages);

  return (
    <ul className="pagination pagination-md mt-4 d-flex justify-center">
      {pages.map((page, i) => (
        <li
          onClick={() => onClick(i + 1)}
          key={page}
          style={{ cursor: "pointer" }}
          className={currentPage === i + 1 ? "page-item active" : "page-item"}
        >
          <div className="page-link">{page}</div>
        </li>
      ))}
    </ul>
  );
}
