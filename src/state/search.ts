import { signal, Signal, computed, ReadonlySignal } from "@preact/signals";
import { createContext } from "preact";
import { Example, Examples } from "../examples/examples";
import { Tag } from "../utils/tags";
import { ExampleData } from "../types/ExampleResponse";
import { Tab } from "../utils/utils";

const initialState = {} as {
    search?: Signal<string>;
    filters?: Signal<Tag[] | never[]>;
    toString?: ReadonlySignal<string>;
    examples: Signal<Examples | never[]>;
    isSearching: ReadonlySignal<boolean>;
    selectedExample: Signal<Example | null>;
    selectedFile: Signal<ExampleData | null>;
    activeTab: Signal<Tab | null>;
}

export const AppState = createContext(initialState);

export function createAppState() {
    const search = signal("");
    const filters = signal([]);
    const examples = signal([]);
    const selectedExample = signal(null);
    const selectedFile = signal(null);
    const activeTab = signal(null);
  
    const toString = computed(() => {
      return JSON.stringify({search, filters, examples});
    });

    const isSearching = computed(() => {
      return (search.value.length > 0 || filters.value.length > 0)
    })
  
    return { search, filters, toString, examples, isSearching, selectedExample, selectedFile, activeTab }
}