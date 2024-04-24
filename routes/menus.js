import express from "express"
// Much have {}
import {menuController} from "../controllers/index.js"
import { body } from "express-validator"

const router = express.Router()

// Use userController.getDetailUser instead of userController.getDetailUser()
router.get('/',menuController.getMenus)

router.get('/:id',menuController.getMenuById)

router.post('/',
    body('name').isLength({ max: 30}),
    body('description').isLength({ max: 50 }),
    body('image').isURL(),
    body('price').isNumeric({ min: 0}),
        menuController.createMenu
)

router.put('/:id',
    body('name').isLength({ max: 30}),
    body('description').isLength({ max: 50 }),
    body('image').isURL(),
    body('price')
    .isNumeric({ min: 0 }).withMessage('Price must be a positive number')
    .isFloat({ gt: -1 }).withMessage('Price must be greater than 0'),
        menuController.updateMenu
)

export default router