import express from 'express'
import jerseyDataRoutes from '../src/Routes/jerseyData.js'
import teamDataRoutes from '../src/Routes/teamData.js'
import leagueDataRoutes from '../src/Routes/leagueData.js'
import userDataRoutes from '../src/Routes/user.js'
import dotenv from 'dotenv'
import jsonwebtoken from 'jsonwebtoken'
import {expressjwt as jwt} from 'express-jwt'
import argon2 from 'argon2'
import { jerseyData} from './data-storage.js'
import { User } from './models/User.js'
import {v4} from 'uuid'
dotenv.config()
//import ratingsFilter from './filter-ratings.js'; //Imports from module, filter-ratings.
const app = express()
const PORT = process.env.PORT


// allows us to parse json 
app.use(express.json())


app.get('/', (req, res) => res.send(jerseyData)) //Gets list of all jerseys in the database

const testFunction = async () => {
    const user = await User.findById(1);
    console.log("User", user)
}

testFunction(); //Test connection to database


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






//console.log(ratingsFilter(3)); //Enter a value from 1 to 5 to return the desired product with that specific rating