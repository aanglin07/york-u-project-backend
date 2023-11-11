import express from 'express'
import {User} from '../models/User.js'

const router = express.Router()




router.get('/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).send('User not found.');
    }

    return res.send(user.toJSON());
});


router.patch('/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).send('User not found.');
    }

    if (user.id !== req.currentUser.id) {
        return res.status(403).send('Forbidden');
    }

    if (req.body.email) {
        user.email = req.body.email;
    }    

    await user.update();

    return res.send(user.toJSON());
});

export default router