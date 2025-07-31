import fs from 'fs';
import csv from 'csv-parser';
import { parse } from 'csv-parse';

// Input and output file paths
const inputFile = 'app/database/akc-data-latest.csv';
const outputFile = 'app/database/akc-data-cleaned.csv';

// Numeric fields that need validation
const numericFields = [
  'min_height', 'max_height',
  'min_weight', 'max_weight',
  'min_expectancy', 'max_expectancy',
  'grooming_frequency_value', 'energy_level_value',
  'trainability_value'
];

// Process CSV file
const processCsv = () => {
  const results = [];
  
  fs.createReadStream(inputFile)
    .pipe(csv())
    .on('data', (data) => {
      // Clean numeric fields
      numericFields.forEach(field => {
        if (data[field] === '' || isNaN(data[field])) {
          data[field] = '0'; // Set default value
        }
      });
      results.push(data);
    })
    .on('end', () => {
      // Write cleaned data to new CSV
      const stringifier = parse(results, { header: true });
      const writableStream = fs.createWriteStream(outputFile);
      
      stringifier.pipe(writableStream);
      console.log('CSV preprocessing completed. Cleaned file saved to:', outputFile);
    });
};

processCsv();
