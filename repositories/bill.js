import { Bill } from "../models/index.js";

const createBill = async ({menus,paymentStatus,totalPrice,createDate}) => {
    const newBill = await Bill.create({menus,paymentStatus,totalPrice,createDate})
    debugger
    return Bill.findById(newBill._doc._id).populate("menus");
}

const updateBill = async (id,{menus,paymentStatus,totalPrice,createDate}) => {
    const bill = await Bill.findByIdAndUpdate(id, {menus,paymentStatus,totalPrice,createDate}, { new: true });
    debugger
    if (!bill) {
        throw new Error("Bill not found");
    }
    return Bill.findById(bill._doc._id).populate("menus");
}

const getBills = async () => {
    return await Bill.find().populate("menus");
}

const getBillById = async (id) => {
    const bill = await Bill.findById(id).populate("menus");
    if (!bill) {
        throw new Error("Bill not found");
    }
    return bill;
}

export default { createBill, updateBill, getBills, getBillById };
