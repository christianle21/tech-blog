const router = require('express').Router();
const Comment = require('../../models/Comment');

router.put('/:id', async (req, res) => {
    try {
        const comment = await Comment.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({ where: { id: req.params.id } })

            res.render('account-comment', {
                logged_in: req.session.logged_in,
                username: req.session.username
            })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;