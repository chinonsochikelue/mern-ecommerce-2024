const express = require("express");
const { validateGiftCard } = require("../../controllers/shop/gift-card-controller");

const router = express.Router();

router.post("/validate", validateGiftCard);

module.exports = router;
