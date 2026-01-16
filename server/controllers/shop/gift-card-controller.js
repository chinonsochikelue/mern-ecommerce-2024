const GiftCard = require("../../models/GiftCard");

const validateGiftCard = async (req, res) => {
    try {
        const { code, amount } = req.body;

        const giftCard = await GiftCard.findOne({ code, isActive: true });

        if (!giftCard) {
            return res.status(404).json({
                success: false,
                message: "Gift card not found or is inactive",
            });
        }

        if (new Date() > giftCard.expiryDate) {
            return res.status(400).json({
                success: false,
                message: "Gift card has expired",
            });
        }

        if (giftCard.amount < amount) {
            return res.status(400).json({
                success: false,
                message: "Insufficient balance in gift card",
            });
        }

        res.status(200).json({
            success: true,
            message: "Gift card validated successfully",
            data: giftCard,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};

module.exports = { validateGiftCard };
