const express = require('express');
const app = express();

const mongoose = require('mongoose');
const note = require('./src/models/NoteModel.js');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://shaw98:RXdShWoTntiETvLr@cluster0.xhyramc.mongodb.net/notedb").then(function(){
    app.get("/", function(req, res){
        res.json({message : "API works"});
    });

    const noteRouter = require("./src/routes/NoteRoutes.js");
    app.use("/notes", noteRouter);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, function(){
    console.log("server started at PORT " + PORT + "..!");
});