// styles
// require('normalize.css/normalize.css'); // redundant w/ bootstrap
require('./styles/index.scss');

// libraries

// js
import './js/template.js'
import processData from './js/data-processing.js'
import { copyOutputBoxContents } from './js/makeHtml.js'
import { makeDownloadImage } from './js/makeImage.js'

// data
import initText from './data/raw-vote-text-19.txt'
import legRoster from './data/mt-house-roster-19.json';

import * as d3 from 'd3'


import { DEFAULT_HEADLINE, DEFAULT_SUBHEAD,
    //
    graphicOptions,
    // DOM elements
    headlineInput, cutlineInput, voteTextInput, urlInput,
    vizContainer, tooltipContainer
} from './js/config.js'
import { initializeFilters, initializeTooltips } from './js/template.js'

// INITIALIZE APP
function init(){
  tooltipContainer.classed('hide', true)
  // Initialize form contents
  headlineInput.value = DEFAULT_HEADLINE;
  cutlineInput.value = DEFAULT_SUBHEAD;

  d3.select('#graphic-type')
    .selectAll('option')
    .data(graphicOptions).enter()
    .append('option')
    .attr('value', d => d.key)
    .text(d => d.label)
  let curChart = graphicOptions.find(d => d.key === 'by-party'); // TODO - wire this to selector
  addFormListeners();
//   addOutputBoxListener();

  voteTextInput.value = initText;
  let voteData = processData(initText, legRoster);
  curChart.draw({
    container: vizContainer,
    headline: headlineInput.value,
    cutline: cutlineInput.value,
    data: voteData,
  });
  addImageGenerateListener();
//   initializeTooltips();
  initializeFilters();

//   d3.queue()
//     .defer(d3.text, initialTextPath)
//     .defer(d3.json, legRosterPath)
//     .defer(d3.text, templateStylePath)
//     .defer(d3.text, templateJsPath)
//     .await(function(err, initText, rosterJson, css, js){
//       if (err) throw err;
//       voteTextInput.value = initText;
//       voteData = processData(initText, rosterJson); // Call to data-processing.js
//       legRoster = rosterJson;
//       templateCss = css;
//       templateJs = js;
//       draw(chartText, voteData); // Call to mt-leg-chart.js

//     //   fillOutputBox();
//       addGenerateListener();
//   });
}

function addOutputBoxListener() {
    document.querySelector('#output-copy-btn')
      .addEventListener('click', copyOutputBoxContents);
}

// INPUT FORM HANDLING
function onFormSubmit(e){
  e.preventDefault();
  let voteData = processData(voteTextInput.value, legRoster);
  draw({
    container: vizContainer,
    headline: headlineInput.value,
    cutline: cutlineInput.value,
    data: voteData,
  });
}
function addFormListeners(){
  document.querySelector('.leg-data-form')
    .addEventListener('submit', onFormSubmit);
}
function addImageGenerateListener(){
    document.querySelector('#generate-image')
        .addEventListener('click', makeDownloadImage)
}

// MAIN
init();
