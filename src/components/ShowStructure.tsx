import { ExampleData } from "../types/ExampleResponse";
import DirectoryItem from "./DirectoryItem";
import FileItem from "./FileItem";

interface Props {
    structure: ExampleData[] | null
}

export default function ShowStructure({structure}: Props) {

    if(!structure){
        return null;
    }

    return <>{structure!.map(item => {
        if(item.isDirectory){
          return <DirectoryItem item={item} />
        } else {
          return <FileItem item={item} />
        }
      })}</>
}
