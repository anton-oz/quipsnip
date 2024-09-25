import connection from "../config/connection";
import { Profile, Post } from "../models";

const cleanDB = async () => {
  try {
    const db = await connection;
    await Profile.deleteMany({});
    await Post.deleteMany({});

    await Profile.create([
      {
        _id: "66f37c9dae77048cd1fb3703",
        username: "admin",
        password: "password",
      },
    ]);
    const x = await Post.create([
      {
        user: { _id: "66f37c9dae77048cd1fb3703" },
        type: "Question",
        title: "Will this work?",
        code: "console.log('hello world!\");",
        comments: [
          {
            user: { _id: "66f37c9dae77048cd1fb3703" },
            text: "oopsy small typo nvm",
          },
        ],
      },
    ]);
    console.log(x);

    console.log("\nseeded\n");
    process.exit(0);
  } catch (err) {
    throw err;
  }
};

cleanDB();
