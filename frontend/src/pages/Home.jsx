import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Stats from "../components/home/Stats";
import FeaturedJobs from "../components/home/FeaturedJobs";
import CTA from "../components/home/CTA";
import Footer from "../components/home/Footer";

function Home() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <FeaturedJobs />
      <CTA />
      <Footer />
    </div>
  );
}

export default Home;