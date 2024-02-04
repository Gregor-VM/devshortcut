import fs from 'node:fs/promises';
import path from 'node:path';
import { simpleGit } from 'simple-git';
import { v4 as uuidv4 } from 'uuid';

import { URL } from 'url';
import { ItemNode } from './ItemNode.js';
import axios from 'axios';

const __dirname = new URL('../', import.meta.url).pathname.replace("/", "");


/**
 * Get current path to example folders
 * @param {string} dir - The name of the directory or the path relative to example
 * @returns {Promise<string>} - A promise that resolves to the full path to the folder
 */
export const getPath = async (dir) => {
  
    const fullPath = path.join(__dirname, `../src/examples/${dir}`);
    if(!fullPath.includes('src\\examples\\')){
      throw new Error({code: 500});
    }
    console.log(fullPath);
    return fullPath;
  
}

/**
 * Get all directories and files (tabs) of a folder
 * @param {string} path - The relative path in the "examples" folder
 * @param {ItemNode} [parent] - Object representing the parent of the current file or directory
 * @returns {Promise<ItemNode>} - An object representing the structure of the folder
 */
export const getStructure = async (path, parent, type = "local") => {

    const fullPath = await getPath(`${path}`);
  
    const items = await fs.readdir(fullPath);

    const content = await Promise.all(
        items.map(async (item) => {

          const itemNode = new ItemNode(item, path, parent, type);

          await itemNode.loadItem();

          await itemNode.getNextStructure();

          return itemNode;

        })
    );

    content.sort((item) => item.isDirectory ? -1 : 2);
  
    if(content) {
  
        return JSON.parse(JSON.stringify(content));
  
    } else {
        throw new Error({msg: "File directory doesn't exists", code: 404});
    }

}

/**
 * Get file content
 * @param {string} path - The relative path in the "examples" folder
 * @returns {Promise<Buffer>} - The content of the file
 */
export const getFileContent = async (path) => {

    const fullPath = await getPath(path);

    try {
        const content = await fs.readFile(fullPath);
        return content;
    } catch (error) {
        throw new Error({msg: "File not found", code: 404});
    }

}



/**
 * Get file content from GitHub
 * @param {string} repoUrl - The github repository
 * * @param {string} filePath - The path of the file in local
 * @returns {Promise<Buffer | string>} - The content of the file
 */
export const getGitHubFile = async (repoUrl, filePath) => {

    let repoPath = repoUrl.replace("https://github.com/", "");
    repoPath = repoPath.split("/")[0] + "/" + repoPath.split("/")[1];

    //remove tmp folder of filePath
    const slash = filePath.indexOf("/");
    const fileRepoPath = filePath.slice(slash + 1);

    try {
        const res = await axios.get(`https://raw.githubusercontent.com/${repoPath}/main/${fileRepoPath}`, {responseType: 'arraybuffer'});
        const buffer = Buffer.from(res.data, 'binary');
        return buffer;
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

        await fs.rm(await getPath(id + '/.git'), {recursive: true});

        const content = await getStructure(id, undefined, "github");

        await fs.rm(path, {recursive: true});

        return JSON.parse(JSON.stringify(content));


    } catch (error) {
        await fs.rm(path, {recursive: true});
        throw new Error({msg: "Error while cloning the github repo", code: 400});
    }

}
