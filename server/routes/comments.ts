import express from 'express'
import { deleteComment, updateComment } from '../db/db'

// eslint-disable-next-line no-unused-vars

const router = express.Router()

router.patch('/:commentId', (req, res) => {
  const updatedComment = req.body
  const commentId = Number(req.params.commentId)
  return updateComment(commentId, updatedComment)
      .then((comment) => {
          res.json(comment)
      })
     
})

router.delete('/:commentId', (req, res) => {
  const commentId = Number(req.params.commentId)
  return deleteComment(commentId) 
      .then(() => {
          res.sendStatus(200)
      })
})

export default router
