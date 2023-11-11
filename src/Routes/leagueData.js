import express from 'express'
import verifyToken from '../../lib/middleware/jwtVerify.js'
import {leagues} from '../models/League.js'
import { findLeague, validateNewLeague, updateLeague, leagueExists } from '../../lib/middleware/validateLeague.js'
const router = express.Router()
router.get('/', async (req, res) => {
    const result = await leagues.findAll();
    return res.send(result.toJSON());
})
router.post('/', verifyToken, validateNewLeague, leagueExists, async (req, res) => {


const newLeague = new leagues(
    null,
    req.body.league_name
);

if(!req.body.league_name){
    return res.status(400).json( { error: 'cannot add an empty league name'})
}  

newLeague.leaguesave();
return res.status(201).send(`Added new league: ${newLeague.league_name}`);

})

//Router to get league by id
router.get('/:id', verifyToken, findLeague, async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await leagues.findById(id);
    
    return res.send(result.toJSON());
})

//Router to Edit league name

router.patch('/:id', verifyToken, updateLeague, async (req, res) =>{
    const id = parseInt(req.params.id, 10)
    const league = await leagues.findById(id);
    
    if (req.body.league_name) {
        league.league_name = req.body.league_name;

    }    

    await league.leagueUpdate();

    return res.send(league.toJSON());
});


export  default router