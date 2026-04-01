export const renderPrivacy = (req, res) => {
    try {
        res.render("privacy.ejs");
    } catch (error) {
        console.log("Can't load the privacy policy page: " + error.message);
    };
};