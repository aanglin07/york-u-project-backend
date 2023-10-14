import { League } from "../../src/data-storage.js"

const isValidObject = obj => {
    const {leagueName} = obj

    
    if (!leagueName) {
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

const findLeague = (req, res, next) => {
    const id = parseInt(req.params.id);
    const result = League.findIndex((league) => league.id === id);
    if (result != -1) {
        req.foundResultIndex = result
        next()
    } else {
        return res.status(404).json( { error: "League not found!" })
    }
}

const updateLeague = (req, res, next) => {
    // const id = parseInt(req.params.id);
    // const result = jerseyData.findIndex((jersey) => jersey.id === id);

    const id = parseInt(req.params.id)
    const { leagueName } = req.body
    const searchIndex = League.findIndex(league => league.id === id);
       
    if (searchIndex == -1) {
        return res.status(404).json( { error: `${id} not found`})
    }
    
    if (!leagueName) {
        return res.status(400).json( { error: 'cannot update to an empty league name'})
 }
 next()
}
export {validateNewLeague, findLeague, updateLeague};