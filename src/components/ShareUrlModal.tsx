import { useEffect } from "preact/hooks";
import CopyIcon from "../icons/copy";
import CloseIcon from "../icons/close";



interface Props {
    url: string
    show: boolean
    closeModal: () => void
}

export function ShareUrlModal({url, show, closeModal}: Props) {

  const msg = "Look at this code example!";

  const socials = ['facebook', 'linkedin', 'pinterest', 'reddit', 'teams', 'telegram', 'whatsapp', 'tumblr', 'twitter', 'email'];

  useEffect(() => {

    if(show){
      const Shareon = (window as any).Shareon;
      Shareon.init();
    }

  }, [show]);

  if(!show) return null;

  return (
    <div class="modal-container" onClick={() => closeModal()}>
      <div onClick={(e) => e.stopPropagation()} class="m-auto md:min-w-96 p-6 rounded dark:bg-neutral-600/50 backdrop-blur-md bg-slate-100/70 pb-8">

        <div class="flex justify-between">
          <h4 class="text-xl font-bold mb-4">Share url</h4>
          <button title="Close" onClick={closeModal} class="block w-6 h-6"><CloseIcon /></button>
        </div>

        <div class="relative">
          <input class="w-full dark:bg-neutral-900 bg-slate-300 pr-16 p-4 rounded" value={url} disabled />
          <div class="absolute top-0 right-0 h-full flex p-2">
            <span class="shareon">
              <a data-url={url} data-title={msg} class="copy-url"></a>
            </span>
          </div>
        </div>

        <div class="shareon grid grid-cols-6 md:grid-cols-8 mt-4">
          {socials.map(social => {
            return <a data-url={url} data-title={msg} class={social}></a>
          })}
        </div>

      </div>
    </div>
  )
}

export default ShareUrlModal