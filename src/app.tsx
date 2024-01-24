import {Router, Route} from 'preact-router';
import Home from './page/Home';
import Navbar from './components/Navbar';
import ExamplePage from './page/ExamplePage';
import useBookmarks from './hooks/useBookmarks';
import Bookmarks from './page/Bookmarks';

interface Props{
  url: string
}

export function App({url}: Props) {

  useBookmarks();

  return (
    <>
      <Navbar />
      <Router url={url}>
        <Route path="/" component={Home} />
        <Route path="/example/:title" component={ExamplePage} />
        <Route path="/bookmarks" component={Bookmarks} />
      </Router>
    </>
  )
}
