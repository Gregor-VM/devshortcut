import { Example } from "../examples/examples";
import { ExampleData } from "../types/ExampleResponse";
import { axios } from "./axios";
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
        return examplesTags.includes(tag)
    });

}

/**
 * Return the examples matches given a query by examples titles
 * @param {string} query
 * @param {Example[]} examples
 * @returns {Example[]}
 */
export const filterBySearch = (query: string, examples: Example[]) => {

    const matchesExamples: Example[] = [];

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
 * @param {Example[]} examples
 * @returns {Example[]}
 */
export const filterByTags = (tags: Tag[], examples: Example[]) => {

    const matchesExamples: Example[] = [];

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


/**
 * Return the url format for the title of the example
 * @param {string} exampleTitle
 * @returns {string}
 */
export const convertToSlug = (exampleTitle: string) => {

    return exampleTitle.toLocaleLowerCase().replace(/ /g, '-')

}

/**
 * Return an Uint8Array with the content of the file
 * @param {string} endpoint
 * @returns {Uint8Array}
 */
export const getContent = async (endpoint: string) => {
    
    const data: {content: string} = (await axios.get(endpoint)).data;
    return new Uint8Array( JSON.parse(data.content)["data"] );

}


/**
 * Return the padding of the current file or directory based on the number of parents
 * @param {ExampleData} item
 * @param {number} start
 * @returns {string}
 */
export const getPadding = (item: ExampleData, start = 1.5 ): number => {

    if(!item.parent){
        return start;
    } else {
        return getPadding(item.parent, start + 1);
    }

}


export enum FileType {
    UNKNOWN,
    IMAGE,
    TEXT
}

/**
 * Return the type of the selectedFile
 * @param {string} filename
 * @returns {{fileType: FileType, fileExtension: string | null}}
 */
export const getFileType = (filename?: string): {fileType: FileType, fileExtension: string | null} => {

    if(!filename) return ({fileType: FileType.UNKNOWN, fileExtension: null});

    if(filename.indexOf(".") === -1) return ({fileType: FileType.TEXT, fileExtension: null});

    const dotIndex = filename.indexOf(".");

    let extension = filename.split("").splice(dotIndex + 1).join("").toLocaleLowerCase();

    const imagesExtensions = ["jpg", "jpeg", "png", "ico", "gif", "svg", "webp", "avif", "apng"];

    if(imagesExtensions.includes(extension)){
        if(extension === "svg") extension = "svg+xml";
        return {fileType: FileType.IMAGE, fileExtension: extension};
    }

    return {fileType: FileType.TEXT, fileExtension: extension};

}



export class LocalExampleClass {
    constructor(public name: string, public folder?: string) {
        if(!folder) this.folder = name;
    }
}

export class GithubExampleClass {
    constructor(public name: string, public repoUrl: string) {}
}

/**
 * Returns an object represeting the location and display name of a example local folder
 * @param {string} name
 * @param {string} folder
 * @returns {LocalFolderClass}
 */
export const LocalExample = (name: string, folder?: string) => {
    return new LocalExampleClass(name, folder);
}

export type Tab = LocalExampleClass | GithubExampleClass

/**
 * Returns an object represeting the location and display name of a github repo example
 * @param {string} name
 * @param {string} repoUrl
 * @returns {GithubClass}
 */
export const GithubExample = (name: string, repoUrl: string) => {
    return new GithubExampleClass(name, repoUrl);
}

/**
 * Returns the repository name from a valid GitHub repository URL.
 * @param {string} url - The GitHub repository URL.
 * @returns {string | null} - The repository name if the input is a valid GitHub repository URL, null otherwise.
 */
export function getRepoNameFromUrl(url: string): string | null {
    const githubRepoRegex = /^(https?:\/\/)?(www\.)?github\.com\/([a-zA-Z\d-]+)\/([a-zA-Z\d-]+)(\.git)?$/;
    const match = url.match(githubRepoRegex);
    return match ? match[4] : null;
  }


/**
 * Returns true if the example is present on a list of examples, false otherwise.
 * @param {Example[]} bookmarks
 * @param {Example} example
 * @returns {boolean}
 */
export function isInBookmark(bookmarks: Example[], example: Example) {
    const bookmarkTitles = bookmarks.map(bookmark => bookmark.title);
    return bookmarkTitles.includes(example.title);
}


/**
 * Convert a jsonValue to Example value
 * @param {Object} json
 * @returns {Example}
 */
export function convertToExample(json: any) {

    return ({
        title: json.title,
        tags: json.tags.map((tag: any) => Tag(tag.name, tag?.topic)),
        folder: json?.folder,
        tabs: json.tabs.map((tab: any) => {
          if(tab?.repoUrl){
            return GithubExample(tab.name, tab.repoUrl);
          } else {
            return LocalExample(tab.name, tab?.folder);
          }
        })
    });
    
}