// users.ts
import { connectionPool } from './db';

interface UserData {
  username: string;
  profileImage: string;
}

async function insertUser({ username, profileImage }: UserData) {
  try {
    const users = await connectionPool.query(`
      INSERT INTO users (username, profileImage)
      VALUES ('${username}', '${profileImage}')
      RETURNING *
    `);
    console.log(users);
    return users;
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error',
    };
  }
}

export { insertUser };
