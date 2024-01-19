import { TagTypeEnum } from "../utils/tags"
import { Filters } from "./Filters";

export default function FilterSection() {

    const filterKeys = Object.keys(TagTypeEnum)

    return <>
        {filterKeys.map((key) => {
            const filterKey = (key as unknown as keyof typeof TagTypeEnum);
            return <Filters filterKey={filterKey} title={TagTypeEnum[filterKey]} />
        })}
    </>
}