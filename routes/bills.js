import express from "express"
// Much have {}
import { billController } from "../controllers/index.js"
import { body } from "express-validator"

const router = express.Router()

// Use userController.getDetailUser instead of userController.getDetailUser()
router.get('/', billController.getBills)

router.get('/:id', billController.getBillById)

router.post('/',
    body('menus').isLength({ min: 1 }),
    billController.createBill
)

router.put('/:id',
    body('menus').isLength({ min: 1 }),
    body('paymentStatus').exists(),
    billController.updateBill
)

export default router