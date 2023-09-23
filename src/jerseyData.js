import express from 'express'
import { jerseyData } from './data-storage.js'
const router = express.Router()
router.get('/', (req, res) => {
    return res.json(jerseyData)
})

router.post('/', (req, res) => {

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

    const requiredProperties = ['img', 'teamName', 'teamKit', 'Year', 'description', 'leagueName', 'purchaseLink']
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
    jerseyData.push(newJersey);
    return res.status(201).json(req.body)
})

//Router to get jersey by id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const result = jerseyData.find((jersey) => jersey.id === id);
    if (result){
    return res.status(200).json(result);
    }
    else{
        res.status(404).json({ message: "Jersey not found"})
    }
})

//Router to update items using a patch request
router.patch('/:id', (req, res) =>{
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
    const requiredProperties = ['img', 'teamName', 'teamKit', 'Year', 'description', 'leagueName', 'purchaseLink']
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
    
    if (replacementJersey){
        return res.status(200).json(replacementJersey);  
    }    

})

export default router