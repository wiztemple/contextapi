import React, { createContext, useState } from 'react';

const { Provider, Consumer } = createContext();
const NotificationProvider = (props) => {
  const [messages, setMessages] = useState([]);

  const addMessage = text => {
    setMessages(...messages, {
      id: Math.random(),
      text,
      addedAt: new Date().getTime()
    })
  }
  const removeMessage = message => {
    setMessages(messages.filter(m => (m.id !== message.id)))
  }
  return (
    <Provider value={{
      messages,
      notify: addMessage
    }}>
      <div className="notification-wrapper">
        <ul>
          {messages.map(message => (
            <Notification
              key={message.id}
              message={message}
              onClose={() => removeMessage(message)}
            />
          ))}
        </ul>
        {props.children}
      </div>
    </Provider>
  )
}

const Notification = ({ message, onClose }) => (
  <li>
    {message.text}
    <button className="close" onClick={onClose}>&times;</button>
  </li>
)

const withNotifier = (Component) => {
  return function Notified(props) {
    return (
      <Consumer>
        {({ notify }) => (
          <Component {...props} notify={notify} />
        )}
      </Consumer>
    );
  };
}
export { NotificationProvider, Consumer as Notifier, withNotifier };
