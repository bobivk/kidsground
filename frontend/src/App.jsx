import { Navbar } from './Components/Navigation/Navbar';
import { PageRoutes } from './Components/Navigation/PageRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Navbar />
          <PageRoutes />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
