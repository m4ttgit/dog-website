import 'dotenv/config';
import { supabase } from '../app/lib/supabase.js';
import fs from 'fs';
import csv from 'csv-parser';

const importBreeds = async () => {
  try {
    const results = [];
    
    // Read CSV file
    fs.createReadStream('app/database/akc-data-latest.csv')
      .pipe(csv())
      .on('data', (data) => {
        // Handle empty numeric fields
        const numericFields = [
          'min_height', 'max_height', 
          'min_weight', 'max_weight',
          'min_expectancy', 'max_expectancy',
          'grooming_frequency_value', 'energy_level_value',
          'trainability_value'
        ];
        
        numericFields.forEach(field => {
          if (data[field] === '') {
            data[field] = '0'; // Set default value for empty fields
          }
        });
        
        results.push(data);
      })
      .on('end', async () => {
        console.log(`Read ${results.length} records from CSV`);

        // Insert data in batches
        const batchSize = 100;
        for (let i = 0; i < results.length; i += batchSize) {
          const batch = results.slice(i, i + batchSize);
          
          const { data, error } = await supabase
            .from('dogbreed')
            .insert(batch)
            .select();

          if (error) {
            console.error('Batch insert error:', error);
            continue;
          }

          console.log(`Inserted batch ${i/batchSize + 1}: ${data.length} records`);
        }

        console.log('Data import completed');
        process.exit(0);
      });

  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
};

importBreeds();
