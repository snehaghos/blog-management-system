import React from 'react'

import { BookOpen, Users, TrendingUp, Share2, Lock, Zap } from 'lucide-react'


const Feature = () => {
  return (
     <section className="border-t border-border py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-center">Powerful tools for creators</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Create & Publish",
                desc: "Write beautiful, rich posts with an intuitive editor designed for creators",
              },
              {
                icon: Users,
                title: "Build Community",
                desc: "Engage with your audience through comments, replies, and direct interaction",
              },
              {
                icon: TrendingUp,
                title: "Advanced Analytics",
                desc: "Track every metric that matters—views, clicks, subscribers, and revenue",
              },
              {
                icon: Share2,
                title: "Easy Distribution",
                desc: "Publish to your website, email newsletters, and social media automatically",
              },
              {
                icon: Lock,
                title: "Memberships & Paywalls",
                desc: "Monetize your content with flexible subscription and paywall options",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Optimized performance ensures your readers get the best experience",
              },
            ].map((feature, idx) => (
              <div key={idx} className="group">
                <div className="h-12 w-12 bg-linear-to-br from-primary/30 to-accent/30 rounded-lg flex items-center justify-center mb-4 group-hover:from-primary/50 group-hover:to-accent/50 transition">
                  <feature.icon className="text-accent" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Feature