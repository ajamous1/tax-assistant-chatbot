import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  Legend
} from 'recharts';

const generateMockTaxData = () => [
  { 
    category: 'Gross Income', 
    amount: 75000, 
    color: '#3B82F6' 
  },
  { 
    category: 'Standard Deduction', 
    amount: 12950, 
    color: '#10B981' 
  },
  { 
    category: 'Taxable Income', 
    amount: 62050, 
    color: '#F43F5E' 
  },
  { 
    category: 'Estimated Tax', 
    amount: 9307, 
    color: '#8B5CF6' 
  }
];

export function TaxInsightsChart() {
  const taxData = generateMockTaxData();

  return (
    <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-4 text-gray-800">
        Interactive Tax Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={taxData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ 
              backgroundColor: 'rgba(255,255,255,0.9)', 
              borderRadius: '10px' 
            }}
          />
          <Legend />
          {taxData.map((entry, index) => (
            <Bar 
              key={entry.category} 
              dataKey="amount" 
              fill={entry.color} 
              name={entry.category}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}