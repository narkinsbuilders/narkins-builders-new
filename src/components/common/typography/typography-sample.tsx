// Typography Sample Component - Demonstrates new font system
import React from 'react';

const TypographySample = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Hero Section Typography */}
      <section className="text-center space-y-4">
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Narkin's Builders
        </h1>
        <p className="font-sans text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Premium Apartments in Bahria Town Karachi - 30+ Years of Excellence
        </p>
      </section>

      {/* Content Typography Hierarchy */}
      <section className="space-y-6">
        <h2 className="font-serif text-3xl font-semibold text-gray-900">
          Luxury Living Redefined
        </h2>
        
        <p className="font-sans text-lg text-gray-700 leading-relaxed">
          Experience the pinnacle of luxury living with our meticulously crafted apartments. 
          Each residence features premium finishes, modern amenities, and stunning views of 
          Bahria Town's pristine landscape.
        </p>

        <h3 className="font-serif text-2xl font-medium text-gray-900 mt-8">
          Hill Crest Residency
        </h3>
        
        <p className="font-sans text-base text-gray-700 leading-relaxed">
          Our flagship project combines contemporary design with traditional craftsmanship, 
          offering 2, 3, and 4-bedroom apartments with world-class amenities.
        </p>

        {/* Feature List */}
        <ul className="font-sans text-base text-gray-700 space-y-2 ml-6">
          <li className="list-disc">Premium imported fixtures and fittings</li>
          <li className="list-disc">24/7 security and concierge services</li>
          <li className="list-disc">State-of-the-art fitness center and spa</li>
          <li className="list-disc">Rooftop gardens and recreational areas</li>
        </ul>

        {/* Call to Action */}
        <div className="bg-gray-50 p-6 rounded-lg mt-8">
          <h4 className="font-serif text-xl font-semibold text-gray-900 mb-3">
            Ready to Invest?
          </h4>
          <p className="font-sans text-base text-gray-700">
            Contact our investment specialists today to explore exclusive opportunities 
            in Bahria Town Karachi's most prestigious residential development.
          </p>
        </div>
      </section>

      {/* Typography Scale Demo */}
      <section className="space-y-4 border-t pt-8">
        <h5 className="font-sans text-sm font-semibold text-gray-500 uppercase tracking-wide">
          Typography Scale
        </h5>
        
        <div className="space-y-3">
          <h1 className="font-serif text-5xl font-bold text-gray-900">Heading 1 - Playfair Display</h1>
          <h2 className="font-serif text-4xl font-semibold text-gray-900">Heading 2 - Playfair Display</h2>
          <h3 className="font-serif text-3xl font-medium text-gray-900">Heading 3 - Playfair Display</h3>
          <h4 className="font-serif text-2xl font-medium text-gray-900">Heading 4 - Playfair Display</h4>
          <h5 className="font-sans text-xl font-semibold text-gray-900">Heading 5 - Inter</h5>
          <h6 className="font-sans text-lg font-semibold text-gray-900">Heading 6 - Inter</h6>
          
          <p className="font-sans text-base text-gray-700">Body text - Inter Regular</p>
          <p className="font-sans text-base font-medium text-gray-700">Body text - Inter Medium</p>
          <p className="font-sans text-sm text-gray-600">Small text - Inter Regular</p>
          <p className="font-sans text-xs text-gray-500 uppercase tracking-wide">Caption - Inter Regular</p>
        </div>
      </section>
    </div>
  );
};

export default TypographySample;