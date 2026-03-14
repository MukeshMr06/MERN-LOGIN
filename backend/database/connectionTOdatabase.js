import mongoose from 'mongoose';

export const conntTODatabase = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MONGO DB connection ${connection.connection.host}`)
    } catch (error) {
        console.log(`Error while connecting, ${error.message}`)
    }
}