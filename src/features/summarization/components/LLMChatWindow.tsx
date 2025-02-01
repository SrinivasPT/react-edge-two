import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, List, ListItem, ListItemText, Avatar, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface Message {
    text: string;
    sender: 'user' | 'llm';
}

const LLMChatWindow = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            const newUserMessage: Message = { text: input, sender: 'user' };
            setMessages((prevMessages) => [...prevMessages, newUserMessage]);
            setInput('');
            // Simulate a response from the LLM
            setTimeout(() => {
                const llmMessage: Message = { text: 'This is a response from the LLM.', sender: 'llm' };
                setMessages((prevMessages) => [...prevMessages, llmMessage]);
            }, 1000);
        }
    };

    return (
        <Paper
            className="paper"
            style={{
                width: '95%',
                height: '95%',
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            <Typography variant="h6" style={{ marginBottom: '16px' }}>
                LLM Chat
            </Typography>
            <List style={{ flex: 1, overflowY: 'auto', marginBottom: '16px' }}>
                {messages.map((message, index) => (
                    <ListItem key={index} style={{ justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                        {message.sender === 'llm' && <Avatar style={{ marginRight: '8px' }}>AI</Avatar>}
                        <Paper
                            style={{
                                padding: '4px',
                                backgroundColor: message.sender === 'user' ? '#1976d2' : '#f5f5f5',
                                color: message.sender === 'user' ? '#fff' : '#000',
                            }}
                        >
                            <ListItemText primary={message.text} />
                        </Paper>
                        {message.sender === 'user' && <Avatar style={{ marginLeft: '8px' }}>U</Avatar>}
                    </ListItem>
                ))}
            </List>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    style={{ marginRight: '8px', width: '96%' }}
                />
                <IconButton color="primary" onClick={handleSend}>
                    <SendIcon />
                </IconButton>
            </div>
        </Paper>
    );
};

export default LLMChatWindow;
