const { Inventory } = require("../models/inventorySchema");
const cloudinary = require("../config/cloudinary");

const inventoryController = async (req, res) => {
    const { image } = req.body; // Assuming images is an array of image data

    try {
        const uploadedImages = [];

        for (const i of image) {
            const result = await cloudinary.uploader.upload(i, {
                folder: "photos"
            });
            uploadedImages.push(result.secure_url);
        }

        const itemData = {
            ...req.body,
            image: uploadedImages
        };

        const item = new Inventory(itemData);
        await item.save();

        return res.status(201).send({
            success: true,
            message: "Item added",
            item
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "An error occurred"
        });
    }
};




// const getInventory = async (req, res) => {
//     try {
//         const inventories = await Inventory.find(); // Retrieve all inventories from the database
//         return res.status(200).send({
//             success: true,
//             message: "Inventories retrieved",
//             inventories
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Error fetching inventories"
//         });
//     }
// };
const getAllInventory = async (req, res) => {
    try {
        // REQ PAGE FROM QUERY IF NOT PROVIDED THEN 1
        const page = parseInt(req.query.page) || 1;
        const itemsPerPage = 6;

        const totalItems = await Inventory.countDocuments();
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        const inventories = await Inventory.find()
            .sort({ createdAt: -1 })

            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);

        return res.status(200).send({
            success: true,
            message: "Inventories retrieved",
            inventories,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error fetching inventories"
        });
    }
};

const getInventory = async (req, res) => {
    try {
        const { name, city, tags, page } = req.query;
        // const itemsPerPage = 4;

        const query = {};

        if (name) {
            query.name = { $regex: new RegExp(name, "i") };
        }

        if (city) {
            query.city = { $regex: new RegExp(city, "i") };
        }

        if (tags) {
            query.tags = { $in: tags.split(",") };
        }

        // const skip = (page - 1) * itemsPerPage;
        const item = await Inventory.find(query)

        return res.status(200).send({
            success: true,
            message: "Inventory aagai",
            item
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error fetching inventory"
        });
    }
}

const getRandom = async (req, res) => {
    try {
        const randomItems = await Inventory.aggregate([
            { $sample: { size: 4 } }
        ]);

        return res.status(200).send({
            success: true,
            message: "random Item aagya",
            randomItems
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Random Item failed"
        });
    }
}


const getUserInventory = async (req, res) => {
    try {
        const id = req.query.id; 
        const inv = await Inventory.find({owner: id});

        if (!inv) {
            return res.status(404).json({
                success: false,
                message: "Inventory not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Inventory retrieved successfully",
            inventory: inv
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
const setRent = async (req, res) => {
    try {
        const itemId = req.body._id;

        const item = await Inventory.findById(itemId);

        if (!item) {
            return res.status(404).send({
                success: false,
                message: "Item not found"
            });
        }

        item.isRented = !item.isRented;
        await item.save();

        return res.status(200).send({
            success: true,
            message: "Item updated successfully",
            item
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Random Item failed"
        });
    }
}



module.exports = { inventoryController, getAllInventory, getInventory, getRandom, getUserInventory,setRent }


