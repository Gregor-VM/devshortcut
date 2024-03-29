import { signal, Signal, computed, ReadonlySignal } from "@preact/signals";
import { createContext } from "preact";
import { Example } from "../examples/examples";
import { Tag } from "../utils/tags";
import { ExampleData } from "../types/ExampleResponse";
import { GithubExampleClass, LocalExampleClass, Tab } from "../utils/utils";

const initialState = {} as {
    search?: Signal<string>;
    filters?: Signal<Tag[] | never[]>;
    toString?: ReadonlySignal<string>;
    examples: Signal<Example[] | never[]>;
    isSearching: ReadonlySignal<boolean>;
    selectedExample: Signal<Example | null>;
    selectedFile: Signal<ExampleData | null>;
    activeTab: Signal<Tab | null>;
    bookmarks: Signal<Example[] | null>;
    openedMenu: Signal<string | null>;
    fetchExampleUrl: ReadonlySignal<string>;
}

export const AppState = createContext(initialState);

export function createAppState() {
    const search = signal("");
    const filters = signal([]);
    const examples = signal([]);
    const selectedExample = signal(null);
    const selectedFile = signal(null);
    const activeTab = signal(null);
    const bookmarks = signal(null);
    const openedMenu = signal(null);
  
    const toString = computed(() => {
      return JSON.stringify({search, filters, examples});
    });

    const isSearching = computed(() => {
      return (search.value.length > 0 || filters.value.length > 0)
    });

   const fetchExampleUrl = computed(() => {
      const currentActiveTab = (activeTab?.value as unknown as LocalExampleClass | GithubExampleClass);
      if(currentActiveTab instanceof LocalExampleClass){

        return `/examples/${(selectedExample?.value as any)?.folder}/${(currentActiveTab)?.folder}`

      } else {

        return `/github?repoUrl=${currentActiveTab?.repoUrl}`

      }
    });   
  
    return { search, filters, toString, examples, isSearching, selectedExample, selectedFile, activeTab, bookmarks, openedMenu, fetchExampleUrl }
}
