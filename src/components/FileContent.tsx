import { useEffect, useState } from "preact/hooks";
import hljs from 'highlight.js';
import CopyIcon from "../icons/copy";
//import 'highlight.js/styles/tokyo-night-dark.min.css';
import '../assets/highlight.css';
import { FileType, GithubExampleClass, getContent, getFileType } from "../utils/utils";
import useAppState from "../hooks/useAppState";

export default function FileContent() {

    const {selectedFile, activeTab} = useAppState();

    const [content, setContent] = useState<string | null>();
    const [contentType, setContentType] = useState<FileType>();
    const [imageContent, setImageContent] = useState<string>();


    const handleContentData = (contentData: Uint8Array) => {

        const {fileType, fileExtension} = getFileType(selectedFile?.item);

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
            //avoid highlithing more than 50,000 for performance issues
            if(utf8Text.length > 50000) return null;
            hljs.highlightAll();
        }, 0);

    }


    const getFileContent = async () => {

        setContent(null);

        if(activeTab instanceof GithubExampleClass){
            const contentData = await getContent(selectedFile!.fileContent + activeTab.repoUrl);
            handleContentData(contentData);
        } else {
            const contentData = await getContent(selectedFile!.fileContent);
            handleContentData(contentData);
        }

    }

    const copyContent = () => {

        //TODO: COPY TEXT AND DISPLAY NOTIFICATION

    }

    useEffect(() => {

        const path = selectedFile?.path;

        if(path){
            getFileContent();
        } else {
            setContent("");
        }

    }, [selectedFile]);

    if(!content) return null;

    // TODO: ADD LINE NUMERATION

    if(contentType === FileType.TEXT){
        return <pre class="p-5 relative">
        <span 
            onClick={copyContent}
            class="w-6 h-6 block absolute top-2 right-2 cursor-pointer"
        ><CopyIcon /></span>
        <code class="text-wrap dark:bg-neutral-900 bg-slate-200 dark:text-white text-black">
            {content}
        </code>
    </pre>
    }

    if(contentType === FileType.IMAGE){
        return <div class="p-5 h-full grid content-center">
        {contentType === FileType.IMAGE && (
            <img class="w-90 mx-auto" src={imageContent} />
        )}
    </div>
    }

    // TODO: ADD MORE FILE TYPES (VIDEOS AND AUDIOS)
    // TODO: HANDLE FILES THAT CANNOT BE DISPLAYED (PDF, DOCX, XLS...)

}
