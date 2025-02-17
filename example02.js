import knex from 'knex';
import { Transform, Writable } from 'stream';

const knexInstance = knex({
  client: 'mysql',
  connection: {
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'RootPassword',
    database: 'kittech'
  }
})

const readableStream = knexInstance.select(knexInstance.raw('* FROM Offers;'))
  .stream()

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
  .pipe(transformStreamToString)
  .pipe(writableStream)
  .on('close', () => console.log('FINALIZOU', Date()))