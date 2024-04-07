const { Service } = require("../models/serviceSchema");



const reviewController = async (req, res) => {
  try {
      console.log(req.body);
      let id = req.body.id;
      let reviewData = req.body.data;

      const service = await Service.findOne({ _id: id });

      if (!service) {
          console.error('Service not found');
          return res.status(404).send({
              success: false,
              message: "Service not found"
          });
      }

      if (!Array.isArray(service.reviews)) {
          service.reviews = [];
      }

      service.reviews.push(reviewData);
      await service.save();

      // Return all reviews after adding the new review
      const allReviews = service.reviews;

      res.status(200).send({
          success: true,
          message: "Service review added",
          reviews: allReviews // Include all reviews in the response
      });

  } catch (error) {
      console.error("Error in reviewController:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};

const getAllReviewsController = async (req, res) => {
  try {
      const id = req.body._id;
      const service = await Service.findOne({ _id: id });

      if (!service) {
          console.error('Service not found');
          // return res.status(404).json({ error: 'Service not found' });
      }

      const reviews = service.reviews || [];

      res.json({ reviews });
  } catch (error) {
      console.error("Error in getAllReviewsController:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};



module.exports = reviewController;
