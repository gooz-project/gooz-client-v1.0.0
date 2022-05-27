import React from "react";
import "../styles/Pagination.css";
import { BsCircle, BsCircleFill } from "react-icons/bs";

export default function Pagination({ workspace, page, setPage }) {
  const pages = [];

  const pageCount = Math.ceil(workspace.widgets.length / 4);

  for (let index = 0; index < pageCount; index++) {
    pages.push(
      <li>
        {page === index ? (
          <BsCircleFill className="circle" size={15} />
        ) : (
          <BsCircle className="circle" size={15} onClick={() => setPage(index)}>
            &#9678;
          </BsCircle>
        )}
      </li>
    );
  }

  return (
    <div className="pagination-container">
      <ul className="list-pagination">
        {pages.map((data, idx) => {
          return <React.Fragment key={idx}>{data}</React.Fragment>;
        })}
      </ul>
    </div>
  );
}
