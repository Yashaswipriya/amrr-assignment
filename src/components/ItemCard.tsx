import { useRouter } from 'next/router';

export interface ItemProps {
  _id: string;
  name: string;
  type: string;
  coverImage: string;
}

export default function ItemCard({ _id, name, type, coverImage }: ItemProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/items/${_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition flex flex-col items-center text-center"
    >
      <div className="w-full h-48 overflow-hidden rounded-lg mb-3">
        <img
          src={coverImage}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      <p className="text-sm text-gray-600">{type}</p>
    </div>
  );
}
