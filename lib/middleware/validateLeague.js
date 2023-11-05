
import {leagues} from "../../src/models/League.js"

const isValidObject = obj => {
    const {league_name} = obj

    
    if (!league_name) {
         return false
     } else {
         return true
     }

 }

const validateNewLeague = (req, res, next) => {    
    
    if(isValidObject(req.body)) {
        next()
    } else {
        return res.status(400).json( { error: "invalid"} )
    }
}

const findLeague = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const result = await leagues.findById(id)
    if (!result) {
        return res.status(404).json( { error: "League not found!" })      
    }
    next()
}

const updateLeague = async (req, res, next) => {

    const id = parseInt(req.params.id)
    const { league_name } = req.body
    const searchIndex = await leagues.findById(id)
       
    if (!searchIndex) {
        return res.status(404).json( { error: `League not found`})
    }
    
    if (!league_name) {
        return res.status(400).json( { error: 'cannot update to an empty league name'})
 }
 next()
}

const leagueExists = async (req, res, next) => {
    const existingLeague = await leagues.findByLeagueName(req.body.league_name);
    if (existingLeague) {
        return res.status(401).send('League already exists.');
    }
next();
}
export {validateNewLeague, findLeague, updateLeague, leagueExists};