document.addEventListener('DOMContentLoaded', function() {
    displayBooks();
  });
  
  function getBooksFromStorage() {
    return JSON.parse(localStorage.getItem('books')) || [];
  }
  
  function saveBooksToStorage(books) {
    localStorage.setItem('books', JSON.stringify(books));
  }
  
  function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = parseInt(document.getElementById('year').value);
    
    if (!title || !author || !year) {
        alert('Semua kolom harus diisi!');
        return;
    }
    const newBook = {
      id: +new Date(),
      title,
      author,
      year,
      isComplete: false
    };
  
    const books = getBooksFromStorage();
    books.push(newBook);
    saveBooksToStorage(books);
    displayBooks();
  }
  
  function moveBook(id, isComplete) {
    const books = getBooksFromStorage();
    const index = books.findIndex(book => book.id === id);
    books[index].isComplete = isComplete;
    saveBooksToStorage(books);
    displayBooks();
  }
  
  function removeBook(id) {
    const books = getBooksFromStorage();
    const index = books.findIndex(book => book.id === id);
    books.splice(index, 1);
    saveBooksToStorage(books);
    displayBooks();
  }
  
  function displayBooks() {
    const unreadList = document.getElementById('unread-list');
    const readList = document.getElementById('read-list');
  
    unreadList.innerHTML = '';
    readList.innerHTML = '';
  
    const books = getBooksFromStorage();
  
    books.forEach(book => {
      const li = document.createElement('li');
      li.textContent = `${book.title} - ${book.author} (${book.year})`;
  
      const moveButton = document.createElement('button');
      moveButton.textContent = book.isComplete ? 'Belum Selesai Dibaca' : 'Selesai Dibaca';
      moveButton.addEventListener('click', function() {
        moveBook(book.id, !book.isComplete);
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Hapus';
      deleteButton.addEventListener('click', function() {
        removeBook(book.id);
      });
  
      li.appendChild(moveButton);
      li.appendChild(deleteButton);
  
      if (book.isComplete) {
        readList.appendChild(li);
      } else {
        unreadList.appendChild(li);
      }
    });
  }
  