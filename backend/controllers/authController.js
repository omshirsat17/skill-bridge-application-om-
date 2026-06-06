const registerUser = (req, res) => {
    res.json({
        success: true,
        message: "User Registered Successfully in skillbridge"
    });
};

const loginUser = (req, res) => {
    res.json({
        success: true,
        message: "User Logged In Successfully in skillbridge"
    });
};

module.exports = {
    registerUser,
    loginUser
};