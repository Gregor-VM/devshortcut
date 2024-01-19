import { useContext } from "preact/hooks";
import { AppState } from "../state/search";
import tags, { TagTypeEnum } from "../utils/tags";
import {JSXInternal} from "preact/src/jsx.d";

export function Filters({title, filterKey}: {title: string, filterKey: keyof typeof TagTypeEnum}) {

    const tagsValues = Object.values(tags);

    const filteredTags = tagsValues.filter(tag => tag.type === filterKey);

    const tagsNames = filteredTags.map(tag => tag.name);

    const state = useContext(AppState);

    const applyFilter: JSXInternal.MouseEventHandler<HTMLDivElement> | undefined = (tagName: string) => {

        const tag = filteredTags.find(tag => tag.name === tagName);

        if(tag && state?.filters){
            state.filters.value = [ tag ];
        }

    }

    return <section class="my-6">
        <h6 class="opacity-90">{title}</h6>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {tagsNames.map(name => {
                return <div
                onClick={() => applyFilter(name)}
                class="h-16 p-8 flex items-center 
                bg-neutral-100
                hover:bg-neutral-100/80
                dark:bg-neutral-700/80 rounded
                dark:hover:bg-neutral-700 shadow-lg shadow-white-500/20 
                hover:-translate-y-1
                transition-transform
                cursor-pointer"
                >{name}</div>
            })}
        </div>
    </section>
}