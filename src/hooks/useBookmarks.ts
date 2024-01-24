import { useEffect } from "preact/hooks";
import useAppState from "./useAppState"
import useBookmarksActions from "./bookmarkActions";
import { Example } from "../examples/examples";
import { convertToExample } from "../utils/utils";

function useBookmarks() {

  const {bookmarks} = useAppState();
  const {setBookmarks} = useBookmarksActions();

  const loadBookmarks = () => {

    const rawData = localStorage.getItem('bookmarks');
    if(rawData){
        const jsonData = JSON.parse(rawData);

        const examples: Example[] = jsonData.map((exampleData: any) => convertToExample(exampleData));

        setBookmarks(examples);

    } else {
        setBookmarks([]);
    }

  }

  const updateBookmarks = () => {

    if(bookmarks !== null){
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

  }

  useEffect(() => {

    if(bookmarks === null){

        loadBookmarks();

    }

  }, [bookmarks]);

  useEffect(() => {

    if(bookmarks?.length && bookmarks.length > 0){

        updateBookmarks();

    }

  }, [bookmarks?.length]);

}

export default useBookmarks