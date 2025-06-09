import React from 'react';

function CareersPage() {
  return (
    
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Careers</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Join the Pokemon Cruise team and embark on a rewarding career! We are always looking for passionate individuals to help us create magical experiences for our guests.
        </p>
        <h2 className="text-2xl font-semibold mb-3">Open Positions</h2>
        <ul className="list-disc list-inside text-lg text-muted-foreground">
          <li>Cruise Director</li>
          <li>Pokemon Trainer</li>
          <li>Navigational Officer</li>
          <li>Hospitality Staff</li>
        </ul>
        <p className="text-lg text-muted-foreground mt-4">
          Visit our application portal to see detailed job descriptions and apply.
        </p>
      </div>
    
  );
}

export default CareersPage;
