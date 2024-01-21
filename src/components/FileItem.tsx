import { useContext, useEffect, useState } from "preact/hooks";
import { ExampleData } from "../types/ExampleResponse";
import { AppState } from "../state/search";
import { getPadding } from "../utils/utils";
import FileIcon from "../icons/file";

interface Props {
    item: ExampleData
}

export default function FileItem({item}: Props) {

    const state = useContext(AppState);

    const [isSelected, setIsSelected] = useState<boolean>();

    const selectFile = () => {
        state.selectedFile.value = item;
    }

    useEffect(() => {

        if(state.selectedFile.value?.path === item.path){
            setIsSelected(true);
        } else {
            setIsSelected(false);
        }

    }, [state.selectedFile.value]);

    return <div title={item.path} style={{paddingLeft: getPadding(item) + 'rem'}} onClick={selectFile} class={` ${isSelected ? 'dark:bg-neutral-700 bg-slate-300/80' : ''}
    dark:hover:bg-neutral-700/30 hover:bg-slate-500/10 p-2 flex cursor-pointer`}>
        <span class="w-6 h-6 block mr-2"><FileIcon /></span>
        <p class="md:text-ellipsis md:overflow-hidden max-w-64">{item.item}</p>
    </div>
}
