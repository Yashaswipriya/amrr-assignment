import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ItemData {
  name: string;
  type: string;
  description: string;
  coverImage: string;
  additionalImages: string[];
}

export default function AddItemsPage() {
  const [formData, setFormData] = useState<ItemData>({
    name: '',
    type: '',
    description: '',
    coverImage: '',
    additionalImages: ['']
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    const { name, value } = e.target;
    if (name === 'additionalImages' && typeof index === 'number') {
      const updatedImages = [...formData.additionalImages];
      updatedImages[index] = value;
      setFormData({ ...formData, additionalImages: updatedImages });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addImageField = () => {
    setFormData({ ...formData, additionalImages: [...formData.additionalImages, ''] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/items', formData);
      toast.success('Item successfully added!');
      setFormData({
        name: '',
        type: '',
        description: '',
        coverImage: '',
        additionalImages: ['']
      });
    } catch (err) {
      toast.error('Failed to add item');
      console.error('Error submitting item:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">Add a New Item</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Item Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300 text-gray-700"
            required
          />

          <input
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Item Type (Shirt, Pant, etc.)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300 text-gray-700"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300 text-gray-700"
            required
          />

          <input
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="Cover Image URL"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300 text-gray-700"
            required
          />

          <div>
            <label className="font-medium text-gray-700">Additional Images:</label>
            {formData.additionalImages.map((img, index) => (
              <input
                key={index}
                name="additionalImages"
                value={img}
                onChange={(e) => handleChange(e, index)}
                placeholder={`Image URL ${index + 1}`}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300 text-gray-700"
                required
              />
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition "
            >
              + Add Another Image
            </button>
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition"
          >
            Submit Item
          </button>
        </form>
      </div>
    </div>
  );
}
