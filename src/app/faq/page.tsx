import React from 'react';

function FAQPage() {
  return (
    
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Find answers to the most common questions about Pokemon Cruise.
        </p>
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Q: What kind of Pokemon will I encounter?</h2>
            <p className="text-lg text-muted-foreground">
              A: Our cruises visit various regions, offering opportunities to encounter a wide variety of Pokemon native to those areas.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Q: Can I bring my own Pokemon?</h2>
            <p className="text-lg text-muted-foreground">
              A: Yes, trainers are encouraged to bring their partner Pokemon!
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Q: Are there activities for non-trainers?</h2>
            <p className="text-lg text-muted-foreground">
              A: Absolutely! We offer a range of activities for everyone, including sightseeing, fine dining, entertainment, and relaxation.
            </p>
          </div>
        </div>
      </div>
    
  );
}

export default FAQPage;
