import { useContext } from "preact/hooks"
import { AppState } from "../state/appState";
import { Example } from "../examples/examples";


export default function useBookmarksActions() {

  const state = useContext(AppState);

  const setBookmarks = (examples: Example[] | never[]) => {
    state.bookmarks.value = examples;
  }

  const addBookmark = (example: Example) => {
    if(state.bookmarks.value){
      state.bookmarks.value = [...state.bookmarks.value, example];
    }
  }

  const resetBookmarks = () => {
    if(state.bookmarks.value){
      state.bookmarks.value = null;
    }
  }

  const removeBookmark = (example: Example) => {
    if(state.bookmarks.value){
      state.bookmarks.value = state.bookmarks.value.filter(item => item.title !== example.title);
    }
  }


  return ({
    setBookmarks,
    addBookmark,
    removeBookmark,
    resetBookmarks,
  });
}
