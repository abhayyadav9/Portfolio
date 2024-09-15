import mongoose from "mongoose";


const dbConnection =async()=>{
    try {
        await mongoose.connect(process.env.URI);
        console.log('DB connected succesFully!');
        
    } catch (error) {
        console.error(error)

        
    }
}

export default  dbConnection;