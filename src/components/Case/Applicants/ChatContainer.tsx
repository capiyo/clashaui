import { useState } from 'react';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey there! How are you doing today?',
      sender: 'other',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '2',
      text: 'I\'m doing great, thanks for asking! Working on some exciting projects.',
      sender: 'user',
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: '3',
      text: 'That sounds awesome! What kind of projects are you working on?',
      sender: 'other',
      timestamp: new Date(Date.now() - 180000)
    },
    {
      id: '4',
      text: 'Building some beautiful chat interfaces with React and TypeScript. The design system is looking really clean!',
      sender: 'user',
      timestamp: new Date(Date.now() - 120000)
    }
  ]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-background">
      {/* Chat Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-chat-border bg-card">
        <h1 className="text-xl font-semibold text-foreground">Chat Interface</h1>
        <p className="text-sm text-muted-foreground">Beautiful messaging experience</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      {/* Message Input */}
      <div className="flex-shrink-0 border-t border-chat-border bg-card">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}