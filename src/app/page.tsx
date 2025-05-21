import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Stats from "@/components/home/Stats";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <CTA />
    </Layout>
  );
};

