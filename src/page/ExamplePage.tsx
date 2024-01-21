import { useEffect } from "preact/hooks"
import examples from "../examples/examples";
import { convertToSlug } from "../utils/utils";
import useFetchExamples from "../hooks/useFetchExample";
import FileContent from "../components/FileContent";
import ShowStructure from "../components/ShowStructure";

interface Props {
  title: string
}


export default function ExamplePage({title}: Props) {


  const {structure, selectedExample, activeTab, structureLoading} = useFetchExamples();

  useEffect(() => {

    if(selectedExample && selectedExample.value?.title){
    } else {
      const example = examples.find(example => convertToSlug(example.title) === title);
      if(example) selectedExample.value = example;
    }
    
  }, [selectedExample]);


  return (
    <main class="mx-6 lg:mx-4 mt-2 max-h-screen">

        {/*<h2 class="text-2xl opacity-90 mb-6">{selectedExample.value?.title}</h2>*/}

        <section>
          <nav class="flex gap-1 items-end">
            {selectedExample.value?.tabs?.map(tab => {
              return <span class={`
              ${ tab === activeTab.value ? 'bg-purple-500 text-white' : 'dark:bg-neutral-800 bg-slate-300' }
              ${ tab === activeTab.value ? '' : 'dark:hover:bg-purple-500/10 hover:bg-slate-300/80'}
              py-3 px-5 rounded-t-md cursor-pointer
              hover:pb-4
              hover:mt-0
              mt-1
              transition-all`}
              onClick={() => activeTab.value = tab}
              >{tab.name}</span>
            })}
          </nav>

            
          <div class="w-full example-view flex justify-start md:flex-row flex-col
          border-4 border-purple-500 rounded-b rounded-tr shadow">

            <div class="min-w-60 min-h-60 max-h-screen overflow-auto no-scrollbar dark:bg-neutral-800 bg-slate-300/50">

              {structureLoading && <div role="status" class="max-w-sm animate-pulse m-4">
                {Array.from({ length: 10 }).map((_) => {
                  return <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
                })}
                <span class="sr-only">Loading...</span>
              </div>}

              {structure && <ShowStructure structure={structure} />}

            </div>
            <div class="flex-grow max-h-screen overflow-auto
            bg-slate-200 dark:bg-neutral-900">
              <FileContent />
            </div>

          </div>

        </section>

    </main>
  )
}
