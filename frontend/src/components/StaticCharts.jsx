import React from 'react'
import {Chart} from "../components"

function StaticCharts() {
  return (
            <div className=" pb-10">
          <div className="fade-up-on-scroll-fast text-center text-green-500 text-2xl mb-5 font-mono">
            {" "}
           &#10026; Reccomended Ratio 
          </div>
          <div className="fade-up-on-scroll md:flex   opacity-85">
            <div className=" m-10 md:m-0 md:flex-1  ">
                
              <Chart
                data={[
                  { name: "fats", value: 25 },
                  { name: "carbs", value: 30 },
                  { name: "Protein", value: 45 },
                ]}
                userLabel="Weight loss"
                height={160}
                circleRadius={50}
              />
            </div>
            
            <div className="m-10 md:m-0 md:flex-1 ">
              <Chart
                data={[
                  { name: "Fats", value: 25 },
                  { name: "Carbs", value: 50 },
                  { name: "Protein", value: 25 },
                ]}
                userLabel="Maintenance"
                height={160}
                circleRadius={50}
                width=""
              />
            </div>

            <div className=" m-10 md:m-0 md:flex-1">
              <Chart
                data={[
                  { name: "Fats", value: 20 },
                  { name: "Carbs", value: 45 },
                  { name: "Protein", value: 35 },
                ]}
                userLabel="Muscle Gain"
                height={160}
                circleRadius={50}
                
              />
            </div>
          </div>
        </div>
  )
}

export default StaticCharts