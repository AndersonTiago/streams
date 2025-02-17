import fs from 'fs';
import csv from 'csv-parser';
import { Transform, Writable } from 'stream';

const readableStream = fs.createReadStream('file.csv');
const transformStreamToOBject = csv({ separator: ';' })
const transformStreamToString = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    callback(null, JSON.stringify(chunk))
  }
})

const writableStream = new Writable({
  write(chunk, encoding, callback) {
    const string = chunk.toString()
    const data = JSON.parse(string)
    console.log(data);
    callback()
  }
})

console.log('INICIOU', Date());

readableStream
  .pipe(transformStreamToOBject)
  .pipe(transformStreamToString)
  .pipe(writableStream)
  .on('close', () => console.log('FINALIZOU', Date()))

