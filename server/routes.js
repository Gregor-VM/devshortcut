import { Router } from "express";
import { getGitHubRepo, getFileContent, getStructure, getGitHubFile } from "./utils/utils.js";

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

router.get("/api/examples", async (req, res) => {

    const path = req.query.path;

    try {
        const fileContent = await getFileContent(path);
        res.json({content: fileContent});
    } catch (error) {
        console.error(error);
        res.status(error?.code || 500).json({code: error?.code, msg: error?.msg});
    }    

});

router.get("/api/github/file", async (req, res) => {

    const repoUrl = req.query.repoUrl;
    const filePath = req.query.filePath;

    try {
        const fileContent = await getGitHubFile(repoUrl, filePath);
        res.json({content: fileContent});
    } catch (error) {
        console.error(error);
        res.status(error?.code || 500).json({code: error?.code, msg: error?.msg});
    }

});

router.get("/api/github", async (req, res) => {

    const repoUrl = req.query.repoUrl;

    try {
        const structure = await getGitHubRepo(repoUrl);
        res.json({structure});
    } catch (error) {
        console.error(error);
        res.status(error?.code || 500).json({code: error?.code, msg: error?.msg});
    }

})

export default router;