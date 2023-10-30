import express from 'express'
import { League } from '../data-storage.js'
import { validateNewLeague, findLeague, updateLeague } from '../../lib/middleware/validateLeague.js'
import verifyToken from '../../lib/middleware/jwtVerify.js'
const router = express.Router()
router.get('/', (req, res) => {
    return res.json(League)
})


//Router to add a league
router.post('/', verifyToken, validateNewLeague, (req, res) => {

    const leagueId = League.map(league => league.id);
    const newId = Math.max(...leagueId) + 1;
    const newLeague = {
        id: newId,       
        leagueName: req.body.leagueName        
    }
    
    League.push (newLeague);
    return res.status(201).json(req.body)
})

//Router to get league by id
router.get('/:id', verifyToken, findLeague, (req, res) => {
    const result = League[req.foundResultIndex]

    return res.status(200).json(result);
})

//Router to Edit league name

router.patch('/:id', verifyToken, updateLeague, (req, res) =>{
    
    const id = parseInt(req.params.id)
    const updateleague = League.findIndex(league => league.id === id);
    const replacementLeague = {
        id:id,        
        leagueName: req.body.leagueName || updateleague.leagueName,
    };

    const searchIndex = League.findIndex(league => league.id === id);
    League[searchIndex] = replacementLeague;  
      
    if (replacementLeague){
           return res.status(200).json(replacementLeague);  
     }    
})

export  default router