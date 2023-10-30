import { Team } from "../../src/data-storage.js"

const isValidObject = obj => {
    const {teamName} = obj

    
    if (!teamName) {
         return false
     } else {
         return true
     }

 }

const validateNewTeam = (req, res, next) => {    
    
    if(isValidObject(req.body)) {
        next()
    } else {
        return res.status(400).json( { error: "invalid"} )
    }
}

const findTeam = (req, res, next) => {
    const id = parseInt(req.params.id);
    const result = Team.findIndex((team) => team.id === id);
    if (result != -1) {
        req.foundResultIndex = result
        next()
    } else {
        return res.status(404).json( { error: "Team not found!" })
    }
}

const updateTeam = (req, res, next) => {
    // const id = parseInt(req.params.id);
    // const result = jerseyData.findIndex((jersey) => jersey.id === id);

    const id = parseInt(req.params.id)
    const { teamName } = req.body
    const searchIndex = Team.findIndex(team => team.id === id);
       
    if (searchIndex == -1) {
        return res.status(404).json( { error: `${id} not found`})
    }
    
    if (!teamName) {
        return res.status(400).json( { error: 'cannot update to an empty team name'})
 }
 next()
}
export {validateNewTeam, findTeam, updateTeam};