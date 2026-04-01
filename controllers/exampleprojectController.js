export const renderExampleproject = (req, res) => {
    try {
        res.render("projects/project.ejs");
    } catch (error) {
        console.log("Can't load the project page: " + error.message);
    };
};