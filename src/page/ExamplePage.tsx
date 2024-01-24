import { useEffect } from "preact/hooks"
import examples, { Example } from "../examples/examples";
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

interface Props {
  title: string
}

export default function ExamplePage({title}: Props) {

  const {activeTab, selectedExample, setSelectedExample} = useAppState();

  const {structure, structureLoading} = useFetchExamples();

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


  return (
    <section class="mx-6 lg:mx-4 mt-2 max-h-screen">

        <div>


          <div class="flex justify-between">
          
            <nav class="flex gap-1 items-end">
              {selectedExample?.tabs?.map(tab => {
                return <ExampleTab tab={tab} />
              })}
            </nav>

            <span class="flex items-center mr-3 gap-2">

              {showGithubRepo()}

              <BookmarkBtn example={selectedExample as Example} />

            </span>

          </div>
          

            
          <div class="w-full example-view flex justify-start md:flex-row flex-col
          border-4 border-purple-500 rounded-b rounded-tr shadow">

            <div class="min-w-60 min-h-60 max-h-screen overflow-auto no-scrollbar dark:bg-neutral-800 bg-slate-300/50">

              {structureLoading && <StructureSkeleton />}

              {structure && <ShowStructure structure={structure} />}

            </div>
            <div class="flex-grow max-h-screen overflow-auto
            bg-slate-200 dark:bg-neutral-900">
              <FileContent />
            </div>

          </div>

        </div>

    </section>
  )
}
