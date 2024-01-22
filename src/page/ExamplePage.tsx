import { useEffect } from "preact/hooks"
import examples from "../examples/examples";
import { convertToSlug } from "../utils/utils";
import useFetchExamples from "../hooks/useFetchExample";
import FileContent from "../components/FileContent";
import ShowStructure from "../components/ShowStructure";
import StructureSkeleton from "../components/StructureSkeleton";
import useAppState from "../hooks/useAppState";

interface Props {
  title: string
}

export default function ExamplePage({title}: Props) {

  const {activeTab, selectedExample, setActiveTab, setSelectedExample} = useAppState();

  const {structure, structureLoading} = useFetchExamples();

  useEffect(() => {

    if(selectedExample && selectedExample?.title){
    } else {
      const example = examples.find(example => convertToSlug(example.title) === title);
      if(example) setSelectedExample(example);
    }
    
  }, [selectedExample?.title]);


  return (
    <section class="mx-6 lg:mx-4 mt-2 max-h-screen">

        <div>
          <nav class="flex gap-1 items-end">
            {selectedExample?.tabs?.map(tab => {
              return <span class={`
              ${ tab === activeTab ? 'bg-purple-500 text-white' : 'dark:bg-neutral-800 bg-slate-300' }
              ${ tab === activeTab ? '' : 'dark:hover:bg-purple-500/10 hover:bg-slate-300/80'}
              py-3 px-5 rounded-t-md cursor-pointer
              hover:pb-4
              hover:mt-0
              mt-1
              transition-all`}
              onClick={() => setActiveTab(tab)}
              >{tab.name}</span>
            })}
          </nav>

            
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
