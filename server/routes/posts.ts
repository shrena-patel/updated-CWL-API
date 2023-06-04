import express from 'express'
import { Post } from '../../models/post'
import { addPost, getAllPosts, getPost } from '../db/db'

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

export default router
