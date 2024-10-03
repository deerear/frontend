import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client, StompSubscription, StompHeaders } from '@stomp/stompjs';

interface Message {
  nickname: string;
  profileImg: string;
  message: string;
  createdAt: string;
}

const DirectMessage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const stompClientRef = useRef<Client | null>(null);
  const dmId = 'exampleDmId';
  const accessToken = 'yourAccessToken';

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    const socket = new SockJS('/websocket');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: (frame) => {
        stompClient.subscribe(`/sub/${dmId}`, (message) => {
          const chat: Message = JSON.parse(message.body);
          addMessage(chat);
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      }
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [dmId, accessToken]);

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;

    if (stompClientRef.current) {
      stompClientRef.current.publish({
        destination: `/pub/${dmId}`,
        body: JSON.stringify({
          message: inputMessage
        }),
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    setInputMessage('');
  };

  return (
    <div className='dm-container'>
      <div className='message-list'>
        {messages.map((msg, index) => (
          <div key={index} className='message'>
            <img src={msg.profileImg} alt='profile' />
            <div>
              <strong>{msg.nickname}</strong>
              <p>{msg.message}</p>
              <small>{new Date(msg.createdAt).toLocaleTimeString()}</small>
            </div>
          </div>
        ))}
      </div>
      <div className='message-input'>
        <input
          type='text'
          placeholder='Type your message...'
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default DirectMessage;
