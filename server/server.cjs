/*import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi} from 'openai';
*/

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const {  OpenAI} = require('openai');


//change render
const PORT = process.env.PORT || 5000; // Use environment variable PORT or default to 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//change render


dotenv.config();

/*const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
*/

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Pass the API key directly
    
});



const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    }));
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from Codex',
    })
})

app.post('/' , async (req, res) => {
    try{
        const prompt = req.body.prompt;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // or whichever model you're using
            messages: [{ role: 'user', content: prompt }],
        });
        // Log the response to inspect its structure
    console.log("Response from OpenAI:", response);

       /* res.status(200).send({
            bot: response.data.choices[0].message.content,
        }) */


              // Ensure the 'choices' array exists before accessing it
    if (response && response.choices && response.choices.length > 0) {
        res.status(200).send({
          bot: response.choices[0].message.content, // Extracting the bot's reply
        });
      } else {
        // In case 'choices' is not present, return an error message
        res.status(500).send({ error: 'No choices found in response' });
      }
  
    } catch (error) {
        console.log(error);
        console.error("Error occurred:", error);  // Log the error
        res.status(500).send({ error: error.message || 'Internal Server Error' })
    }
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'))
