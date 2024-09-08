import { onMount } from "solid-js";
import * as d3 from "d3";
import worldData from "../lib/world.json";

type CountryVisits = {
  [key: string]: number;
};

const GlobeComponent = () => {
  let mapContainer: HTMLDivElement | undefined;

  const visitedCountries: CountryVisits = {
    "India": 32,
    "USA": 10,
  };

  onMount(() => {
    if (!mapContainer) return;

    const width = mapContainer.clientWidth;
    const height = 500;
    const sensitivity = 75;

    let projection = d3
      .geoOrthographic()
      .scale(250)
      .center([0, 0])
      .rotate([0, -30])
      .translate([width / 2, height / 2]);

    const initialScale = projection.scale();
    let pathGenerator = d3.geoPath().projection(projection);

    let svg = d3
      .select(mapContainer)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    svg
      .append("circle")
      .attr("fill", "#EEE")
      .attr("stroke", "#000")
      .attr("stroke-width", "0.2")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", initialScale);

    let map = svg.append("g");

    map
      .append("g")
      .attr("class", "countries")
      .selectAll("path")
      .data(worldData.features)
      .enter()
      .append("path")
      .attr("d", (d: any) => pathGenerator(d as any))
      .attr("fill", (d: { properties: { name: string } }) =>
        visitedCountries.hasOwnProperty(d.properties.name) ? "#90EE90" : "white"
      )
      .style("stroke", "black")
      .style("stroke-width", 0.3)
      .style("opacity", 0.8);

    // Add text labels for visited countries
    map
      .append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(worldData.features)
      .enter()
      .filter((d: { properties: { name: string } }) =>
        visitedCountries.hasOwnProperty(d.properties.name)
      )
      .append("text")
      .attr("x", (d: any) => pathGenerator.centroid(d)[0])
      .attr("y", (d: any) => pathGenerator.centroid(d)[1])
      .attr("dy", "-0.5em")
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .text((d: { properties: { name: string } }) => visitedCountries[d.properties.name]);

    d3.timer(() => {
      const rotate = projection.rotate();
      const k = sensitivity / projection.scale();
      projection.rotate([rotate[0] - 1 * k, rotate[1]]);
      svg.selectAll("path").attr("d", (d: any) => pathGenerator(d as any));
      svg.selectAll("text").attr("x", (d: any) => pathGenerator.centroid(d)[0]).attr("y", (d: any) => pathGenerator.centroid(d)[1]);
    }, 200);
  });

  return (
    <div class="flex flex-col text-white justify-center items-center w-full h-full">
      <div class="w-full" ref={mapContainer}></div>
    </div>
  );
};

export default GlobeComponent
