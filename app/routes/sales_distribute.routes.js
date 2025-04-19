const express = require("express");
const router = express.Router();
const salesDistributeService = require("../services/salesDistributeService");
const { authenticateToken, authorizeRole } = require("../middleware/auth");

router.use(authenticateToken);

router.get("/GetSalesDistributeDataPerDay", async (req, res) => {
  try {
    const data = await salesDistributeService.getSalesDistributeDataPerDay(
      req.query
    ); // pass query properly
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      Status: "Failed",
      StatusCode: 500,
      Message: error.message,
    });
  }
});

module.exports = router;