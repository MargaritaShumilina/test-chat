import './App.css';
import { Configuration, OpenAIApi } from "openai-edge";
import {createRef, useEffect, useState} from "react";
import Clear from "./components/Clear/Clear";
import Message from "./components/Message/Message";
import Input from "./components/Input/Input";
import Loader from "./components/Loader/Loader";


function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const myRef = createRef();


  const configuration = new Configuration({
    apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MGE2ZTgxLTRiMDMtNGQxNC1hMGQxLWI3N2RkZjlkMDY2ZiIsImlzRGV2ZWxvcGVyIjp0cnVlLCJpYXQiOjE3MjA1Mjk0NDgsImV4cCI6MjAzNjEwNTQ0OH0.Dm8QJpXfX2ChWcYZ5c0SLNzGpmEmh1dYPAMW3wz4v5M",
    basePath: "https://bothub.chat/api/v2/openai/v1",
  });
  const openai = new OpenAIApi(configuration);

  const handleKeyPress = (e) => {
      if(e.key === 'Enter'){
          handleSubmit();
      }
  };

  const handleSubmit = () => {
    const prompt = {
      role: "user",
      content: input,
    }
    setMessages([...messages, prompt]);

    setInput("");

    (async () => {
        setIsLoad(true)
        try {
          const completion = await openai.createChatCompletion({
            messages: [...messages, prompt],
            model: "gemini-pro",
          });
          const message = (await completion.json())?.choices[0]?.message.content;

              setMessages((messages) => [
                  ...messages,
                  {
                      role: "assistant",
                      content: message,
                  },
              ])
        }
        catch(e) {
            setMessages((messages) => [
                ...messages,
                {
                    role: "assistant",
                    content: "Oooops! Что-то пошло не так :(",
                },
            ])
        }
        finally {
            setIsLoad(false)
        }
    })()
  }

  const clear = () => {
    setMessages([]);
  };
    const scrollToMyRef = () => {
        myRef.current.scrollTop = myRef.current.scrollHeight;
    }

    useEffect(() => {
        scrollToMyRef()
    }, [messages]);

  return (
      <div className="app">
          <h3 className="chat__title">Я - Gemini Pro, и я готов с тобой поболтать</h3>
          <div className="chat__content" ref={myRef}>
            {messages.map((el, i) => {
              return <Message key={i} role={el.role} content={el.content} isLoad={isLoad} />;
            })}
              {isLoad && <Loader />}
          </div>
          <div className="chat__control">
              <Clear onClick={clear}/>
              <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onClick={input ? handleSubmit : undefined}
                  onKeyDown={handleKeyPress}
              />

          </div>
      </div>
  );
}

export default App;
