import mongoose from "mongoose";


const srsSchema = new mongoose.Schema({
   
}, {
    timestamps: true, collection: 'srs'
})

export const srsModal = mongoose.model('srs', srsSchema)
