import fs from 'node:fs/promises';
import { getPath, getStructure } from "./utils.js";

export class ItemNode {

    constructor(item, dir, parent, type){

        this.item = item;
        this.structure = null;
        this.path = `${dir}/${item}`;
        this.modified = false;
        this.parent = parent || null;
        this.type = type || false;
        this.fileContent = "";
        
    }


    async loadItem(){

        await this.getItemNodePath();
        await this.shouldBeMarkAsDirectory();
        this.shouldBeMarkAsModified();
        this.setFileContent();

    }

    async getItemNodePath(){
        this.itemPath = await getPath(this.path);
    }

    async shouldBeMarkAsDirectory(){
        const stats = await fs.stat(this.itemPath);
        if(!stats) throw new Error({msg: `Error getting a file ${JSON.stringify(this)}`, code: 500});
        this.isDirectory = stats.isDirectory();
    }

    setFileContent(){

        if(this.type === "local") {
            this.fileContent = `/examples?path=${this.path}`;
        }

        if(this.type === "github") {
            this.fileContent = `/github/file?filePath=${this.path}&repoUrl=`;
        }

    }

    shouldBeMarkAsModified(){

        /* Use ! in folders and files to mark as modified */

        if(this.item.includes("!")){
            this.modified = true;
            this.item = this.item.replace("!", "");
        }

        if(this.parent?.isDirectory && this.parent?.modified){
            this.modified = true;
        }
    }

    async getNextStructure(){

        if(this.isDirectory){
            this.structure = await getStructure(this.path, this, this.type);
            this.structure.sort((item) => item.isDirectory ? -1 : 2);
        }

    }

}