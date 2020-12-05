import Main from "./Main";
import { UserProvider } from './UserContext';
import { EmailProvider } from './EmailContext';
import { NotificationProvider } from './NotificationContext';



function App() {
  return (
    <div className="app">
      <NotificationProvider>
        <UserProvider>
          <EmailProvider>
            <Main />
          </EmailProvider>
        </UserProvider>
      </NotificationProvider>
    </div>
  );
}

export default App;
