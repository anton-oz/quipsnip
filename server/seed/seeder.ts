import connection from "../config/connection";
import { Profile } from "../models";

const cleanDB = async () => {
  try {
    const db = await connection;
    await Profile.deleteMany({});

    const x = await Profile.create([
      { username: "admin", password: "password" },
    ]);

    const y = await Profile.find();

    console.log(`\n${y}\n`);

    console.log("\nseeded\n");
    process.exit(0);
  } catch (err) {
    throw err;
  }
};

cleanDB();
