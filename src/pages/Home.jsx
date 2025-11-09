import React from 'react';
import HeroSlider from '../components/HeroSlider';
import TopStudyPartner from '../components/TopStudyPartner';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';

const Home = () => {
    return (
      <div>
        <div className="min-h-screen">
          {/* Hero Section */}
          <HeroSlider></HeroSlider>

          {/* Top Study Partners Section */}
          <TopStudyPartner></TopStudyPartner>
          {/* You'll add your dynamic partner cards here later */}

          {/* How It Works */}
          <HowItWorks></HowItWorks>
          {/* Testimonials / Review */}
          <div className="py-16 px-4 bg-white">
            <Testimonials></Testimonials>
          </div>
        </div>
      </div>
    );
};

export default Home;