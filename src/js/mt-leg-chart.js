// DRAW GRAPHIC

import { capitalizeFirstLetter } from './utils'
import { voteKey } from './config'

import { initializeTooltips, initializeFilters } from './template'
import { fillOutputBox } from './makeHtml' 

export default function draw(opts){
    console.log('drawing with', opts)
    const headline = opts.headline
    const cutline = opts.cutline
    const url = opts.url
    const totals = opts.data.totals
    const votesByDistrict = opts.data.votesByDistrict
    const gopSeats = votesByDistrict.filter(d => d.party === 'R')
    const demSeats = votesByDistrict.filter(d => d.party === 'D')
    const vizContainer = opts.container
  
    vizContainer.html("") // clears out viz div
  
    vizContainer.append('h2').text(headline);
    vizContainer.append('p').text(cutline);
  
    if (url){
        vizContainer.append('p')
        .html(
          '<a href="' + url + '" target="_blank">See more</a> on the bill.'
        );
    }
  
    vizContainer.append('p')
      .attr('class','vote-total-container')
      .html(
        '<span class="number-large">' + totals.overall.yea + '</span> ' +
        '<span class="support"> in favor</span> ' +
        '<span class="number-large">' + totals.overall.nay + '</span> ' +
        '<span class="oppose">opposed</span>'
      );
    var isPlural = ((totals.overall.absent + totals.overall.excused) === 1);
    var plural = isPlural ? '' : 's';
  
    vizContainer.append('p')
      .attr('class','vote-total-container')
      .html(
        '(With ' +
        '<span>' + (totals.overall.absent + totals.overall.excused) + '</span> ' +
        'lawmaker' + plural + ' excused or absent)'
      );
  
    vizContainer.append('h5')
      .attr('class','party-header')
      .html(
        '<span class="gop">Republicans</span>: ' +
        '<span class="number-small">' + totals.ofGOP.yea + '</span> ' +
        '<span class="support">in favor</span>, ' +
        '<span class="number-small">' + totals.ofGOP.nay + '</span> ' +
        '<span class="oppose">opposed</span>');
    drawDistricts(vizContainer, gopSeats, 'gop');
  
    vizContainer.append('h5')
      .attr('class','party-header')
      .html(
        '<span class="dem">Democrats</span>: ' +
        '<span class="number-small">' + totals.ofDems.yea + '</span> ' +
        '<span class="support">in favor</span>, ' +
        '<span class="number-small">' + totals.ofDems.nay + '</span> ' +
        '<span class="oppose">opposed</span>'
      );
    drawDistricts(vizContainer, demSeats, 'dem');
        
    // Interactivity - Re-add this
    // addFilterBar(vizContainer);
    // initializeTooltips(); // calls to template.js
    // initializeFilters(); // calls to template.js
    // fillOutputBox(); // calls back to main voteViz.js
  }
  
function drawDistricts(elem, votesToDraw, party){
    var districts = elem.append('div')
        .attr("class","district-container " + party)
        .selectAll('.district')
        .data(votesToDraw).enter();
    districts.append('div')
        .attr('class', 'district')
        .classed('yea', function(d){ return d.vote === "Y"; })
        .classed('nay', function(d){ return d.vote === "N"; })
        .classed('gop', function(d){ return d.party === "R"; })
        .classed('dem', function(d){ return d.party === "D"; })
        // Attrs to pass data to rendered version of object
        .attr('leg-name', function(leg){ return leg.firstName + ' ' + leg.lastName; })
        .attr('leg-party', function(leg){ return leg.party + '-' + leg.city; })
        .attr('leg-vote', function(leg){
        return capitalizeFirstLetter(voteKey[leg.vote])
        })
        .html(function(d){ return '<span>' + d.district + '</span>'; });
}
  
function addFilterBar(elem){
    // Filter button bar
    elem.append('div')
      .attr('id', 'filter-container')
      .html(
        '<label>Show:</label>' +
        '<div class="btn-group">' +
        // '<button class="btn btn-default btn-sm" id="filterGOP">GOP</button>' +
        // '<button class="btn btn-default btn-sm" id="filterDems">Dems</button>' +
        '<button class="btn btn-default btn-sm" id="filterYeas">In favor</button>' +
        '<button class="btn btn-default btn-sm" id="filterNays">Opposed</button>' +
        '<button class="btn btn-default btn-sm" id="filterReset">All votes</button>' +
        '</div>'
      );
}