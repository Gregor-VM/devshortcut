import fs from 'node:fs/promises';
import { getPath, getStructure } from "./utils.js";

export class ItemNode {

    constructor(item, dir, parent, includeContent){

        this.item = item;
        this.structure = {};
        this.path = `${dir}/${item}`;
        this.modified = false;
        this.parent = parent || {};
        this.includeContent = includeContent || false;
        
    }


    async loadItem(){

        await this.getItemNodePath();
        await this.shouldBeMarkAsDirectory();
        this.shouldBeMarkAsModified();  
        if(this.includeContent) await this.getContent();

    }

    async getItemNodePath(){
        this.itemPath = await getPath(this.path);
    }

    async shouldBeMarkAsDirectory(){
        const stats = await fs.stat(this.itemPath);
        if(!stats) throw new Error({msg: `Error getting a file ${JSON.stringify(this)}`, code: 500});
        this.isDirectory = stats.isDirectory();
    }

    async getContent(){

        if(!this.isDirectory){
            const content = await fs.readFile(this.itemPath, {encoding: "utf-8"});
            this.content = content.toString();
        }

    }

    shouldBeMarkAsModified(){

        /* Use ! in folders and files to mark as modified */

        if(this.item.includes("!")){
            this.modified = true;
            this.item = this.item.replace("!", "");
        }

        if(this.parent.isDirectory && this.parent.modified){
            this.modified = true;
        }
    }

    async getNextStructure(){

        if(this.isDirectory){
            this.structure = await getStructure(this.path, this, this.includeContent);
        }

    }

}