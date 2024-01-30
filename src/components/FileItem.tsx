import { useCallback, useContext, useEffect, useMemo, useState } from "preact/hooks";
import { ExampleData } from "../types/ExampleResponse";
import { AppState } from "../state/appState";
import { getPadding } from "../utils/utils";
import FileIcon from "../icons/file";
import ContextMenu from "./ContextMenu";
import { createPortal } from "preact/compat";
import { v4 } from "uuid";
import DownloadIcon from "../icons/download";

interface Props {
    item: ExampleData
}

export default function FileItem({item}: Props) {

    const container = document.getElementById('menu')!;
    const contextMenuId = useMemo(() => v4(), []);

    const menuData = [
    {
        title: 'Download File',
        icon: DownloadIcon,
        action: useCallback(() => {
            //window.open(url, "_blank");
        }, [item])
    },
    ];

    const [showMenu, setShowMenu] = useState(false);
    const [position, setPosition] = useState([0, 0]);

    const state = useContext(AppState);

    const [isSelected, setIsSelected] = useState<boolean>();

    const selectFile = () => {
        state.selectedFile.value = item;
    }

    const handleMenu = (e: any) => {
        e.preventDefault();
        setShowMenu(true);
        setPosition([e.pageX, e.pageY]);
    }

    useEffect(() => {

        if(state.selectedFile.value?.path === item.path){
            setIsSelected(true);
        } else {
            setIsSelected(false);
        }

    }, [state.selectedFile.value]);

    return <><div 
    
    title={item.path} 
    style={{paddingLeft: getPadding(item) + 'rem'}}
    onClick={selectFile} 
    onContextMenu={handleMenu}
    class={` ${isSelected ? 'dark:bg-neutral-700 bg-slate-300/80' : ''}
    dark:hover:bg-neutral-700/30 hover:bg-slate-500/10 p-2 flex cursor-pointer`}>
        <span class="w-6 h-6 block mr-2"><FileIcon /></span>
        <p class="md:text-ellipsis md:overflow-hidden max-w-36">{item.item}</p>
    </div>

    {showMenu && createPortal(<ContextMenu id={contextMenuId} closeCallback={() => setShowMenu(false)} data={menuData} position={position} />, container)}

    </>
}
