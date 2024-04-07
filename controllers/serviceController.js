const cloudinary = require("../config/cloudinary");
const { Service } = require("../models/serviceSchema");
const User = require("../models/userSchema");

const validator = require('aadhaar-validator')

const addService = async (req, res) => {
    try {
        const existing = await Service.findOne({ email: req.body.email });
        //array
        let pic = req.body.pic;

        if (pic[0]) {
            const result = await cloudinary.uploader.upload(pic[0], {
                folder: "photos"
            });

            pic = result.secure_url;
        }
        if (existing) {
            return res.status(200).send({
                success: false,
                message: "Service Already Exists"
            });
        }
        // jese hi ye create ho iske bad one more user role
        // ownerid -> user ka role change krna h
        const newService = await Service.create({
            name: req.body.name,
            bio: req.body.bio,
            price: req.body.price,
            age: req.body.age,
            gender: req.body.gender,
            pic: pic,
            phoneNumber: req.body.phoneNumber,
            yoe: req.body.yoe,
            specialty: req.body.specialty,
            email: req.body.email,
            city: req.body.city,
            preferredAreas: req.body.preferredAreas,
            reviews: req.body.reviews,
            workingHours: req.body.workingHours,
            owner: req.body.owner
        });

        const newUser = await User.findOneAndUpdate(
            { _id: req.body.owner },
            { $set: { role: 'service' } },
            { new: true }
        );


        console.log(newUser);


        res.status(201).send({
            success: true,
            message: "Service added successfully",
            data: newService
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
};

//PATCH REQUEST 
const updateService = async (req, res) => {
    try {
        const serviceId = req.body._id;
        const updateFields = req.body.fields;
        const reviewToAdd = req.body.review;

        const updatedService = await Service.findByIdAndUpdate(
            serviceId,
            { $push: { reviews: reviewToAdd }, ...updateFields },
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).send({
                success: false,
                message: "Service not found"
            });
        }

        res.status(200).send({
            success: true,
            message: "Service updated successfully",
            data: updatedService
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Updating service failed"
        });
    }
}

const getAllService = async (req, res) => {
    try {
        // REQ PAGE FROM QUERY IF NOT PROVIDED THEN 1
        const page = parseInt(req.query.page) || 1;
        const itemsPerPage = 3;

        const totalItems = await Service.countDocuments();
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        const services = await Service.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * itemsPerPage)
            .limit(itemsPerPage);

        return res.status(200).send({
            success: true,
            message: "Service retrieved",
            services,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error fetching Services"
        });
    }
}


const getService = async (req, res) => {
    try {
        const { name, specialty, city } = req.query;
        // http://localhost:8000/api/v1/service/get-service?name=John&specialty=Dentist&city=New%20York
        const query = {};

        if (name) {
            query.name = { $regex: new RegExp(name, "i") };
        }

        if (specialty) {
            query.specialty = { $regex: new RegExp(specialty, "i") };
        }

        if (city) {
            query.city = { $regex: new RegExp(city, "i") };
        }

        const services = await Service.find(query);

        res.status(200).send({
            success: true,
            message: "Services retrieved successfully",
            data: services
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const verifyService = async (req, res) => {
    try {
        const { id, aadhar, phone } = req.body;
        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).send({
                success: false,
                message: "Service not found",
            });
        }

        const ans = validator.isValidNumber(aadhar);

        if (ans) {
            service.verified = true;
            await service.save();
        }
        

        res.status(200).send({
            success: true,
            message: "adhar success",
            service
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}


const getMyService = async (req, res) => {
    try {
        const { owner } = req.query;

    //    console.log(req);
        const query = {};
        if (owner) {
            query.owner = owner; 
        }

        
        try {
            // Find services using the constructed query
            const services = await Service.findOne(query);

            // Send a successful response with the retrieved services
            res.status(200).send({
                success: true,
                message: "Services retrieved successfully",
                data: services
            });
        } catch (error) {
            // Handle any errors related to finding services
            console.error(error);
            res.status(500).send({
                success: false,
                message: "Internal Server Error"
            });
        }
    } catch (error) {

        console.error(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
};



module.exports = { addService, getAllService, getService, updateService, verifyService, getMyService };