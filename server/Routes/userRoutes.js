const router = require('express').Router();
const cors = require('cors');
const authenticationMiddleware = require('../middlewares/authMiddleware');
const { showAllTodos, deleteTodo, createTodo, handleUserStats, handleAbout } = require('../controllers/userControllers');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
);
router.get('/about', authenticationMiddleware, handleAbout);
router.get('/', authenticationMiddleware, showAllTodos);
router.post('/', authenticationMiddleware, createTodo); // Add middleware here
router.delete('/:id', authenticationMiddleware, deleteTodo); // Changed from get to delete and added middleware
router.get('/profile', authenticationMiddleware, handleUserStats);

module.exports = router;
