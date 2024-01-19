import {Router, Route} from 'preact-router';
import Home from './page/Home';
import Navbar from './components/Navbar';

export function App() {

  return (
    <>
      <Navbar />
      <Router>
        <Route path="/" component={Home} />
      </Router>
    </>
  )
}
