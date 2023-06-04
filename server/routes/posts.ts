import express from 'express'
import { Post } from '../../models/post'
import { addComment, addPost, deletePost, getAllPosts, getComments, getPost, updatePost } from '../db/db'

const router = express.Router()

router.get('/', (req, res) => {
  return getAllPosts().then((posts: Post[]) => {
      res.json(posts)
  })
  .catch((err: Error) => res.status(500).json(err.message))
})

router.post('/', (req, res) => {
  const post = req.body
  return addPost(post)
      // .then((postIdArr) => getPost(postIdArr[0]))
      // .then((oneFullPost) => res.json(oneFullPost))
      // .catch((err) => res.status(500).json(err.message))
      // OR:
      
      .then((post) =>  {
          res.json(post)
      })
      .catch((err) => res.status(500).json(err.message))
})

router.patch('/:id', (req, res) => {
  const updatedPost = req.body
  const id = Number(req.params.id)
  return updatePost(id, updatedPost)
      .then((post) => {
          res.json(post)
      })
      .catch((err) => res.status(500).json(err.message))
})

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  return deletePost(id)
      .then(() => {
          res.sendStatus(200)
      })
      .catch((err) => res.status(500).json(err.message))
})

router.get('/:postId/comments', (req, res) => {
  const postId = Number(req.params.postId)
  return getComments(postId)
      .then((comments) => {
          res.json(comments)
      })
      .catch((err) => res.status(500).json(err.message))
})

router.post('/:postId/comments', (req, res) => {
  const postId = Number(req.params.postId)
  const newComment = req.body.comment
  return addComment(postId, newComment)
      .then((comment) => {
          res.json(comment)
      })
      .catch((err) => res.status(500).json(err.message))
})





export default router
