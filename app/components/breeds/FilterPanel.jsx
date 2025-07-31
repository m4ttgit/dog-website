'use client';

export default function FilterPanel({ filters, setFilters, breeds, groups }) {
  const resetFilters = () => {
    console.log('Resetting filters');
    setFilters({
      search: '',
      group: 'all',
      size: 'all',
      energy: 'all',
      trainability: 'all',
      grooming: 'all'
    });
  };

  const handleFilterChange = (field, value) => {
    console.log(`Changing filter ${field} to:`, value);
    setFilters(prev => {
      const newFilters = { ...prev, [field]: value };
      console.log('New filters:', newFilters);
      return newFilters;
    });
  };

  const filterOptions = [
    {
      label: 'Size',
      field: 'size',
      options: [
        { value: 'all', label: 'Any Size' },
        { value: 'small', label: 'Small (under 35cm)' },
        { value: 'medium', label: 'Medium (35-55cm)' },
        { value: 'large', label: 'Large (over 55cm)' }
      ]
    },
    {
      label: 'Energy Level',
      field: 'energy',
      options: [
        { value: 'all', label: 'Any Energy Level' },
        { value: 'high', label: 'High Energy' },
        { value: 'medium', label: 'Medium Energy' },
        { value: 'low', label: 'Low Energy' }
      ]
    },
    {
      label: 'Trainability',
      field: 'trainability',
      options: [
        { value: 'all', label: 'Any Trainability' },
        { value: 'high', label: 'Highly Trainable' },
        { value: 'medium', label: 'Moderately Trainable' },
        { value: 'low', label: 'May Be Stubborn' }
      ]
    },
    {
      label: 'Grooming Needs',
      field: 'grooming',
      options: [
        { value: 'all', label: 'Any Grooming Level' },
        { value: 'high', label: 'High Maintenance' },
        { value: 'medium', label: 'Medium Maintenance' },
        { value: 'low', label: 'Low Maintenance' }
      ]
    }
  ];

  console.log('FilterPanel rendered with:', {
    activeFilters: filters,
    totalBreeds: breeds?.length,
    availableGroups: groups
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg sticky top-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Filter Breeds</h3>
        <button
          onClick={resetFilters}
          className="text-primary hover:text-accent underline text-sm"
        >
          Reset Filters
        </button>
      </div>
      
      <div className="space-y-4">
        {/* Breed Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Breed
          </label>
          <select
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Breeds</option>
            {breeds
              .filter(breed => breed.breed) // Ensure breed name exists
              .sort((a, b) => a.breed.localeCompare(b.breed))
              .map(breed => (
                <option key={breed.breed} value={breed.breed}>
                  {breed.breed}
                </option>
              ))}
          </select>
        </div>

        {/* Group Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Breed Group
          </label>
          <select
            value={filters.group}
            onChange={(e) => handleFilterChange('group', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Groups</option>
            {groups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        {/* Other Filters */}
        {filterOptions.map(filter => (
          <div key={filter.field}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {filter.label}
            </label>
            <select
              value={filters[filter.field]}
              onChange={(e) => handleFilterChange(filter.field, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {filter.options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Current Filters Summary */}
      <div className="mt-6 text-sm text-gray-600">
        <p>Active Filters:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          {Object.entries(filters).map(([key, value]) => {
            if (value !== 'all' && value !== '') {
              return (
                <li key={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                </li>
              );
            }
            return null;
          }).filter(Boolean)}
        </ul>
      </div>
    </div>
  );
}