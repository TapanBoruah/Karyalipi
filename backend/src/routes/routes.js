import express from 'express';
import { verifyJWT } from '../middlewares/auth.js';
import { 
    getAllNotes,
    getNoteById,
    createNotes,
    updateNotes,
    deleteNotes,
    registerUser,
    loginUser } from  '../controller/notes.controller.js'

const router=express.Router();

router.post('/register',registerUser);

router.post('/login',loginUser);

router.get('/notes',verifyJWT,getAllNotes);

router.get('/notes/:id',verifyJWT,getNoteById);

router.post('/notes',verifyJWT,createNotes);

router.put('/notes/:id',verifyJWT,updateNotes);

router.delete('/notes/:id',verifyJWT,deleteNotes);

export default router;