import express from "express"
import cors from "cors"

import { errorHandler } from "./middleware/index.js"

const app = express()
const PORT = 3000

// middleware
app.use(express.json())
app.use(cors())
app.use(errorHandler)


app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))