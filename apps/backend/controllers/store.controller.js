const { prisma } = require("../config/database");
const cloudinary = require("../utils/cloudinary");

// Cloud upload helper
async function uploadToCloud(buffer, folder) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (err) reject(err);
        else resolve(result.secure_url);
      }
    ).end(buffer);
  });
}

// ---------------- GET MY STORE PROFILE ----------------
async function getMyStore(req, res) {
  try {
    const userId = req.user.id;

    const store = await prisma.storeProfile.findUnique({
      where: { userId },
      include: {
        user: { select: { id: true, name: true, username: true } },
      },
    });

    res.json(store || {});
  } catch (err) {
    console.error("GET MY STORE ERROR:", err);
    res.status(500).json({ ERROR: "Failed to load store profile" });
  }
}

// ---------------- UPDATE MY STORE PROFILE ----------------
async function updateStore(req, res) {
  try {
    const userId = req.user.id;
    const { bio } = req.body;

    // Only sellers allowed - now all users are sellers
    // if (req.user.role !== "SELLER") {
    //   return res.status(403).json({ ERROR: "Only sellers can update store" });
    // }

    // Fetch or create store profile
    let store = await prisma.storeProfile.findUnique({
      where: { userId },
    });

    if (!store) {
      store = await prisma.storeProfile.create({
        data: { userId },
      });
    }

    let avatarUrl = store.avatar;
    let bannerUrl = store.banner;

    // Upload avatar if provided
    if (req.files?.avatar?.[0]) {
      avatarUrl = await uploadToCloud(
        req.files.avatar[0].buffer,
        "artisanbazaar/store/avatar"
      );
    }

    // Upload banner if provided
    if (req.files?.banner?.[0]) {
      bannerUrl = await uploadToCloud(
        req.files.banner[0].buffer,
        "artisanbazaar/store/banner"
      );
    }

    const updated = await prisma.storeProfile.update({
      where: { id: store.id },
      data: {
        bio: bio ?? store.bio,
        avatar: avatarUrl,
        banner: bannerUrl,
      },
    });

    res.json({
      message: "Store updated",
      store: updated,
    });
  } catch (err) {
    console.error("UPDATE STORE ERROR:", err);
    res.status(500).json({ ERROR: "Failed to update store profile" });
  }
}

// ---------------- PUBLIC: GET SELLER PROFILE ----------------
async function getSellerStore(req, res) {
  try {
    const { sellerId } = req.params;

    const seller = await prisma.user.findUnique({
      where: { id: sellerId },
      select: {
        id: true,
        name: true,
        username: true,
        storeProfile: true,
        products: {
          include: {
            images: true,
            reviews: true,
          },
        },
      },
    });

    if (!seller) {
      return res.status(404).json({ ERROR: "Seller not found" });
    }

    res.json(seller);
  } catch (err) {
    console.error("GET SELLER STORE ERROR:", err);
    res.status(500).json({ ERROR: "Failed to load seller profile" });
  }
}

module.exports = {
  getMyStore,
  updateStore,
  getSellerStore,
};
