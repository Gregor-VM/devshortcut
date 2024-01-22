import { useContext, useEffect, useMemo, useState } from "preact/hooks"
import { AppState } from "../state/search";
import { axios } from "../utils/axios";
import { ExampleData, ExampleResponse } from "../types/ExampleResponse";
import { LocalExampleClass } from "../utils/utils";


export default function useFetchExamples() {

  const [structure, setStructure] = useState<ExampleData[]>();
  const [structureLoading, setStructureLoading] = useState(true);

  const state = useContext(AppState);

  const activeTabMemo = useMemo(() => {
    if(state.activeTab && state.activeTab.value) return state.activeTab.value;
    else return null
  }, [state.activeTab?.value?.name]);

  const selectedExampleMemo = useMemo(() => {
    if(state.selectedExample && state.selectedExample.value) return state.selectedExample.value;
    else return null
  }, [state.selectedExample?.value?.title]);

  const getStructure = async () => {

    if(activeTabMemo instanceof LocalExampleClass){

      const data: ExampleResponse = (await axios.get(`/examples/${selectedExampleMemo!.folder}/${activeTabMemo.folder}`)).data;
      if(data.structure){
        setStructure(data.structure);
      }
      state.selectedFile.value = null;

    } else {

      const data: ExampleResponse = (await axios.get(`/github?repoUrl=${activeTabMemo?.repoUrl}`)).data;
      if(data.structure){
        setStructure(data.structure);
      }
      state.selectedFile.value = null;

    }

    setStructureLoading(false);

  }

  useEffect(() => {

    if(selectedExampleMemo?.title){
      state.activeTab.value = selectedExampleMemo.tabs[0];
    }

  }, [selectedExampleMemo?.title]);

  useEffect(() => {

    if(activeTabMemo?.name) {
      getStructure();
    }

  }, [activeTabMemo]);


  return ({
    structure,
    activeTab: state.activeTab,
    selectedExample: state.selectedExample,
    structureLoading,
  });
}
