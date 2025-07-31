import { getDogById } from "@/app/api/dogs";

async function BreedPage({ params }) {
  const dog = await getDogById(parseInt(params.slug));
  if (!dog) {
    return <div>Breed not found</div>;
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold">{dog.name}</h1>
      <p className="mt-4">Breed: {dog.breed}</p>
      <img className="mt-4 max-w-full h-auto" src={dog.image} alt={dog.name} />
    </div>
  );
}

export default BreedPage;
