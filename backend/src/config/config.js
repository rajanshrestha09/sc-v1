import dotenv from "dotenv"

dotenv.config({
    path:"./.env"
})

export const conf =  {
    port: process.env.PORT,
    mongodb: process.env.MONGO_URI
}