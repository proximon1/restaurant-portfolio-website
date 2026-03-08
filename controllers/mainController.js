export const renderMain = (req, res) => {
    try {
        res.render("main.ejs");
    } catch (error) {
        console.log("Can't load the main page: " + error.message);
    };
};