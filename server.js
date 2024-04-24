import express from 'express';
import * as dotenv from 'dotenv'
import {
    usersRouter,
    menuRouter,
    billRouter,
} from './routes/index.js'

dotenv.config()
import connect from './database/database.js'
import checkToken from './authentication/auth.js';

const app = express();
const port = process.env.PORT ?? 3000

app.use(checkToken)
app.use(express.json())

app.use('/users', usersRouter)
app.use('/menus', menuRouter)
app.use('/bills', billRouter)


app.get('/', (req, res) => {
    res.send("hello world!")
})

app.listen(port, async () => {
    await connect()
    console.log(`listening on ${port}`);
})