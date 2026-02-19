import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const name = "RG Chourasia Guns";
const tagline = "Premium Airguns & Accessories";
const description = "Your trusted destination for premium airguns, pellets, and accessories. We offer the finest selection of air rifles and pistols from top brands.";
const address = {"street":"123 Main Street","area":"Your Area","city":"Your City","state":"Your State","pin":"000000","country":"India"};
const phone = "+91-XXXXXXXXXX";
const whatsapp = "+91-XXXXXXXXXX";
const email = "info@yourairgunshop.com";
const hours = {"weekdays":"Mon - Sat: 10:00 AM - 8:00 PM","weekends":"Sunday: Closed","sunday":"Closed"};
const googleMapsEmbed = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.265588856342!2d73.91455641541671!3d18.562061287384868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3a7%3A0x6f7b7b1b1b1b1b1b!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890";
const social = {"instagram":"https://instagram.com/yourairgunshop","facebook":"https://facebook.com/yourairgunshop","youtube":"https://youtube.com/@yourairgunshop","whatsapp":"https://wa.me/91XXXXXXXXXX"};
const seo = {"title":"YOUR AIRGUN SHOP NAME - Premium Airguns & Accessories","description":"Your trusted destination for premium airguns, pellets, and accessories. We offer the finest selection of air rifles and pistols from top brands."};
const defaultShopInfo = {
  name,
  tagline,
  description,
  address,
  phone,
  whatsapp,
  email,
  hours,
  googleMapsEmbed,
  social,
  seo,
};

const defaultProducts = [
	{
		slug: "precihole-nx100",
		name: "Precihole NX-100",
		brand: "Precihole Sports",
		category: "Air Rifle",
		caliber: ".177 (4.5mm)",
		price: 12500,
		originalPrice: 14000,
		currency: "INR",
		velocity: "600 fps",
		weight: "3.2 kg",
		barrelLength: "18 inches",
		powerSource: "Spring Piston",
		description: "The Precihole NX-100 is a reliable and accurate spring-piston air rifle perfect for target shooting and pest control. Built with a durable synthetic stock and precision-rifled barrel, it delivers consistent performance shot after shot.",
		features: [
			"Synthetic all-weather stock",
			"Precision-rifled steel barrel",
			"Adjustable rear sight",
			"11mm dovetail rail for scope mounting",
			"Automatic safety mechanism",
			"Two-stage adjustable trigger"
		],
		images: [
			"/images/products/nx100.png"
		],
		inStock: true,
		featured: true
	},
	{
		slug: "precihole-sx100",
		name: "Precihole SX-100 Sparrow",
		brand: "Precihole Sports",
		category: "Air Rifle",
		caliber: ".177 (4.5mm)",
		price: 8500,
		originalPrice: 9500,
		currency: "INR",
		velocity: "500 fps",
		weight: "2.8 kg",
		barrelLength: "15.7 inches",
		powerSource: "Spring Piston",
		description: "The Precihole SX-100 Sparrow is an ideal entry-level air rifle for beginners and recreational shooters. Lightweight and easy to handle, it offers excellent value for money without compromising on accuracy.",
		features: [
			"Lightweight synthetic stock",
			"Break barrel design",
			"Fiber optic front sight",
			"Adjustable rear sight",
			"11mm dovetail scope rail",
			"Ergonomic grip"
		],
		images: [
			"/images/products/sx100.png"
		],
		inStock: true,
		featured: true
	},
	{
		slug: "precihole-px100",
		name: "Precihole PX-100 Pistol",
		brand: "Precihole Sports",
		category: "Air Pistol",
		caliber: ".177 (4.5mm)",
		price: 6500,
		originalPrice: 7500,
		currency: "INR",
		velocity: "400 fps",
		weight: "0.9 kg",
		barrelLength: "7.5 inches",
		powerSource: "Spring Piston",
		description: "The Precihole PX-100 is a robust spring-piston air pistol designed for target practice and plinking. Its comfortable grip and reliable mechanism make it a favorite among pistol enthusiasts.",
		features: [
			"Ergonomic textured grip",
			"Fixed front sight",
			"Adjustable rear sight",
			"Manual safety",
			"Single-stroke cocking",
			"Durable metal construction"
		],
		images: [
			"/images/products/px100.png"
		],
		inStock: true,
		featured: true
	},
	{
		slug: "precihole-nx200",
		name: "Precihole NX-200 Athena",
		brand: "Precihole Sports",
		category: "Air Rifle",
		caliber: ".177 (4.5mm)",
		price: 18500,
		originalPrice: 21000,
		currency: "INR",
		velocity: "700 fps",
		weight: "3.5 kg",
		barrelLength: "19.5 inches",
		powerSource: "Spring Piston",
		description: "The Precihole NX-200 Athena is a premium air rifle built for serious shooters. With its wooden stock, enhanced barrel, and superior power, it excels in competitive target shooting and field use.",
		features: [
			"Premium wooden stock",
			"Match-grade rifled barrel",
			"Micro-adjustable rear sight",
			"11mm dovetail scope rail",
			"Two-stage adjustable trigger",
			"Anti-bear trap mechanism",
			"Rubber butt pad"
		],
		images: [
			"/images/products/nx200.png"
		],
		inStock: true,
		featured: true
	},
	{
		slug: "precihole-club-pellets",
		name: "Precihole Club Pellets (500ct)",
		brand: "Precihole Sports",
		category: "Pellets & Ammo",
		caliber: ".177 (4.5mm)",
		price: 350,
		originalPrice: 400,
		currency: "INR",
		velocity: "N/A",
		weight: "0.3 kg",
		barrelLength: "N/A",
		powerSource: "N/A",
		description: "Precihole Club pellets are precision-made flat-head pellets ideal for target shooting. Each tin contains 500 pellets manufactured to tight tolerances for consistent accuracy.",
		features: [
			"500 pellets per tin",
			"Flat head design",
			"Competition grade",
			"Consistent weight and dimensions",
			"Lead alloy construction",
			"Suitable for all .177 airguns"
		],
		images: [
			"/images/products/pellets.png"
		],
		inStock: true,
		featured: false
	},
	{
		slug: "4x32-rifle-scope",
		name: "4x32 Rifle Scope",
		brand: "Generic",
		category: "Accessories",
		caliber: "Universal",
		price: 2500,
		originalPrice: 3200,
		currency: "INR",
		velocity: "N/A",
		weight: "0.35 kg",
		barrelLength: "N/A",
		powerSource: "N/A",
		description: "A versatile 4x32 magnification rifle scope with clear optics and crosshair reticle. Compatible with 11mm dovetail rails found on most airguns. Comes with lens caps and mounting rings.",
		features: [
			"4x magnification",
			"32mm objective lens",
			"Crosshair reticle",
			"11mm dovetail mount",
			"Includes mounting rings",
			"Nitrogen-filled fog proof"
		],
		images: [
			"/images/products/scope.png"
		],
		inStock: true,
		featured: false
	}
];

const defaultTestimonials = [
	{
		id: 1,
		name: "Rajesh Kumar",
		location: "Mumbai, Maharashtra",
		rating: 5,
		text: "Excellent shop with amazing collection of airguns. The staff is very knowledgeable and helped me choose the perfect rifle for target shooting. Highly recommended!",
		product: "Precihole NX-200 Athena"
	},
	{
		id: 2,
		name: "Amit Sharma",
		location: "Delhi, NCR",
		rating: 5,
		text: "Best prices and genuine products. I bought my Precihole NX-100 from here and it's been performing flawlessly. Great after-sales service too!",
		product: "Precihole NX-100"
	},
	{
		id: 3,
		name: "Priya Patel",
		location: "Ahmedabad, Gujarat",
		rating: 4,
		text: "Wonderful experience shopping here. They have a great range of pellets and accessories. The delivery was prompt and everything was well-packed.",
		product: "Precihole Club Pellets"
	},
	{
		id: 4,
		name: "Vikram Singh",
		location: "Jaipur, Rajasthan",
		rating: 5,
		text: "I've been buying airguns from this shop for years. Their expertise in the field is unmatched. Always get the best advice and quality products.",
		product: "Precihole SX-100 Sparrow"
	}
];

const localDataDir = join(dirname(fileURLToPath(import.meta.url)), "../data");
const fileMap = {
  "shop-info": "shop-info.json",
  "products": "products.json",
  "testimonials": "testimonials.json"
};
const defaults = {
  "shop-info": defaultShopInfo,
  "products": defaultProducts,
  "testimonials": defaultTestimonials
};
async function getData(type) {
  try {
    const content = await readFile(join(localDataDir, fileMap[type]), "utf-8");
    return JSON.parse(content);
  } catch {
    return structuredClone(defaults[type]);
  }
}
async function saveData(type, data) {
  const filename = fileMap[type];
  if (!filename) throw new Error(`Unknown data type: ${type}`);
  {
    await writeFile(
      join(localDataDir, filename),
      JSON.stringify(data, null, 2),
      "utf-8"
    );
  }
}

export { getData as g, saveData as s };
