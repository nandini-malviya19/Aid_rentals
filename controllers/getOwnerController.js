const User = require("../models/userSchema");

const getOwnerController = async (req, res) => {
    try {
        const id = req.body.owner;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Missing owner ID in request body"
            });
        }

        const data = await User.findById(id);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Owner not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Owner retrieved",
            data
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error in fetching owner",
            error: error.message
        });
    }
};

module.exports = { getOwnerController };
