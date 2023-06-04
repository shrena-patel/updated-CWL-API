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