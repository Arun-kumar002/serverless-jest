import mongoose from "mongoose";



const srsVsPosSchema = new mongoose.Schema({

}, {
    timestamps: true, collection: 'srsvspos'
})

export const srsVsPosModal = mongoose.model('srsvspos', srsVsPosSchema)
