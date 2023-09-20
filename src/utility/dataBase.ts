import mongoose from "mongoose";

export const dbConnect = async () => {
    mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.environment === 'development' ? 'mongodb://localhost:27017' : process.env.mongoUrl)
}
export const dbDisConnect = async () => {
    await mongoose.disconnect()
}



