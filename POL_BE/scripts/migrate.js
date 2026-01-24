/**
 * Migration script to import data from db.json into MongoDB
 * Converts single 'image' field to 'images' array for products
 * 
 * Usage: node scripts/migrate.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const Product = require('../models/Product');
const Service = require('../models/Service');
const Ticket = require('../models/Ticket');
const Blog = require('../models/Blog');
const Settings = require('../models/Settings');

const DB_JSON_PATH = path.join(__dirname, '../../db.json');

async function migrate() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Read db.json
    const dbData = JSON.parse(fs.readFileSync(DB_JSON_PATH, 'utf8'));
    console.log('Read db.json successfully');

    // Migrate Products
    if (dbData.products && dbData.products.length > 0) {
      console.log(`\nMigrating ${dbData.products.length} products...`);
      await Product.deleteMany({});
      
      for (const product of dbData.products) {
        const productData = {
          name: product.name,
          category: product.category,
          price: product.price,
          originalPrice: product.originalPrice,
          // Convert single image to images array
          images: product.images || (product.image ? [product.image] : []),
          badge: product.badge,
          inStock: product.inStock !== false,
          specs: product.specs || [],
          description: product.description,
        };
        await Product.create(productData);
        console.log(`  ✓ Migrated product: ${product.name}`);
      }
      console.log('Products migration complete');
    }

    // Migrate Services
    if (dbData.services && dbData.services.length > 0) {
      console.log(`\nMigrating ${dbData.services.length} services...`);
      await Service.deleteMany({});
      
      for (const service of dbData.services) {
        await Service.create({
          title: service.title,
          description: service.description,
          icon: service.icon,
          features: service.features || [],
          price: service.price,
          color: service.color,
          popular: service.popular || false,
          order: service.order || 0,
          enabled: service.enabled !== false,
        });
        console.log(`  ✓ Migrated service: ${service.title}`);
      }
      console.log('Services migration complete');
    }

    // Migrate Tickets
    if (dbData.tickets && dbData.tickets.length > 0) {
      console.log(`\nMigrating ${dbData.tickets.length} tickets...`);
      await Ticket.deleteMany({});
      
      for (const ticket of dbData.tickets) {
        await Ticket.create({
          ticketId: ticket.id,
          subject: ticket.subject,
          customer: ticket.customer,
          priority: ticket.priority,
          status: ticket.status,
          date: ticket.date,
          comment: ticket.comment || '',
        });
        console.log(`  ✓ Migrated ticket: ${ticket.id}`);
      }
      console.log('Tickets migration complete');
    }

    // Migrate Blogs
    if (dbData.blogs && dbData.blogs.length > 0) {
      console.log(`\nMigrating ${dbData.blogs.length} blogs...`);
      await Blog.deleteMany({});
      
      for (const blog of dbData.blogs) {
        await Blog.create({
          slug: blog.slug,
          title: blog.title,
          excerpt: blog.excerpt,
          image: blog.image,
          category: blog.category,
          author: blog.author,
          date: blog.date,
          readTime: blog.readTime,
          featured: blog.featured || false,
          contentPath: blog.contentPath,
        });
        console.log(`  ✓ Migrated blog: ${blog.title}`);
      }
      console.log('Blogs migration complete');
    }

    // Migrate Settings
    if (dbData.settings) {
      console.log('\nMigrating settings...');
      await Settings.deleteMany({});
      await Settings.create({
        showScrollingHeadline: dbData.settings.showScrollingHeadline !== false,
        showSidebar: dbData.settings.showSidebar || false,
        enableTicketing: dbData.settings.enableTicketing || false,
        maintenanceMode: dbData.settings.maintenanceMode || false,
        headlines: dbData.settings.headlines || [],
      });
      console.log('  ✓ Migrated settings');
      console.log('Settings migration complete');
    }

    console.log('\n✅ Migration completed successfully!');
    console.log('\nSummary:');
    console.log(`  Products: ${await Product.countDocuments()}`);
    console.log(`  Services: ${await Service.countDocuments()}`);
    console.log(`  Tickets: ${await Ticket.countDocuments()}`);
    console.log(`  Blogs: ${await Blog.countDocuments()}`);
    console.log(`  Settings: ${await Settings.countDocuments()}`);

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
    process.exit(0);
  }
}

migrate();
