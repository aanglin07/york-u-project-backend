import {teams} from '../../src/models/Team.js'


const isValidObject = obj => {
    const {team_name} = obj

    
    if (!team_name) {
         return false
     } else {
         return true
     }

 }

const validateNewTeam = (req, res, next) => {    
    
    if(isValidObject(req.body)) {
        next()
    } 
    
    else {
        return res.status(400).json( { error: "invalid"} )
    }
}

const findTeam = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const result = await teams.findById(id)
    if (!result) {
        return res.status(404).json( { error: "Team not found!" })      
    }
    next()
}

const updateTeam = async (req, res, next) => {

    const id = parseInt(req.params.id)
    const { team_name } = req.body
    const searchIndex = await teams.findById(id)
       
    if (!searchIndex) {
        return res.status(404).json( { error: `Team not found`})
    }
    
    if (!team_name) {
        return res.status(400).json( { error: 'cannot update to an empty team name'})
 }
 next()
}

const teamExists = async (req, res, next) => {
const existingTeam = await teams.findByTeamName(req.body.team_name);
if (existingTeam) {
    return res.status(401).send('Team already exists.');
}
next();
}
export {validateNewTeam, findTeam, updateTeam, teamExists};