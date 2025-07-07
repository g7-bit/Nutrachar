import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LabelList, Label, Legend } from 'recharts';

  // const data = [
  //   { name: 'Protein', value: 125 },
  //   { name: 'Fats', value: 323 },
  //   { name: 'Carbs', value: 335 }
  // ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

function Chart({data}) {
  console.log("data arrived in chart.jsx", data)

  const noData = data.reduce((ele, item)=> ele + item.value, 0)
  if(noData === 0){
    return (
      <div> Add some food item to see chart</div>
    )
  }
  console.log("no data? ", noData)
    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label = {({name, value, percent})=> `${name} : ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip/>
          <Legend/>
        </PieChart>

      </ResponsiveContainer>
    );
  }


  export default Chart;