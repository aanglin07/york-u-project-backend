import express from 'express'
import { League } from '../data-storage.js'
const router = express.Router()
router.get('/', (req, res) => {
    return res.json(League)
})


//Router to add a league
router.post('/', (req, res) => {

    const leagueId = League.map(league => league.id);
    const newId = Math.max(...leagueId) + 1;
    const newLeague = {
        id: newId,       
        leagueName: req.body.leagueName        
    }

    const requiredProperties = ['leagueName']
    let missingProperties = []

    requiredProperties.forEach(prop => {
        if (!req.body.hasOwnProperty(prop)) {
            missingProperties.push(prop)
        }
    })

    if (missingProperties.length){
        let errorMessage = []
        missingProperties.forEach(prop => {
            errorMessage.push(`Missing property: ${prop}`)
        })
        return res.status(400).json({ errors: errorMessage })
    }
    League.push (newLeague);
    return res.status(201).json(req.body)
})

//Router to get league by id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const result = League.find((league) => league.id === id);
    if (result){
    return res.status(200).json(result);
    }
    else{
        res.status(404).json({ message: "League not found"})
    }
})

//Router to Edit league name

router.patch('/:id', (req, res) =>{
    let id = parseInt(req.params.id)
    const { leagueName } = req.body
    let updateleague = League.findIndex(league => league.id === id);
    const replacementLeague = {
        id:id,        
        leagueName: req.body.leagueName || updateleague.leagueName,
    };

    const searchIndex = League.findIndex(league => league.id === id);
    League[searchIndex] = replacementLeague;
    
    if (searchIndex == -1) {
        return res.status(404).json( { error: `${id} not found`})
    }
    
    if (!leagueName) {
        return res.status(400).json( { error: 'cannot update to an empty league name'})
    }  
    
    if (replacementLeague){
        return res.status(200).json(replacementLeague);  
    }    

})

export  default router