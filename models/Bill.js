import mongoose, { Schema, ObjectId } from "mongoose";

const Bill = new Schema({
    id: {type: ObjectId},
    menus: [{
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['PAID', 'UNPAID'],
        default: 'UNPAID',
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

export default mongoose.model('Bill', Bill);