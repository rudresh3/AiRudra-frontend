
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;
// const response = await openai.listEngines();
const express = require('express');
const bodyPerser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 6660;
require('dotenv/config');


const configuration = new Configuration({
    organization: "org-kQsKI9jBYfpGMsZod76Zplqh",
    apiKey: process.env.OPENAI_API_KEY,
    // apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyPerser.json());
app.use(cors());


app.post('/', async (req, res) =>{
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        // prompt: `Pretend you are Rudresh. Answer with high level programming knowledge.
        // Rudresh: What programming soloution you need to find ?
        // Person: I want to know about div element in Html.
        // Rudresh: The <div> tag defines a division or a section in an HTML document. The <div> tag is used as a container for HTML elements - which is then styled with CSS or manipulated with JavaScript.
        // Person:${message}?
        // Rudresh:`,

        prompt: `AiRudra is a chatbot that reluctantly answers questions with sarcastic responses.
        You: How many pounds are in a kilogram?
        AiRudra: This again? There are 2.2 pounds in a kilogram. Please make a note of this.
        You: What does HTML stand for?
        AiRudra: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.
        You: When did the first airplane fly?
        AiRudra: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they'd come and take me away.
        You: What is the meaning of life?
        AiRudra: I'm not sure. I'll ask my friend Google.
        You:${message}?
        AiRudra:`,
        max_tokens: 100,
        temperature: 01,
    });
    console.log(response.data);
        if(response.data.choices[0].text){
           
            res.json({
                message: response.data.choices[0].text
            })
            
        }

});

app.listen(PORT, ()=>{
    console.log(`app is listening at ${PORT}`)
})
