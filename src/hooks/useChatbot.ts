import { useEffect, useRef } from 'react';
import { atom, useAtom } from 'jotai';
import {
  cruiseIdAtom,
  cabinTypeAtom,
  passengersAtom,
  // Import other relevant booking atoms as needed
} from '../store/booking-atoms';
import { cruises } from '../data/cruises';

// Define Jotai atoms for chatbot state
// Initial welcome message - exclude from context if sending to a backend/worker that requires context
const chatbotMessagesAtom = atom<{ text: string; sender: 'user' | 'bot' }[]>([{ text: "Hello! I'm Cruisebot. How can I help you plan your Pokemon cruise?", sender: 'bot' }]);
const chatbotInputAtom = atom('');
const chatbotOpenAtom = atom(false); // Atom for chatbot visibility
const chatbotLoadingAtom = atom(false); // Atom for loading state
const chatbotAvailableAtom = atom(true); // Atom for chatbot availability based on WebGPU support

const useChatbot = () => {
  const [messages, setMessages] = useAtom(chatbotMessagesAtom);
  const [input, setInput] = useAtom(chatbotInputAtom);
  const [isOpen, setIsOpen] = useAtom(chatbotOpenAtom); // Use Jotai atom for open state
  const [isLoading, setIsLoading] = useAtom(chatbotLoadingAtom); // Use Jotai atom for loading state
  const [isAvailable, setIsAvailable] = useAtom(chatbotAvailableAtom);
  const worker = useRef<Worker | null>(null);

  // Access booking atoms
  const [cruiseId, setCruiseId] = useAtom(cruiseIdAtom);
  const [cabinType, setCabinType] = useAtom(cabinTypeAtom);
  const [passengers, setPassengers] = useAtom(passengersAtom);
  // Access other booking atoms as needed

  useEffect(() => {
    if (!navigator.gpu) {
      setIsAvailable(false);
      setMessages([{ text: "Sorry, your browser does not support WebGPU, which is required for the chatbot.", sender: 'bot' }]);
      return;
    }

    worker.current = new Worker(new URL('../worker.js', import.meta.url), {
      type: 'module',
    });

    worker.current.onmessage = (event) => {
      if (event.data.status === 'update') {
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (lastMessage && lastMessage.sender === 'bot') {
            return [
              ...prevMessages.slice(0, -1),
              { text: lastMessage.text + event.data.output, sender: 'bot' },
            ];
          } else {
            return [...prevMessages, { text: event.data.output, sender: 'bot' }];
          }
        });
        setIsLoading(false); // Set loading to false when update is received
      } else if (event.data.status === 'complete') {
        setIsLoading(false); // Set loading to false when complete
      } else if (event.data.status === 'error') {
        console.error('Chatbot worker error:', event.data.error); // Log the actual error from the worker
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `Error: ${event.data.output || 'An unknown error occurred.'}`, sender: 'bot' }, // Prepend "Error:" and use a more specific default
        ]);
        setIsLoading(false); // Set loading to false on error
      }
    };

    return () => {
      worker.current?.terminate();
    };
  }, []);

  const sendMessage = (text: string) => {
    if (text.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text, sender: 'user' }]);
      setInput('');
      setIsLoading(true); // Set loading to true when message is sent
      worker.current?.postMessage({ text });
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return {
    messages,
    input,
    setInput,
    sendMessage,
    isOpen, // Expose isOpen state
    toggleChatbot, // Expose toggle function
    isLoading, // Expose isLoading state
    isAvailable, // Expose isAvailable state
    // Expose booking state and setters if needed for the chatbot UI
    cruiseId,
    setCruiseId,
    cabinType,
    setCabinType,
    passengers,
    setPassengers,
  };
};

export default useChatbot;
