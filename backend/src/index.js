import dotenv from "dotenv"
import { connectDB } from "./db/index.js"
import { app } from "./app.js"

dotenv.config({
    path: "./.env"
})

console.log("here");
const port = process.env.PORT || 3000


connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server connection established at port number ${port}`);
        })
    })
    .catch((error) => {
        console.log("MONGODB CONNECTION FAILED :: ", error);
    })