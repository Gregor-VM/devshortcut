import {Router, Route} from 'preact-router';
import Home from './page/Home';
import Navbar from './components/Navbar';
import ExamplePage from './page/ExamplePage';

export function App() {

  return (
    <>
      <Navbar />
      <Router>
        <Route path="/example/:title" component={ExamplePage} />
        <Route path="/" component={Home} />
      </Router>
    </>
  )
}
