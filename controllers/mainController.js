import { getAllProjects } from "../models/projectModel.js";

export const renderMain = async (req, res) => {
    try {
        const projects = await getAllProjects();
        res.render("main.ejs", { projects });
    } catch (error) {
        console.log("Can't load the main page: " + error.message);
    };
};