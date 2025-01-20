import { Pagination } from "react-bootstrap";
import { useAppDispatch, useAppRootState } from "../store";
import { increasePaginationPage } from "../store/renderSlice";
import React from "react";

interface PaginationComponentProps {
  className?: string;
  count?: number;
}

const PaginationComponent: React.FC<PaginationComponentProps> = (
  props: PaginationComponentProps,
) => {
  const { count } = props;
  const { paginationPage } = useAppRootState((state) => state.render);
  const dispatch = useAppDispatch();

  function setPage(page: number) {
    dispatch(increasePaginationPage(page));
  }

  return (
    <>
      {!count && (
        <Pagination>
          {paginationPage > 3 && (
            <Pagination.Item onClick={() => setPage(1)}>{1}</Pagination.Item>
          )}
          {paginationPage > 4 && <Pagination.Ellipsis />}

          {paginationPage <= 2 && (
            <>
              <Pagination.Item
                active={paginationPage === 1}
                onClick={() => setPage(1)}
              >
                {1}
              </Pagination.Item>
              <Pagination.Item
                active={paginationPage === 2}
                onClick={() => setPage(2)}
              >
                {2}
              </Pagination.Item>
              <Pagination.Item onClick={() => setPage(3)}>{3}</Pagination.Item>
              <Pagination.Item onClick={() => setPage(4)}>{4}</Pagination.Item>
              <Pagination.Item onClick={() => setPage(5)}>{5}</Pagination.Item>
            </>
          )}
          {paginationPage > 2 && (
            <>
              <Pagination.Item onClick={() => setPage(paginationPage - 2)}>
                {paginationPage - 2}
              </Pagination.Item>
              <Pagination.Item onClick={() => setPage(paginationPage - 1)}>
                {paginationPage - 1}
              </Pagination.Item>
              <Pagination.Item active>{paginationPage}</Pagination.Item>
              <Pagination.Item onClick={() => setPage(paginationPage + 1)}>
                {paginationPage + 1}
              </Pagination.Item>
              <Pagination.Item onClick={() => setPage(paginationPage + 2)}>
                {paginationPage + 2}
              </Pagination.Item>
            </>
          )}
        </Pagination>
      )}

      {count && count <= 6 && (
        <Pagination>
          {[...Array(props.count)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === paginationPage}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
      {count && count > 6 && (
        <Pagination>
          {paginationPage > 4 && (
            <Pagination.Item onClick={() => setPage(1)}>{1}</Pagination.Item>
          )}
          {paginationPage > 4 && <Pagination.Ellipsis />}

          {paginationPage <= 4 && (
            <>
              <Pagination.Item
                active={paginationPage === 1}
                onClick={() => setPage(1)}
              >
                {1}
              </Pagination.Item>
              <Pagination.Item
                active={paginationPage === 2}
                onClick={() => setPage(2)}
              >
                {2}
              </Pagination.Item>
              <Pagination.Item
                active={paginationPage === 3}
                onClick={() => setPage(3)}
              >
                {3}
              </Pagination.Item>
              <Pagination.Item
                active={paginationPage === 4}
                onClick={() => setPage(4)}
              >
                {4}
              </Pagination.Item>
              <Pagination.Item onClick={() => setPage(5)}>{5}</Pagination.Item>
              <Pagination.Item onClick={() => setPage(6)}>{6}</Pagination.Item>
            </>
          )}
          {paginationPage > 4 && count - paginationPage >= 2 && (
            <>
              <Pagination.Item onClick={() => setPage(paginationPage - 2)}>
                {paginationPage - 2}
              </Pagination.Item>
              <Pagination.Item onClick={() => setPage(paginationPage - 1)}>
                {paginationPage - 1}
              </Pagination.Item>
              <Pagination.Item active>{paginationPage}</Pagination.Item>
              <Pagination.Item onClick={() => setPage(paginationPage + 1)}>
                {paginationPage + 1}
              </Pagination.Item>
              <Pagination.Item onClick={() => setPage(paginationPage + 2)}>
                {paginationPage + 2}
              </Pagination.Item>
            </>
          )}
          {paginationPage > 4 && count - paginationPage < 2 && (
            <>
              <Pagination.Item onClick={() => setPage(count - 4)}>
                {count - 4}
              </Pagination.Item>
              <Pagination.Item onClick={() => setPage(count - 3)}>
                {count - 3}
              </Pagination.Item>
              <Pagination.Item> {count - 2}</Pagination.Item>
              <Pagination.Item
                active={paginationPage === count - 1}
                onClick={() => setPage(count - 1)}
              >
                {count - 1}
              </Pagination.Item>
              <Pagination.Item
                active={paginationPage === count}
                onClick={() => setPage(count)}
              >
                {count}
              </Pagination.Item>
            </>
          )}
        </Pagination>
      )}
    </>
  );
};

export default PaginationComponent;
