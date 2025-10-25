const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  {
    name: "Floral Summer Dress",
    description: "Beautiful floral print dress perfect for summer occasions. Lightweight and comfortable fabric.",
    price: 1299,
    category: "Clothing",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Pink", "White"],
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
    stock: 50,
    rating: 4.5,
    numReviews: 24,
    featured: true
  },
  {
    name: "Elegant Leather Handbag",
    description: "Stylish premium leather handbag for everyday use. Multiple compartments.",
    price: 2499,
    category: "Bags",
    sizes: ["Free Size"],
    colors: ["Black", "Brown", "Tan"],
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
    stock: 30,
    rating: 4.7,
    numReviews: 18,
    featured: true
  },
  {
    name: "High Heel Sandals",
    description: "Comfortable and stylish high heel sandals. Perfect for parties and events.",
    price: 1899,
    category: "Footwear",
    sizes: ["5", "6", "7", "8", "9"],
    colors: ["Black", "Red", "Nude"],
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500",
    stock: 40,
    rating: 4.3,
    numReviews: 31,
    featured: true
  },
  {
    name: "Gold Plated Necklace",
    description: "Elegant gold plated necklace with premium finish. Hypoallergenic material.",
    price: 999,
    category: "Jewelry",
    sizes: ["Free Size"],
    colors: ["Gold"],
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500",
    stock: 25,
    rating: 4.8,
    numReviews: 15,
    featured: true
  },
  {
    name: "Designer Sunglasses",
    description: "Trendy UV protection sunglasses. Polarized lenses for eye protection.",
    price: 799,
    category: "Accessories",
    sizes: ["Free Size"],
    colors: ["Black", "Brown", "Pink"],
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
    stock: 60,
    rating: 4.4,
    numReviews: 22,
    featured: true
  },
  {
    name: "Matte Lipstick Set",
    description: "Long-lasting matte lipstick in vibrant shades. Moisturizing formula.",
    price: 599,
    category: "Beauty",
    sizes: ["Free Size"],
    colors: ["Red", "Pink", "Nude", "Coral"],
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500",
    stock: 100,
    rating: 4.6,
    numReviews: 45,
    featured: false
  },
  {
    name: "Casual Cotton T-Shirt",
    description: "Comfortable 100% cotton t-shirt for casual wear. Breathable fabric.",
    price: 499,
    category: "Clothing",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Grey", "Pink"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    stock: 80,
    rating: 4.2,
    numReviews: 38,
    featured: false
  },
  {
    name: "Designer Leather Wallet",
    description: "Compact leather wallet with multiple card slots. RFID protection.",
    price: 899,
    category: "Accessories",
    sizes: ["Free Size"],
    colors: ["Black", "Brown", "Red"],
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    stock: 45,
    rating: 4.5,
    numReviews: 27,
    featured: false
  },
  {
    name: "Silk Saree",
    description: "Traditional silk saree with beautiful embroidery work. Premium quality.",
    price: 3999,
    category: "Clothing",
    sizes: ["Free Size"],
    colors: ["Red", "Blue", "Green", "Pink"],
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500",
    stock: 20,
    rating: 4.9,
    numReviews: 52,
    featured: true
  },
  {
    name: "Sneakers Sports Shoes",
    description: "Lightweight sports sneakers for running and gym. Excellent grip.",
    price: 1599,
    category: "Footwear",
    sizes: ["5", "6", "7", "8", "9", "10"],
    colors: ["White", "Black", "Pink"],
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
    stock: 55,
    rating: 4.4,
    numReviews: 41,
    featured: false
  },
  {
    name: "Pearl Earrings",
    description: "Classic pearl drop earrings. Perfect for formal occasions.",
    price: 1299,
    category: "Jewelry",
    sizes: ["Free Size"],
    colors: ["White", "Pink"],
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500",
    stock: 35,
    rating: 4.6,
    numReviews: 29,
    featured: false
  },
  {
    name: "Denim Jacket",
    description: "Trendy denim jacket for casual styling. Multiple pockets.",
    price: 1799,
    category: "Clothing",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black"],
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    stock: 40,
    rating: 4.3,
    numReviews: 33,
    featured: false
  },
  {
    name: "Face Serum Vitamin C",
    description: "Brightening vitamin C face serum. Anti-aging formula.",
    price: 799,
    category: "Beauty",
    sizes: ["30ml", "50ml"],
    colors: ["Clear"],
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500",
    stock: 70,
    rating: 4.7,
    numReviews: 58,
    featured: true
  },
  {
    name: "Leather Belt",
    description: "Genuine leather belt with metal buckle. Adjustable size.",
    price: 599,
    category: "Accessories",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Brown", "Tan"],
    image: "https://images.unsplash.com/photo-1624222247344-5537b6d27e8d?w=500",
    stock: 60,
    rating: 4.1,
    numReviews: 19,
    featured: false
  },
  {
    name: "Yoga Pants",
    description: "Stretchable yoga pants with high waist. Moisture-wicking fabric.",
    price: 899,
    category: "Clothing",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Grey", "Navy"],
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500",
    stock: 65,
    rating: 4.5,
    numReviews: 47,
    featured: false
  },
  {
    name: "Crossbody Sling Bag",
    description: "Compact crossbody bag perfect for outings. Adjustable strap.",
    price: 1199,
    category: "Bags",
    sizes: ["Free Size"],
    colors: ["Black", "Red", "Beige"],
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
    stock: 48,
    rating: 4.4,
    numReviews: 36,
    featured: false
  },
  {
    name: "Ankle Boots",
    description: "Stylish ankle boots with block heel. Easy zip closure.",
    price: 2199,
    category: "Footwear",
    sizes: ["5", "6", "7", "8", "9"],
    colors: ["Black", "Brown"],
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500",
    stock: 30,
    rating: 4.6,
    numReviews: 28,
    featured: false
  },
  {
    name: "Silver Bracelet",
    description: "Elegant silver charm bracelet. Adjustable clasp.",
    price: 699,
    category: "Jewelry",
    sizes: ["Free Size"],
    colors: ["Silver"],
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500",
    stock: 40,
    rating: 4.3,
    numReviews: 22,
    featured: false
  },
  {
    name: "Perfume Eau De Parfum",
    description: "Long-lasting floral fragrance. Premium quality perfume.",
    price: 1499,
    category: "Beauty",
    sizes: ["50ml", "100ml"],
    colors: ["Pink"],
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500",
    stock: 55,
    rating: 4.8,
    numReviews: 67,
    featured: true
  },
  {
    name: "Wrist Watch Rose Gold",
    description: "Elegant rose gold wrist watch. Water-resistant.",
    price: 1999,
    category: "Accessories",
    sizes: ["Free Size"],
    colors: ["Rose Gold"],
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500",
    stock: 25,
    rating: 4.7,
    numReviews: 43,
    featured: true
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany();
    console.log('Existing products deleted');

    // Insert new products
    await Product.insertMany(products);
    console.log('Products imported successfully!');
    
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    console.log('All products deleted!');
    process.exit();
  } catch (error) {
    console.error('Error deleting data:', error);
    process.exit(1);
  }
};

// Check command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
