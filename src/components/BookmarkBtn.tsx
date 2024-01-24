import { useEffect, useState } from 'preact/hooks'
import { Example } from '../examples/examples'
import BookmarkIcon from '../icons/bookmark'
import HoverEffect from './HoverEffect'
import useBookmarksActions from '../hooks/bookmarkActions'
import useAppState from '../hooks/useAppState'
import BookmarkFilledIcon from '../icons/bookmarkFilled'
import { isInBookmark } from '../utils/utils'
import { ButtonEvent } from '../types/ClickEvent'

interface Props{
    example: Example
}

function BookmarkBtn({example}: Props) {

  const [isBookmarked, setIsBookmarked] = useState(false);

  const {addBookmark, removeBookmark} = useBookmarksActions();
  const {bookmarks} = useAppState();

  const markBookmark = (e: ButtonEvent) => {

    e.stopPropagation();
    e.preventDefault();

    if(!isBookmarked) addBookmark(example);
    else removeBookmark(example);

  }

  useEffect(() => {

    if(bookmarks && isInBookmark(bookmarks, example)){
        setIsBookmarked(true);
    }

    if(!bookmarks || (bookmarks && !isInBookmark(bookmarks, example))){
        setIsBookmarked(false);
    }

  }, [bookmarks]);

  return (
    <HoverEffect>
        <button title="Bookmark" onClick={markBookmark} class="block w-6 h-6">
            {isBookmarked ? <BookmarkFilledIcon /> : <BookmarkIcon />}
        </button>
    </HoverEffect>
  )
}

export default BookmarkBtn