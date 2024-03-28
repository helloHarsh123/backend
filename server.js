const express = require('express');
const cors = require('cors'); // Import cors
const { runChat } = require('./chat'); // Import chat logic
const dotenv = require('dotenv').config();

const app = express();
const port = 3000; // Adjust port if needed
const allowedOrigins = process.env.ALLOWED_ORIGINS || ''
const allowedOriginsArray = allowedOrigins.split(",").map(item => item.trim());
console.log(allowedOriginsArray);
app.use(cors({ origin: allowedOriginsArray })); // Allow requests from React app origin
app.use(express.json()); // Parse incoming JSON data

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})
app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('incoming /chat request', userInput);
    if(!userInput){
      return res.status(400).json({error: 'Invalid Request Body'});
    }
    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app