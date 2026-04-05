
import { FaBug, FaAppleAlt, FaChartLine, FaHome } from "react-icons/fa";
import logo from "./logo.ico"
import user_group from './user_group.png'
import { Users } from "lucide-react"
import farm_img_1 from "../assets/farm1.png";
import farm_img_2 from "../assets/farm2.png";
import farm_img_3 from "../assets/farm3.png";
import avatar1 from "../assets/avatar1.png"
import avatar2 from "../assets/avatar2.png"


export const assets = {
    logo,
    user_group
}


export const features = [
  
  {
    title: "Pest Prediction & Control",
    description:
      "AI-powered detection and forecasting of apple pests to help farmers take timely action.",
    icon: FaBug,
    bg: { from: "#f87171", to: "#ef4444" },
    path: "/ai/pest-control",
  },
  {
    title: "Yield Estimation",
    description:
      "Estimate apple yield using machine learning models trained on farm and weather data.",
    icon: FaAppleAlt,
    bg: { from: "#34d399", to: "#10b981" },
    path: "/ai/yield-estimation",
  },
  {
    title: "Growth Tracking (GDD Model)",
    description:
      "Track apple growth stages using a time-series phenological model based on Growing Degree Days (GDD).",
    icon: FaChartLine,
    bg: { from: "#60a5fa", to: "#3b82f6" },
    path: "/ai/growth-tracking",
  },
];

export const tools = [
  {
    title: "Dashboard",
    description: "Overview of your apple farm insights and AI analytics.",
    icon: FaHome,
    bg: { from: "#a3a3f7", to: "#818cf8" },
    path: "/ai/dashboard",
  },
  {
    title: "Pest Prediction & Control",
    description:
      "AI-powered detection and forecasting of apple pests to help farmers take timely action.",
    icon: FaBug,
    bg: { from: "#f87171", to: "#ef4444" },
    path: "/ai/pest-control",
  },
  {
    title: "Yield Estimation",
    description:
      "Estimate apple yield using machine learning models trained on farm and weather data.",
    icon: FaAppleAlt,
    bg: { from: "#34d399", to: "#10b981" },
    path: "/ai/yield-estimation",
  },
  {
    title: "Growth Tracking (GDD Model)",
    description:
      "Track apple growth stages using a time-series phenological model based on Growing Degree Days (GDD).",
    icon: FaChartLine,
    bg: { from: "#60a5fa", to: "#3b82f6" },
    path: "/ai/growth-tracking",
  },
  {
    title: "Community",
    description: "Connect with fellow apple farmers, share insights, and discuss best practices.",
    icon: Users,
    bg: { from: "#fbbf24", to: "#f59e0b" }, // golden gradient for community vibes
    path: "/ai/community"
  }
];


export const pestAlerts = [
  { id: 1, zone: "Zone 1", severity: "High", detectedAt: "2025-09-18" },
  { id: 2, zone: "Zone 2", severity: "Medium", detectedAt: "2025-09-17" },
  { id: 3, zone: "Zone 3", severity: "Low", detectedAt: "2025-09-16" },
];


export const yieldData = [
  { month: "Jan", estimated: 2 },
  { month: "Feb", estimated: 3.5 },
  { month: "Mar", estimated: 5 },
  { month: "Apr", estimated: 6 },
  { month: "May", estimated: 8 },
];


export const growthData = [
  { stage: "Dormancy", gdd: 0, variety: "Apple" },
  { stage: "Bud Break", gdd: 150, variety: "Apple" },
  { stage: "Flowering", gdd: 400, variety: "Apple" },
  { stage: "Fruit Set", gdd: 650, variety: "Apple" },
  { stage: "Fruit Development", gdd: 1000, variety: "Apple" },
  { stage: "Maturity", gdd: 1500, variety: "Apple" },
  { stage: "Harvest", gdd: 1800, variety: "Apple" },
];

export const farmInfo = {
  totalTrees: 1200,
  farmSizeHectares: 5,
  growthStage: "Flowering",
};

export const monthlyPests = [
  {
    month: "January",
    pests: [
      { name: "Codling Moth", diseases: ["Apple Rot", "Fruit Damage"] },
      { name: "Aphids", diseases: ["Sooty Mold", "Leaf Curl"] },
    ],
  },
  {
    month: "February",
    pests: [
      { name: "Aphids", diseases: ["Sooty Mold", "Leaf Curl"] },
    ],
  },
  {
    month: "March",
    pests: [
      { name: "Apple Maggot", diseases: ["Fruit Deformation", "Rot"] },
      { name: "Codling Moth", diseases: ["Apple Rot", "Fruit Damage"] },
    ],
  },
  {
    month: "April",
    pests: [
      { name: "Leafroller", diseases: ["Leaf Damage", "Reduced Photosynthesis"] },
      { name: "Aphids", diseases: ["Sooty Mold", "Leaf Curl"] },
    ],
  },
  {
    month: "May",
    pests: [
      { name: "Codling Moth", diseases: ["Apple Rot", "Fruit Damage"] },
      { name: "Fruit Fly", diseases: ["Fruit Decay", "Fermentation"] },
    ],
  },
  {
    month: "June",
    pests: [
      { name: "Apple Maggot", diseases: ["Fruit Deformation", "Rot"] },
      { name: "Leafroller", diseases: ["Leaf Damage", "Reduced Photosynthesis"] },
    ],
  },
  {
    month: "July",
    pests: [
      { name: "Fruit Fly", diseases: ["Fruit Decay", "Fermentation"] },
      { name: "Aphids", diseases: ["Sooty Mold", "Leaf Curl"] },
    ],
  },
  {
    month: "August",
    pests: [
      { name: "Codling Moth", diseases: ["Apple Rot", "Fruit Damage"] },
    ],
  },
  {
    month: "September",
    pests: [
      { name: "Leafroller", diseases: ["Leaf Damage", "Reduced Photosynthesis"] },
      { name: "Fruit Fly", diseases: ["Fruit Decay", "Fermentation"] },
    ],
  },
  {
    month: "October",
    pests: [
      { name: "Apple Maggot", diseases: ["Fruit Deformation", "Rot"] },
    ],
  },
  {
    month: "November",
    pests: [],
  },
  {
    month: "December",
    pests: [],
  },
];



export const pesticideData = [
  { month: "January", pesticides: ["Pesticide A", "Pesticide B"] },
  { month: "February", pesticides: ["Pesticide A"] },
  { month: "March", pesticides: ["Pesticide C", "Pesticide B"] },
  { month: "April", pesticides: ["Pesticide A", "Pesticide D"] },
  { month: "May", pesticides: ["Pesticide C"] },
];


export const weatherData = [
  { month: "January", avgTemp: 4, rainfall: 20, humidity: 70, wind: 10 },
  { month: "February", avgTemp: 6, rainfall: 25, humidity: 65, wind: 12 },
  { month: "March", avgTemp: 10, rainfall: 30, humidity: 60, wind: 15 },
  { month: "April", avgTemp: 15, rainfall: 40, humidity: 55, wind: 10 },
  { month: "May", avgTemp: 18, rainfall: 35, humidity: 50, wind: 8 },
  { month: "June", avgTemp: 22, rainfall: 30, humidity: 55, wind: 12 },
  { month: "July", avgTemp: 25, rainfall: 20, humidity: 50, wind: 10 },
  { month: "August", avgTemp: 24, rainfall: 25, humidity: 55, wind: 12 },
  { month: "September", avgTemp: 20, rainfall: 30, humidity: 60, wind: 10 },
  { month: "October", avgTemp: 14, rainfall: 40, humidity: 65, wind: 12 },
  { month: "November", avgTemp: 8, rainfall: 35, humidity: 70, wind: 10 },
  { month: "December", avgTemp: 4, rainfall: 25, humidity: 75, wind: 8 },
];



export const dummyCommunityPosts = [
  {
    id: 1,
    user_id: "user_apple_1",
    author: {
      name: "Rajesh Kumar",
      imageUrl: avatar1,
    },
    content:
      "My apple trees are showing early flowering this year 🌸. Should I be worried about late frost?",
    image: farm_img_1,
    type: "question",
    publish: true,
    likes: ["user_apple_2", "user_apple_3"],
    comments: [
      {
        user: "Priya Sharma",
        text: "Cover them at night with frost cloth. We had the same issue last year.",
      },
      {
        user: "Arjun Patel",
        text: "Not much to worry unless frost warnings are frequent. Monitor weather closely.",
      },
    ],
    created_at: "2025-09-15T10:25:00.000Z",
    updated_at: "2025-09-15T12:10:00.000Z",
  },
  {
    id: 2,
    user_id: "user_apple_2",
    author: {
      name: "Priya Sharma",
      imageUrl: avatar2,
    },
    content:
      "Just applied organic neem oil spray to control aphids 🐛. Worked really well! 🍏",
    image: farm_img_2,
    type: "tip",
    publish: true,
    likes: ["user_apple_1"],
    comments: [
      {
        user: "Rajesh Kumar",
        text: "That’s great! Did you apply it in the morning or evening?",
      },
    ],
    created_at: "2025-09-14T09:45:00.000Z",
    updated_at: "2025-09-14T10:30:00.000Z",
  },
  {
    id: 3,
    user_id: "user_apple_3",
    author: {
      name: "Arjun Patel",
      imageUrl: avatar1,
    },
    content:
      "This year’s yield looks promising! 🍎 Sharing a picture of my orchard in full bloom.",
    image: farm_img_3,
    type: "general",
    publish: true,
    likes: ["user_apple_1", "user_apple_2"],
    comments: [
      {
        user: "Priya Sharma",
        text: "Wow, looks beautiful! How many trees do you have?",
      },
    ],
    created_at: "2025-09-12T15:20:00.000Z",
    updated_at: "2025-09-12T15:45:00.000Z",
  },
];
