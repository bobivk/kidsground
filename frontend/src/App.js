import { useState } from 'react';
import { Navbar } from './Components/Navigation/Navbar';
import { PageRoutes } from './Components/Navigation/PageRoutes';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {

  const [user, setUser] = useState(null)

  return (
    <div className="App">
      <Router>
        <Navbar />
      <PageRoutes />
      </Router>
    </div>
  );
}

export default App;
