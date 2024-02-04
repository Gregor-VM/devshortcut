import ConfusedIcon from "../icons/confused";

export default function NotFound({msg}: {msg?: string}) {

    return <div class="mx-auto min-h-32 mt-16 text-center">

        <span class="w-full h-16 text-white block text-center">
            <ConfusedIcon />
        </span>
        <p class="mt-3">{msg ? msg : 'No results found :/'}</p>
    </div>
  }
