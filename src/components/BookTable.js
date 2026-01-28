import React from 'react';

const BookTable = ({ books, onEdit, onDelete, onBookClick }) => {
  return (
    <div className="book-table-container">
      <h2 className="section-title">
        <i className="fas fa-books"></i> Book Inventory
      </h2>
      <div className="table-responsive">
        <table className="book-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Year</th>
              <th>ISBN</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr 
                key={book.id} 
                className="book-row"
                onClick={() => onBookClick(book)}
              >
                <td className="book-cover">
                  <img src={book.cover} alt={book.title} />
                </td>
                <td className="book-title">{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <span className={`genre-badge ${book.genre.toLowerCase()}`}>
                    {book.genre}
                  </span>
                </td>
                <td>{book.year}</td>
                <td>{book.isbn}</td>
                <td>
                  <span className={`stock-badge ${book.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                    {book.stock}
                  </span>
                </td>
                <td className="action-buttons">
                  <button 
                    className="btn btn-sm btn-edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(book);
                    }}
                    title="Edit Book"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(book.id);
                    }}
                    title="Delete Book"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {books.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-book"></i>
          <h3>No books found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default BookTable;
