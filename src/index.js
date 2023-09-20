import express from 'express'
import ratingsFilter from './filter-ratings.js'; //Imports from module, filter-ratings.
const app = express()
const port = 3000
// allows us to parse json 
app.use(express.json())

app.get('/', (req, res) => res.send('Hello world'))

app.listen(port, () => console.log(`API server ready on http://localhost:${port}`))






console.log(ratingsFilter(3)); //Enter a value from 1 to 5 to return the desired product with that specific rating