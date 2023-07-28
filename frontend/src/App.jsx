import { useState, useEffect } from 'react';
import ProtectedRouter from './components/ProtectedRouter';


function App() {
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem('user');
    if (localUser === null) {
      return null;
    } 

    return JSON.parse(localUser);
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }), [user]

  return (
    <>
      <ProtectedRouter user={user} setUser={setUser} />
    </>
  )
}

export default App
