import useAppState from "../hooks/useAppState"
import { Tab } from "../utils/utils"


interface Props{
    tab: Tab
}

function ExampleTab({tab}: Props) {

  const {activeTab, setActiveTab} = useAppState();

  return (
    <span class={`
    ${ tab === activeTab ? 'bg-purple-500 text-white' : 'dark:bg-neutral-900 bg-slate-200' }
    ${ tab === activeTab ? '' : 'dark:hover:bg-neutral-800 hover:bg-slate-300/80'}
    py-1 px-2 rounded
    cursor-pointer
    transition-all`}
    onClick={() => setActiveTab(tab)}
    >{tab.name}</span>
  )
}

export default ExampleTab