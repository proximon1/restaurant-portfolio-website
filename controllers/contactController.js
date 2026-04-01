export const renderContact = (req, res) => {
    try {
        res.render("contact.ejs");
    } catch (error) {
        console.log("Can't load the contact page: " + error.message);
    };
};