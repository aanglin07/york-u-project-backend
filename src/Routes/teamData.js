import express from 'express'
import { validateNewTeam, findTeam, updateTeam, teamExists} from '../../lib/middleware/validateTeam.js'
import verifyToken from '../../lib/middleware/jwtVerify.js'
import {teams} from '../models/Team.js'
const router = express.Router()

router.get('/', async (req, res) => {
    const result = await teams.findAll();
    return res.send(result.toJSON());
})
router.post('/', validateNewTeam, teamExists, async (req, res) => {


const newTeam = new teams(
    null,
    req.body.team_name
);

if(!req.body.team_name){
    return res.status(400).json( { error: 'cannot add an empty team name'})
}  

newTeam.teamsave();
return res.status(201).send(`Added new team: ${newTeam.team_name}`);

})

//Route to get team by id
router.get('/:id', verifyToken, findTeam, async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await teams.findById(id);
    
    return res.send(result.toJSON());
})

//Route to Edit team name

router.patch('/:id', verifyToken, updateTeam, async (req, res) =>{
    const id = parseInt(req.params.id, 10)
    const team = await teams.findById(id);    
    
    if (req.body.team_name) {
        team.team_name = req.body.team_name;

    }    

    await team.teamUpdate();

    return res.send(team.toJSON());
});


export  default router