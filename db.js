// MongoDb -> NoSQL Database
// Moongoose 는 연결해 주는것
//dotenve는 너가 가끔 숨기고 싶은게 있을 수도 있기 때문
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("💚Connected to DB");
const handleError = (error) => console.log(`💔Error on DB Connection:${error}`);
db.once("open", handleOpen);
db.on("error", handleError);
