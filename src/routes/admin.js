import { Router } from "express";

const router = Router();

router.post('/create', (req, res) => {
    res.status(200).json({msg: "admin course create"});
});

router.get('/delete', (req, res) => {
    res.status(200).json({msg: "admin course delete"});
});

// router.get('/create', (req, res) => {
    
// });

// router.get('/create', (req, res) => {
    
// });

export const adminRouter = router;