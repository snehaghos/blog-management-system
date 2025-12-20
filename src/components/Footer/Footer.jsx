import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => (
  <footer className="border-t border-border py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© 2025 MINDLOUGE. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="#" className="hover:text-foreground transition">
                Privacy
              </Link>
              <Link to="#" className="hover:text-foreground transition">
                Terms
              </Link>
              <Link to="#" className="hover:text-foreground transition">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
)

export default Footer