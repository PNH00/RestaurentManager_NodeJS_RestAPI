import mongoose from "mongoose";
import {print,OutputType} from "../helpers/print.js";
import Exception from "../exceptions/Exception.js";

async function connect() {
    try {
        let connection = await mongoose.connect(process.env.MONGO_URI)
        print('connect successfully',OutputType.SUCCESS)

        return connection
    } catch (error) {
        const { code } = error
        
        if (error.code == 8000) {
            throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD)
        } else if (code == 'ENOTFOUND'){
            throw new Exception(Exception.WRONG_SERVER_NAME_OR_URI_STRING)
        }
        throw new Exception(Exception.CANNOT_CONNECT_TO_DATABASE)
    }
}

export default connect
