export const Pagination = ({ page, total, limit = 10, onPageChange }) => {
  const totalPages = Math.max(Math.ceil(total / limit), 1);

  return (
    <div className="pagination">
      <button className="button secondary" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        Prev
      </button>
      <span>
        Page {page} of {totalPages} ({total} records)
      </span>
      <button className="button secondary" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        Next
      </button>
    </div>
  );
};
