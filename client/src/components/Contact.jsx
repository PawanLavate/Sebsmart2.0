// pages/Contact.jsx
import React from "react";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { User } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-6">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 text-center">
        {/* Profile Picture */}
        {/* <img
          src="https://via.placeholder.com/120"
          alt="Support Person"
          className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-blue-600"
        /> */}
        <div className="w-18 h-18 m-auto mb-12 flex items-center justify-center bg-gray-200 rounded-full">
              <User className="w-5 h-5 text-gray-700" />
            </div>

        {/* Name & Role */}
        <h2 className="text-2xl font-bold text-gray-900">Pawan Lavate</h2>
        <p className="text-blue-600 font-medium mb-4">Customer Support Specialist</p>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          If you are experiencing issues with our website, please feel free to reach out. 
          I’m here to help and will get back to you as soon as possible.
        </p>

        {/* Contact Info */}
        <div className="space-y-3">
          <a
            href="mailto:support@example.com"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            <Mail className="w-5 h-5" />
            pawanlavate@gmail.com
          </a>

          <a
            href="tel:+919370566758"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            <Phone className="w-5 h-5" />
            +91 9370566758
          </a>

          <a
            href="https://wa.me/9370566758"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 text-gray-500 text-sm">
        © 2025 My App. All rights reserved.
      </footer>
    </div>
  );
}
