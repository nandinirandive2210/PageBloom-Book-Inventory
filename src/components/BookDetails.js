import React from 'react';

const BookDetails = ({ book, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="book-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{book.title}</h2>
          <button className="btn-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="book-details-content">
          <div className="book-cover-large">
            <img src={book.cover} alt={book.title} />
          </div>
          
          <div className="book-info">
            <h3>{book.author}</h3>
            <div className="book-meta">
              <span className="meta-item">
                <i className="fas fa-tag"></i> {book.genre}
              </span>
              <span className="meta-item">
                <i className="fas fa-calendar"></i> {book.year}
              </span>
              <span className="meta-item">
                <i className="fas fa-building"></i> {book.publisher || 'N/A'}
              </span>
              <span className="meta-item">
                <i className="fas fa-barcode"></i> {book.isbn}
              </span>
            </div>
            
            <div className="book-stock-price">
              <div className={`stock-badge ${book.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                <i className={`fas fa-${book.stock > 0 ? 'check-circle' : 'times-circle'}`}></i>
                Stock: {book.stock}
              </div>
              <div className="price">${parseFloat(book.price || 0).toFixed(2)}</div>
            </div>
            
            {book.description && (
              <div className="book-description">
                <h4>Description</h4>
                <p>{book.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
