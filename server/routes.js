import { Router } from "express";
import { getGitHubRepo, getFileContent, getDirectories, getStructure } from "./utils/utils.js";

const router = Router();


router.get("/api/examples/:dir", async (req, res) => {

    const dir = req.params.dir;

    try {
        const directories = await getDirectories(dir);
        const defaultDir = directories[0];
        const structure = await getStructure(`${dir}/${defaultDir}`);
        res.json({tabs: directories, structure});
    } catch (error) {
        res.status(error?.code || 500).json({code: error?.code, msg: error?.msg});
    }
  

});

router.get("/api/examples/:dir/:tab", async (req, res) => {

    const dir = req.params.dir;
    const tab = req.params.tab;

    try {
        const structure = await getStructure(`${dir}/${tab}`);
        res.json({structure});
    } catch (error) {
        res.status(error?.code || 500).json({code: error?.code, msg: error?.msg});
    }


});

router.get("/api/examples/:dir/:tab/:filename", async (req, res) => {

    const dir = req.params.dir;
    const tab = req.params.tab;
    const filename = req.params.filename;

    try {
        const fileContent = await getFileContent(`${dir}/${tab}/${filename}`);
        res.json({content: fileContent});
    } catch (error) {
        res.status(error?.code || 500).json({code: error?.code, msg: error?.msg});
    }    

});

router.get("/api/github", async (req, res) => {

    const repoUrl = req.query.repoUrl;

    try {
        const structure = await getGitHubRepo(repoUrl);
        res.json({structure});
    } catch (error) {
        res.status(error?.code || 500).json({code: error?.code, msg: error?.msg});
    }

})

export default router;