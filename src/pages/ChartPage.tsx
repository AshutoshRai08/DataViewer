import React from 'react';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Box,
  SelectChangeEvent
} from '@mui/material';
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Bar,
  Line,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

// Sample data for multiple stores
// Each store has an array of weekly data
const storeData: Record<string, { week: string; gmDollars: number; gmPercent: number }[]> = {
  'San Francisco Bay Trends': [
    { week: 'Wk1', gmDollars: 180000, gmPercent: 0.45 },
    { week: 'Wk2', gmDollars: 200000, gmPercent: 0.42 },
    { week: 'Wk3', gmDollars: 175000, gmPercent: 0.48 },
    { week: 'Wk4', gmDollars: 220000, gmPercent: 0.40 },
    { week: 'Wk5', gmDollars: 195000, gmPercent: 0.38 },
    { week: 'Wk6', gmDollars: 210000, gmPercent: 0.52 },
    // ... add as many weeks as needed
  ],
  'Los Angeles Luxe': [
    { week: 'Wk1', gmDollars: 130000, gmPercent: 0.35 },
    { week: 'Wk2', gmDollars: 140000, gmPercent: 0.39 },
    { week: 'Wk3', gmDollars: 150000, gmPercent: 0.42 },
    { week: 'Wk4', gmDollars: 170000, gmPercent: 0.47 },
    { week: 'Wk5', gmDollars: 160000, gmPercent: 0.50 },
    { week: 'Wk6', gmDollars: 185000, gmPercent: 0.53 },
    // ...
  ],
  'Chicago Charm Boutique': [
    { week: 'Wk1', gmDollars: 90000, gmPercent: 0.25 },
    { week: 'Wk2', gmDollars: 110000, gmPercent: 0.33 },
    { week: 'Wk3', gmDollars: 100000, gmPercent: 0.30 },
    { week: 'Wk4', gmDollars: 115000, gmPercent: 0.38 },
    { week: 'Wk5', gmDollars: 130000, gmPercent: 0.35 },
    { week: 'Wk6', gmDollars: 140000, gmPercent: 0.44 },
    // ...
  ],
};

const ChartPage: React.FC = () => {
  const [selectedStore, setSelectedStore] = React.useState<string>(
    'San Francisco Bay Trends'
  );

  const data = storeData[selectedStore] || [];

  const handleStoreChange = (event: SelectChangeEvent<string>) => {
    setSelectedStore(event.target.value as string);
  };

  return (
    <Container maxWidth="xl" sx={{ width: '85vw', ml:2, height:"100vh" }}>
      {/* Store Selection */}
      <FormControl size="small" sx={{ mb: 2 }}>
        {/* <InputLabel>Store</InputLabel> */}
        <Select
          value={selectedStore}
          onChange={handleStoreChange}
          sx={{ minWidth: 200, backgroundColor:"#fff" }}
        >
          {Object.keys(storeData).map((store) => (
            <MenuItem key={store} value={store}>
              {store}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Dark background container for the chart */}
      <Paper
        sx={{
          p: 2,
          backgroundColor: '#333', // Dark background
          color: '#fff',           // White text
        }}
      >
        {/* Chart Title */}
        <Typography
          variant="h5"
          align="center"
          sx={{ mb: 1, color: '#fff', fontWeight: 'bold' }}
        >
          Gross Margin
        </Typography>

        <Box sx={{ height: "80vh" }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              {/* Dark grid lines */}
              <CartesianGrid stroke="#444" />

              {/* X Axis */}
              <XAxis
                dataKey="week"
                stroke="#fff"
                tick={{ fill: '#fff' }}
              />

              {/* Left Y Axis for GM Dollars (0 - 250k example) */}
              <YAxis
                yAxisId="left"
                stroke="#fff"
                tick={{ fill: '#fff' }}
                domain={[0, 250000]}
                tickFormatter={(value) => `$${value / 1000}k`}
              />

              {/* Right Y Axis for GM % (0 - 100% range) */}
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#fff"
                tick={{ fill: '#fff' }}
                domain={[0, 1]} // fraction from 0 to 1
                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
              />

              {/* <Tooltip
                wrapperStyle={{ backgroundColor: '#333' }}
                labelStyle={{ color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              /> */}
              <Tooltip
  content={({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null; // Prevent empty tooltip

    return (
      <div
        style={{
          backgroundColor: '#222',
          padding: '10px',
          borderRadius: '5px',
          color: '#fff',
          border: '1px solid #555'
        }}
      >
        <p style={{ fontWeight: 'bold', margin: 0 }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, margin: '5px 0' }}>
            {entry.name}: {entry.value} {entry.name === 'GM %' ? '%' : '$'}
          </p>
        ))}
      </div>
    );
  }}
/>

              <Legend
                wrapperStyle={{ color: '#fff' }}
                iconType="circle"
              />

              {/* Bars for GM Dollars */}
              <Bar
                yAxisId="left"
                dataKey="gmDollars"
                name="GM Dollars"
                fill="#2196f3" // Blue
                barSize={20}
              />

              {/* Line for GM % */}
              <Line
                yAxisId="right"
                dataKey="gmPercent"
                name="GM %"
                stroke="#ffa500" // Orange
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChartPage;
