import React from "react";
import { Zap, Target, Users, Lightbulb, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
            About MINDLOUGE
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            We're building the next generation of intelligent blog management systems.
            Our mission is to empower content creators with tools that are intuitive,
            powerful, and designed for success.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Our Vision
              </h2>
              <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
                In a digital landscape saturated with blogging platforms, we recognized
                a gap. Most existing solutions focus on quantity over quality, forcing
                users into rigid workflows that don't match their creative process.
              </p>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                MINDLOUGE was born from a simple belief: content creators deserve better.
                They deserve a platform that understands their needs, adapts to their
                workflow, and helps them focus on what matters most—creating great content.
              </p>
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Lightbulb className="h-5 w-5" />
                Building the future of content creation
              </div>
            </div>
            <div className="bg-muted rounded-lg p-8 border border-border">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Intelligent Design
                  </h3>
                  <p className="text-muted-foreground">
                    Our system learns from your preferences and adapts to your workflow,
                    making content creation faster and more intuitive.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    User-Centric Approach
                  </h3>
                  <p className="text-muted-foreground">
                    Every feature is designed with the creator in mind, not the platform.
                    Your success is our success.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Continuous Improvement
                  </h3>
                  <p className="text-muted-foreground">
                    We're constantly evolving, listening to feedback, and pushing the
                    boundaries of what's possible in blog management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why MINDLOUGE Section */}
      <section className="py-20 px-4 bg-muted/30 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why MINDLOUGE Stands Out
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              While many solutions exist, we're committed to being the best through
              continuous innovation and genuine care for our users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card rounded-lg p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Lightning Fast
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Built with modern technologies for blazing-fast performance. Your
                content loads instantly, every time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card rounded-lg p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Laser-Focused Features
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                No bloat, no unnecessary features. Every tool we build serves a
                specific purpose in your content creation journey.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card rounded-lg p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Community-Driven
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Built by a passionate team that understands content creation. Your
                feedback directly shapes our roadmap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">
            Our Core Values
          </h2>

          <div className="space-y-6">
            {/* Value 1 */}
            <div className="flex gap-6 items-start p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-300">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Excellence
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We don't compromise on quality. Every line of code, every feature,
                  every design decision is made with excellence in mind. We measure
                  ourselves against the highest standards in the industry.
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="flex gap-6 items-start p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-300">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  User Empathy
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We deeply understand the challenges content creators face. Every
                  feature we build, every problem we solve, starts with genuine
                  empathy for our users' needs and frustrations.
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="flex gap-6 items-start p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-300">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Innovation
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  The blog management landscape is constantly evolving. We're committed
                  to staying ahead of the curve, experimenting with new technologies,
                  and continuously pushing the boundaries of what's possible.
                </p>
              </div>
            </div>

            {/* Value 4 */}
            <div className="flex gap-6 items-start p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-300">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Transparency
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We believe in open communication with our users. Our roadmap is
                  transparent, our decisions are explained, and we're always honest
                  about where we are and where we're going.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Started Section */}
      <section className="py-20 px-4 bg-muted/30 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
            The Story Behind MINDLOUGE
          </h2>

          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              MINDLOUGE was born from frustration. Our team members were content creators
              who spent more time fighting with blogging tools than actually creating.
              We'd switch platforms, learn new workflows, deal with bugs, and wait for
              updates that never addressed our real problems.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              We realized that while many blog management solutions exist, most were
              built by people who had never published a blog post. They were designed
              with feature checklists in mind, not user workflows. So we decided to
              build something different—a platform built for creators, by creators.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              What started as a side project quickly evolved into something special.
              We began incorporating intelligent systems that learn from user behavior.
              We stripped away unnecessary complexity. We made every interaction count.
            </p>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Today, MINDLOUGE represents our commitment to creating the intelligent blog
              management system we always wished existed. We're not satisfied with being
              "good enough." We're building the standard that others will aspire to match.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Meet the Team
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Our diverse team brings together expertise in full-stack development, design,
            and user experience. We're passionate about creating tools that make a real
            difference in creators' lives.
          </p>
          <Link to="/team">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-2">
              View Our Team <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-border bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Experience MINDLOUGE?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join the community of creators who are taking control of their content.
            Start your journey with MINDLOUGE today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center gap-2"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/">
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-muted inline-flex items-center gap-2"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
