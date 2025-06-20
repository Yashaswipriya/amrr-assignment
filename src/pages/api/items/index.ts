import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db';
import Item from '@/models/Item';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { name, type, description, coverImage, additionalImages } = req.body;
      const newItem = await Item.create({ name, type, description, coverImage, additionalImages });
      return res.status(201).json({ message: 'Item successfully added', item: newItem });
    } catch (error) {
      return res.status(500).json({ message: 'Error adding item', error });
    }
  }

  if (req.method === 'GET') {
    try {
      const items = await Item.find();
      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching items', error });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
