import React from 'react';
import { Filter } from 'lucide-react';

const MapFilters = ({ selectedFilters, onFilterChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const culturalPeriods = ['All', 'Ancient', 'Medieval', 'Colonial', 'Modern', 'Contemporary'];
  const heritageStatuses = ['All', 'UNESCO', 'National', 'Regional', 'Local', 'Endangered'];

  return (
    <div className="absolute top-4 right-4 z-[1000]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white p-3 rounded-lg shadow-lg flex items-center space-x-2 hover:bg-stone-50"
      >
        <Filter className="w-5 h-5" />
        <span>Filters</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl p-4 w-64">
          <h3 className="font-semibold mb-3">Filter Sites</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">
                Cultural Period
              </label>
              <select
                value={selectedFilters.culturalPeriod}
                onChange={(e) => onFilterChange({
                  ...selectedFilters,
                  culturalPeriod: e.target.value
                })}
                className="w-full p-2 border rounded"
              >
                {culturalPeriods.map((period) => (
                  <option key={period} value={period.toLowerCase()}>
                    {period}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Heritage Status
              </label>
              <select
                value={selectedFilters.heritageStatus}
                onChange={(e) => onFilterChange({
                  ...selectedFilters,
                  heritageStatus: e.target.value
                })}
                className="w-full p-2 border rounded"
              >
                {heritageStatuses.map((status) => (
                  <option key={status} value={status.toLowerCase()}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full btn-primary mt-4"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapFilters;