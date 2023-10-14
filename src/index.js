import express from 'express'
import jerseyDataRoutes from '../src/Routes/jerseyData.js'
import teamDataRoutes from '../src/Routes/teamData.js'
import leagueDataRoutes from '../src/Routes/leagueData.js'
import dotenv from 'dotenv'
import jsonwebtoken from 'jsonwebtoken'
import {expressjwt as jwt} from 'express-jwt'
import argon2 from 'argon2'
dotenv.config()
//import ratingsFilter from './filter-ratings.js'; //Imports from module, filter-ratings.
const app = express()
const PORT = process.env.PORT
const users = [{ username: "testing@test.com", password: "$argon2i$v=19$m=16,t=2,p=1$WDFaSWQybFozbWtqekdwYQ$MoHaBhES1PAFaPjcjP3jbA"}]

// allows us to parse json 
app.use(express.json())

app.post('/login', async (req, res) => {
    const reqUser = req.body.username
    const password = req.body.password
    const userFound = users.find( ({ username }) => username === reqUser)

    if (userFound && await argon2.verify(userFound.password, password)) {
        const token = jsonwebtoken.sign({reqUser}, process.env.JWT_SECRET, {expiresIn: '1m'}) 
        return res.json({token}) 
    }
    return res.status(401).json({error: "incorrect username \ password"})
})

app.use( jwt({secret: process.env.JWT_SECRET, algorithms: ['HS256']}) )

app.get('/protected', (req, res) => {
    res.json({message: "You made it!", user: req.user}) 
})

app.get('/', (req, res) => res.send('Welcome to the Jersey App'))
app.use('/jersey', jerseyDataRoutes )
app.use('/teams', teamDataRoutes )
app.use('/leagues', leagueDataRoutes )

app.listen(PORT, () => console.log(`API server ready on http://localhost:${PORT}`))






//console.log(ratingsFilter(3)); //Enter a value from 1 to 5 to return the desired product with that specific rating