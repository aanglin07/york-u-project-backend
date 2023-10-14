import { jerseyData } from "../../src/data-storage.js"

const isValidObject = obj => {
    const { img, teamName, teamKit, Year, description, leagueName, purchaseLink} = obj

    
    if (!img || !teamName || !teamKit || !Year || !description || !leagueName || !purchaseLink) {
         return false
     } else {
         return true
     }

 }

const validateNewJersey = (req, res, next) => {    
    
    if(isValidObject(req.body)) {
        next()
    } else {
        return res.status(400).json( { error: "invalid"} )
    }
}

const findJersey = (req, res, next) => {
    const id = parseInt(req.params.id);
    const result = jerseyData.findIndex((jersey) => jersey.id === id);
    if (result != -1) {
        req.foundResultIndex = result
        next()
    } else {
        return res.status(404).json( { error: `cannot find Jersey with id: ${id}` })
    }
}

const updateJersey = (req, res, next) => {
    // const id = parseInt(req.params.id);
    // const result = jerseyData.findIndex((jersey) => jersey.id === id);

    const id = parseInt(req.params.id)
    const { img, teamName, teamKit, Year, description, leagueName, purchaseLink} = req.body
    const searchIndex = jerseyData.findIndex(jersey => jersey.id === id);
       
    if (searchIndex == -1) {
        return res.status(404).json( { error: `${id} not found`})
    }
    
    if (!img || !teamName || !teamKit || !Year || !description || !leagueName || !purchaseLink) {
        return res.status(400).json( { error: 'cannot update with an empty field'})
 }
 next()
}

export {validateNewJersey, findJersey, updateJersey}