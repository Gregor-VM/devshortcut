import fs from 'node:fs/promises';
import path from 'node:path';
import { simpleGit } from 'simple-git';
import { v4 as uuidv4 } from 'uuid';

import { URL } from 'url';
import { ItemNode } from './ItemNode.js';

const __dirname = new URL('../', import.meta.url).pathname.replace("/", "");


/**
 * Get current path to example folders
 * @param {string} dir - The name of the directory or the path relative to example
 * @returns {Promise<string>} - A promise that resolves to the full path to the folder
 */
export const getPath = async (dir) => {
  
    return path.join(__dirname, `../src/examples/${dir}`);
  
}



/**
 * Get all directories of an example directory
 * @param {string} path - The relative path in the "examples" folder
 * @returns {Promise<string[]>} - A promise that resolves to an array of file names.
 */
export const getDirectories = async (path) => {

    const fullPath = await getPath(path);
  
    const directories = await fs.readdir(fullPath);
  
    if(directories) {
  
        return directories;
  
    } else {
        throw new Error({msg: "File directory doesn't exists", code: 404});
    }

}


/**
 * Get all directories and files (tabs) of a folder
 * @param {string} path - The relative path in the "examples" folder
 * @param {ItemNode} [parent] - Object representing the parent of the current file or directory
 * @returns {Promise<ItemNode>} - An object representing the structure of the folder
 */
export const getStructure = async (path, parent, includeContent = false) => {

    const fullPath = await getPath(`${path}`);
  
    const items = await fs.readdir(fullPath);

    const content = await Promise.all(
        items.map(async (item) => {

          const itemNode = new ItemNode(item, path, parent, includeContent);

          await itemNode.loadItem();

          await itemNode.getNextStructure();

          return itemNode;

        })
    );
  
    if(content) {
  
        return JSON.parse(JSON.stringify(content));
  
    } else {
        throw new Error({msg: "File directory doesn't exists", code: 404});
    }

}

/**
 * Get file content
 * @param {string} path - The relative path in the "examples" folder
 * @returns {Promise<string>} - The content of the file in utf-8 encoding
 */
export const getFileContent = async (path) => {

    const fullPath = await getPath(path);

    try {
        const content = await fs.readFile(fullPath, {encoding: "utf-8"});
        return content.toString();
    } catch (error) {
        throw new Error({msg: "File not found", code: 404});
    }

}



/**
 * Get the structure of a github repo including the file content
 * @param {string} repoUrl - The github repo url
 * @returns {Promise<ItemNode>} - The structure of the repo
 */
export const getGitHubRepo = async (repoUrl) => {

    const git = simpleGit();

    const id = uuidv4();

    try {

        const path = await getPath(id);
        
        await git.clone(repoUrl, path);

        const content = await getStructure(id, undefined, true);

        await fs.rm(path, {recursive: true});

        return JSON.parse(JSON.stringify(content));


    } catch (error) {
        await fs.rm(path, {recursive: true});
        throw new Error({msg: "Error while cloning the github repo", code: 400});
    }

}