import { getBreeds } from '../breeds.js';

export async function GET() {
  try {
    const breeds = await getBreeds();
    return Response.json(breeds);
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: 'Failed to fetch breeds' }, { status: 500 });
  }
}