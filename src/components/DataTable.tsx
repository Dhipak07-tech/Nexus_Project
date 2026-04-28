import React, { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  className
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;
    
    setSortConfig(current => ({
      key: column.key,
      direction: current.key === column.key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilter = (column: Column<T>, value: string) => {
    setFilters(current => ({
      ...current,
      [column.key as string]: value
    }));
  };

  const filteredAndSortedData = useMemo(() => {
    let filteredData = data.filter(row => {
      return columns.every(column => {
        if (!column.filterable) return true;
        const filterValue = filters[column.key as string];
        if (!filterValue) return true;
        
        const cellValue = row[column.key];
        return String(cellValue).toLowerCase().includes(filterValue.toLowerCase());
      });
    });

    if (sortConfig.key) {
      filteredData = [...filteredData].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [data, columns, filters, sortConfig]);

  const getSortIcon = (column: Column<T>) => {
    if (sortConfig.key !== column.key) {
      return <ChevronDown className="w-3 h-3 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-3 h-3 text-blue-600" />
      : <ChevronDown className="w-3 h-3 text-blue-600" />;
  };

  return (
    <div className={cn("bg-white rounded-lg border border-gray-200", className)}>
      {/* Header Row with Filters */}
      <div className="border-b border-gray-200">
        <div className="grid gap-4 p-4" style={{
          gridTemplateColumns: columns.map(col => col.width || '1fr').join(' ')
        }}>
          {columns.map((column) => (
            <div key={String(column.key)} className="space-y-2">
              {/* Column Header */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  {column.label}
                </span>
                {column.sortable && (
                  <button
                    onClick={() => handleSort(column)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    {getSortIcon(column)}
                  </button>
                )}
              </div>
              
              {/* Filter Input */}
              {column.filterable && (
                <div className="relative">
                  <Search className="w-3 h-3 absolute left-2 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={`Filter ${column.label.toLowerCase()}...`}
                    value={filters[column.key as string] || ''}
                    onChange={(e) => handleFilter(column, e.target.value)}
                    className="w-full pl-8 pr-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        {filteredAndSortedData.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No data available</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredAndSortedData.map((row, index) => (
              <div
                key={index}
                onClick={() => onRowClick?.(row)}
                className="grid gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                style={{
                  gridTemplateColumns: columns.map(col => col.width || '1fr').join(' ')
                }}
              >
                {columns.map((column) => (
                  <div key={String(column.key)} className="text-sm text-gray-900 flex items-center">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
