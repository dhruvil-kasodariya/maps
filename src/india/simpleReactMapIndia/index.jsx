import React, { useState } from "react";
import {
  Annotation,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { Tooltip as ReactTooltip } from "react-tooltip";
import LinearGradient from "./LinearGradient.js";
import heatMapData from "../../data/heatData.js";
import Navbar from "../../componets/navbar.jsx";

const INDIA_STATE_GEO_JSON = require("../../data/json/india_state_geo.json");

const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937], // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
  "#ffedea",
  "#ffcec5",
  "#ffad9f",
  "#ff8a75",
  "#ff5533",
  "#e2492d",
  "#be3d26",
  "#9a311f",
  "#782618",
];

const DEFAULT_COLOR = "gray";

const geographyStyle = {
  default: {
    outline: "none",
  },
  hover: {
    fill: "#ccc",
    transition: "all 250ms",
    outline: "none",
  },
  pressed: {
    outline: "none",
  },
};



const SimpleReactMapIndia = () => {
  const [tooltipContent, setTooltipContent] = useState([80, 20]);
  const [data,] = useState(heatMapData);


  const gradientData = {
    fromColor: COLOR_RANGE[0],
    toColor: COLOR_RANGE[COLOR_RANGE.length - 1],
    min: 0,
    max: data.reduce((max, item) => (item.value > max ? item.value : max), 0),
  };

  const colorScale = scaleQuantile()
    .domain(data.map((d) => d.value))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: "NA" }) => {
    setTooltipContent(current?.condition);
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };
 
  return (
  <>
<Navbar title={"Simple React Map India"} otherMaps={[{name:"openlayer" ,link:"/openlayer/india"}]}/>
    <div className="w-full h-screen p-4 ">
      <h1 className="m-0  text-center text-5xl">States and UTs</h1>
      <ReactTooltip id="stateMap" place="top" />
      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
        projection="geoMercator"
        width={600}
        height={200}
      >
        <Geographies geography={INDIA_STATE_GEO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const current = data.find((s) => s.id == geo.properties.id);
              return (
                <Geography
                  data-tooltip-id="stateMap"
                  data-tooltip-variant="info"
                  data-tooltip-content={`${geo?.properties?.name}: ${current?.value}`}
                  key={geo.rsmKey}
                  geography={geo}
                  fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                  style={geographyStyle}
                  onMouseEnter={() => onMouseEnter(geo, current)}
                  onMouseLeave={onMouseLeave}
                />
              );
            })
          }
        </Geographies>

        {/* {heatMapData.map((state) => {
          return (
            <Annotation
              subject={state.condition}
              dx={0}
              dy={0}
              fill="black"
              key={state.id}
            >
              <text fontSize="4px" x="3">
                {state.state}
                {state.value}
              </text>
            </Annotation>
          );
        })} */}
      </ComposableMap>
      <LinearGradient data={gradientData} />
    </div>
    </>
  );
};

export default SimpleReactMapIndia;
