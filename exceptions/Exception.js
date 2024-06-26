import { print, OutputType } from "../helpers/print.js"

export default class Exception extends Error {
    static WRONG_DB_USERNAME_PASSWORD = "Wrong database's username and password"
    static WRONG_CONNECTION_STRING = "Wrong server name/connection string"
    static CANNOT_CONNECT_MONGODB = "Cannot connect to Mongoose"    
    static USER_EXIST = "User already exists"
    static CANNOT_REGISTER_USER = "Cannot register user"
    static WRONG_EMAIL_AND_PASSWORD = "Wrong email and password"


    constructor(message, validationErrors={}){
        super(message)       
        print(message, OutputType.ERROR)
        this.validationErrors = validationErrors
    }
}