import dbConnect from '@/lib/db';
import Item from '@/models/Item';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const {
    query: { id },
    method,
  } = req;

  if (method === 'GET') {
    try {
      const item = await Item.findById(id);
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.status(200).json(item);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching item', error: err });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
