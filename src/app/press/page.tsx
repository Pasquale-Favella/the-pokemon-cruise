import React from 'react';

function PressPage() {
  return (
    
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Press Room</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Welcome to the Pokemon Cruise Press Room. Here you can find our latest press releases, media kits, and assets.
        </p>
        <h2 className="text-2xl font-semibold mb-3">Latest Press Releases</h2>
        <ul className="space-y-4 text-lg text-muted-foreground">
          <li className="flex items-start">
            <span className="mr-2 text-primary">&bull;</span> {/* Using a styled bullet point */}
            <div>
              <span className="font-medium text-foreground">June 1, 2024</span> - Pokemon Cruise Announces New Kanto Region Itinerary
            </div>
          </li>
          <li className="flex items-start">
             <span className="mr-2 text-primary">&bull;</span> {/* Using a styled bullet point */}
            <div>
              <span className="font-medium text-foreground">May 15, 2024</span> - Partnership with Ocean Adventures Inc. Announced
            </div>
          </li>
          <li className="flex items-start">
             <span className="mr-2 text-primary">&bull;</span> {/* Using a styled bullet point */}
            <div>
              <span className="font-medium text-foreground">April 20, 2024</span> - Pokemon Cruise Wins "Best Themed Cruise" Award
            </div>
          </li>
        </ul>
        <p className="text-lg text-muted-foreground mt-4">
          For media inquiries, please contact press@pokemoncruise.com.
        </p>
      </div>
    
  );
}

export default PressPage;
