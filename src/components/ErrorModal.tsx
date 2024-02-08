
import CloseIcon from "../icons/close";
import SadIcon from "../icons/sad";



interface Props {
    message: string
    show: boolean
    closeModal: () => void
}

export function ShareUrlModal({message, show, closeModal}: Props) {

  if(!show) return null;

  return (
    <div class="modal-container" onClick={() => closeModal()}>
      <div onClick={(e) => e.stopPropagation()} class="m-auto md:w-64 md:min-w-64 p-6 rounded dark:bg-neutral-600/50 backdrop-blur-md bg-slate-100/70 pb-8">

        <div class="flex justify-between">
          <h4 class="text-xl font-bold mb-4 flex items-center justify-center">Oops! <span class="inline-block w-6 h-6"><SadIcon /></span></h4>
          <button title="Close" onClick={closeModal} class="block w-6 h-6"><CloseIcon /></button>
        </div>

        <p class="text-xl">{message}</p>

      </div>
    </div>
  )
}

export default ShareUrlModal
