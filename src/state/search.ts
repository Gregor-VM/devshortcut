import { signal, Signal, computed, ReadonlySignal } from "@preact/signals";
import { createContext } from "preact";
import { Examples } from "../examples/examples";
import { Tag } from "../utils/tags";

const initialState = {} as {
    search?: Signal<string>;
    filters?: Signal<Tag[] | never[]>;
    toString?: ReadonlySignal<string>;
    examples: Signal<Examples>;
    isSearching: ReadonlySignal<boolean>
}

export const AppState = createContext(initialState);

export function createAppState() {
    const search = signal("");
    const filters = signal([]);
    const examples = signal([]);
  
    const toString = computed(() => {
      return JSON.stringify({search, filters, examples});
    });

    const isSearching = computed(() => {
      return (search.value.length > 0 || filters.value.length > 0)
    })
  
    return { search, filters, toString, examples, isSearching }
}