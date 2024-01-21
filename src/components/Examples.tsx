import { useContext } from "preact/hooks";
import { AppState } from "../state/search";
import { Example } from "../examples/examples";
import { route } from "preact-router";
import { convertToSlug } from "../utils/utils";

export function Examples() {

    const state = useContext(AppState);

    const examples = state.examples;

    const goToExample = (example: Example) => {
        state.selectedExample.value = example;
        route(`/example/${convertToSlug(example.title)}`);
        return null;
    }

    return <section class="my-6">
        <h6 class="opacity-70">Search results:</h6>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {examples && examples.value.map(example => {
                return <div
                onClick={() => goToExample(example)}
                class="h-32 p-4 flex flex-col items-center justify-center
                bg-neutral-100
                hover:bg-neutral-100/80
                dark:bg-neutral-700/80 rounded
                dark:hover:bg-neutral-700 shadow-lg shadow-white-500/20 
                hover:-translate-y-1
                transition-transform
                cursor-pointer"
                >
                    <h2 class="text-xl">{example.title}</h2>
                </div>
            })}
        </div>
    </section>
}