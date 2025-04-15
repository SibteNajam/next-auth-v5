"use client";
import React from "react";
import Image from "next/image"; // Importing the Image component

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Database,
  BarChart3,
  PieChart as PieChartIcon,
  Users,
  MessageSquare,
  Github,
} from "lucide-react";
import "./dashboard.css";

// Dummy data for charts
const yearlyData = [
  { year: "2014", sales: 3000 },
  { year: "2015", sales: 4500 },
  { year: "2016", sales: 3800 },
  { year: "2017", sales: 5200 },
  { year: "2018", sales: 4800 },
  { year: "2019", sales: 6000 },
  { year: "2020", sales: 5500 },
  { year: "2021", sales: 7200 },
  { year: "2022", sales: 8100 },
  { year: "2023", sales: 9000 },
];

const productData = [
  { name: "Product A", value: 4000 },
  { name: "Product B", value: 3000 },
  { name: "Product C", value: 2000 },
  { name: "Product D", value: 2780 },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

function DashBoard() {
  return (
    <div className="min-h-screen bg-gray-50 mt-3">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              {/* <Database className="h-8 w-8 text-blue-500" /> */}
              <span className="ml-2 text-xl font-bold text-blue-500">
                DashBoard
              </span>
            </div>

            <div className="header-anchors">
              <a href="#">Dashboard</a>
              <a href="#">Products</a>
              <a href="#">Documentation</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Dashboard Overview
        </h1> */}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <p className="text-[#3B82F6] font-medium">Total Sales</p>
              <div className="flex justify-between space-x-4">
                <BarChart3 className="h-10 w-10 text-blue-500" />
                <p className="text-2xl font-semibold text-black">48</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <p className="text-orange-600 font-medium">Products</p>
              <div className="flex justify-between space-x-4">
                <PieChartIcon className="h-10 w-10 text-orange-400" />
                <p className="text-2xl font-semibold text-black">20</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <p className="text-green-600 font-medium">Customers</p>
              <div className="flex justify-between space-x-4">
                <Users className="h-10 w-10 text-green-400" />
                <p className="text-2xl font-semibold text-black">1000</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <p className="text-red-600 font-medium">Support Tickets</p>
              <div className="flex justify-between space-x-4">
                <MessageSquare className="h-10 w-10 text-red-400" />
                <p className="text-2xl font-semibold text-black">48</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold text-[#52BA82] mb-4">
              Yearly Sales
            </h2>
            <LineChart width={500} height={300} data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="year" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3B82F6"
                strokeWidth={2}
              />
            </LineChart>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-xl ffont-semibold text-[#3B82F6] mb-4">
              Product Sales Distribution
            </h2>
            <PieChart width={500} height={300}>
              <Pie
                data={productData}
                cx={250}
                cy={150}
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {productData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E5E7EB",
                }}
              />
              <Legend />
            </PieChart>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Customer Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-gray-600 mb-4">
                ASK DB has transformed our data management processes. The
                interface is intuitive and the performance is outstanding
              </p>
              <div className="flex items-center">
                {/* <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                  alt="Customer"
                  className="h-10 w-10 rounded-full"
                /> */}
                <div className="ml-3">
                  <p className="text-gray-900 font-medium">John Doe</p>
                  <p className="text-gray-600">CTO, TechCorp</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-gray-600 mb-4">
                The analytics capabilities are beyond what we expected. Its
                helped us make better business decisions
              </p>
              <div className="flex items-center">
                {/* <Image
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                  alt="Customer"
                  className="h-10 w-10 rounded-full"
                /> */}
                <div className="ml-3">
                  <p className="text-gray-900 font-medium">Jane Smith</p>
                  <p className="text-gray-600">Data Analyst, Analytics Co</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-gray-600 mb-4">
                Customer support is exceptional. They are always there when we
                need them and quick to resolve issues
              </p>
              <div className="flex items-center">
                {/* <Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                  alt="Customer"
                  className="h-10 w-10 rounded-full"
                /> */}
                <div className="ml-3">
                  <p className="text-gray-900 font-medium">Mike Johnson</p>
                  <p className="text-gray-600">CEO, StartupX</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-gray-900 font-bold mb-4">ASK DB</h3>
              <p className="text-gray-600">
                Empowering businesses with powerful database solutions.
              </p>
            </div>
            <div>
              <h3 className="text-gray-900 font-bold mb-4">Products</h3>
              <ul className="text-gray-600 space-y-2">
                <li>Database Management</li>
                <li>Analytics Tools</li>
                <li>Security Solutions</li>
                <li>Cloud Storage</li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-bold mb-4">Resources</h3>
              <ul className="text-gray-600 space-y-2">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Blog</li>
                <li>Case Studies</li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                {/* <Github className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" /> */}
                <MessageSquare className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">
              &copy; 2024 ASK DB. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default DashBoard;
