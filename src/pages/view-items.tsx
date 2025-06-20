import { useEffect, useState } from 'react';
import axios from 'axios';
import ItemCard from '@/components/ItemCard';
import { useRouter } from 'next/router';


interface ItemData {
  _id: string;
  name: string;
  type: string;
  description: string;
  coverImage: string;
  additionalImages: string[];
}

export default function ViewItemsPage() {
  const [items, setItems] = useState<ItemData[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">All Items</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {items.map((item) => (
          <ItemCard
            key={item._id}
            _id={item._id}
            name={item.name}
            type={item.type}
            coverImage={item.coverImage}
          />
        ))}
      </div>
      <button
        onClick={() => router.push('/addItems')}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-3 rounded-full text-lg shadow-lg hover:bg-blue-700 transition-all z-50"
      >
        + Add Item
      </button>
    </div>
  );
}

