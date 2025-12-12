import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Description = () => {
  return (
    <>
         <section className="border-t border-border py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">
            Everything professional publishers need to succeed.
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            BlogHub is a modern publishing platform built for creators who want to build a business around their
            content. Create beautiful posts, manage your audience, track analytics, and grow your revenue—all in one
            place.
          </p>
          <Link to="/login" className="inline-flex gap-2 text-accent hover:text-accent/80 mt-6 font-medium">
            Learn more <ArrowRight size={20} />
          </Link>
        </div>
      </section>

    </>
  )
}

export default Description