import useAppState from "../hooks/useAppState"
import { Tab } from "../utils/utils"


interface Props{
    tab: Tab
}

function ExampleTab({tab}: Props) {

  const {activeTab, setActiveTab} = useAppState();


  return (
    <span class={`
    ${ tab === activeTab ? 'bg-purple-500 text-white' : 'dark:bg-neutral-800 bg-slate-300' }
    ${ tab === activeTab ? '' : 'dark:hover:bg-purple-500/10 hover:bg-slate-300/80'}
    py-3 px-5 rounded-t-md cursor-pointer
    hover:pb-4
    hover:mt-0
    mt-1
    transition-all`}
    onClick={() => setActiveTab(tab)}
    >{tab.name}</span>
  )
}

export default ExampleTab