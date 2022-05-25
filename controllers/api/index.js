const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const addCommentRoutes = require('./addCommentRoutes');
const accountCommentRoutes = require('./accountCommentRoutes');
const editCommentRoutes = require('./editCommentRoutes');

router.use('/users', userRoutes);
router.use('/comment', commentRoutes);
router.use('/add-comment', addCommentRoutes);
router.use('/account-comment', accountCommentRoutes);
router.use('/edit-comment', editCommentRoutes);

module.exports = router;