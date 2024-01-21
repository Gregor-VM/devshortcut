import { useContext, useEffect, useState } from "preact/hooks";
import hljs from 'highlight.js';
import { AppState } from "../state/search";
import CopyIcon from "../icons/copy";
//import 'highlight.js/styles/tokyo-night-dark.min.css';
import '../assets/highlight.css';
import { FileType, GithubExampleClass, getContent, getFileType } from "../utils/utils";

export default function FileContent() {

    const state = useContext(AppState);
    const [content, setContent] = useState<string | null>();
    const [contentType, setContentType] = useState<FileType>();
    const [imageContent, setImageContent] = useState<string>();


    const handleContentData = (contentData: Uint8Array) => {

        const {fileType, fileExtension} = getFileType(state.selectedFile.value?.item);

        setContentType(fileType);

        if(fileType === FileType.IMAGE){
            const binaryString = contentData.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
            const base64String = btoa(binaryString);
            const dataURL = `data:image/${fileExtension};base64,${base64String}`;
            setImageContent(dataURL);
        }

        const textDecoder = new TextDecoder('utf-8');
        const utf8Text = textDecoder.decode(contentData);

        setContent( utf8Text );

        setTimeout(() => {
            //avoid highlithing more than 50,000 for performance reasons
            if(utf8Text.length > 50000) return null;
            hljs.highlightAll();
        }, 0);

    }


    const getFileContent = async () => {

        setContent(null);

        if(state.activeTab.value instanceof GithubExampleClass){
            const contentData = await getContent(state.selectedFile.value!.fileContent + state.activeTab.value.repoUrl);
            handleContentData(contentData);
        } else {
            const contentData = await getContent(state.selectedFile.value!.fileContent);
            handleContentData(contentData);
        }



    }

    const copyContent = () => {

    }

    useEffect(() => {

        const path = state.selectedFile.value?.path;

        if(path){
            getFileContent();
        } else {
            setContent("");
        }

    }, [state.selectedFile.value]);

    if(!content) return null;

    return <pre class="p-5 relative">
        <span 
            onClick={copyContent}
            class="w-6 h-6 block absolute top-2 right-2 cursor-pointer"
        ><CopyIcon /></span>
        {contentType === FileType.TEXT && (
            <code class="text-wrap dark:bg-neutral-900 bg-slate-200 dark:text-white text-black">
            {content}
            </code>
        )}

        {contentType === FileType.IMAGE && (
            <img class="w-90 mx-auto" src={imageContent} />
        )}
    </pre>
}
