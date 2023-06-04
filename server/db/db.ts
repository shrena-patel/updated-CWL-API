import { Post } from '../../models/post';
import connection from './connection'

export function getAllPosts(db = connection): Promise<Post[]> {
  return db('posts').select(
    'id',
    'title',
    'date_created as dateCreated',
    'text'
   )
}

export function getPost(id: number, db = connection): Promise<Post> {
  return db('posts')
  .select('id', 'title', 'date_created as dateCreated', 'text')
  .where('id', id)
  .first()
}

export function addPost(post: {title: string, text: string}, db = connection): Promise<Post> {
  return db('posts')
    .insert({...post, date_created: Date.now() })
    .then((id) => {
      return getPost(id[0])
    })
}

export function updatePost(id: number, updatedPost: {title: string, text: string}, db = connection) {
  return db('posts')
    .where('id', id)
    .update(updatedPost)
    // update the post then get the newly updated post
    .then(() => {
      return getPost(id)
    })
}