import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

const CTA = () => (
    <section className="border-t border-border py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">Ready to start publishing?</h2>
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            Join thousands of creators building their business on BlogHub. It's free to get started.
          </p>
          <Link to="/login">
            <Button size="lg" className="gradient-accent text-white gap-2">
              Start Your Free Trial <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </section>
)

export default CTA