
import { useState } from "react"
import "./gemini.css"

import axios from "axios"


export const GeminiPostGenerator = ()=>{

    const [topic , setTopic] = useState("")
    const [platform , setPlatform] = useState("")

    const [data , setData] = useState({});


    const handleSubmit =async() =>{
        if (!topic.trim() || !platform) return;

        try {
            const res = await axios.post("http://localhost:8080/generate-post" ,{
                    topic,
                    platform
                }
            )

            
            setData({...res.data})
            setTopic("")
            setPlatform("")
            
        } catch (error) {
           console.log("there has been an error on generating post on api" , error) 
        }
    }


    console.log(data)
    

    return(
        <div className="post">
            <input type="text"  value={topic}  placeholder="topic" onChange={(e)=>setTopic(e.target.value)} />
            <input type="text" value={platform}  placeholder="platform" onChange={(e)=>setPlatform(e.target.value)} />
            <button  onClick={handleSubmit} >Submit</button>

            <div className="cont">
                <h1></h1>
            </div>
        </div>
    )
}