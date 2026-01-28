export const booksData = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    year: "1960",
    isbn: "9780446310789",
    publisher: "J. B. Lippincott & Co.",
    stock: 25,
    price: 12.99,
    description: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.",
    cover: "https://i.pinimg.com/736x/60/0a/8e/600a8e999ba451685b573230a918452b.jpg"
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genre: "Sci-Fi",
    year: "1949",
    isbn: "9780451524935",
    publisher: "Secker & Warburg",
    stock: 18,
    price: 9.99,
    description: "A dystopian social science fiction novel set in a world where totalitarian government watchfulness has reached new extremes.",
    cover: "https://i.pinimg.com/1200x/6f/cf/76/6fcf76874ffe4ba02a7c23fac931d17c.jpg"
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    year: "1813",
    isbn: "9780141439518",
    publisher: "T. Egerton",
    stock: 32,
    price: 8.99,
    description: "One of the most popular novels in English literature, it is a brilliant comedy of manners.",
    cover: "https://i.pinimg.com/736x/fa/69/81/fa698105e4652d704fd6658ef173a505.jpg"
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: "1925",
    isbn: "9780743273565",
    publisher: "Charles Scribner's Sons",
    stock: 15,
    price: 11.50,
    description: "The exemplary novel of the Jazz Age, a chronicle of lost love, a critic's dream.",
    cover: "https://i.pinimg.com/1200x/06/74/19/067419c66052c8c21f988efc88a63dc8.jpg"
  },
  {
    id: 5,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    genre: "Non-Fiction",
    year: "2011",
    isbn: "9780062316097",
    publisher: "Harper",
    stock: 42,
    price: 18.99,
    description: "Destined to become a classic, Sapiens is a remarkable grand history of humankind, from the Stone Age to the Silicon Age.",
    cover: "https://i.pinimg.com/1200x/69/2b/80/692b807e2837f9645592276778b72bef.jpg"
  }
];



let nextId = 6;

export const addBook = (bookData) => {
  const newBook = {
    id: nextId++,
    ...bookData,
    // Use uploaded image or fallback to default
    cover: bookData.cover || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
  };
  booksData.unshift(newBook);
  return newBook;
};

export const updateBook = (id, bookData) => {
  const index = booksData.findIndex(book => book.id === id);
  if (index !== -1) {
    booksData[index] = { 
      ...booksData[index], 
      ...bookData,
      cover: bookData.cover || booksData[index].cover
    };
  }
};

export const deleteBook = (id) => {
  const index = booksData.findIndex(book => book.id === id);
  if (index !== -1) {
    // Clean up image URL if it's a local blob
    const book = booksData[index];
    if (book.cover && book.cover.startsWith('blob:')) {
      URL.revokeObjectURL(book.cover);
    }
    booksData.splice(index, 1);
  }
};
