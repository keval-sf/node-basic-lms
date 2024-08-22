import { JsonDB, Config } from 'node-json-db';

export interface UserBody {
  id: number
  name: string
  email: string
}

// Configure the database
const db = new JsonDB(new Config("db", true, false, '/'));

const setData = async () =>{
  // Initialize the database with default data if it doesn't exist
  const exists = await db.exists('/users');
  if (!exists) {
    db.push('/users', []).then(() => console.log('Users key set'));
  }

}

setData()

export default db;
