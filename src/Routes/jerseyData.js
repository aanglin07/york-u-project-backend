import express from 'express'
import { jerseyData } from '../data-storage.js'
import {validateNewJersey, findJersey, updateJersey} from '../../lib/middleware/validateJersey.js'
import verifyToken from '../../lib/middleware/jwtVerify.js'
const router = express.Router()

router.get('/', (req, res) => {
    return res.json(jerseyData)
})



//Router to get jersey by id
router.get('/:id', findJersey, (req, res) => {
    const result = jerseyData[req.foundResultIndex]
    return res.status(200).json(result);
})


router.post('/', verifyToken, validateNewJersey, (req, res) => {

    const jerseyId = jerseyData.map(jersey => jersey.id);
    const newId = Math.max(...jerseyId) + 1;
    const newJersey = {
        id: newId,
        img: req.body.img,
        teamName: req.body.teamName,
        teamKit: req.body.teamKit,
        Year: req.body.Year,
        description: req.body.description,
        leagueName: req.body.leagueName,
        purchaseLink:req.body.purchaseLink
    }

    
    jerseyData.push(newJersey);
    return res.status(201).json(req.body)
})


//Router to update items using a patch request
router.patch('/:id', verifyToken, updateJersey, (req, res) =>{
    let id = parseInt(req.params.id)
    let updateJersey = jerseyData.findIndex(jersey => jersey.id === id);
    const replacementJersey = {
        id:id,
        img: req.body.img || updateJersey.img,
        teamName: req.body.teamName || updateJersey.teamName,
        teamKit: req.body.teamKit || updateJersey.teamKit,
        Year: req.body.Year || updateJersey.Year,
        description: req.body.description || updateJersey.description,
        leagueName: req.body.leagueName || updateJersey.leagueName,
        purchaseLink:req.body.purchaseLink || updateJersey.purchaseLink
    };

    const searchIndex = jerseyData.findIndex(jersey => jersey.id === id);
    jerseyData[searchIndex] = replacementJersey;
    
    if (replacementJersey){
        return res.status(200).json(replacementJersey);  
    }    

})

export default router