const express = require("express");
const mongoose = require("mongoose");
const { connectDb } = require("./helpers/db")
const { host, port, db } = require("./configuration")
const app = express();
const postSchema = new mongoose.Schema({
    name: String
});
const Post = mongoose.model('Post',postSchema)


const startServer = ()=>{
    app.listen(port, ()=>{
        console.log(`Started! api service on port: ${port}`);
        console.log(`On host ${host}`);
        console.log(`Our database ${db}`);

        // Post.find(function (err, posts){
        //     if (err) return console.log(err);
        //     console.log("posts",posts);
        // })


        const silence = new Post({name: "Silence" });
        silence.save(function(err, savedSilense){
            if (err) return console.log(err);
            console.log("savedSilence with volume", savedSilense)
        });
    });
}




app.get("/test" , (req,res) =>{
    res.send("Our! api server is working correctly");
});



connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);