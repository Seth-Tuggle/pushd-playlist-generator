const axios = require('axios');

async function generatePlaylist(prompt) {
  console.log('🧠 Sending prompt to local Ollama model...');

  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3',
      prompt: prompt,
      stream: false
    });

    if (!response.data || !response.data.response) {
      console.error('❌ No valid AI response received:', response.data);
      throw new Error('AI did not return a usable response.');
    }

    console.log('🤖 Full AI response:', response.data.response);
    return response.data.response;
  } catch (err) {
    console.error('❌ Error talking to Ollama AI:', err.message || err);
    throw err;
  }
}

module.exports = { generatePlaylist };
