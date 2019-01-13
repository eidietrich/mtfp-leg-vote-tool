import { select } from 'd3'

export const DEFAULT_HEADLINE = 'Write a chart headline';
export const DEFAULT_SUBHEAD = 'Describe what the vote means.';

export const BREAKPOINT = 768;

export const voteKey = {
  'Y': 'yea',
  'N': 'nay',
  'A': 'absent',
  'E': 'excused'
}

// ELEMENTS
export const headlineInput = document.querySelector('#headline-input')
export const cutlineInput = document.querySelector('#cutline-input')
export const urlInput = document.querySelector('#url-input')
export const voteTextInput = document.querySelector('#vote-text-input')
export const embedHtmlOutput = document.querySelector('#html-for-embed')

// d3 selection
export const vizContainer = select('#viz-container')
export const tooltipContainer = select('#tooltip-container')