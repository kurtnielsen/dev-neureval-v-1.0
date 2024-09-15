import { NextApiRequest, NextApiResponse } from 'next';
import { postService } from '@/services/post-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, createdById } = req.body;
      const newPost = await postService.createPost({ name, createdById });
      res.status(201).json(newPost);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: 'Failed to create post' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}