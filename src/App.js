import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BookTable from './components/BookTable';
import BookForm from './components/BookForm';
import BookDetails from './components/BookDetails';
import Pagination from './components/Pagination';
import LoginForm from './components/Auth/Login';
import SignupForm from './components/Auth/Signup';
import { booksData, addBook, updateBook, deleteBook } from './data/mockApi';
import './styles/App.css';

function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'signup', 'dashboard'
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    setBooks(booksData);
  }, []);

  useEffect(() => {
    const filteredBooks = booksData.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'author') return a.author.localeCompare(b.author);
      if (sortBy === 'year') return b.year - a.year;
      return 0;
    });
    setBooks(filteredBooks);
  }, [searchTerm, sortBy]);

  const handleLogin = (loginData) => {
    // Demo credentials: admin@bookvault.com / admin123
    if (loginData.email === 'admin@bookvault.com' && loginData.password === 'admin123') {
      const userData = { name: 'Admin User', email: loginData.email };
      setUser(userData);
      localStorage.setItem('bookvault_user', JSON.stringify(userData));
      setCurrentView('dashboard');
    } else {
      alert('❌ Invalid credentials!\nEmail: admin@bookvault.com\nPassword: admin123');
    }
  };

  const handleSignup = (signupData) => {
    // Simulate successful signup
    const userData = { name: signupData.name, email: signupData.email };
    setUser(userData);
    localStorage.setItem('bookvault_user', JSON.stringify(userData));
    setCurrentView('dashboard');
    alert('✅ Account created! Welcome to BookVault!');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('bookvault_user');
    setCurrentView('login');
  };

  // Load saved user
  useEffect(() => {
    const savedUser = localStorage.getItem('bookvault_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentView('dashboard');
    }
  }, []);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBook(id);
      setBooks(books.filter(book => book.id !== id));
    }
  };

  const handleSave = (bookData) => {
    if (editingBook) {
      updateBook(editingBook.id, bookData);
      setBooks(books.map(book => 
        book.id === editingBook.id ? { ...book, ...bookData } : book
      ));
    } else {
      const newBook = addBook(bookData);
      setBooks([newBook, ...books]);
    }
    setShowForm(false);
    setEditingBook(null);
  };

  // Show Auth Forms
  if (currentView === 'login') {
    return <LoginForm onLogin={handleLogin} onSwitchToSignup={() => setCurrentView('signup')} />;
  }

  if (currentView === 'signup') {
    return <SignupForm onSignup={handleSignup} onSwitchToLogin={() => setCurrentView('login')} />;
  }

  // Dashboard
  return (
    <div className="App">
      <Header 
        user={user}
        onLogout={handleLogout}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        setShowForm={setShowForm}
      />
      
      <main className="main-content">
        <div className="container">
          <div className="dashboard-grid">
            <div className="stats-cards">
              <div className="stat-card">
                <i className="fas fa-book"></i>
                <div><h3>{books.length}</h3><p>Total Books</p></div>
              </div>
              <div className="stat-card">
                <i className="fas fa-search"></i>
                <div><h3>{currentBooks.length}</h3><p>Books/Page</p></div>
              </div>
              <div className="stat-card">
                <i className="fas fa-filter"></i>
                <div><h3>{totalPages}</h3><p>Total Pages</p></div>
              </div>
            </div>

            {showForm && (
              <BookForm 
                book={editingBook} 
                onSave={handleSave}
                onCancel={() => {
                  setShowForm(false);
                  setEditingBook(null);
                }}
              />
            )}

            {!showForm && (
              <>
                <BookTable 
                  books={currentBooks}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onBookClick={(book) => setSelectedBook(book)}
                />
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>

          {selectedBook && (
            <BookDetails 
              book={selectedBook}
              onClose={() => setSelectedBook(null)}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
