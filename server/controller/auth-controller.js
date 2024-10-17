// Home page:



const home = async (req, res) => {
    return res
    .status(200)
    .send("Welcome to home using controller");
}


module.exports = {home};