import { useCallback, useContext, useEffect, useMemo, useState } from "preact/hooks";
import { ExampleData } from "../types/ExampleResponse";
import { AppState } from "../state/appState";
import { FileType, GithubExampleClass, getPadding } from "../utils/utils";
import FileIcon from "../icons/file";
import ContextMenu from "./ContextMenu";
import { createPortal } from "preact/compat";
import { v4 } from "uuid";
import DownloadIcon from "../icons/download";
import useAppState from "../hooks/useAppState";
import { getFileType } from "../utils/utils";
import ImageIcon from "../icons/image";
import AudioIcon from "../icons/audio";
import CssFileIcon from "../icons/cssFile";
import PdfFileIcon from "../icons/pdfFile";
import VideoIcon from "../icons/video";
import TsFileIcon from "../icons/tsFile";
import TsxFileIcon from "../icons/tsxFile";
import JsFileIcon from "../icons/jsFile";
import JsxFileIcon from "../icons/jsxFile";
import XlsFileIcon from "../icons/xlsFile";
import XmlFileIcon from "../icons/xmlFile";
import ZipFileIcon from "../icons/zipFile";
import CsvFileIcon from "../icons/csvFile";
import VueFileIcon from "../icons/vueFile";
import HtmlFileIcon from "../icons/htmlFile";

interface Props {
    item: ExampleData
}

export default function FileItem({item}: Props) {

    const {activeTab} = useAppState();

    const {fileType, fileExtension} = getFileType(item?.item);

    const container = document.getElementById('menu')!;
    const contextMenuId = useMemo(() => v4(), []);

    const menuData = [
    {
        title: 'Download File',
        icon: DownloadIcon,
        action: useCallback(() => {

            if(activeTab instanceof GithubExampleClass){
                window.open(`/api${item!.downloadUrl}${activeTab.repoUrl}`, "_blank");
            } else {
                window.open(`/api${item!.downloadUrl}`, "_blank");
            }

        }, [item, activeTab])
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

    const fileIcon = useMemo(() => {

        if(fileExtension === "css") return <CssFileIcon />
        if(fileExtension === "pdf") return <PdfFileIcon />
        if(fileExtension === "ts") return <TsFileIcon />
        if(fileExtension === "tsx") return <TsxFileIcon />
        if(fileExtension === "js") return <JsFileIcon />
        if(fileExtension === "jsx") return <JsxFileIcon />
        if(fileExtension === "xls") return <XlsFileIcon />
        if(fileExtension === "xml") return <XmlFileIcon />
        if(fileExtension === "zip") return <ZipFileIcon />
        if(fileExtension === "php") return <ZipFileIcon />
        if(fileExtension === "html") return <HtmlFileIcon />
        if(fileExtension === "vue") return <VueFileIcon />
        if(fileExtension === "csv") return <CsvFileIcon />

        if(fileType === FileType.TEXT) return <FileIcon /> 
        if(fileType === FileType.IMAGE) return <ImageIcon />
        if(fileType === FileType.AUDIO) return <AudioIcon />
        if(fileType === FileType.VIDEO) return <VideoIcon />
        else return <FileIcon />
    }, [fileType]);

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
        <span class="w-6 min-w-6 h-6 block mr-2">{fileIcon}</span>
        <p class="md:text-ellipsis md:overflow-hidden max-w-36">{item.item}</p>
    </div>

    {showMenu && createPortal(<ContextMenu id={contextMenuId} closeCallback={() => setShowMenu(false)} data={menuData} position={position} />, container)}

    </>
}
