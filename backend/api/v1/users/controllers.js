const sendUserBasicInfoController = (req, res) => {
    const userInfo = req.user;

    res.status(200).json({
        isSuccess: true,
        message: "User is valid!",
        data: {
            user: userInfo,
        },
    });
};

module.exports = { sendUserBasicInfoController };
