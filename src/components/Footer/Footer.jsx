import React from 'react'

const Footer = () => (
  <footer className="py-8 bg-white border-t">
    <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="text-gray-700 font-semibold">Blog Management</div>
      <div className="text-sm text-gray-500">
        © {new Date().getFullYear()} Blog Management — Built for creators
      </div>
    </div>
  </footer>
)

export default Footer