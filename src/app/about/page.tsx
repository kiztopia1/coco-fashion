"use client";
import React from "react";

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Group Members | section D
        </h1>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300">Name</th>
              <th className="py-2 px-4 border-b border-gray-300">ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">
                Kirubel Demelash
              </td>
              <td className="py-2 px-4 border-b border-gray-300">RCD 0824</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">
                Yeabsira Behaylu
              </td>
              <td className="py-2 px-4 border-b border-gray-300">RCD 0854</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">
                Sofonias Hagos
              </td>
              <td className="py-2 px-4 border-b border-gray-300">RCD 0847</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">
                Mekides Addisu
              </td>
              <td className="py-2 px-4 border-b border-gray-300">RCD 0827</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">
                Selamawit Yirgalem
              </td>
              <td className="py-2 px-4 border-b border-gray-300">RCD 0845</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b border-gray-300">
                Kidus Yared Negash
              </td>
              <td className="py-2 px-4 border-b border-gray-300">RCD 2770</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
