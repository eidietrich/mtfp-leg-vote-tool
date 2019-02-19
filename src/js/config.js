import { select } from 'd3'

import drawPartyChart from './party-chart.js'
// import initText from './data/raw-vote-text-19.txt'

// export const DEFAULT_HEADLINE = "Write a title (e.g., HB-1 'Feed bill', third reading)";
// export const DEFAULT_SUBHEAD = 'Describe what the vote means. (e.g., Passed House with GOP Reps. Mandeville and Burnett dissenting.)';
// export const INIT_TEXT = initText

export const DEFAULT_HEADLINE = '[TITLE GOES HERE]'
export const DEFAULT_SUBHEAD = ''
export const INIT_TEXT = ''

export const DEFAULT_EXPORT_WIDTH = 800
export const DEFAULT_EXPORT_HEIGHT = 400

export const BREAKPOINT = 768;

export const graphicOptions = [
    // {key: 'default', label: 'Default', draw: drawOldChart},
    {key: 'by-party', label: 'Votes by Party', draw: drawPartyChart},
]

export const voteKey = {
  'Y': 'yea',
  'N': 'nay',
  'A': 'absent',
  'E': 'excused'
}
export const partyKey = {
    'R': 'gop',
    'D': 'dem',
}

// ELEMENTS
export const headlineInput = document.querySelector('#title-input')
export const cutlineInput = document.querySelector('#description-input')
export const urlInput = document.querySelector('#url-input')
export const voteTextInput = document.querySelector('#vote-text-input')
export const embedHtmlOutput = document.querySelector('#html-for-embed')

export const exportImageWidth = document.querySelector('#export-width')
export const exportImageHeight = document.querySelector('#export-height')

// d3 selection
export const vizContainer = select('#viz-container')
export const tooltipContainer = select('#tooltip-container')