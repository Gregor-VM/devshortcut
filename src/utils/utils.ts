import { Examples } from "../examples/examples";
import { Tag } from "./tags";

/**
 * Return true if the passed example title matches the search of the user
 * @param {string} exampleTitle
 * @param {string} userIput
 * @returns {boolean}
 */
export const exampleMatch = (exampleTitle: string, userInput: string) => {

    return exampleTitle.toLocaleLowerCase().includes(userInput.toLocaleLowerCase());

}


/**
 * Return true if the passed example tags matches the searched tags of the user
 * @param {Example} examplesTags
 * @param {Tag[]} tags
 * @returns {boolean}
 */
export const exampleMatchFilters = (examplesTags: Tag[], tags: Tag[]) => {

    return tags.every(tag => {
        console.log(examplesTags.includes(tag))
        return examplesTags.includes(tag)
    });

}

/**
 * Return the examples matches given a query by examples titles
 * @param {string} query
 * @param {Examples} examples
 * @returns {Examples}
 */
export const filterBySearch = (query: string, examples: Examples) => {

    const matchesExamples: Examples = [];

    if(query.length > 0){

        examples.filter(example => {
    
            if(exampleMatch(example.title, query)){
    
                matchesExamples.push(example);
    
            }
        });

    } else {

        return examples;
    }

    return matchesExamples;

}

/**
 * Return the examples matches given array of tags
 * @param {Tag[]} tags
 * @param {Examples} examples
 * @returns {Examples}
 */
export const filterByTags = (tags: Tag[], examples: Examples) => {

    const matchesExamples: Examples = [];

    if(tags.length > 0){

        examples.filter(example =>{        

                if(exampleMatchFilters(example.tags, tags)){
        
                matchesExamples.push(example);
        
                }

        });

    } else {
        return examples;
    }

    return matchesExamples;

}