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
import legRoster from './data/mt-leg-roster-19.json';

import * as d3 from 'd3'


import {
    DEFAULT_HEADLINE, DEFAULT_SUBHEAD,
    INIT_TEXT,
    DEFAULT_EXPORT_WIDTH, DEFAULT_EXPORT_HEIGHT,
    //
    graphicOptions,
    // DOM elements
    headlineInput, cutlineInput, voteTextInput, urlInput,
    vizContainer, tooltipContainer,
    exportImageWidth, exportImageHeight,
} from './js/config.js'
import { initializeTooltips } from './js/template.js'

let curChart;


// INITIALIZE APP
function init(){
  tooltipContainer.classed('hide', true)
  // Initialize form contents
  headlineInput.value = DEFAULT_HEADLINE;
  cutlineInput.value = DEFAULT_SUBHEAD;
  exportImageWidth.value = DEFAULT_EXPORT_WIDTH;
  exportImageHeight.value = DEFAULT_EXPORT_HEIGHT;

  d3.select('#graphic-type')
    .selectAll('option')
    .data(graphicOptions).enter()
    .append('option')
    .attr('value', d => d.key)
    .text(d => d.label)
  curChart = graphicOptions.find(d => d.key === 'by-party'); // TODO - wire this to selector
  addFormListeners();
//   addOutputBoxListener();

  voteTextInput.value = INIT_TEXT;
  reDraw()
//   let voteData = processData(initText, legRoster);
//   curChart.draw({
//     container: vizContainer,
//     headline: headlineInput.value,
//     cutline: cutlineInput.value,
//     data: voteData,
//   });
  addImageGenerateListener();
//   initializeTooltips();

}

function addOutputBoxListener() {
    document.querySelector('#output-copy-btn')
      .addEventListener('click', copyOutputBoxContents);
}

function reDraw(){
    let voteData = processData(voteTextInput.value, legRoster);
    curChart.draw({
        container: vizContainer,
        headline: headlineInput.value,
        cutline: cutlineInput.value,
        data: voteData,
    })
    initializeTooltips();
}

// INPUT FORM HANDLING
function onFormSubmit(e){
  e.preventDefault()
  reDraw()
}
function addFormListeners(){
  document.querySelector('.leg-data-form')
    .addEventListener('submit', onFormSubmit);
  document.querySelector('#vote-text-input')
    .addEventListener('input', reDraw);
  document.querySelector('#title-input')
    .addEventListener('input', reDraw);
  document.querySelector('#description-input')
    .addEventListener('input', reDraw);
}
function addImageGenerateListener(){
    document.querySelector('#generate-image')
        .addEventListener('click', makeDownloadImage)
}

// MAIN
init();
