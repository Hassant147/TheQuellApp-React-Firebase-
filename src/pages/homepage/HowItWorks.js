import React from 'react';

const FeatureCard = ({ image, title, description, imageLeft }) => {
  return (
    <div className="flex flex-col md:flex-row bg-color lg:rounded-xl shadow-custom p-10 justify-between hover:bg-white">
      {imageLeft && (
        <img className="object-cover w-full lg:w-1/3 rounded-md h-72" src={image} alt={title} />
      )}
      <div className="p-6 flex flex-col justify-center w-full md:w-1/2 left-align-title">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      {!imageLeft && (
        <img className="object-cover w-full lg:w-1/3 rounded-md h-72" src={image} alt={title} />
      )}
    </div>
  );
};

const HowItWorksSection = () => {
  const features = [
    {
      image: 'https://source.unsplash.com/random', // Replace with the path to your image
      title: 'Your Friendly Chat Companion',
      description: 'Creating taglines for a chatbot involves encapsulating its unique features, capabilities, and personality in a short, catchy phrase. Here are a few taglines that could fit different types of chatbots.',
      imageLeft: true,
    },
    {
      image: 'https://source.unsplash.com/random', // Replace with the path to your highlighted image
      title: 'Your Advanced AI Solution',
      description: 'Advanced algorithms and machine learning techniques allow our AI to provide insightful analytics and automation capabilities.',
      imageLeft: false,
    },
    {
      image: 'https://source.unsplash.com/random', // Replace with the path to your image
      title: 'Seamless Integration',
      description: 'Our platform integrates seamlessly with your existing tools and workflows, enhancing efficiency without disrupting your current operations.',
      imageLeft: true,
    },
  ];

  return (
    <section className="lg:w-3/5 mx-auto mb-24 lg:mb-28">
        <div className="lg:mb-12 mb-10">
          <h1 className="font-manrope text-2xl font-bold text-gray-700 text-center">How it Works</h1>
          <p className="text-gray-500 font-semibold mt-2 w-3/4 mx-auto text-center font-manrope ">One platform, limitless connections. Simplify communication and boost productivity across multiple channels with ease.</p>
        </div>
        <div className="flex flex-col items-center gap-y-10">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
