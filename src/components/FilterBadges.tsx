import { useContext } from "preact/hooks"
import {JSXInternal} from "preact/src/jsx.d";
import { AppState } from "../state/search";
import { Tag } from "../utils/tags";
import CloseIcon from "../icons/close";

export default function FilterBadges() {

  const state = useContext(AppState);

  const removeFilter = (filter: Tag) => {

    if(state.filters){
        state.filters.value = state.filters.value.filter(tag => tag.name != filter.name);
    }

  }

  return (
    <div class="mt-3">

        {state.filters?.value.map(filter => {
          return <span class="p-1 bg-purple-600 rounded flex w-min">
            <span class="text-nowrap text-ellipsis">{filter.name}</span>
            <span class="w-6 h-6 block border-l-2 border-purple-700 ml-2 pl-1" role="button" onClick={() => removeFilter(filter)}>
                <CloseIcon />
            </span>
          </span>
        })}

    </div>
  )
}
