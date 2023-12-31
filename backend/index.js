const express  = require("express")
const cors = require("cors")
const configureDB = require("./config/database")
const router = require("./config/routes")
const PORT = 3333

configureDB()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(router)
app.use('/uploads', express.static('uploads'))

app.listen(PORT, (req, res)=>{
    console.log("Server is running on port", PORT)
})


