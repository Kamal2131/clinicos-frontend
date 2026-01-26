"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Benefits } from "@/components/landing/Benefits";
import { Testimonial } from "@/components/landing/Testimonial";
import { FAQ } from "@/components/landing/FAQ";
import { Integrations } from "@/components/landing/Integrations";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <Testimonial />
      <FAQ />
      <Integrations />
      <CTA />
      <Footer />
    </>
  );
}
