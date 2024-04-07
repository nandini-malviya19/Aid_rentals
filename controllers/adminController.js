const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Admin } = require("../models/adminSchema");
const { Inventory } = require("../models/inventorySchema");
const { Service } = require("../models/serviceSchema");
const User = require("../models/userSchema");

const adminTest = (req, res) => {
    res.status(200).send({
        message: "admin route test",
        success: true,
    });
};


const register = async (req, res) => {
    const { email, password } = req.body;

    try {

        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin with this email already exists', success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            email,
            password: hashedPassword
        });

        await newAdmin.save();

        res.status(201).send({
            message: 'Admin registered successfully',
            success: true,
            newAdmin
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found', success: false });
        }

        const isValidPassword = await bcrypt.compare(password, admin.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password', success: false });
        }

        const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.send({ success: true, token, message: "User Logged In", admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

const getInventoryCount = async (req, res) => {
    try {
        const count = await Inventory.countDocuments();
        res.json({ count, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

const getServiceCount = async (req, res) => {
    try {
        const count = await Service.countDocuments();
        res.json({ count, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};
//getUsersCount
const getUsersCount = async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.json({ count, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};



const getAllInventory = async (req, res) => {
    try {
        const inventories = await Inventory.find(); // Retrieve all inventories from the database
        return res.status(200).send({
            success: true,
            message: "Inventories retrieved",
            inventories
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error fetching inventories"
        });
    }
}

const deleteInventory = async (req, res) => {
    const { _id } = req.body;
  
    try {
      const deletedInventory = await Inventory.findByIdAndDelete(_id);
  
      if (!deletedInventory) {
        return res.status(404).json({ message: 'Inventory not found', success: false });
      }
  
      res.send({ message: 'Inventory deleted successfully', success: true, deletedInventory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', success: false });
    }
};

const deleteService = async (req, res) => {
    const { _id } = req.body;
  console.log(req.body);
    try {
      const deletedService = await Service.findByIdAndDelete(_id);
  
      if (!deletedService) {
        return res.status(404).json({ message: 'Inventory not found', success: false });
      }
  
      res.send({ message: 'Inventory deleted successfully', success: true, deletedService });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', success: false });
    }
  };


  const getAllService = async (req, res) => {
    try {
        const services = await Service.find(); // Retrieve all inventories from the database
        return res.status(200).send({
            success: true,
            message: "Inventories retrieved",
            services
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error fetching inventories"
        });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all inventories from the database
        return res.status(200).send({
            success: true,
            message: "Inventories retrieved",
            users
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error fetching inventories"
        });
    }
}



module.exports = { adminTest, login, register, getInventoryCount,getAllInventory, getServiceCount, getUsersCount,deleteInventory,deleteService,getAllService,getAllUsers }