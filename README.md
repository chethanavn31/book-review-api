 📚 Book Review API

A RESTful API built with Node.js, Express, and MongoDB that allows users to sign up, log in, manage books, write reviews, and search through book listings.

---

## 🔧 Project Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/chethanavn31/book-review-api.git
cd book-review-api
```
### 2. Install dependencies
npm install

### 3.  Environment variables
Create a .env file in the backend/ directory and add the following:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

### 4. Start the server
npm run dev

Server runs on: http://localhost:5000

### 5. Example API requests (Postman)

1. Signup: 
POST: http://localhost:5000/signup
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "123456"
}


2.Login
POST: http://localhost:5000/login
{
  "email": "john@example.com",
  "password": "123456"
}

3.Add a book (route is protected, need to pass the login token)
set up headers in postman: (input as keyvalue pairs)
Autharization: Bearer <Token>
Content-Type: application/json

POST: http://localhost:5000/books

{
  "title": "Deception Point",
  "author": "Dan Brown",
  "description": "2001 Mystry Thriller."
}

4.Get all books
GET: http://localhost:5000/books

5.Get book by id (replace ':id' with the book id)
GET: http://localhost:5000/books/:id

6. Submit book review (replace ':id' with the book id), The route is protected, pass the tokens also
set up headers in postman: (input as keyvalue pairs)
Autharization: Bearer <Token>
Content-Type: application/json

POST: http://localhost:5000/books/:id/reviews

{
  "rating": 4,
  "comment": "My fav thriller of all time"
}

7. Update your review (replace ':id' with the review), The route is protected, pass the tokens also
set up headers in postman: (input as keyvalue pairs)
Autharization: Bearer <Token>
Content-Type: application/json

POST: http://localhost:5000/reviews/682ef9350a610324fda0129b
{
  "rating": 5,
  "comment": "Best thriller of all times!"
}

8. Delete the review (replace ':id' with the review), The route is protected, pass the tokens also
set up headers in postman: (input as keyvalue pairs)
Autharization: Bearer <Token>
Content-Type: application/json
DELETE: http://localhost:5000/reviews/682ef9350a610324fda0129b

9. Search book (replace 'word' with word you are searching')
GET: http://localhost:5000/books/search?q=word


#### NOTE : logout fucntion is not created, so upon adding book, adding reviews, and updating reviews carefull to use appropriate user tokens for autharization