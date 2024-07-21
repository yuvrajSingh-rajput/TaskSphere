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

router.route('/').get(authenticationMiddleware, showAllTodos);
router.route('/').post(authenticationMiddleware, createTodo);

router.route('/about').get(authenticationMiddleware, handleAbout);
router.route('/:id', authenticationMiddleware, deleteTodo);
router.route('/profile').get(authenticationMiddleware, handleUserStats);

module.exports = router;
