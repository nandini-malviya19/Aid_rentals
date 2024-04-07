const HitCount=require("../models/countSchema")


async function initializeHitCount() {
    let hitCount = await HitCount.findOne();
    if (!hitCount) {
      hitCount = new HitCount({ count: 0 });
      await hitCount.save();
    }
  }
  const countController = async (req, res) => {
    try {
      await initializeHitCount();
      await HitCount.updateOne({}, { $inc: { count: 1 } });
      const updatedHitCount = await HitCount.findOne();
      res.json({ count: updatedHitCount.count });
    } catch (error) {
      console.error("Error in countController:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

module.exports=countController;