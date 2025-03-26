import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const taxData = [
  { category: 'Gross Income', amount: 75000 },
  { category: 'Deductions', amount: 12950 },
  { category: 'Taxable Income', amount: 62050 },
  { category: 'Estimated Tax', amount: 9307 }
];

export function TaxInsightsChart() {
  return (
    <div className="mt-6 h-64">
      <h3 className="text-lg font-semibold mb-4">Tax Breakdown</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={taxData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#3498DB" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}