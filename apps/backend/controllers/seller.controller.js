const { prisma } = require("../config/database");

// Become a seller (simple upgrade)
async function becomeSeller(req, res) {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return res.status(404).json({ ERROR: "User not found" });

    // Everyone is a seller now by default
    res.json({
      message: "You are now a seller!",
      user: user,
    });
  } catch (err) {
    console.error("BECOME SELLER ERROR:", err);
    res.status(500).json({ ERROR: "Failed to become seller" });
  }
}

module.exports = {
  becomeSeller,
};
