import { eq } from 'drizzle-orm';
import { db } from '../models/schema';
import { Post, NewPost, posts } from '../models/schema';

class PostService {
  async getAllPosts(): Promise<Post[]> {
    try {
      const postsList = await db.select().from(posts).execute();
      return postsList;
    } catch (error) {
      console.error('Error fetching all posts:', error);
      throw new Error('Failed to fetch all posts');
    }
  }

  async getPostById(id: number): Promise<Post | null> {
    try {
      const post = await db.select().from(posts).where(eq(posts.id, id)).execute();
      return post.length ? post[0] : null;
    } catch (error) {
      console.error(`Error fetching post by id (${id}):`, error);
      throw new Error('Failed to fetch post by id');
    }
  }

  async createPost(post: NewPost): Promise<Post> {
    try {
      const newPost = await db.insert(posts).values(post).returning().execute();
      return newPost[0];
    } catch (error) {
      console.error('Error creating post:', error);
      throw new Error('Failed to create post');
    }
  }
}

// Exporting an instance for singleton-like usage
export const postService = new PostService();
