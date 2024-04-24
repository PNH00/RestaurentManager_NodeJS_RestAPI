import { body, param, validationResult } from "express-validator"
// import { EventEmitter } from "node:events"
import HttpStatusCode from "../exceptions/HttpStatusCode.js"
import {userRepository} from "../repositories/index.js"

// const myEvent = new EventEmitter()

// myEvent.on('event.register.user', (params) => {
//     console.log('They talked about: ' + JSON.stringify(params))
// })

const login = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            errors: errors.array()
        })
    }
    const { email, password } = req.body
    try {
        let existingUser = await userRepository.login({ email, password })
        res.status(HttpStatusCode.OK).json({
            message: 'login successful',
            data: existingUser
        })
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: error.toString()
        })
    }
}

const register = async (req, res) => {
    //destruction
    debugger
    const {
        name,
        email,
        password,
        phoneNumber,
        address
    } = req.body

    // Event emitter
    // myEvent.emit('event.register.user', {
    //     name,
    //     email,
    //     password,
    //     phoneNumber,
    //     address
    // })

    try {
        debugger
        const user = await userRepository.register({
            name,
            email,
            password,
            phoneNumber,
            address
        })
        res.status(HttpStatusCode.CREATED).json({
            message: 'register successfully created',
            data: user
        })
    } catch (error) {
        debugger
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: error.toString()
        })
    }
}

const getDetailUser = async (req, res) => {
    res.send("GET")
}

export default { login, register, getDetailUser }
