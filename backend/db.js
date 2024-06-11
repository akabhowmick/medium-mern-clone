import { connect } from "mongoose";

// ! need to change this to own cluster 
const url =
  "mongodb://akky:KdaWNLd6wxADLvy@cluster0-shard-00-00.rfatk.mongodb.net:27017,cluster0-shard-00-01.rfatk.mongodb.net:27017,cluster0-shard-00-02.rfatk.mongodb.net:27017/medium?ssl=true&replicaSet=atlas-i16i1b-shard-0&authSource=admin&retryWrites=true&w=majority";
export function connection() {
  connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.log("Error: ", err));
}
