import { useContext, useState } from "preact/hooks";
import { createPortal } from 'preact/compat';
import { AppState } from "../state/appState";
import { Example } from "../examples/examples";
import { convertToSlug } from "../utils/utils";
import BookmarkBtn from "./BookmarkBtn";
import HoverEffect from "./HoverEffect";
import ShareIcon from "../icons/share";
import ExternalLinkIcon from "../icons/externalLink";
import useAppState from "../hooks/useAppState";
import { ButtonEvent } from "../types/ClickEvent";
import ShareUrlModal from "./ShareUrlModal";

interface Props{
    showExamples?: Example[]
}

export function Examples({showExamples}: Props) {

    const [showModal, setShowModal] = useState(false);
    const [url, setUrl] = useState("");

    const container = document.getElementById('modals')!;

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

    const shareUrl = (e: ButtonEvent, example: Example) => {
        e.stopPropagation();
        e.preventDefault();

        const base = document.baseURI;
        const url = `${base}example/${convertToSlug(example.title)}`;

        setUrl(url);
        setShowModal(true);
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
                    <div class="flex justify-around gap-5 w-full border-t-2 border-neutral-700">
                        <BookmarkBtn class="p-3" example={example} />

                        <button class="p-3" onClick={(e) => shareUrl(e, example)} title="Share" >
                            <HoverEffect>
                                <span class="block w-6 h-6"><ShareIcon /></span>
                            </HoverEffect>
                        </button>

                        <a class="p-3" href={`/example/${convertToSlug(example.title)}`} target="_blank" data-native title="Open in new page" onClick={openExternalLink}>
                            <HoverEffect>
                                <span class="block w-6 h-6"><ExternalLinkIcon /></span>
                            </HoverEffect>
                        </a>

                    </div>
                </a>
            })}
        </div>
        {createPortal(<ShareUrlModal closeModal={() => setShowModal(false)} show={showModal} url={url} />, container)}
    </section>
}