import React from 'react';

function HelpPage() {
  return (
    
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Help Center</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Find answers to your questions and get support for your Pokemon Cruise experience.
        </p>
        <h2 className="text-2xl font-semibold mb-3">Popular Topics</h2>
        <ul className="list-disc list-inside text-lg text-muted-foreground space-y-2">
          <li>Booking and Reservations</li>
          <li>Onboard Activities</li>
          <li>Pokemon Encounters</li>
          <li>Account Management</li>
        </ul>
        <p className="text-lg text-muted-foreground mt-4">
          Browse our FAQ or contact support for further assistance.
        </p>
      </div>
    
  );
}

export default HelpPage;
