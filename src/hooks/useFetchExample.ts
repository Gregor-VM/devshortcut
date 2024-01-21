import { useContext, useEffect, useMemo, useState } from "preact/hooks"
import { AppState } from "../state/search";
import { axios } from "../utils/axios";
import { ExampleData, ExampleResponse } from "../types/ExampleResponse";
import { LocalExampleClass, Tab } from "../utils/utils";


export default function useFetchExamples() {

  const [structure, setStructure] = useState<ExampleData[]>();
  const [structureLoading, setStructureLoading] = useState(true);

  const state = useContext(AppState);

  const activeTabMemo = useMemo(() => {
    return state.activeTab.value;
  }, [state.activeTab.value]);

  const getStructure = async () => {

    if(state.activeTab.value instanceof LocalExampleClass){

      const data: ExampleResponse = (await axios.get(`/examples/${state.selectedExample.value!.folder}/${state.activeTab.value.folder}`)).data;
      if(data.structure){
        setStructure(data.structure);
      }
      state.selectedFile.value = null;

    } else {

      const data: ExampleResponse = (await axios.get(`/github?repoUrl=${state.activeTab.value?.repoUrl}`)).data;
      if(data.structure){
        setStructure(data.structure);
      }
      state.selectedFile.value = null;

    }

    setStructureLoading(false);

  }

  useEffect(() => {

    if(state.selectedExample.value?.title){
      state.activeTab.value = state.selectedExample.value.tabs[0];
    }

  }, [state.selectedExample.value?.title]);

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
