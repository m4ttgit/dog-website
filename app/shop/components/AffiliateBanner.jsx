'use client';

export default function AffiliateBanner() {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="font-bold text-lg">Quality Pet Supplies</h3>
          <p className="text-gray-600">
            We carefully select the best grooming tools, harnesses, and care products for your pets.
          </p>
        </div>
        <div className="text-center md:text-right">
          <a 
            href="https://www.amazon.com/s?k=pet+supplies&tag=thatdogpage-20" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-yellow-600 transition-colors"
          >
            Browse More on Amazon
          </a>
          <p className="text-xs text-gray-500 mt-2">
            As an Amazon Associate I earn from qualifying purchases.
          </p>
        </div>
      </div>
    </div>
  );
}