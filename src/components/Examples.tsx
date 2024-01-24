import { useContext } from "preact/hooks";
import { AppState } from "../state/appState";
import { Example } from "../examples/examples";
import { route } from "preact-router";
import { convertToSlug } from "../utils/utils";
import BookmarkBtn from "./BookmarkBtn";
import HoverEffect from "./HoverEffect";
import ShareIcon from "../icons/share";
import ExternalLinkIcon from "../icons/externalLink";
import useAppState from "../hooks/useAppState";
import { ButtonEvent } from "../types/ClickEvent";

interface Props{
    showExamples?: Example[]
}

export function Examples({showExamples}: Props) {

    const state = useContext(AppState);

    const {setSelectedExample} = useAppState();

    const examples = showExamples || state.examples?.value;

    const goToExample = (example: Example) => {
        setSelectedExample(example);
        return null;
    }

    const openExternalLink = (e: ButtonEvent) => {
        e.stopPropagation();
    }

    return <section class="my-6">
        {!showExamples && <h6 class="opacity-70">Search results:</h6>}
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {examples && examples.map(example => {
                return <a
                href={`/example/${convertToSlug(example.title)}`}
                onClick={() => goToExample(example)}
                class="h-32 p-4 
                flex flex-col items-center justify-between
                bg-neutral-100
                hover:bg-neutral-100/80
                dark:bg-neutral-700/80 rounded
                dark:hover:bg-neutral-700 shadow-lg shadow-white-500/20 
                hover:-translate-y-1
                transition-transform
                cursor-pointer"
                >
                    <h2 class="text-xl">{example.title}</h2>
                    <div class="flex justify-around gap-5 w-full border-t-2 border-neutral-700 pt-3">
                        <BookmarkBtn example={example} />

                        <button title="Share" class="block w-6 h-6">
                            <HoverEffect>
                                <ShareIcon />
                            </HoverEffect>
                        </button>

                        <a href={`/example/${convertToSlug(example.title)}`} target="_blank" data-native title="Open in new page" onClick={openExternalLink} class="block w-6 h-6">
                            <HoverEffect>
                                <ExternalLinkIcon />
                            </HoverEffect>
                        </a>

                    </div>
                </a>
            })}
        </div>
    </section>
}