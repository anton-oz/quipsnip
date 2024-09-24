import { connect } from "mongoose";

const connection = connect(
  process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : `mongodb://127.0.0.1:27017/quipsnip`
);

export default connection;
