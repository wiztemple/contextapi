import React from 'react';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import { UserProvider, UserConsumer } from './UserContext';
import './index.css';

const Main = () => {
  return (
    <UserProvider>
      <UserConsumer>
        {({ user, handleLogin }) => user ? (<MainPage />) : (<LoginPage onLogin={handleLogin} />)}
      </UserConsumer>
    </UserProvider>
  )

}

export default Main;

