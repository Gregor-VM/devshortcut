import { useContext } from "preact/hooks"
import FilterSection from "../components/FilterSection";
import { AppState } from "../state/appState";
import useSearchExample from "../hooks/useSearchExamples";
import { Examples } from "../components/Examples";
import FilterBadges from "../components/FilterBadges";
import NotFound from "../components/NotFound";
import { route } from "preact-router";
import { GithubExample, getRepoNameFromUrl } from "../utils/utils";
import { InputEvent } from "../types/ClickEvent";
import Navbar from "../components/Navbar";


export default function Home() {

  const {isSearching, examplesLength} = useSearchExample();

  const state = useContext(AppState);

  const onInput = (e: InputEvent) => {

    if(state.search) state.search.value = e.target.value;

    const repoUrl = e.target.value;
    const repoName = getRepoNameFromUrl(repoUrl);

    if(repoName){
      const exampleData = ({
        tabs: [GithubExample("code", repoUrl)],
        tags: [],
        title: repoName,
      });
      state.selectedExample.value = (exampleData);
      sessionStorage.setItem(repoName, JSON.stringify(exampleData));
      if(state.search) state.search.value = "";
      route(`example/${repoName}`);
    }

  }


  return (
    <>
      <Navbar />
      <main class="mx-6 lg:mx-56 my-12">

        <section>

          <input class="p-4 w-full rounded 
          dark:bg-neutral-800 shadow-2xl 
          outline-none
          ring-purple-700
          hover:shadow-xl
          focus:shadow-lg
          focus:ring-2
          transition-all" onInput={onInput} value={state.search} placeholder="Search an example or paste github repo..." />

          <FilterBadges />

          {isSearching?.value && examplesLength === 0 && (<NotFound />)}

          {isSearching?.value && examplesLength > 0 && <Examples />}

          {(examplesLength === 0 && !isSearching?.value) && <FilterSection />}

        </section>

      </main>
    </>
  )
}
