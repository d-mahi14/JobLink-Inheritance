import Groq from "groq-sdk";
import dotenv from 'dotenv';

dotenv.config();

async function testGroq() {
  console.log('Testing Groq API...');
  console.log('API Key exists:', !!process.env.GROQ_API_KEY);
  console.log('API Key starts with:', process.env.GROQ_API_KEY?.substring(0, 10));

  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant. Respond with just 'Hello!'",
        },
        {
          role: "user",
          content: "Say hello",
        }
      ],
      temperature: 0.2,
      max_tokens: 50,
    });

    console.log('✅ Groq API is working!');
    console.log('Response:', completion.choices[0].message.content);
  } catch (error) {
    console.error('❌ Groq API error:', error.message);
    if (error.status === 401) {
      console.error('⚠️  Invalid API key - check your GROQ_API_KEY in .env');
    }
  }
}

testGroq();