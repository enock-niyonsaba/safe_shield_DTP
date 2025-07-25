"use client"
import HeroSection from "@/components/sections/hero-section"
import FeaturesSection from "@/components/sections/features-section"
import ChartsSection from "@/components/sections/charts-section"
import AISection from "@/components/sections/ai-section"
import HowItWorksSection from "@/components/sections/how-it-works-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import TechnologiesSection from "@/components/sections/technologies-section"
import TrainingSection from "@/components/sections/training-section"
import TeamSection from "@/components/sections/team-section"
import CTASection from "@/components/sections/cta-section"
import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ChartsSection />
        <AISection />
        <HowItWorksSection />
        <TestimonialsSection />
        <TechnologiesSection />
        <TrainingSection />
        <TeamSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
