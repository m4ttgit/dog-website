'use client';

import { useState } from 'react';
import ProductCard from './components/ProductCard';
import ProductFilter from './components/ProductFilter';
import AffiliateBanner from './components/AffiliateBanner';
import { petProducts } from './data/products';

export default function ShopPage() {
  const [products] = useState(petProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filter products based on search term, price range, and category
  const filteredProducts = products.filter(product => {
    // Search term filter
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Price range filter
    let matchesPrice = true;
    const numericPrice = parseFloat(product.price.replace('$', ''));
    
    if (priceRange === 'under10') {
      matchesPrice = numericPrice < 10;
    } else if (priceRange === '10to20') {
      matchesPrice = numericPrice >= 10 && numericPrice <= 20;
    } else if (priceRange === 'over20') {
      matchesPrice = numericPrice > 20;
    }

    // Category filter
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesPrice && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Pet Supplies Shop</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our selection of high-quality pet supplies and accessories. 
          Everything you need to keep your furry friend healthy, clean, and happy!
        </p>
      </div>
      
      <AffiliateBanner />
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar with filters */}
        <div className="w-full md:w-1/4">
          <ProductFilter 
            priceRange={priceRange} 
            setPriceRange={setPriceRange}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        
        {/* Main content */}
        <div className="w-full md:w-3/4">
          {/* Search bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500">
          Prices and product availability are accurate as of the date/time indicated and are subject to change.
          Any price and availability information displayed on Amazon at the time of purchase will apply to the purchase of this product.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          As an Amazon Associate I earn from qualifying purchases.
        </p>
      </div>
    </div>
  );
}
