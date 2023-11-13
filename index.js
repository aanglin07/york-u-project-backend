import express from 'express'
import jerseyDataRoutes from './src/Routes/jerseyData.js'
import teamDataRoutes from './src/Routes/teamData.js'
import leagueDataRoutes from './src/Routes/leagueData.js'
import userDataRoutes from './src/Routes/user.js'
import jsonwebtoken from 'jsonwebtoken'
import {expressjwt as jwt} from 'express-jwt'
import argon2 from 'argon2'
import { User } from './src/models/User.js'
import {v4} from 'uuid'
import dotenv from 'dotenv'

import Db from 'mysql2-async'
dotenv.config()

const db = new Db({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

if (process.env.DATABASE_SOCKET) {
    db.socketPath = process.env.DATABASE_SOCKET
} else {
    db.host = process.env.DATABASE_HOST
}

const PORT = process.env.ENV_PORT || 8080


//import ratingsFilter from './filter-ratings.js'; //Imports from module, filter-ratings.
const app = express()



// allows us to parse json 
app.use(express.json())


app.get('/', (req, res) => res.send("Welcome to the Jersey App"))




app.use('/user', userDataRoutes)
app.use('/jersey', jerseyDataRoutes )
app.use('/teams', teamDataRoutes )
app.use('/leagues', leagueDataRoutes )

app.post('/register', async (req, res) => {
    const existingUser = await User.findByEmail(req.body.email);
    if (existingUser) {
        return res.status(401).send('Invalid Register Data.');
    }

    const newUser = new User(
        null,
        req.body.email,
        await argon2.hash(req.body.password),
        v4()
    );

    newUser.save();
    return res.status(201).send(`Created User: ${newUser.email}`);
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const foundUser = await User.findByEmail(email);
    if (!foundUser) {
        return res.status(401).send('Invalid email or password.');
    }

    if (!(await foundUser.isPasswordCorrect(password))) {
        return res.status(401).send('Invalid email or password.');
    }

    foundUser.session_uuid = v4();
    await foundUser.update();

    const token = jsonwebtoken.sign({...foundUser.toJSON(), session_uuid: foundUser.session_uuid}, process.env.JWT_SECRET, {expiresIn: '1h'});
    return res.send(token);
});

app.post('/logout', async (req, res) => {
    await req.user.logout();

    return res.status(200).send('Logout successful.');
});

app.use( jwt({secret: process.env.JWT_SECRET, algorithms: ['HS256']}) )
app.listen(PORT, () => console.log(`API server ready on http://localhost:${PORT}`))


export {app, db};



//console.log(ratingsFilter(3)); //Enter a value from 1 to 5 to return the desired product with that specific rating