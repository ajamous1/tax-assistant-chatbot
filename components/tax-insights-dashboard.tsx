import React from 'react';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const generateMockTaxData = () => ({
  incomeBreakdown: [
    { name: 'Salary', value: 75000, color: '#3B82F6' },
    { name: 'Investments', value: 15000, color: '#10B981' },
    { name: 'Other Income', value: 5000, color: '#8B5CF6' }
  ],
  taxBreakdown: [
    { category: 'Federal Tax', amount: 12000, color: '#2563EB' },
    { category: 'State Tax', amount: 5000, color: '#1E40AF' },
    { category: 'Social Security', amount: 4650, color: '#3B82F6' },
    { category: 'Medicare', amount: 1087, color: '#60A5FA' }
  ],
  deductionsAndCredits: [
    { name: 'Standard Deduction', value: 12950, color: '#10B981' },
    { name: 'Charitable Donations', value: 2000, color: '#34D399' },
    { name: 'Mortgage Interest', value: 3000, color: '#6EE7B7' }
  ]
});

export function TaxInsightsDashboard() {
  const { incomeBreakdown, taxBreakdown, deductionsAndCredits } = generateMockTaxData();

  return (
    <div className="bg-blue-50 p-6 rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">
        Comprehensive Tax Analysis
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Income Breakdown Pie Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            Income Sources
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={incomeBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {incomeBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Tax Breakdown Bar Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            Tax Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={taxBreakdown}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#3B82F6">
                {taxBreakdown.map((entry) => (
                  <Cell key={entry.category} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Deductions and Credits Pie Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            Deductions & Credits
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={deductionsAndCredits}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {deductionsAndCredits.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-blue-700 mb-2">
          Tax Summary
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">Total Income</td>
              <td className="p-2 text-right">$95,000</td>
            </tr>
            <tr>
              <td className="p-2">Total Deductions</td>
              <td className="p-2 text-right">$17,950</td>
            </tr>
            <tr>
              <td className="p-2">Taxable Income</td>
              <td className="p-2 text-right">$77,050</td>
            </tr>
            <tr>
              <td className="p-2 font-bold">Total Tax Liability</td>
              <td className="p-2 text-right font-bold text-blue-700">$22,737</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}