import { Menu } from "../models/index.js";

const createMenu = async ({ name, description, image, price }) => {
    const newMenu = await Menu.create({ name, description, image, price });
    return newMenu;
}

const updateMenu = async (id, { name, description, image, price }) => {
    const menu = await Menu.findByIdAndUpdate(id, { name, description, image, price }, { new: true });
    debugger
    if (!menu) {
        throw new Error("Menu not found");
    }
    return menu;
}

const getMenus = async () => {
    return await Menu.find();
}

const getMenuById = async (id) => {
    const menu = await Menu.findById(id);
    if (!menu) {
        throw new Error("Menu not found");
    }
    return menu;
}

export default { createMenu, updateMenu, getMenus, getMenuById };
