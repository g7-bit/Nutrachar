import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LabelList,
  Label,
  Legend,
} from "recharts";

// const data = [
//   { name: 'Protein', value: 125 },
//   { name: 'Fats', value: 323 },
//   { name: 'Carbs', value: 335 }
// ];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

function Chart({ data, userLabel = "", height=250 , circleRadius=80, width="100%"}) {
  // console.log("data arrived in chart.jsx", data);

  const noData = data.reduce((ele, item) => ele + item.value, 0);
  if (noData === 0) {
    return <div> Add some food item to see chart</div>;
  }
  // console.log("no data? ", noData);
  return (
    <ResponsiveContainer   width={width} height={height}>
      <PieChart >
        <Pie
        
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={circleRadius}
          fill="#8884d8"
          dataKey="value"
          label={({ name, value, percent }) =>
            `${name} - ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <div className="text-center opacity-100">{userLabel}</div>
    </ResponsiveContainer>
  );
}

export default Chart;
