'use client';

export default function ProductFilter({ priceRange, setPriceRange, selectedCategory, setSelectedCategory }) {
  const handlePriceRangeChange = (e) => {
    const value = e.target.value;
    setPriceRange(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? 'all' : category);
  };

  return (
    <div className="mb-8">
      <div className="p-4 border rounded-lg shadow-sm mb-6">
        <h3 className="text-lg font-semibold mb-4">Filter by Price</h3>
        
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="priceRange"
              value="all"
              checked={priceRange === 'all'}
              onChange={handlePriceRangeChange}
              className="mr-2"
            />
            <span>All Prices</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              name="priceRange"
              value="under10"
              checked={priceRange === 'under10'}
              onChange={handlePriceRangeChange}
              className="mr-2"
            />
            <span>Under $10</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              name="priceRange"
              value="10to20"
              checked={priceRange === '10to20'}
              onChange={handlePriceRangeChange}
              className="mr-2"
            />
            <span>$10 - $20</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              name="priceRange"
              value="over20"
              checked={priceRange === 'over20'}
              onChange={handlePriceRangeChange}
              className="mr-2"
            />
            <span>Over $20</span>
          </label>
        </div>
      </div>
      
      <div className="p-4 border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Product Categories</h3>
        <ul className="space-y-2 text-gray-600">
          <li 
            className={`hover:text-primary cursor-pointer ${selectedCategory === 'all' ? 'text-primary font-semibold' : ''}`}
            onClick={() => handleCategoryChange('all')}
          >
            All Products
          </li>
          <li 
            className={`hover:text-primary cursor-pointer ${selectedCategory === 'Grooming' ? 'text-primary font-semibold' : ''}`}
            onClick={() => handleCategoryChange('Grooming')}
          >
            Grooming
          </li>
          <li 
            className={`hover:text-primary cursor-pointer ${selectedCategory === 'Accessories' ? 'text-primary font-semibold' : ''}`}
            onClick={() => handleCategoryChange('Accessories')}
          >
            Accessories
          </li>
          <li 
            className={`hover:text-primary cursor-pointer ${selectedCategory === 'Hygiene' ? 'text-primary font-semibold' : ''}`}
            onClick={() => handleCategoryChange('Hygiene')}
          >
            Hygiene
          </li>
          <li 
            className={`hover:text-primary cursor-pointer ${selectedCategory === 'Food' ? 'text-primary font-semibold' : ''}`}
            onClick={() => handleCategoryChange('Food')}
          >
            Food
          </li>
        </ul>
      </div>
    </div>
  );
}
