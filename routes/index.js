import express from 'express';
import path from 'path';


const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.resolve('views/index.html'));
});


export default router;
