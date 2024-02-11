import { useEffect, useState } from "preact/hooks"
import { createPortal } from 'preact/compat';
import examples, { Example } from "../utils/examples";
import { GithubExampleClass, convertToExample, convertToSlug } from "../utils/utils";
import useFetchExamples from "../hooks/useFetchExample";
import FileContent from "../components/FileContent";
import ShowStructure from "../components/ShowStructure";
import StructureSkeleton from "../components/StructureSkeleton";
import useAppState from "../hooks/useAppState";
import { route } from "preact-router";
import ExampleTab from "../components/ExampleTab";
import BookmarkBtn from "../components/BookmarkBtn";
import GitHubIcon from "../icons/github";
import HoverEffect from "../components/HoverEffect";
import BackIcon from "../icons/back";
import ThemeButton from "../components/ThemeButton";
import ErrorModal from "../components/ErrorModal";

interface Props {
  title: string
}

export default function ExamplePage({title}: Props) {

  const [showModal, setShowModal] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);


  const {activeTab, selectedExample, setSelectedExample} = useAppState();

  const {structure, structureLoading, isError} = useFetchExamples();

  const showGithubRepo = () => {

    if(activeTab instanceof GithubExampleClass){

      return <HoverEffect>
        <a class="block w-6 h-6" target="_blank" href={activeTab.repoUrl}>
          <GitHubIcon />
        </a>
      </HoverEffect>

    } else {
      return null;
    }

  }

  const goBack = () => {
    history.go(-1);
  }

  const closeModal = () => {
    setShowModal(false);
    goBack();
  }

  useEffect(() => {
    console.log({isError})
    if(isError) setShowModal(true); 
  }, [isError]); 

  useEffect(() => {

    if(selectedExample && selectedExample?.title){
      //for later...
    } else {

      const example = examples.find(example => convertToSlug(example.title) === title);
      if(example) setSelectedExample(example);

      if(!example){
        const exampleData = sessionStorage.getItem(title);
        if(exampleData){
          const jsonData = JSON.parse(exampleData);
          const sessionExample = convertToExample(jsonData);
          setSelectedExample(sessionExample);
        } else {
          route('/');
        }
      }
      
    }
    
  }, [selectedExample?.title]);

  useEffect(() => {
    setContainer(document.getElementById('modals')!);
  }, []);

  return (
    <section class="h-screen max-h-screen">

        <div>


          <div class="flex justify-between items-end">
          
            <nav class="flex w-full gap-1 p-2 border-b-2 border-neutral-500/50 items-center">

              <span title="Go Back" 
              onClick={goBack}
              class="block w-6 h-8 hover:bg-neutral-500/50 rounded cursor-pointer">
                <BackIcon />
              </span>

              {selectedExample?.tabs?.map(tab => {
                return <ExampleTab tab={tab} />
              })}
            </nav>

            <span class="flex p-1 items-center pr-3 gap-3 border-b-2 border-neutral-500/50">
              
              {showGithubRepo()}

              <BookmarkBtn class="mt-1" example={selectedExample as Example} />

              <ThemeButton />

            </span>

          </div>
          

            
          <div class="w-full example-view flex justify-start md:flex-row flex-col shadow">

            <div class="sm:min-w-56 sm:w-56 sm:h-full w-full h-1/2 sm:max-h-screen overflow-y-auto overflow-x-hidden no-scrollbar dark:bg-neutral-800 bg-slate-300/50">
              
              {structureLoading && <StructureSkeleton />}

              {structure && <ShowStructure structure={structure} />}

            </div>
            <div class="flex-grow sm:h-full h-1/2 max-h-screen overflow-auto
            bg-slate-200 dark:bg-neutral-900">
              <FileContent />
            </div>

          </div>

        </div>
{container && createPortal(<ErrorModal closeModal={closeModal} show={showModal} message={"We couldn't load the repository, maybe it's private or too large?"} />, container)}

    </section>
  )
}
