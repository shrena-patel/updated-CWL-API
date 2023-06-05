import { Post } from '../../models/post';
import connection from './connection'

export async function getAllPosts(db = connection) {
  const posts = await db('posts').select(
    'id',
    'title',
    'date_created as dateCreated',
    'text'
   ) 
   return posts as Post[]
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

// when deleting a post, also delete its comments
export function deletePost(id: number, db = connection): Promise<number> {
  return db('comments').delete().where('post_id', id)
    .then(() => db('posts').delete().where('id', id))
}

// COMMENTS

export function getComments(postId: number, db = connection) {
  return db('comments')
    .select('id', 'post_id as postId', 'date_posted as datePosted', 'comment')
    .where('post_id', postId)
}

export function getComment(id: number, db = connection) {
  return db('comments')
    .select('id', 'post_id as postId', 'date_posted as datePosted', 'comment')
    // where the comment ID matches the id passed into the function (not the post ID)
    .where('id', id)
    .first()
}

export function addComment(postId: number, comment: {comment: string}, db = connection) {
  return db('comments')
    .where('post_id', postId)
    .insert({
      post_id: postId,
      date_posted: Date.now(),
      comment: comment
    })
    .then((idArr) => {
      return getComment(idArr[0])
    })
}

export function updateComment(commentId: number, updatedComment: {comment: string}, db = connection) {
  return db('comments')
    .where('id', commentId)
    .update(updatedComment)
    .then(() => {
      return getComment(commentId)
    })
}

export function deleteComment(commentId: number, db = connection) {
  return db('comments')
    .delete()
    .where('id', commentId)
}