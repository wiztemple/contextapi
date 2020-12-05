import React, { useState, useEffect } from 'react';
import { fetchEmails, fetchLatestEmails } from './api';
import { withNotifier } from './NotificationContext';

const { Provider, Consumer } = React.createContext();

const EmailProvider = (props) => {
  const [emails, setEmails] = useState([]);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchEmails().then(emails => {
      setLoading(false);
      setEmails(emails);
    }).catch(error => {
      setLoading(false);
      setError(error);
    })
    const refresh = () => {
      if (!loading) {
        fetchLatestEmails().then(emails => {
          if (emails.length > 0) {
            setEmails(emails.concat(emails))
            // notify!
            props.notify(
              `${emails.length} more emails arrived`
            );
          }
        });
      }
    };
    const refreshInterval = setInterval(refresh, 5000);
    return () => {
      clearInterval(refreshInterval);
    }
  }, [])

  const handleSelectEmail = email => setCurrentEmail(email);

  return (
    <Provider value={{
      emails,
      currentEmail,
      error,
      loading,
      onSelectEmail: handleSelectEmail
    }}>{props.children}</Provider>
  )
}

const Wrapped = withNotifier(EmailProvider);
export { Wrapped as EmailProvider, Consumer as EmailConsumer };
