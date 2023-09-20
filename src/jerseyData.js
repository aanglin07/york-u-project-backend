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
        category: req.body.category,
        purchaseLink:req.body.purchaseLink
    }

    const requiredProperties = ['img', 'teamName', 'teamKit', 'Year', 'description', 'category', 'purchaseLink']
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

export default router