import React from 'react'

const FeatureCard = ({ title, desc, icon }) => (
  <div className="p-6 bg-white rounded-lg shadow-sm border">
    <div className="h-12 w-12 flex items-center justify-center rounded-md bg-blue-50 text-blue-600">
      {icon}
    </div>
    <h3 className="mt-4 text-lg font-semibold text-gray-800">{title}</h3>
    <p className="mt-2 text-gray-600 text-sm">{desc}</p>
  </div>
)

const Feature = () => {
  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900">Powerful features</h2>
        <p className="mt-2 text-gray-600 max-w-2xl">
          Tools you need to run a professional blog — editorial workflow, roles & permissions, analytics and SEO helpers.
        </p>

        <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Editor & Drafts"
            desc="Rich editing experience, autosave, drafts and revision history."
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20h9" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.5 3.5L21 8l-9 9-4 1 1-4 9-9z" />
              </svg>
            }
          />
          <FeatureCard
            title="Roles & Access"
            desc="Invite team members and control what each role can do."
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14c-4.418 0-8 1.79-8 4v1h16v-1c0-2.21-3.582-4-8-4z" />
              </svg>
            }
          />
          <FeatureCard
            title="Analytics"
            desc="Understand traffic and engagement with simple dashboards."
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3v18h18" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V9m6 8V5" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  )
}

export default Feature