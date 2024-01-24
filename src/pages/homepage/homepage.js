import React, { useState } from 'react';
import HeroComponent from './HeroSection';
import VideoPlayer from './VideoSection';
import ImageScrollComponent from './RunningImages';
import ScrollingText from './RunningText';
import HowItWorksSection from './HowItWorks';
import WhatcanQDo from './WhatCanQdo';
import FAQSection from './FAQ';
import BlogSection from './BlogSection';
import NewsletterSubscription from './Newsletter';
import Header from '../../components/Header';
import Footer from '../../components/footer';
import Footsteps from '../../components/Footsteps';
const Homepage = () => {
    const [heroComplete, setHeroComplete] = useState(false);
    const [enableScroll, setEnableScroll] = useState(false);

    return (
        <div>
            <Footsteps />
            <HeroComponent setEnableScroll={setEnableScroll} setHeroComplete={setHeroComplete} />
            {heroComplete && (
                <>
                    <Header />
                    <VideoPlayer />
                    <div id='meet-q'><ImageScrollComponent /></div>
                    <ScrollingText />
                    <div id='how-it-works'><HowItWorksSection /></div>
                    <div id='what-can-q-do'><WhatcanQDo /></div>
                    <div id='faq'><FAQSection /></div>
                    <div id='blogs'><BlogSection /></div>
                    <NewsletterSubscription />
                    <Footer></Footer>
                </>
            )}
        </div>
    );
};

export default Homepage;            