import {Router, Route} from 'preact-router';
import Home from './page/Home';
import Navbar from './components/Navbar';
import ExamplePage from './page/ExamplePage';

interface Props{
  url: string
}

export function App({url}: Props) {

  return (
    <>
      <Navbar />
      <Router url={url}>
        <Route path="/" component={Home} />
        <Route path="/example/:title" component={ExamplePage} />
      </Router>
    </>
  )
}
