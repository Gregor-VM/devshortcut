import { useContext, useMemo } from "preact/hooks"
import { AppState } from "../state/appState";
import { Tab } from "../utils/utils";
import { Example } from "../examples/examples";
import { ExampleData } from "../types/ExampleResponse";


export default function useAppState() {

  const state = useContext(AppState);

  const activeTabMemo = useMemo(() => {
    if(state.activeTab && state.activeTab.value) return state.activeTab.value;
    else return null
  }, [state.activeTab?.value?.name]);

  const selectedExampleMemo = useMemo(() => {
    if(state.selectedExample && state.selectedExample.value) return state.selectedExample.value;
    else return null
  }, [state.selectedExample?.value?.title]);

  const setActiveTab = (tab: Tab | null) => {
    state.activeTab.value = tab;
  }

  const setSelectedExample = (example: Example | null) => {
    state.selectedExample.value = example;
  }

  const setSelectedFile = (selectedFile: ExampleData | null) => {
    state.selectedFile.value = selectedFile
  }



  return ({
    activeTab: activeTabMemo,
    selectedExample: selectedExampleMemo,
    selectedFile: state.selectedFile?.value,
    bookmarks: state.bookmarks?.value,
    setActiveTab,
    setSelectedExample,
    setSelectedFile,
  });
}
