import { validationResult } from "express-validator";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { menuRepository } from "../repositories/index.js";

const createMenu = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const { name, description, image, price } = req.body;

    try {
        const menu = await menuRepository.createMenu({ name, description, image, price });

        res.status(HttpStatusCode.CREATED).json({ message: 'Menu successfully created', data: menu });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

const updateMenu = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
    }
    const id = req.params.id;
    const { name, description, image, price } = req.body;
    
    try {
        const menu = await menuRepository.updateMenu(id, { name, description, image, price });
        res.status(HttpStatusCode.OK).json({ message: 'Menu successfully updated', data: menu });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

const getMenus = async (req, res) => {
    try {
        const menus = await menuRepository.getMenus();
        res.status(HttpStatusCode.OK).json({ message: 'Get Menus successfully', data: menus });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

const getMenuById = async (req, res) => {
    try {
        const menu = await menuRepository.getMenuById(req.params.id);
        res.status(HttpStatusCode.OK).json({ message: 'Get Menu successfully', data: menu });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

export default { createMenu, updateMenu, getMenus, getMenuById };
