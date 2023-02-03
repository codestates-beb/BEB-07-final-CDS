// modules
import { useState } from 'react';

function Pagination(props) {
  const numPages = Math.ceil(props.totalPosts / props.limit);
  const [currPage, setCurrPage] = useState(props.page);
  let firstNum = currPage - (currPage % 5) + 1;
  let lastNum = currPage - (currPage % 5) + 5;
  //console.log({"currPage is":currPage, "firsNum is" : firstNum, "page is" : page})

  return (
    <div>
      <div>
        <button
          onClick={() => {
            props.setPage(props.page - 1);
            setCurrPage(props.page - 2);
          }}
          disabled={props.page === 1}
        >
          &lt;
        </button>
        <button
          onClick={() => props.setPage(firstNum)}
          aria-current={props.page === firstNum ? 'page' : null}
        >
          {firstNum}
        </button>
        {Array(4)
          .fill()
          .map((_, i) => {
            if (i <= 2) {
              return (
                <button
                  border="true"
                  key={i + 1}
                  onClick={() => {
                    props.setPage(firstNum + 1 + i);
                  }}
                  aria-current={props.page === firstNum + 1 + i ? 'page' : null}
                >
                  {firstNum + 1 + i}
                </button>
              );
            } else if (i >= 3) {
              return (
                <button
                  border="true"
                  key={i + 1}
                  onClick={() => props.setPage(lastNum)}
                  aria-current={props.page === lastNum ? 'page' : null}
                >
                  {lastNum}
                </button>
              );
            }
          })}
        <button
          onClick={() => {
            props.setPage(props.page + 1);
            setCurrPage(props.page);
          }}
          disabled={props.page === numPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Pagination;
