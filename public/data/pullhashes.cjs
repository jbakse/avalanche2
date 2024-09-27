// created by chatgpt 4o
// this script finds all the bcrypt hashes in the users.json
// and writes them to a file so they can be removed from the git history
// by BFG

// cd to this directory
// node pullhashes.cjs

const fs = require("fs");
const path = require("path");

// Recursively find all `users.json` files in subdirectories
const findJsonFiles = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(findJsonFiles(filePath)); // Recursively search directories
    } else if (file === "users.json") {
      results.push(filePath); // Collect users.json files
    }
  });

  return results;
};

// Recursively search for bcrypt properties
const findBcryptValues = (obj, bcryptValues = []) => {
  if (typeof obj === "object" && obj !== null) {
    Object.keys(obj).forEach((key) => {
      if (key === "bcrypt") {
        bcryptValues.push(obj[key]);
      } else if (typeof obj[key] === "object") {
        findBcryptValues(obj[key], bcryptValues); // Recurse for nested objects
      }
    });
  }
  return bcryptValues;
};

// Main function to find bcrypt properties and write to file
const main = () => {
  const cwd = process.cwd(); // Current working directory
  const jsonFiles = findJsonFiles(cwd);
  const bcryptValues = [];

  jsonFiles.forEach((filePath) => {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const jsonData = JSON.parse(fileContent);
      const bcryptsInFile = findBcryptValues(jsonData);
      bcryptValues.push(...bcryptsInFile);
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error);
    }
  });

  // Write all bcrypt values to a line-delimited file
  fs.writeFileSync("bcrypt_values.txt", bcryptValues.join("\n"), "utf-8");
  console.log(
    `Found ${bcryptValues.length} bcrypt values. Saved to bcrypt_values.txt.`,
  );
};

main();
