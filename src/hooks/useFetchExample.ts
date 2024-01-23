import { useContext, useEffect, useState } from "preact/hooks"
import { AppState } from "../state/search";
import { axios } from "../utils/axios";
import { ExampleData, ExampleResponse } from "../types/ExampleResponse";
import { LocalExampleClass } from "../utils/utils";
import useAppState from "./useAppState";


export default function useFetchExamples() {

  const [structure, setStructure] = useState<ExampleData[]>();
  const [structureLoading, setStructureLoading] = useState(true);

  const state = useContext(AppState);

  const {activeTab, selectedExample, setActiveTab, setSelectedFile} = useAppState();

  const getStructure = async () => {

    if(activeTab instanceof LocalExampleClass){

      const data: ExampleResponse = (await axios.get(`/examples/${selectedExample!.folder}/${activeTab.folder}`)).data;
      if(data.structure){
        setStructure(data.structure);
      }
      setSelectedFile(null);

    } else {

      const data: ExampleResponse = (await axios.get(`/github?repoUrl=${activeTab?.repoUrl}`)).data;
      if(data.structure){
        setStructure(data.structure);
      }
      setSelectedFile(null);

    }

    setStructureLoading(false);

  }

  useEffect(() => {

    if(selectedExample?.title){
      setActiveTab(selectedExample.tabs[0]);
    }

  }, [selectedExample?.title]);

  useEffect(() => {

    if(activeTab?.name) {
      getStructure();
    }

  }, [activeTab]);

  useEffect(() => {

    return () => {

      setActiveTab(null);
      setSelectedFile(null);
      state.selectedExample.value = null;

    }

  }, []);


  return ({
    structure,
    activeTab: state.activeTab,
    selectedExample: state.selectedExample,
    structureLoading,
  });
}
