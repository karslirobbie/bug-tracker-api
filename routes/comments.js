const { validCommentBody } = require('../middleware/comments')
const { authenticate } = require('../middleware/auth')
const { validId } = require('../middleware/tickets')
const Comment = require('../models/comments')
const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
  const comments = await Comment.find()
    .populate("createdBy", "name -_id")
    .select("-__v")
  res.send(comments)
})



router.get('/:id', validId, async (req, res) => {
  const comments = await Comment.findById(req.params.id)
    .populate("createdBy", "name -_id")
    .select("-__v")
  if (!comments) return res.status(404).send('Comment with specified ID not found');
  res.send(comments)
})



router.post('/', [validCommentBody, authenticate], async (req, res) => {
  const comment = new Comment({
    comment: req.body.comment,
    parentTag: req.body.parentTag,
    createdBy: req.body.createdBy
  })

  await comment.save();
  res.send(comment)
})



router.put('/:id', [validId, authenticate], async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, {
    comment: req.body.comment
  }, { new: true, select: "-__v" })

  if (!comment) return res.status(404).send('Comment with the specified ID not found.')
  res.send(comment)
})



router.delete('/:id', [validId, authenticate], async (req, res) => {
  const comment = await Comment.findByIdAndRemove(req.params.id)
  if (!comment) return res.status(404).send('Comment with the specified ID not found.')
  res.send(comment)
})


module.exports = router