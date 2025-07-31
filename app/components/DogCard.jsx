function DogCard({ dog }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-48 overflow-hidden">
        <img
          src={dog.image}
          alt={dog.breed}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-primary mb-2">{dog.breed}</h2>
        <p className="text-sm text-gray-600">
          Learn more about this wonderful breed →
        </p>
      </div>
    </div>
  );
}

export default DogCard;