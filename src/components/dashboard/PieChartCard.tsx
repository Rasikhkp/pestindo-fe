import { useTheme } from '../../contexts/ThemeContext';
import { useCustomers } from '../../hooks/useCustomers';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function PieChartCard() {
  const { theme } = useTheme();
  const { customers } = useCustomers();

  const individualCount = customers.filter(c => c.type === 'individual').length;
  const companyCount = customers.filter(c => c.type === 'company').length;

  const data = [
    { name: 'Perorangan', value: individualCount },
    { name: 'Perusahaan', value: companyCount },
  ];

  const COLORS = ['#006FEE', '#17C964'];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#fff',
              borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
              color: theme === 'dark' ? '#fff' : '#000',
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}