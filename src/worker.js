import { pipeline, TextStreamer } from '@huggingface/transformers';
import { cruises } from '@/data/cruises'; // Import cruise data using alias

let generator = null;

self.addEventListener('message', async (event) => {
  if (!generator) {
    // Consider a model better suited for instruction following or conversational tasks
    generator = await pipeline('text-generation', 'Xenova/distilgpt2'); // Using a basic model for now
  }

  // Format cruise data for the model
  const cruiseDataString = cruises.map(cruise =>
    `Cruise ID: ${cruise.id}, Name: ${cruise.name}, Region: ${cruise.region}, Duration: ${cruise.duration} days, Starting Price: ${cruise.startingPrice}, Highlights: ${cruise.highlights.join(', ')}`
  ).join('\n');

  // Craft a prompt that instructs the model to act as a booking assistant and identify intent
  const prompt = `You are a helpful assistant for booking Pokemon cruises. Use the following cruise information to answer questions and assist with booking.
Cruise Information:
${cruiseDataString}

User: ${event.data.text}
Chatbot:`;

  const streamer = new TextStreamer(generator.tokenizer, {
    skip_prompt: true,
    callback_function: (text) => {
      self.postMessage({
        status: 'update',
        output: text,
      });
    },
  });

  const output = await generator(prompt, { max_new_tokens: 200, streamer }); // Increase max_new_tokens

  const generatedText = output[0].generated_text;

  // TODO: Implement logic to parse generatedText for booking intent and entities
  // This is a complex task and might require a more capable model or a separate intent recognition step.
  // For now, we will just send the generated text as the response.
  // In the future, we could look for patterns like "book cruise [cruise name]" or "add [number] passengers".

  self.postMessage({
    status: 'complete',
    output: generatedText,
    // In the future, add intent and entities here, e.g.:
    // intent: 'book_cruise',
    // entities: { cruise_name: 'SS Anne', passengers: 2 }
  });
});
