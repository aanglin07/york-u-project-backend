import jsonwebtoken from 'jsonwebtoken'
import { User } from '../../src/models/User.js'

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.status(400).send({message: "token not found"})
    }
    try {
        const data = jsonwebtoken.verify(token, process.env.JWT_SECRET) 
        const user = await User.findById(data.id);
        if (user.session_uuid !== data.session_uuid) {
            return res.status(401).send('Unauthorized');
        }

        req.currentUser = user;        
        next()
    } catch (err) { 
        console.error(err)
        return res.status(401).send({message: err.message})
    }
}

export default verifyToken