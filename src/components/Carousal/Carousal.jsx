import React from 'react'
import { Link } from 'react-router-dom'

const Carousal = () => {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Blog management system
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl">
            Create, manage and publish content with a clean editor, powerful organisation tools and user roles — all in one place.
          </p>
          <div className="mt-6 flex gap-4">
            <Link
              to="/login"
              className="inline-block bg-blue-600 text-white px-5 py-3 rounded-md shadow hover:bg-blue-700 transition"
            >
              Get started
            </Link>
            <a
              href="#features"
              className="inline-block border border-gray-200 text-gray-700 px-5 py-3 rounded-md hover:bg-gray-50 transition"
            >
              Learn more
            </a>
          </div>
        </div>

        <div className="flex-1">
          <div className="w-full rounded-xl bg-gradient-to-br from-white to-gray-100 p-6 shadow-lg">
            <div className="h-48 bg-gray-50 rounded-md border border-dashed border-gray-200 flex items-center justify-center text-gray-400">
              Screenshot / Illustration
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Dashboard preview — quick, intuitive and responsive.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Carousal