const express = require("express");
 
const {GenerateModel} = require("./controller/summarize")

require('dotenv').config();

const app = express();

const cors = require("cors");

app.use(express.json())

app.use(cors({
    origin:"*"
}))


app.get('/' ,(req,res)=>{
    res.send("this is topic generator assistant")
})




app.post('/generate-post' ,async(req,res)=>{
    const {topic , platform} = req.body ;

   const result =await GenerateModel(topic , platform);
    console.log("")
    res.json(result)

})


app.listen(8080 ,()=>{
    console.log("server is running at http://localhost:8080/")
})