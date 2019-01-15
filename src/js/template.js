import $ from 'jquery'
import { selectAll, select, event } from 'd3'

// TOOLTIP HANDLING
var tooltip, viz;
import { BREAKPOINT } from './config'

// Designed for party-chart.js currently
export function initializeTooltips(){
  var seats = selectAll('.seat')
  tooltip = select('#tooltip-container')
  viz = select('#viz-container')
  const displayIsMobile = ($(window).width() < BREAKPOINT)
  // tooltip on desktop only
  const tooltipBuilder = displayIsMobile ? null : turnOnDesktopTooltip;
  // districts.hover(tooltipBuilder, turnOffTooltip);
  seats.on('mousemove', tooltipBuilder)
  seats.on('mouseleave', turnOffTooltip)
}

function turnOnDesktopTooltip(seat){
    if (!seat.laws_name) return null; // excludes empty seats
    tooltip.html(buildTooltipHtml(seat));
  tooltip
    .style('left', (event.pageX + 10) + "px")
    .style('top', (event.pageY + 10) + "px")

  tooltip.classed('hide', false);
}
function turnOffTooltip(d){
  tooltip.classed('hide', true);
}

function buildTooltipHtml(seat){
  return (
    '<div class="tooltip-content">' +
    `<div class="tooltip-title">${seat.laws_name}</div>` +
    `<div class="tooltip-text">${seat.district} / ${seat.city}` +
    // '<p class="tooltip-text"><span class="' + voteClass + '">' + seat.vote + '</span></p>' +
    '</div>'
  );
}
