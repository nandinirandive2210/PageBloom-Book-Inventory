import React from 'react';

const Header = ({ 
  user, 
  onLogout, 
  searchTerm, 
  setSearchTerm, 
  sortBy, 
  setSortBy, 
  setShowForm 
}) => {
  const handleAddBook = () => {
    console.log('Add Book clicked!');
    setShowForm(true);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-book-open"></i>
            <h1>PageBloom</h1>
          </div>
          
          <div className="header-right">
            {/* User Info - Shows when logged in */}
            {user && (
              <div className="user-info">
                <i className="fas fa-user-circle"></i>
                <span>Welcome, {user?.name || user?.email?.split('@')[0]}</span>
              </div>
            )}
            
            {/* Search & Controls - ALWAYS VISIBLE */}
            <div className="search-controls">
              <div className="search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  placeholder="Search books by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="title">Sort by Title</option>
                <option value="author">Sort by Author</option>
                <option value="year">Sort by Year</option>
              </select>
            </div>
            
            <div className="header-actions">
              {/* ADD BOOK BUTTON - ALWAYS VISIBLE */}
              <button 
                className="btn btn-primary btn-add"
                onClick={handleAddBook}
                style={{ 
                  background: '#28a745', 
                  fontSize: '1.1rem',
                  padding: '1rem 2rem',
                  fontWeight: 'bold'
                }}
                title="Click to add new book"
              >
                <i className="fas fa-plus" style={{fontSize: '1.2rem'}}></i>
                ADD BOOK
              </button>
              
              {/* LOGOUT BUTTON - Shows only when logged in */}
              {user && (
                <button className="btn btn-secondary" onClick={onLogout}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
