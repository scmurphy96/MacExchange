import React from 'react';
import * as d3 from 'd3';
// import { connect } from 'react-redux';
// import { fetchCountries } from '../store/countries';
import data from '../d3file';
import '../bubble.css';

class BubbleChart extends React.Component {
  constructor(props) {
    super(props);

    this.drawChart = this.drawChart.bind(this);
    this.createSVG = this.createSVG.bind(this);
  }
  element = React.createRef();
  width = 1000;
  height = 1000;

  createSVG() {
    return d3
      .select(this.element)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);
  }

  drawChart(svg) {
    let hierarchalData = this.makeHierarchy(data);
    let packLayout = this.pack([this.width - 5, this.height - 5]);
    const root = packLayout(hierarchalData);

    const leaf = svg
      .selectAll('g')
      .data(root.leaves())
      .join('g')
      .attr('transform', (d) => `translate(${d.x + 1},${d.y + 1})`)
      .classed('smaller', (d) => d.data.price > 5.66)
      .classed('larger', (d) => d.data.price < 5.66)
      .classed('equal', (d) => d.data.price == 5.66);

    leaf
      .append('circle')
      .attr('r', (d) => d.r)
      .attr('fill-opacity', 0.8)
      .attr('fill');

    leaf
      .append('text')
      .attr('clip-path', (d) => d.clipUid)
      .selectAll('tspan')
      .data((d) => d.data.code.split(/(?=[A-Z][a-z])|\s+/g))
      .join('tspan')
      .attr('x', -15)
      .attr('y', (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
      .text((d) => d);

    // leaf.append('text').text(function (d) {
    //   return d.name;
    // });
  }

  pack(size) {
    return d3.pack().size(size).padding(3);
  }

  makeHierarchy(data) {
    return d3.hierarchy({ children: data }).sum((d) => 5.66 / d.price);
  }

  componentDidMount() {
    // this.props.fetchCountries();
    let svg = this.createSVG();
    this.drawChart(svg);
  }

  render() {
    return (
      <div>
        <div id="bubblechart" ref={(element) => (this.element = element)} />
      </div>
    );
  }
}

// const mapState = (state) => ({
//   countries: state.countriesReducer,
// });

// const mapDispatch = (dispatch) => {
//   return {
//     fetchCountries: () => dispatch(fetchCountries()),
//   };
// };

export default /*connect(mapState, mapDispatch)*/ BubbleChart;
