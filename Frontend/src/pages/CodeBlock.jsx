// Written by Shlomi Ben-Shushan.

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import { Button } from '@mui/material';
import 'prismjs/themes/prism.css';
import '../App.css'

const backendUri = require('../config.json').backend;
const socket = io.connect(backendUri);

/**
 * The CodeBlock componenet is shown when the user selects a code-block card in the lobby.
 * It creates title, buttons, shareable text-field, and more.
 * The main feature of this componenet is the shareable text-field that acts like a "cross-IDE" using Monaco and Socket.
 */
function CodeBlock() {

  const navigate = useNavigate();
  const location = useLocation();  // used to reference data from the lobby.

  // Code-Block data.
  const blockId = location.state.codeblock.block_id;
  const blockName = location.state.codeblock.block_name;
  const [code, setCode] = useState(location.state.codeblock.code);
  
  // User-connection data.
  const [isConnected, setIsConnected] = useState(false);
  const [userType, setUserType] = useState(null);
  
  // Bonus - show a smile if the user wrote the right code.
  const ans = useState(location.state.codeblock.answer);
  const [smile, setSmile] = useState(false);

  // This function tells the backend that the user has left the code-block.
  const onClickBack = () => {
    socket.emit('bye', { roomId: blockId, socketId: socket.id });
    setIsConnected(false);
    navigate('../');
  }

  // This function tells the backend that the user has entered the code-block.
  const joinRoom = () => {
    socket.emit('join_room', blockId);
    setIsConnected(true);
    fetch(`${backendUri}getMentor?blockId=${blockId}`)
      .then(resp => resp.json())
      .then(data => {
        if (data.mentorId === socket.id) {
          setUserType('Mentor');
        } else {
          setUserType('Student');
        }
      })
  }

  // This function requests to take the code stored in "code" variable, and store in in the DynamoDB.
  const onClickSave = () => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: code })
    };
    fetch(`${backendUri}updateblock?id=${blockId}&name=${blockName}`, options)
      .then(response => response.json())
      .then(data => {
        alert(data.message);
      });
  }

  // This function updates the text-field (i.e., IDE) if the user is a student.
  const onCodeChange = (newCode) => {
    if (userType === 'Student') {
      setCode(newCode);
      socket.emit('send_message', { roomId: blockId, message: newCode });
      if (newCode === ans[0]) {
        setSmile(true);
      } else {
        setSmile(false);
      }
    }
  }

  // This useEffect monitor window actions that tells that the user has left the code-block.
  useEffect(() => {
    window.onpopstate = () => {
      socket.emit('bye', { roomId: blockId, socketId: socket.id });
      socket.disconnect();
      setIsConnected(false);
    }
    window.onbeforeunload = (e) => {
      socket.emit('bye', { roomId: blockId, socketId: socket.id });
      socket.disconnect();
      setIsConnected(false);
    };
  });

  // This useEffect handles the socket.
  useEffect(() => {
    joinRoom();
    socket.on('recieve_message', (message) => {
      setCode(message);
      if (message === ans[0]) {
        setSmile(true);
      } else {
        setSmile(false);
      }
    });
  }, [socket]);

  // The function renders a shareable text-field (IDE), and information and buttons around it.
  return (
    <div className='CodeBlock'>
      <span className='CodeBlock-Button'>
        <Button variant='contained' onClick={onClickBack}>◄ Return</Button>
      </span>
      <span className='CodeBlock-Button'>
        <Button variant='contained' onClick={onClickSave}>Save</Button>
      </span>
      <div className='CodeBlock-Header'>
        <div>
          <h2 className='CodeBlock-h2'>{blockName}</h2>
          {userType && <h4 className='CodeBlock-h2'>Connected as: <i>{userType}</i></h4>}
          {!userType && <h4 className='CodeBlock-h2'>Click the "Connect" button to start.</h4>}
        </div>
        <div>
          <img src={require('../assets/success.gif')} className='CodeBlock-SuccessImg' width='160' hidden={!smile}></img>
        </div>
      </div>
      <div className='CodeBlock-Editor'>
        <Editor
          value={code}
          onValueChange={input => onCodeChange(input)}
          highlight={text => highlight(text, languages.js)}
          style={{
            height: 600,
            fontFamily: '"Proggy Fonts", "Fira Mono", monospace',
            fontSize: 16,
          }}
        />
      </div>
      <p className='CodeBlock-ID'>CodeBlock ID is {blockId}</p>
    </div>
  );
}

export default CodeBlock;