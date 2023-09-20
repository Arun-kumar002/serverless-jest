import mongoose from "mongoose";


const posVsSrsSchema = new mongoose.Schema({

}, {
    timestamps: true, collection: 'posvssrs'
})

export const posVsSrsModal = mongoose.model('posvssrs', posVsSrsSchema)
