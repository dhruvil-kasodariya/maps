import Map from "ol/Map";
import View from "ol/View";
import GeoJSON from "ol/format/GeoJSON";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import "ol/ol.css";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { useEffect, useState } from "react";
import { Fill, Stroke, Style, Text } from "ol/style";

const data = require("../../data/json/india_state_geo.json");
const data2 = require("../../data/json/india_districts_geo.json");

export default function OpenlayersIndia() {
  const [map, setMap] = useState(null);
  const [statesLayerVisible, setStatesLayerVisible] = useState(true);
  const [districtsLayerVisible, setDistrictsLayerVisible] = useState(false);

  let mapInitialized = false;
  useEffect(() => {
    if(!map){
    initMap()}
  }, []);



  const initMap = () => {
    if(mapInitialized) return;
    mapInitialized = true;

    const statesSource = new VectorSource({
      features: new GeoJSON().readFeatures(data, {
        featureProjection: "EPSG:3857", // Adjust the projection if necessary
      }),
    });

    // Assign a random count to each state feature for demonstration purposes
    statesSource.getFeatures().forEach((feature) => {
      feature.set("count", Math.floor(Math.random() * 1000));
    });
    const statesLayer = new VectorLayer({
      source: statesSource,      
      visible: statesLayerVisible,
      style: (feature) => {
        return new Style({
          stroke: new Stroke({
            color: "black",
            width: 1,
          }),
          fill: new Fill({
            color: "rgba(0, 0, 255, 0.1)",
          }),
          text: new Text({
            font: "12px Calibri,sans-serif",
            fill: new Fill({
              color: "#000",
            }),
            stroke: new Stroke({
              color: "#fff",
              width: 3,
            }),
            text: feature.get("name") ? feature.get("name").toString() : "",
          }),
        });
      },
    });

    const districtsSource = new VectorSource({
      features: new GeoJSON().readFeatures(data2, {
        featureProjection: "EPSG:3857", // Adjust the projection if necessary
      }),
    });

    const districtsLayer = new VectorLayer({
      source:districtsSource,
      visible: districtsLayerVisible,
    });

    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        statesLayer,
       districtsLayer,
      ],
      view: new View({
        center: [8230000, 2380000], // Center coordinates for India
        zoom: 1, // Adjusted zoom level to fit India
        extent: [6000000, 500000, 12000000, 5000000],
      }),
    });

    setMap(map);
  };

  const handleStatesLayerChange = (e) => {
    setStatesLayerVisible(e.target.checked);
    map.getLayers().getArray()[1].setVisible(e.target.checked);
  };

  const handleDistrictsLayerChange = (e) => {
    setDistrictsLayerVisible(e.target.checked);
    map.getLayers().getArray()[2].setVisible(e.target.checked);
  };



  return (
    <>
  
        <div>
          
          <div id="map" style={{ width: "100%", height: "95vh" }}></div>
          <form className="d-flex gap-4">
            <input
              className="py-2"
              type="checkbox"
              checked={statesLayerVisible}
              id="States"
              onChange={handleStatesLayerChange}
              label="States"
            />
            <label for="States">States</label>
            <input
              className="py-2"
              type="checkbox"
              id="Districts"
              checked={districtsLayerVisible}
              onChange={handleDistrictsLayerChange}
              label="Districts"
            />
            <label for="Districts">Districts</label>
          </form>
        </div>

    </>
  );
}
