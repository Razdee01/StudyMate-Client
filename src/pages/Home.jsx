import React from "react";
import HeroSlider from "../components/HeroSlider";
import TopStudyPartner from "../components/TopStudyPartner";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import RestSection from "../components/RestSection";

const topPartnersPromise = fetch(
  "https://study-mate-server-ten.vercel.app/top-study-partners"
).then((res) => res.json());
const Home = () => {
  return (
    <div>
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSlider></HeroSlider>

        {/* Top Study Partners Section */}
        <TopStudyPartner
          topPartnersPromise={topPartnersPromise}
        ></TopStudyPartner>
        {/* You'll add your dynamic partner cards here later */}

        {/* How It Works */}
        <HowItWorks></HowItWorks>
        {/* Testimonials / Review */}
        <div className="py-16 px-4 bg-white">
          <Testimonials></Testimonials>
        </div>
        {/* Rest of the sections */}
        <div>
          {/* You can include other sections like Features, Newsletter, FAQ, etc. */}
          <RestSection></RestSection>
        </div>
      </div>
    </div>
  );
};

export default Home;
