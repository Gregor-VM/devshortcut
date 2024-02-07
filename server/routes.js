import { Router } from "express";
import path from "path";
import mime from "mime";
import fs from "fs";
import stream from "stream";
import { getGitHubRepo, getFileContent, getStructure, getGitHubFile, getBranchCookie } from "./utils/utils.js";

const router = Router();

router.get("/api/examples/:dir/:tab", async (req, res) => {

    const dir = req.params.dir;
    const tab = req.params.tab;

    try {
        const structure = await getStructure(`${dir}/${tab}`);
        res.json({structure});
    } catch (error) {
        console.error(error);
        res.status(error?.code || 500).json({code: error?.code, msg: error?.msg});
    }


});

// Get example file

router.get("/api/examples", async (req, res) => {

    const path = req.query.path;

    try {
        const fileContent = await getFileContent(path);
        res.json({content: JSON.stringify(fileContent)});
    } catch (error) {
        console.error(error);
        res.status(error?.code || 500).json({code: error?.code, msg: error?.msg});
    }    

});

// Download example file

router.get("/api/download/example", async (req, res) => {

    const filePath = req.query.path;

    const filename = path.basename(filePath);
    const mimeType = mime.getType(filePath);

    const readStream = new stream.PassThrough();

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimeType);

    try {
        const fileContent = await getFileContent(filePath);
        readStream.end(fileContent);
        readStream.pipe(res)
    } catch (error) {
        console.error(error);
        res.status(error?.code || 500).json({code: error?.code, msg: error?.msg});
    }    

});

// Get github file

router.get("/api/github/file", async (req, res) => {

    const repoUrl = req.query.repoUrl;
    const filePath = req.query.filePath;
    const branch = getBranchCookie(req);

    try {
        const fileContent = await getGitHubFile(repoUrl, filePath, branch);
        res.json({content: JSON.stringify(fileContent)});
    } catch (error) {
        console.error(error);
        res.status(error?.code || 500).json({code: error?.code, msg: error?.msg});
    }

});

// Download github file

router.get("/api/download/github", async (req, res) => {

    const repoUrl = req.query.repoUrl;
    const filePath = req.query.filePath;
    const branch = getBranchCookie(req);

    const filename = path.basename(filePath);
    const mimeType = mime.getType(filePath);

    const readStream = new stream.PassThrough();

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimeType);

    try {
        const fileContent = await getGitHubFile(repoUrl, filePath, branch);
        readStream.end(fileContent);
        readStream.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(error?.code || 500).json({code: error?.code, msg: error?.msg});
    }

});



router.get("/api/github", async (req, res) => {

    const repoUrl = req.query.repoUrl;

    try {
        const {structure, branch} = await getGitHubRepo(repoUrl);
        res.cookie('branch', branch, {maxAge: 900000, httpOnly: true});
        res.json({structure});
    } catch (error) {
        console.error(error);
        res.status(error?.code || 500).json({code: error?.code, msg: error?.msg});
    }

})

export default router;
