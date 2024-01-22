import { useCallback, useContext, useEffect, useState } from "preact/hooks"
import { AppState } from "../state/search";
import examples from "../examples/examples";
import { filterBySearch, filterByTags } from "../utils/utils";


export default function useSearchExample() {

  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  const state = useContext(AppState);

  const searchExamples = useCallback(() => {

    let matchesExamples = [];

    if(state.search!.value.length === 0 && state.filters!.value.length === 0){
      state.examples.value = [];
      return null;
    }

    matchesExamples = filterBySearch(state.search!.value, examples);
    matchesExamples = filterByTags(state.filters!.value, matchesExamples);

    if(state.examples?.value){
      state.examples.value = matchesExamples;
      setIsLoadingSearch(false);
    }

  }, []);


  useEffect(() => {

    if(state.search && state.filters){

      setIsLoadingSearch(true);

      searchExamples()

    }

  }, [state.search?.value, state.filters?.value, searchExamples]);

  return {examples: state.examples || {value: []}, isSearching: isLoadingSearch ? {value: false} : state.isSearching};
}
