import express from 'express'
import { Team } from '../data-storage.js'
const router = express.Router()
router.get('/', (req, res) => {
    return res.json(Team)
})


//Router to add a team
router.post('/', (req, res) => {

    const teamId = Team.map(team => team.id);
    const newId = Math.max(...teamId) + 1;
    const newTeam = {
        id: newId,       
        teamName: req.body.teamName        
    }

    const requiredProperties = ['teamName']
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
    Team.push (newTeam);
    return res.status(201).json(req.body)
})

//Router to get team by id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const result = Team.find((team) => team.id === id);
    if (result){
    return res.status(200).json(result);
    }
    else{
        res.status(404).json({ message: "Team not found"})
    }
})

//Router to Edit team name

router.patch('/:id', (req, res) =>{
    let id = parseInt(req.params.id)
    const { teamName } = req.body
    let updateTeam = Team.findIndex(team => team.id === id);
    const replacementTeam = {
        id:id,        
        teamName: req.body.teamName || updateTeam.teamName,
    };

    const searchIndex = Team.findIndex(team => team.id === id);
    Team[searchIndex] = replacementTeam;
    
    if (searchIndex == -1) {
        return res.status(404).json( { error: `${id} not found`})
    }
    
    if (!teamName) {
        return res.status(400).json( { error: 'cannot update to an empty league name'})
    }  
    
    if (replacementTeam){
        return res.status(200).json(replacementTeam);  
    }    

})

export  default router