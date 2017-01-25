import {
  scaleLinear,
  interpolateHcl,
  rgb,
} from 'd3';

export const colorScale = scaleLinear().domain([0, 1])
  .interpolate(interpolateHcl)
  .range([rgb("#007AFF"), rgb('#FFF500')]);
