const getUser = (req, res) => {
    const id = req.params.id;
    res.send(`Fetch a user with ID: ${id}`);
};

const createUser = (req, res) => {
    res.send('Add a new user.');
};

const getUserById = (req, res) => {
    const id = req.params.id;
    res.send(`Fetch a user with ID: ${id}`);
};

module.exports = {
    getUser,
    createUser,
    getUserById
};