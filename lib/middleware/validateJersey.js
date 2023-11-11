import {jerseys} from '../../src/models/Jersey.js'


const isValidObject = obj => {
    const { img, team_name, team_kit, year, description, league_name, purchase_link} = obj

    
    if (!img || !team_name || !team_kit || !year || !description || !league_name || !purchase_link) {
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

const findJersey = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const result = await jerseys.findById(id);
    if (!result) { 
        return res.status(404).json( { error: `cannot find Jersey with id: ${id}` })
    }
    next()
}

const updateJersey = async (req, res, next) => {
    const id = parseInt(req.params.id)
    const { img, team_name, team_kit, year, description, league_name, purchase_link} = req.body
    const searchIndex = await jerseys.findById(id);
       
    if (!searchIndex) {
        return res.status(404).json( { error: `${id} not found`})
    }
    
    if (!img || !team_name || !team_kit || !year || !description || !league_name || !purchase_link) {
        return res.status(400).json( { error: 'cannot update with an empty field'})
 }
 next()
}

export {validateNewJersey, findJersey, updateJersey}