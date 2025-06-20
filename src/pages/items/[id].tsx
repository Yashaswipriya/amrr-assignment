import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ItemData {
  _id: string;
  name: string;
  type: string;
  description: string;
  coverImage: string;
  additionalImages: string[];
}

export default function ItemDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState<ItemData | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchItem = async () => {
      try {
        const response = await axios.get(`/api/items/${id}`);
        setItem(response.data);
      } catch (err) {
        console.error('Failed to fetch item:', err);
      }
    };
    fetchItem();
  }, [id]);

  if (!item) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading item...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/30 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-6 w-full max-w-3xl"
      >
        <img
          src={item.coverImage}
          alt={item.name}
          className="w-full h-80 object-contain rounded-lg mb-6"
        />

        <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.name}</h1>

        <span className="inline-block px-3 py-1 bg-blue-200 text-blue-900 text-sm font-medium rounded-full mb-4">
          {item.type}
        </span>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">📝 Description</h3>
          <p className="text-gray-700">{item.description}</p>
        </div>

        {item.additionalImages.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">📷 Additional Images</h3>
            <Swiper 
            spaceBetween={10} 
            slidesPerView={2} 
            className='h-full'
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            >
              {item.additionalImages.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`Additional ${index + 1}`}
                    className="rounded-lg w-full h-full object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <a
            href={`mailto:seller@example.com?subject=I'm interested in ${encodeURIComponent(
                item.name
            )}&body=Hi, I'm interested in the product "${encodeURIComponent(
                item.name
            )}". Please send more details.`}
            >
            <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition w-full">
                Enquire
            </button>
        </a>

      </motion.div>
    </div>
  );
}

