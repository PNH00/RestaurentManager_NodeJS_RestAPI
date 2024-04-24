import mongoose, { Schema, ObjectId } from "mongoose";

const Menu =  new Schema({
    id: {type: ObjectId},
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
})

export default mongoose.model('Menu',Menu)