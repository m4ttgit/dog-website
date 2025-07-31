'use client';

export default function ProductCard({ product }) {
  // Extract a short description for display
  const shortDescription = product.description.length > 100 
    ? product.description.substring(0, 100) + '...' 
    : product.description;

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-contain"
        />
        <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 m-2 rounded-full text-sm font-bold">
          {product.price}
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2 text-gray-800 h-14 overflow-hidden">{product.name}</h2>
        <p className="text-gray-600 mb-6 h-20 overflow-hidden">{shortDescription}</p>
        <div className="flex justify-center">
          <a 
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-500 text-white px-6 py-3 rounded-full font-bold hover:bg-yellow-600 transition-colors w-full text-center"
          >
            Buy on Amazon
          </a>
        </div>
      </div>
    </div>
  );
}