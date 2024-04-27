import { promises as fs} from 'fs';
import {parse} from 'csv';
import Papa from 'papaparse';


const allCrimes = new Set();
const crimeArr = [];

const readAndParseCSV = async () => {
try{
    const content = await fs.readFile('../assets/crimesDataset.csv');
    const records = parse(content, (error, records) => {
      if (error) {
        console.error("Error: ", error);
      } else {
        console.log(records.length);
        records.forEach((record) => {
          //console.log(record);
          //console.log(typeof(record));
          Object.entries(record).forEach(([key, value]) => {
            if (value !== ""){
              //console.log(value);
              allCrimes.add(value);
              crimeArr.push(value);
            }
          })
        });
        console.log(allCrimes);
        console.log("----------------------------------------------------------------------");
        const crimeString = JSON.stringify(Array.from(allCrimes));
        const writeSet = async () => {
          await fs.writeFile('./allCrimes.txt', crimeString, (err) => {
          if(err){
            console.error("Error: ", err);
          }
          else{
            console.log("File written successfully!");
          }
        })}
        writeSet();
    }})// <--- Add this line
}
catch(error){
    console.error("Error: ", error);
}
}
readAndParseCSV();
