import { useEffect, useState } from "preact/hooks"
import useAppState from "../hooks/useAppState"

export interface MenuData {
    title: string
    icon: any
    action: () => void
}

interface Props {
    position: number[]
    data: MenuData[]
    closeCallback: () => void
    id: string
}

function ContextMenu({position, data, closeCallback, id}: Props) {

  const {openedMenu, setOpenedMenu} = useAppState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {    

    const callback = () => {
        closeCallback();
    };

    window.addEventListener('click', callback);

    () => {
        window.removeEventListener('click', callback);
    }

  }, []);

  useEffect(() => {
    setOpenedMenu(id);
    setMounted(true);
  }, []);

  useEffect(() => {

    if(openedMenu && mounted){

        if(openedMenu !== id){
            closeCallback();
        }
    }

  }, [openedMenu, mounted]);

  return (
    <div class="absolute z-20 bg-slate-100 dark:bg-neutral-600 rounded overflow-hidden shadow-md" style={{top: position[1], left: position[0]}}>
        {data.map(item => {
            return <button class="flex p-3 justify-between min-w-40 hover:bg-purple-100 dark:hover:bg-purple-900" onClick={item.action}>
                <span>{item.title}</span>
                <span class="block w-6 h-6">
                    <item.icon />
                </span>
            </button>
        })}
    </div>
  )
}

export default ContextMenu;