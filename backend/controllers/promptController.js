import OpenAI from 'openai';
import dotenv from 'dotenv';
import Prompt from '../models/promptModel.js';
dotenv.config();

const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.OPENAI_KEY
});
console.log(openai.apiKey);


export const SendPrompt =async (req, res) => {
     const {content} = req.body;
     const userId = req.userId; // Get userId from the middleware
     if (!content || !content.trim() === '') {
          return res.status(400).json({error: 'Content are required'});
     }
     try {
          // Save the user prompt to the database
          const userPrompt =await Prompt.create({
               userId,
               role: 'user',
               content: content.trim()
          });

          // Call the OpenAI API
          const completion = await openai.chat.completions.create({
               messages: [{ role: "user", content: content }],
               model: "deepseek-chat",
          });
          const assistantResponse = completion.choices[0].message.content;
          // Save the assistant response to the database
          const assistantPrompt = await Prompt.create({
               userId,
               role: 'assistant',
               content: assistantResponse.trim()
          })
          return res.status(200).json({
               reply: assistantResponse,
          });
     } catch (error) {
          console.error('Error sending prompt:', error);
          return res.status(500).json({error: 'Internal server error'});
     }
}