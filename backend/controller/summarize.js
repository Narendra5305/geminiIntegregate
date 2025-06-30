const { GoogleGenerativeAI } = require('@google/generative-ai');

require('dotenv').config();
const genAi = new GoogleGenerativeAI(process.env.gemini_key)

const GenerateModel =async( topic , platform)=>{
    const model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' })

   const prompt = `Write a professional ${platform} post for the topic: '${topic}'. Keep it concise and engagin
   Format the response strictly as a JSON object with the following fields:
    {
    "title": "Short, catchy headline of the post",
    "description": "5-10 sentence summary explaining the main idea",
    "summary": "Brief one-liner takeaway or call to action",
    "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"]
    }

    Do not include markdown formatting or code block syntax like \`\`\`.
    Return only the JSON object.
   `



    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const cleaned = text.replace(/```(?:json)?\s*([\s\S]*?)\s*```/, '$1');

        return JSON.parse(cleaned);
    } catch (error) {
        return { error: 'Could not parse response as JSON', details: error.message };
    }

}


module.exports ={GenerateModel}


    