import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export function getCafes() {
  const csvFilePath = path.join(process.cwd(), 'app/database/dog_cafe_singapore_clean.csv');
  const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
  
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true
  });

  return records.map(record => ({
    name: record.Name || '',
    address: record.Address || record['Address 1'] || '',
    rating: parseFloat(record.Rating) || 0,
    likes: record.Likes || '',
    type: record.Type || '',
    mapsUrl: record.web || '',
    image: record['Web 2'] || ''
  }));
}