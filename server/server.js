import express from 'express'
import cors from "cors"
import 'dotenv/config'
// import connectDB from './config/db.js'
import yieldRouter from './routes/yieldRoutes.js'
import pestRouter from './routes/pestRoutes.js'
import growthRouter from './routes/growthRoutes.js'


const app = express()

// await connectDB()

app.use(cors({origin:"*"}))
app.use(express.json())


app.get('/',(req,res)=>res.send('Server is Live!'))

app.use('/api/yield',yieldRouter)
app.use('/api/pest',pestRouter)
app.use('/api/growth',growthRouter)


const PORT = process.env.PORT || 3000

app.listen(PORT,()=> {
    console.log('Server is listening on port',PORT)
})