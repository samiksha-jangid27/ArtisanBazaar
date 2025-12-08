// prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

// ---- CLOUDINARY IMAGE ARRAYS ----

// Decor
const DECOR_IMAGES = [
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157670/0024449_wooden-swan-showpieces-for-home-decor-handmade-small-wooden-crafts-garden-decor-housewarming-gift-in_550_tuv0kx.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157669/ca6b0f2c-bab3-4faf-8659-97a0ebb1307f.af8fbccc1c852ddea0c491844c784e42_l673qi.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157668/CoTa-Global-Brown-Wooden-Lighthouse-Decor-Handmade-Crafted-Wooden-Lighthouse-Decoration-Fishing-Net-Decorative-Beach-Style-Tabletop-Centerpiece-Nauti_63ffb2a2-2f0e-4d66-9ad9-62c415f9b1fc.64f0b946e6919cff3186313589733eff_w8uevt.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157667/home-decor-handicraft-art-rajasthani-6-piece-musicians-set__64525.1643591354_aiguhe.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157667/71GsDkommdL_wlxvd7.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157667/71gubbEoALL._AC_UF894_1000_QL80__raagbo.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157667/205ad730d54e8fb8abfc28e1cb9ac9ce_kgslth.jpg",
];

// Jewellery
const JEWELLERY_IMAGES = [
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157786/Bling-On_C2_AE-Real-Rose-Resin-Jhumka-Earrings--Round-Diamond-Shapes-India-No1-Handmade-Jewellery-_E2_9C_A8-2_jhxmrr.webp",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157784/1000044246_ead6731f-c504-46d8-9d08-8f6b0510c29b-3X_akoifl.png",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157783/Imagek6v5-1626456389437_tpbuxp.webp",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157782/lighthouse-jewellery_ui4uqk.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157782/LoveJewellerySet2_sp0b6a.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157781/dejvz_512_ftk9tw.webp",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157781/4fef0263c969bfbc9c5e8f7b4a26528d_qycw0e.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157780/1803831952883bb0da2a380e8be12a0c_itmjyl.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157780/ecwyw_512_ao1wco.webp",
];

// Paintings
const PAINTING_IMAGES = [
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765158003/3-23-7-7-15-20-52m_gqisp4.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765158003/9982a968-df5b-45a4-8dce-32f6f3bb9e9d_1000x_mjsadg.png",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765158003/mwl_sag_27_evahyv.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765158000/91XNm-uUV-L._AC_UF894_1000_QL80__xnnrd8.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765158000/handmade-beautiful-7-white-horse-canvas-painting-indian-home-decor-crafts-n-chisel-1_800x_toghhj.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157999/Radha-Krishna-Handmade-Acrylic-Painting-Writings-On-The-Wall-Oil-Painting_41019588870423_hpnxsr.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157999/2022072062107123_bc8u3c.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157997/handmade_2Fdownscaled_2Fh_jytxtd7l7lq_2000x2000__87416.1711348774_veucu7.jpg",
];

// Textiles
const TEXTILE_IMAGES = [
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157899/artisanal-handprinted-silk-organza-mauve-2566632_gqabrf.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157899/9hibiscus_red_coral_1024x1024_jntrhv.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157899/SVON37NQZNI5DZTOF64GR63C803I08484_di24an.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157950/crf323b-517991_l_lschyi.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157949/e5ea92e0717a7393966f5b634508936a_b7mkvy.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157948/Handmade_Red_Zari_Cotton_Party_Dress_for_Babies_Girls_Premium_Elegance_xpz9dl.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157952/il_570xN.3235310892_bmns_k4pg0k.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157952/crf301a-113946_l_sagodb.jpg",
  "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157950/il_570xN.4077881806_d706_ddqa4a.jpg",
];

// helper: random int
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// helper: pick 1–3 random images
function pickImages(arr, maxCount = 3) {
  const count = Math.min(maxCount, randInt(1, maxCount));
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

async function main() {
  console.log("🌱 Seeding ArtisanBazaar data...");

  // 1) Clear existing data (ORDER MATTERS!)
  await prisma.cartItem.deleteMany();
await prisma.cart.deleteMany();
await prisma.wishlistItem.deleteMany();
await prisma.wishlist.deleteMany();
await prisma.orderItem.deleteMany();
await prisma.order.deleteMany();
await prisma.review.deleteMany();
await prisma.productImage.deleteMany();
await prisma.product.deleteMany();
await prisma.category.deleteMany();
await prisma.storeProfile.deleteMany();
await prisma.user.deleteMany();


  console.log("✅ Cleared existing data");

  // 2) Create one SELLER user (from your details)
  const hashedPassword = await bcrypt.hash("12345678", 10);

  const seller = await prisma.user.create({
    data: {
      name: "zuber qureshi",
      username: "zuber0207",
      email: "zuberqureshi0207@gmail.com",
      password: hashedPassword,
      role: "USER",
      isVerified: true,
    },
  });

  console.log("👤 Seller created:", seller.email);

  // 3) Create categories
  const decor = await prisma.category.create({
    data: {
      name: "Decor",
      image: DECOR_IMAGES[0],
    },
  });

  const jewellery = await prisma.category.create({
    data: {
      name: "Jewellery",
      image: JEWELLERY_IMAGES[0],
    },
  });

  const paintings = await prisma.category.create({
    data: {
      name: "Paintings",
      image: PAINTING_IMAGES[0],
    },
  });

  const textiles = await prisma.category.create({
    data: {
      name: "Textiles",
      image: TEXTILE_IMAGES[0],
    },
  });

  console.log("📁 Categories created");

  // 4) generic seeder for one category
  async function seedCategoryProducts({ label, category, imagesArray }) {
    const productsToCreate = 10; // per category

    for (let i = 1; i <= productsToCreate; i++) {
      const title = `${label} Piece #${i}`;
      const description =
        label === "Decor"
          ? "Handcrafted decor item made by local artisans. Perfect for living rooms and gifting."
          : label === "Jewellery"
          ? "Handmade jewellery crafted with care, ideal for festive and everyday wear."
          : label === "Paintings"
          ? "Original artwork by independent artists, perfect to add character to your walls."
          : "Handwoven textile crafted with traditional techniques and modern aesthetics.";

      const price = randInt(499, 3499);
      const stock = randInt(1, 20);
      const featured = i <= 3; // first 3 per category = featured

      const selectedImages = pickImages(imagesArray, 3);

      await prisma.product.create({
        data: {
          title,
          description,
          price,
          stock,
          categoryId: category.id,
          sellerId: seller.id,
          featured,
          images: {
            create: selectedImages.map((url) => ({ url })),
          },
        },
      });
    }

    console.log(`🧵 Seeded ${productsToCreate} products for ${label}`);
  }

  // 5) Seed each category
  await seedCategoryProducts({
    label: "Decor",
    category: decor,
    imagesArray: DECOR_IMAGES,
  });

  await seedCategoryProducts({
    label: "Jewellery",
    category: jewellery,
    imagesArray: JEWELLERY_IMAGES,
  });

  await seedCategoryProducts({
    label: "Paintings",
    category: paintings,
    imagesArray: PAINTING_IMAGES,
  });

  await seedCategoryProducts({
    label: "Textiles",
    category: textiles,
    imagesArray: TEXTILE_IMAGES,
  });

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
