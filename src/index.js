import express from 'express'
import jerseyDataRoutes from '../src/Routes/jerseyData.js'
import teamDataRoutes from '../src/Routes/teamData.js'
import leagueDataRoutes from '../src/Routes/leagueData.js'
import dotenv from 'dotenv'
dotenv.config()
//import ratingsFilter from './filter-ratings.js'; //Imports from module, filter-ratings.
const app = express()
const PORT = process.env.PORT || 3000

// allows us to parse json 
app.use(express.json())

app.get('/', (req, res) => res.send('Welcome to the Jersey App'))
app.use('/jersey', jerseyDataRoutes )
app.use('/teams', teamDataRoutes )
app.use('/leagues', leagueDataRoutes )

app.listen(PORT, () => console.log(`API server ready on http://localhost:${PORT}`))






//console.log(ratingsFilter(3)); //Enter a value from 1 to 5 to return the desired product with that specific rating