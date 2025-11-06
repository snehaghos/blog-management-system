import React from 'react'
import { Link } from 'react-router-dom'

const CTA = () => (
  <section className="py-12">
    <div className="max-w-4xl mx-auto px-6 text-center bg-blue-600 text-white rounded-lg p-8 shadow-md">
      <h3 className="text-2xl font-bold">Ready to publish your first post?</h3>
      <p className="mt-2 text-blue-100">Sign up or log in to start managing your content right away.</p>
      <div className="mt-6 flex justify-center gap-4">
        <Link to="/register" className="bg-white text-blue-600 px-5 py-3 rounded-md font-medium">
          Create account
        </Link>
        <Link to="/login" className="border border-white text-white px-5 py-3 rounded-md">
          Sign in
        </Link>
      </div>
    </div>
  </section>
)

export default CTA