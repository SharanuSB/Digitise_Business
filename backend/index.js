const express  = require("express")
const cors = require("cors")
const configureDB = require("./config/database")
const PORT = 3333

const app = express()

app.use(cors())

app.listen(PORT, (req, res)=>{
    console.log("Server is running on port", PORT)
})
configureDB()
