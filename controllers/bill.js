import { validationResult } from "express-validator";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { billRepository } from "../repositories/index.js";

const createBill = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    try {
        const { menus } = req.body
        const paymentStatus = 'UNPAID'
        const totalPrice = menus.reduce((total, menu) => total + menu.price, 0);

        const currentTimeUTC = Date.now();
        const vietnamTimezoneOffset = 7 * 60 * 60 * 1000;
        const createDate = currentTimeUTC + vietnamTimezoneOffset;

        const bill = await billRepository.createBill({ menus, paymentStatus, totalPrice, createDate });

        res.status(HttpStatusCode.CREATED).json({ message: 'Bill successfully created', data: bill });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

const updateBill = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const id = req.params.id;
    try {
        const { menus } = req.body
        const {paymentStatus} = req.body
        const totalPrice = menus.reduce((total, menu) => total + menu.price, 0);

        const currentTimeUTC = Date.now();
        const vietnamTimezoneOffset = 7 * 60 * 60 * 1000;
        const createDate = currentTimeUTC + vietnamTimezoneOffset;

        const bill = await billRepository.updateBill(id,{ menus, paymentStatus, totalPrice, createDate });
        
        res.status(HttpStatusCode.CREATED).json({ message: 'Bill successfully updated', data: bill });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

const getBills = async (req, res) => {
    try {
        const bills = await billRepository.getBills();

        res.status(HttpStatusCode.OK).json({ message: 'Get Bills successfully', data: bills });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

const getBillById = async (req, res) => {
    try {
        const bill = await billRepository.getBillById(req.params.id);

        res.status(HttpStatusCode.OK).json({ message: 'Get Bill successfully', data: bill });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export default { createBill, updateBill, getBills, getBillById };