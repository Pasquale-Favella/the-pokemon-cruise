"use client";

import React from 'react';
import { Bot, User } from 'lucide-react';
import useChatbot from '../hooks/useChatbot';
import { Button } from './ui/button'; // Import Button component
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'; // Import Card components
import { Input } from './ui/input'; // Import Input component
import { ScrollArea } from './ui/scroll-area'; // Import ScrollArea component

const Chatbot: React.FC = () => {
  const { messages, input, setInput, sendMessage, isOpen, toggleChatbot, isLoading } = useChatbot();

  const handleSend = () => {
    sendMessage(input);
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-5 right-5 z-[1001] rounded-full p-6 shadow-lg transition-transform hover:scale-110 text-primary"
        onClick={toggleChatbot}
      >
        <Bot className='size-8' />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-20 right-5 z-[1000] w-[350px] h-[450px] flex flex-col border border-gray-300 rounded-lg shadow-xl overflow-hidden bg-white py-0">
          <CardHeader className="bg-primary text-primary-foreground flex flex-row items-center justify-between px-4 py-3"> {/* Added padding here */}
            <CardTitle className="text-lg font-bold">Cruisebot</CardTitle>
            {/* Optionally add a close button here */}
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden px-4 py-2"> {/* Adjusted padding */}
            <ScrollArea className="h-full pr-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start mb-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                  {msg.sender === 'bot' && <Bot size={20} className="mr-2 text-gray-600" />}
                  <div className={`rounded-lg p-3 max-w-[80%] break-words ${msg.sender === 'user' ? 'bg-primary text-primary-foreground ml-auto' : 'bg-gray-200 text-gray-800'}`}>
                    {msg.text}
                  </div>
                  {msg.sender === 'user' && <User size={20} className="ml-2 text-primary" />}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start mb-4">
                  <Bot size={20} className="mr-2 text-gray-600" />
                  <div className="rounded-lg p-3 max-w-[80%] break-words bg-gray-200 text-gray-800">
                    Typing...
                  </div>
                </div>
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex bg-gray-100 p-4"> {/* Added padding here */}
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
              placeholder="Ask about Pokemon cruises..."
              className="flex-grow mr-2 rounded-md border border-gray-300 p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button onClick={handleSend} className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">Send</Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
