import { useEffect, useRef, useState } from "preact/hooks";
import hljs from 'highlight.js';
import CopyIcon from "../icons/copy";
//import 'highlight.js/styles/tokyo-night-dark.min.css';
import '../assets/highlight.css';
import { FileType, GithubExampleClass, getContent, getFileType } from "../utils/utils";
import useAppState from "../hooks/useAppState";
import CheckIcon from "../icons/check";

export default function FileContent() {

    const {selectedFile, activeTab} = useAppState();
    
    const copyBtnRef = useRef<HTMLSpanElement>(null);

    const [content, setContent] = useState<string | null>();
    const [contentType, setContentType] = useState<FileType>();
    const [fileURL, setFileURL] = useState<string>();

    const [showCopyBtn, setShowCopyBtn] = useState(true);


    const handleContentData = (contentData: Uint8Array) => {

        const {fileType, fileExtension} = getFileType(selectedFile?.item);

        setContentType(fileType);

        if(fileType === FileType.IMAGE){

            const blob = new Blob([contentData], { type: `image/${fileExtension}` });
            setFileURL(URL.createObjectURL(blob));

        }

        if(fileType === FileType.AUDIO){

            const blob = new Blob([contentData], { type: `audio/${fileExtension}` });
            setFileURL(URL.createObjectURL(blob));
        }

        if(fileType === FileType.VIDEO){

            const blob = new Blob([contentData], { type: `video/${fileExtension}` });
            setFileURL(URL.createObjectURL(blob));
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
        setFileURL(undefined);

        if(activeTab instanceof GithubExampleClass){
            const contentData = await getContent(selectedFile!.fileContent + activeTab.repoUrl);
            handleContentData(contentData);
        } else {
            const contentData = await getContent(selectedFile!.fileContent);
            handleContentData(contentData);
        }

    }

    const copyAnimation = () => {

        copyBtnRef.current?.classList.add('copy-btn-animation');

        setTimeout(() => {

            copyBtnRef.current?.classList.remove('copy-btn-animation');

        }, 1000);

        setTimeout(() => {

            setShowCopyBtn(false);

        }, 250);

        setTimeout(() => {

            setShowCopyBtn(true);

        }, 750);

    }

    const copyContent = async () => {

        if(content){
            var textArea = document.createElement("textarea");
            textArea.value = content;
            
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                document.execCommand('copy');
            } catch (err) {
                console.error(err);
            }

            document.body.removeChild(textArea);
        }

        copyAnimation();


    }

    useEffect(() => {

        const path = selectedFile?.path;

        if(path){
            getFileContent();
        } else {
            setContent("");
        }

        return () => {
            copyBtnRef.current?.classList.remove('copy-btn-animation');
        }

    }, [selectedFile]);

    if(!content) return null;

    // TODO: ADD LINE NUMERATION

    if(contentType === FileType.TEXT){
        return <>

        <span 
            ref={copyBtnRef}
            onClick={copyContent}
            class="w-6 h-6 block absolute top-96 md:top-14 right-6 z-10 cursor-pointer"
        >{ showCopyBtn ? <CopyIcon /> : <CheckIcon /> }</span>

        <pre class="p-5 relative">
        <code class="text-wrap dark:bg-neutral-900 bg-slate-200 dark:text-white text-black">
            {content.length < 500000 ? content : 'The file is too large to be displayed, you may want to download it here instead.'}
        </code>
    </pre>
    </>
    }

    if(contentType === FileType.IMAGE){
        return <div class="mt-3 p-5 h-full grid content-center">
        <img class="w-90 mx-auto" src={fileURL} />
    </div>
    }

    if(contentType === FileType.AUDIO){
        return <div class="p-5 h-full grid content-center">
        <audio class="w-full" controls src={fileURL}></audio>
    </div>
    }

    if(contentType === FileType.VIDEO){
        return <div class="md:p-20 p-5 h-full grid content-center">
            <video class="w-full h-full" controls width="250">
                <source src={fileURL} type="video/mp4" />
            </video>
    </div>
    }

    if(contentType === FileType.UNKNOWN){
        return <div class="md:p-20 p-5 h-full grid content-center">
        <h5 class="text-center">
            This file type cannot be displayed you may want to download it here instead.
        </h5>
    </div>
    }

    return null;

}
