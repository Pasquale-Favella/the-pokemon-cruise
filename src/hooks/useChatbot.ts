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

const useChatbot = () => {
  const [messages, setMessages] = useAtom(chatbotMessagesAtom);
  const [input, setInput] = useAtom(chatbotInputAtom);
  const [isOpen, setIsOpen] = useAtom(chatbotOpenAtom); // Use Jotai atom for open state
  const [isLoading, setIsLoading] = useAtom(chatbotLoadingAtom); // Use Jotai atom for loading state
  const worker = useRef<Worker | null>(null);

  // Access booking atoms
  const [cruiseId, setCruiseId] = useAtom(cruiseIdAtom);
  const [cabinType, setCabinType] = useAtom(cabinTypeAtom);
  const [passengers, setPassengers] = useAtom(passengersAtom);
  // Access other booking atoms as needed

  useEffect(() => {
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

      const lowerCaseText = text.toLowerCase();

      if (lowerCaseText.includes('book') || lowerCaseText.includes('cruise')) {
        const foundCruise = cruises.find(cruise => lowerCaseText.includes(cruise.name.toLowerCase()));
        if (foundCruise) {
          setCruiseId(foundCruise.id);
          setMessages((prevMessages) => [...prevMessages, { text: `Okay, I've selected the ${foundCruise.name} for you.`, sender: 'bot' }]);
        } else {
           worker.current?.postMessage({ text });
        }
      } else if (lowerCaseText.includes('passengers') || lowerCaseText.includes('adults') || lowerCaseText.includes('children')) {
         const adultsMatch = lowerCaseText.match(/(\d+)\s*adults?/);
         const childrenMatch = lowerCaseText.match(/(\d+)\s*children?/);

         let updatedPassengers = { ...passengers };

         if (adultsMatch && adultsMatch[1]) {
           updatedPassengers.adults = parseInt(adultsMatch[1], 10);
         }
         if (childrenMatch && childrenMatch[1]) {
           updatedPassengers.children = parseInt(childrenMatch[1], 10);
         }

         if (adultsMatch || childrenMatch) {
           setPassengers(updatedPassengers);
           setMessages((prevMessages) => [...prevMessages, { text: `Okay, I've updated the passenger count to ${updatedPassengers.adults} adults and ${updatedPassengers.children} children.`, sender: 'bot' }]);
         } else {
           worker.current?.postMessage({ text });
         }
      }
      else {
        worker.current?.postMessage({ text });
      }
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
