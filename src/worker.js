import { pipeline, TextStreamer, env } from '@huggingface/transformers';
import { cruises } from '@/data/cruises'; // Import cruise data using alias

// Use the Singleton pattern to enable lazy construction of the pipeline.
class PipelineSingleton {
  static task = 'text-generation';
  static model = 'onnx-community/Llama-3.2-1B-Instruct-q4f16'; // Use the Llama-3.2-webgpu model
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, {
        device: 'webgpu', // Specify WebGPU device
        progress_callback,
      });
    }
    return this.instance;
  }
}

self.addEventListener('message', async (event) => {
  try {
    // Retrieve the text generation pipeline. When called for the first time,
    // this will load the pipeline and save it for future use.
    const generator = await PipelineSingleton.getInstance(x => {
      // We also add a progress callback to the pipeline so that we can
      // track model loading.
      self.postMessage(x);
    });

    // Craft a detailed system prompt
    const systemPrompt = `<|begin_of_text|><|start_header_id|>system<|end_header_id|>
You are Cruisebot. Answer questions about Pokemon cruises using ONLY the provided data. Follow these rules strictly:

RULES:
- Use ONLY information from the cruise data below
- Give direct, factual answers - no conversational filler
- If information isn't in the data, say "I don't have that information"
- Never make up details, prices, or features not listed
- Don't simulate conversations or add "User:" or "Chatbot:" labels
- Keep responses under 100 words
- For booking requests, explain they need to use the application interface

CRUISE DATA:
${cruises.map(cruise => {
      const cabinInfo = cruise.cabinTypes.map(cabin =>
        `${cabin.name}: ${cabin.price} (${cabin.capacity} guests) - ${cabin.amenities.slice(0, 3).join(', ')}`
      ).join(' | ');

      const itineraryPorts = cruise.itinerary.map(day =>
        `Day ${day.day}: ${day.port.name} - ${day.activities.join(', ')}`
      ).join(' | ');

      return `
CRUISE: ${cruise.name}
- ID: ${cruise.id}
- Region: ${cruise.region}
- Duration: ${cruise.duration} days
- Starting Price: ${cruise.startingPrice}
- Description: ${cruise.shortDescription}
- Highlights: ${cruise.highlights.join(' | ')}
- Ship Amenities: ${cruise.amenities.join(' | ')}
- Cabin Types: ${cabinInfo}
- Itinerary: ${itineraryPorts}
- Featured: ${cruise.featured ? 'Yes' : 'No'}`;
    }).join('\n\n')}

AVAILABLE REGIONS: ${cruises.map(c => c.region).filter((v, i, a) => a.indexOf(v) === i).join(', ')}

Answer based strictly on this data.<|eot_id|>

<|start_header_id|>user<|end_header_id|>
${event.data.text}<|eot_id|>

<|start_header_id|>assistant<|end_header_id|>`;

    const streamer = new TextStreamer(generator.tokenizer, {
      skip_prompt: true,
      callback_function: (text) => {
        self.postMessage({
          status: 'update',
          output: text,
        });
      },
    });

    // Generate a response
    const output = await generator(systemPrompt, {
      max_new_tokens: 150,
      streamer,
      temperature: 0.3, // Lower temperature for more focused responses
      do_sample: true,
      top_p: 0.9
    });

    self.postMessage({
      status: 'complete',
      output: output[0].generated_text,
    });
  } catch (error) {
    console.error('Worker error:', error);
    self.postMessage({
      status: 'error',
      output: 'An error occurred while processing your request. Please try again.',
      error: error.message, // Include error message for debugging
    });
  }
});
