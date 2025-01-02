import { useTheme } from '../../contexts/ThemeContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function LineChart() {
  const { theme } = useTheme();
  
  const data = [
    { month: 'Jan', value: 12 },
    { month: 'Feb', value: 19 },
    { month: 'Mar', value: 15 },
    { month: 'Apr', value: 25 },
    { month: 'May', value: 22 },
    { month: 'Jun', value: 30 },
  ];

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#006FEE" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#006FEE" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
          />
          <XAxis 
            dataKey="month" 
            stroke={theme === 'dark' ? '#fff' : '#000'}
          />
          <YAxis 
            stroke={theme === 'dark' ? '#fff' : '#000'}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#fff',
              borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
              color: theme === 'dark' ? '#fff' : '#000',
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#006FEE"
            fillOpacity={1}
            fill="url(#colorValue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}