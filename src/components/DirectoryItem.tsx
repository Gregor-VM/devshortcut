import { useState } from "preact/hooks";
import { ExampleData } from "../types/ExampleResponse";
import ShowStructure from "./ShowStructure";
import { getPadding } from "../utils/utils";
import FolderIcon from "../icons/folder";
import FolderOpenIcon from "../icons/folderOpen";
import ChevronDownIcon from "../icons/chevronDown";
import ChevronRightIcon from "../icons/chevronRight";

interface Props {
    item: ExampleData
}

export default function DirectoryItem({item}: Props) {

    const [collapsed, setCollapsed] = useState(false);



    const showDirectoryContent = () => {

        setCollapsed(prev => !prev);

    }

    return <><div title={item.path} style={{paddingLeft: getPadding(item) + 'rem'}} onClick={showDirectoryContent} class="dark:hover:bg-neutral-700/30 hover:bg-slate-500/10 cursor-pointer p-2 flex">
        <div class="-translate-x-6 flex">
            <span class="w-6 h-6 block">{collapsed ? <ChevronDownIcon /> : <ChevronRightIcon />}</span>
            <span class="w-6 h-6 block mr-2">{collapsed ? <FolderOpenIcon /> : <FolderIcon />}</span>
            <p class="md:text-ellipsis md:overflow-hidden max-w-64">{item.item}</p>
        </div>
    </div>
    {
        collapsed && item.structure && (
            <div class="flex flex-col">
                <ShowStructure structure={item.structure} />
            </div>
        )
    }
    </>
}
