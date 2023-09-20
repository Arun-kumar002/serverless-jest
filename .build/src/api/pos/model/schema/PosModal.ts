import mongoose from "mongoose";



const posSchema = new mongoose.Schema({

}, {
    timestamps: true, collection: 'pos'
})

export const posModal = mongoose.model('pos', posSchema)
