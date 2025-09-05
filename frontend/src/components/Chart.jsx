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



function Chart({COLORS= ["#0088FE","#5E3C6B", "#00C49F", ], data, userLabel = "", height=250 , circleRadius=window.innerWidth < 916 ? 70: 90, width="100%"}) {
  // console.log("data arrived in chart.jsx", data);

  const noData = data.reduce((ele, item) => ele + item.value, 0);
  if (noData === 0) {
    return <div> Add some food item to see chart</div>;
  }
  // console.log("no data? ", noData);
  return (
    <ResponsiveContainer   width={width} height={height}>
      <PieChart className="font-mono " >
        <Pie
        
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={circleRadius}
          fill="#8884d8"
          dataKey="value"
          className="text-xs md:text-lg"
          label={({ name, value, percent }) =>
            `${name} - ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell className="" key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <div className="text-center opacity-100 font-bold">{userLabel}</div>
    </ResponsiveContainer>
  );
}

export default Chart;
