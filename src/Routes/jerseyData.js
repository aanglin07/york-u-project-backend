import express from 'express'
import {validateNewJersey, findJersey, updateJersey} from '../../lib/middleware/validateJersey.js'
import verifyToken from '../../lib/middleware/jwtVerify.js'
import {jerseys} from '../models/Jersey.js'
const router = express.Router()

router.get('/', async (req, res) => {
    const result = await jerseys.findAll();
    return res.send(result.toJSON());
})



//Router to get jersey by id
router.get('/:id', verifyToken, findJersey, async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await jerseys.findById(id);
    if (!result) {
        return res.status(404).send('Jersey not found.');
    }

    return res.send(result.toJSON());
})


router.post('/', verifyToken, validateNewJersey, (req, res) => {

    const newJersey = new jerseys(
        null,        
        req.body.img,
        req.body.team_name,
        req.body.team_kit,
        req.body.year,
        req.body.description,
        req.body.league_name,
        req.body.purchase_link,

    );

    
newJersey.jerseysave();
return res.status(201).send(`Added new Jersey`);

})


//Router to update jerseys using a patch request
router.patch('/:id', verifyToken, updateJersey, async (req, res) =>{
    const id = parseInt(req.params.id)
    const updateJersey = await jerseys.findById(id);
   

    if (req.body.img || req.body.team_name || req.body.team_kit || req.body.year || req.body.description || req.body.league_name || req.body.purchase_link) {
        updateJersey.img = req.body.img;
        updateJersey.team_name = req.body.team_name;
        updateJersey.team_kit = req.body.team_kit;
        updateJersey.year = req.body.year;
        updateJersey.description = req.body.description;
        updateJersey.league_name = req.body.league_name;
        updateJersey.purchase_link = req.body.purchase_link;
    }    
    await updateJersey.jerseyUpdate();
    return res.send(updateJersey.toJSON());  
   
})



export default router