import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'
import { Button } from "../ui/button"
const Carousal = () => {
  return (
     <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-accent/5" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6 text-sm text-accent">
              <Zap size={16} />
              MINDLOUGE 1.0 is live
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance leading-tight">
              Turn your <span className="gradient-accent bg-clip-text text-transparent">audience</span> into a business.
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
              Create, publish, and grow your blog with a platform designed for professional creators. Build your
              community, monetize your content, and own your audience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="gradient-accent text-white gap-2">
                  Get Started Free <ArrowRight size={20} />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                Watch Demo <ArrowRight size={20} />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-4">No credit card required. Free for 14 days.</p>
          </div>

          <div className="mt-16 rounded-2xl overflow-hidden glass border-2 border-primary/20 shadow-2xl">
            <div className="bg-linear-to-b from-card to-card/50 p-6 sm:p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border/50">
                  <h3 className="font-semibold text-foreground">Dashboard</h3>
                  <span className="text-xs text-muted-foreground">Last 30 days</span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Total members</p>
                    <p className="text-2xl font-bold">13,041</p>
                    <p className="text-xs text-accent mt-2">↑ 2.5%</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Paid members</p>
                    <p className="text-2xl font-bold">3,207</p>
                    <p className="text-xs text-accent mt-2">↑ 7.1%</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-2">Free members</p>
                    <p className="text-2xl font-bold">9,834</p>
                    <p className="text-xs text-accent mt-2">↓ 1.2%</p>
                  </div>
                </div>

                <div className="h-48 bg-linear-to-r from-primary/20 to-accent/20 rounded-lg flex items-end justify-around px-4 pb-4">
                  <div className="w-2 bg-primary rounded" style={{ height: "30%" }} />
                  <div className="w-2 bg-primary rounded" style={{ height: "70%" }} />
                  <div className="w-2 bg-accent rounded" style={{ height: "50%" }} />
                  <div className="w-2 bg-accent rounded" style={{ height: "85%" }} />
                  <div className="w-2 bg-primary rounded" style={{ height: "45%" }} />
                  <div className="w-2 bg-primary rounded" style={{ height: "60%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Carousal