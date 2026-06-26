export const DataTable = ({
  columns,
  data,
  sortBy,
  sortOrder,
  onSort,
  emptyMessage = 'No records found',
  rowKey = 'id'
}) => {
  const handleSort = (column) => {
    if (!column.sortable || !onSort) return;
    const key = column.sortKey || column.key;
    if (sortBy === key) {
      onSort(key, sortOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      onSort(key, 'ASC');
    }
  };

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={column.sortable ? 'sortable' : ''}
                onClick={() => handleSort(column)}
              >
                {column.label}
                {column.sortable && sortBy === (column.sortKey || column.key) && (
                  <span className="sort-indicator">{sortOrder === 'ASC' ? ' ↑' : ' ↓'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((row, index) => (
              <tr key={row[rowKey] ?? index}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>{emptyMessage}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
