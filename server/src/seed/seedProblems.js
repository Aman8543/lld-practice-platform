import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Problem from "../models/Problem.js";

const problems = [
  {
    title: "Parking Lot",
    slug: "parking-lot",
    difficulty: "Medium",

    description:
      "Design a parking lot system that supports multiple floors, different vehicle types, parking spots, tickets and fee calculation.",

    requirements: [
      "Support multiple parking floors",
      "Support different vehicle types",
      "Support different parking spot types",
      "Generate parking tickets",
      "Calculate parking fees",
      "Vehicle should be assigned to a compatible spot",
    ],

    constraints: [
      "One vehicle can occupy only one spot",
      "Parking spots can become available after vehicle exit",
    ],
  },

  {
    title: "Vending Machine",
    slug: "vending-machine",
    difficulty: "Easy",

    description:
      "Design a vending machine that allows users to select products, insert money and receive products and change.",

    requirements: [
      "Display available products",
      "Select a product",
      "Accept money",
      "Calculate change",
      "Handle unavailable products",
    ],

    constraints: [
      "Product inventory should be maintained",
      "Insufficient payment should be handled",
    ],
  },

  {
    title: "Elevator System",
    slug: "elevator-system",
    difficulty: "Hard",

    description:
      "Design an elevator system that manages multiple elevators and handles floor requests efficiently.",

    requirements: [
      "Support multiple elevators",
      "Accept floor requests",
      "Move elevators between floors",
      "Open and close doors",
      "Assign requests to elevators",
    ],

    constraints: [
      "An elevator should not exceed its capacity",
      "Elevator state should be tracked",
    ],
  },
];

const seed = async () => {
  try {
    await connectDB();

    await Problem.deleteMany();

    await Problem.insertMany(problems);

    console.log("Problems seeded successfully");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seed();