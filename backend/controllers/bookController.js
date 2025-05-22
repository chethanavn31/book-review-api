import Book from '../models/Book.js';
import Review from '../models/Review.js'

export const addBook = async (req, res) => {
  try {
    const { title, author, description } = req.body;

    const newBook = new Book({
      title,
      author,
      description,
      user: req.user._id // this comes from the protect middleware
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.log("error:",error)
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.author) {
      filter.author = { $regex: req.query.author, $options: 'i' }; // case-insensitive
    }

    if (req.query.genre) {
      filter.genre = { $regex: req.query.genre, $options: 'i' };
    }

    const total = await Book.countDocuments(filter);
    const books = await Book.find(filter)
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(limit)
      .populate('user', 'username email');

    res.status(200).json({
      page,
      totalPages: Math.ceil(total / limit),
      totalBooks: total,
      books
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    // Get pagination query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // Find book
    const book = await Book.findById(id).populate('user', 'username email');
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Get reviews & average rating
    const reviews = await Review.find({ book: id })
      .populate('user', 'username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalReviews = await Review.countDocuments({ book: id });

    const avgRatingAgg = await Review.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);

    const averageRating = avgRatingAgg.length > 0 ? avgRatingAgg[0].avgRating.toFixed(1) : null;

    res.status(200).json({
      book,
      averageRating,
      reviews,
      page,
      totalPages: Math.ceil(totalReviews / limit),
      totalReviews
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
