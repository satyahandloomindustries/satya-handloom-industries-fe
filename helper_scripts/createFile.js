const fs = require('fs');
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  'Enter the filename to create (without extension): ',
  (filename) => {
    if (filename.trim()) {
      // Replace spaces with underscores
      let sanitizedFileName = filename.trim().replace(/\s+/g, '_');

      // Append .js if not already present
      if (!sanitizedFileName.endsWith('.js')) {
        sanitizedFileName += '.js';
      }

      const filePath = path.resolve(process.cwd(), sanitizedFileName);

      (filePath, __dirname);

      fs.writeFile(filePath, '', (err) => {
        // creates an empty .js file
        if (err) {
          console.error('Error creating file:', err);
        } else {
          (`File '${sanitizedFileName}' created successfully!`);
        }
        rl.close();
      });
    } else {
      ('No filename entered. Exiting.');
      rl.close();
    }
  }
);
