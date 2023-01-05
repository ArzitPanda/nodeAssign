import mongoose from "mongoose";
import express from "express";
import Note from "../models/Note.js";



const router = express.Router();



router.get("/:Vidid/:userid", async (req, res) => {
    try {
        const note = await Note.find({video:req.params.Vidid,user:req.params.userid});
        res.status(200).json(note);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


);
router.post("/", async (req, res) => {
    const note = req.body;
    const newNote = new Note(note);
    try {
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});


