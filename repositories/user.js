// import { print, OutputType } from "../helpers/print.js"
import { User } from "../models/index.js"
import Exception from "../exceptions/Exception.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

//Use {} in case the parameters change order
const login = async ({ email, password }) => {

    let existingUser = await User.findOne({ email }).exec()

    if (existingUser) {
        let isMatched = await bcrypt.compare(password, existingUser.password)
        if (isMatched) {
            let token = jwt.sign({
                data: existingUser
            },
                process.env.JWT_SECRET, {
                expiresIn: '10 days'
            })

            return {
                ...existingUser.toObject(),
                password: "Not show",
                token: token
            }
        } else {
            throw new Error(Exception.WRONG_PASSWORD_OR_EMAIL)
        }
    } else {
        throw new Error(Exception.WRONG_PASSWORD_OR_EMAIL)
    }
}

const register = async ({
    name,
    email,
    password,
    phoneNumber,
    address
}) => {
    debugger
    const existingUser = await User.findOne({ email }).exec();
    if (!!existingUser) {
        throw new Error(Exception.USER_EXIST)
    }
    // encrypt password
    // const isMatched = await bcrypt.compare(password, existingUser.password)
    // if(isMatched){

    // }

    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
    
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        address
    })

    return {
        ...newUser._doc,
        password: "Not show"
    }
}

export default {
    login,
    register
}