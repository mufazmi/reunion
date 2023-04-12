import express, { Application,Request,Response,NextFunction } from "express";
import dotenv from "dotenv"
dotenv.config()
import ErrorHandler from './utils/error-handler';
import dbConfig from "./configs/db-config";
const PORT:Number = Number(process.env.PORT || 3000)
dbConfig

// Application
const app:Application = express()
app.use(express.json())

//Main Route
import mainRoute from './routes';
import errorMiddleware from "./middlewares/error-middleware";
app.use('/api',mainRoute);

// Not Found Middleware
app.use((req:Request,res:Response,next:NextFunction)=>{
    return next(ErrorHandler.notFound())
})

// Error Middleware
app.use(errorMiddleware);

//Listning Server
app.listen(PORT,()=>console.log(`SERVER IS LISTING ON ${PORT}`))