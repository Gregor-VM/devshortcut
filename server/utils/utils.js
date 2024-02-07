import fs from 'node:fs/promises';
import path from 'node:path';
import fsSync from 'node:fs';
import * as git from 'isomorphic-git';
import * as http from 'isomorphic-git/http/node/index.js';
import { v4 as uuidv4 } from 'uuid';

import { ItemNode } from './ItemNode.js';
import axios from 'axios';

/**
 * Get current path to example folders
 * @param {string} dir - The name of the directory or the path relative to example
 * @returns {Promise<string>} - A promise that resolves to the full path to the folder
 */
export const getPath = async (dir) => {
  
    const fullPath = path.join(process.cwd(), `/src/examples/${dir}`);
    if(!fullPath.startsWith(path.join(process.cwd(), '/src/examples/'))){
      throw new Error({code: 500});
    }
    return fullPath;
  
}

/**
 * Get path to temporary folder
 * @param {string} dir - The name of the directory or the path relative to the temporary directory
 * @returns {Promise<string>} - A promise that resolves to the full path to the folder
 */
export const getTempPath = async (dir) => {
    const isProduction = process.env.NODE_ENV === 'production'
    const fullPath = isProduction ? path.join(`/tmp/${dir}`) : path.join(process.cwd(), `/src/examples/${dir}`);
    return fullPath;
  
}

/**
 * Get all directories and files (tabs) of a folder
 * @param {string} path - The relative path in the "examples" folder
 * @param {ItemNode} [parent] - Object representing the parent of the current file or directory
 * @returns {Promise<ItemNode>} - An object representing the structure of the folder
 */
export const getStructure = async (path, parent, type = "local") => {

    const fullPath = type === "local" ? await getPath(path) : await getTempPath(path);
  
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
export const getGitHubFile = async (repoUrl, filePath, branch = "main") => {

    let repoPath = repoUrl.replace("https://github.com/", "");
    repoPath = repoPath.split("/")[0] + "/" + repoPath.split("/")[1];

    //remove tmp folder of filePath
    const slash = filePath.indexOf("/");
    const fileRepoPath = filePath.slice(slash + 1);

    try {
        const res = await axios.get(`https://raw.githubusercontent.com/${repoPath}/${branch}/${fileRepoPath}`, {responseType: 'arraybuffer'});
        const buffer = Buffer.from(res.data, 'binary');
        return buffer;
    } catch (error) {
        //console.error(error);
        throw new Error({msg: "File not found", code: 404});
    }

}




/**
 * Get the structure of a github repo including the file content
 * @param {string} repoUrl - The github repo url
 * @returns {Promise<ItemNode>} - The structure of the repo
 */
export const getGitHubRepo = async (repoUrl) => {

    const id = uuidv4();

    let tmpPath = null;

    try {

        tmpPath = await getTempPath(id);

        await git.clone({fs: fsSync, http, dir: tmpPath, url: repoUrl});

        const head = await fs.readFile(await getTempPath(id + '/.git/HEAD'), {encoding: 'utf8'});
        const branch = head.replace("ref: refs/heads/", "").split("%")[0];

        await fs.rm(await getTempPath(id + '/.git'), {recursive: true});

        const content = await getStructure(id, undefined, "github");

        await fs.rm(tmpPath, {recursive: true});

        return ({structure: JSON.parse(JSON.stringify(content)), branch});


    } catch (error) {
        console.error(error)
        await fs.rm(tmpPath, {recursive: true});
        throw new Error({msg: "Error while cloning the github repo", code: 400});
    }

}

export const getBranchCookie = (req) => {
  return req.headers.cookie.split('; ').filter(cookie => cookie.includes("branch"))[0].split("=")[1].split("%")[0];
}
