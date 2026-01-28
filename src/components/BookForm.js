import React, { useState, useEffect } from 'react';

const BookForm = ({ book, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: 'Fiction',
    year: '',
    isbn: '',
    publisher: '',
    stock: '',
    price: '',
    description: '',
    cover: '' // ← Added cover field
  });
  const [errors, setErrors] = useState({});
  const [coverPreview, setCoverPreview] = useState(null);

  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Sci-Fi', 'Fantasy', 'Biography', 'Romance'];

  useEffect(() => {
    if (book) {
      setFormData(book);
      setCoverPreview(book.cover);
    }
  }, [book]);

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
        setFormData({ ...formData, cover: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author is required';
    if (!formData.isbn.match(/^\d{10}(\d{3})?$/)) newErrors.isbn = 'Valid ISBN required (10 or 13 digits)';
    if (!/^\d{4}$/.test(formData.year)) newErrors.year = 'Year must be 4 digits (ex: 2023)';
    if (isNaN(formData.stock) || formData.stock < 0) newErrors.stock = 'Stock must be 0 or more';
    if (isNaN(formData.price) || formData.price < 0) newErrors.price = 'Price must be 0 or more';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="book-form-overlay">
      <div className="book-form-container">
        <div className="form-header">
          <h2>{book ? 'Edit Book' : 'Add New Book'}</h2>
          <button className="btn-close" onClick={onCancel}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-grid">
            {/* IMAGE UPLOAD SECTION - PERFECTLY UNIFORM */}
            <div className="form-group image-upload-group">
              <label>Book Cover Image</label>
              <div className="image-upload-container">
                <div className="image-preview-wrapper">
                  <div 
                    className="image-preview"
                    style={{
                      backgroundImage: coverPreview ? `url(${coverPreview})` : 'none'
                    }}
                  >
                    {!coverPreview && (
                      <div className="image-placeholder">
                        <i className="fas fa-image"></i>
                        <p>Click to upload<br/>or drag & drop</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="bookCover"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-input"
                  />
                </div>
                <small>Recommended: 200x300px, JPG/PNG</small>
              </div>
            </div>

            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label>Author *</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                className={errors.author ? 'error' : ''}
              />
              {errors.author && <span className="error-text">{errors.author}</span>}
            </div>

            <div className="form-group">
              <label>Genre</label>
              <select
                value={formData.genre}
                onChange={(e) => setFormData({...formData, genre: e.target.value})}
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Year *</label>
              <input
                type="text"
                maxLength="4"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                className={errors.year ? 'error' : ''}
              />
              {errors.year && <span className="error-text">{errors.year}</span>}
            </div>

            <div className="form-group">
              <label>ISBN *</label>
              <input
                type="text"
                value={formData.isbn}
                onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                className={errors.isbn ? 'error' : ''}
              />
              {errors.isbn && <span className="error-text">{errors.isbn}</span>}
            </div>

            <div className="form-group">
              <label>Stock *</label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                className={errors.stock ? 'error' : ''}
              />
              {errors.stock && <span className="error-text">{errors.stock}</span>}
            </div>

            <div className="form-group">
              <label>Price ($)*</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className={errors.price ? 'error' : ''}
              />
              {errors.price && <span className="error-text">{errors.price}</span>}
            </div>

            <div className="form-group full-width">
              <label>Publisher</label>
              <input
                type="text"
                value={formData.publisher}
                onChange={(e) => setFormData({...formData, publisher: e.target.value})}
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                rows="4"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Brief description of the book..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {book ? 'Update Book' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
