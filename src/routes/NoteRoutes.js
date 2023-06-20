const express = require('express');
const router = express.Router();

const note = require('../models/NoteModel');

router.post("/list", async function(req, res){
    var notes = await note.find({userid : req.body.userid});
    //console.log("ok");
    res.json(notes);
});

router.post("/add", async function(req, res){
    var ifid = await note.find({id : req.body.id});
    //console.log("ok");
    var message = {};
    if(ifid.length){
        var a = false, b = false;
        if(req.body.content != ifid[0].content){
            a = true;
        }
        if(req.body.title != ifid[0].title){
            b = true;
        }
        if(a && b){
            res.json({title : "not same", content : "not same"});
        } else if(a){
            res.json({title : "not same"});
        } else if(b){
            res.json({content : "not same"});
        } else {
            res.json({message : "Note already exist with same data"});
        }
    } else {
        var newNote = new note({
            id : req.body.id,
            userid : req.body.userid,
            title : req.body.title,
            content : req.body.content
        });
        
        await newNote.save().then(function(){
            res.json({message : "New Note save successfully!", user : newNote});
        });
    }
});

router.post("/update", async function(req, res){
    await note.updateOne({id : req.body.id}, {$set:{title : req.body.title, content : req.body.content}}).then(function(){
       res.json({message : "Note updated successfully!"});
    });
});

router.post("/delete", async function(req, res){
    await note.deleteOne({id : req.body.id}).then(function(){
        res.json({message : "Note id " + req.body.id + " exideleted successfully!"})
    });
});

module.exports = router;