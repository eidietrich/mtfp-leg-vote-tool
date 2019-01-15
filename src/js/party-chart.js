// DRAW GRAPHIC

// style
require('./../styles/party-chart.scss')

import { capitalizeFirstLetter } from './utils'
import { voteKey, partyKey } from './config'

import d3 from 'd3';

import { initializeTooltips, initializeFilters } from './template'
import { fillOutputBox } from './makeHtml' 

export default function drawOldChart(opts){
    console.log('drawing with', opts)
    const headline = opts.headline
    const cutline = opts.cutline
    const url = opts.url
    const data = opts.data
    const totals = opts.data.totals
    // const votesByDistrict = opts.data.votesByDistrict
    // const gopSeats = votesByDistrict.filter(d => d.party === 'R')
    // const demSeats = votesByDistrict.filter(d => d.party === 'D')
    const vizContainer = opts.container
  
    vizContainer.html("") // clears out viz div
  
    vizContainer.append('h4').text(headline);
    vizContainer.append('div').text(cutline);
  
    if (url){
        vizContainer.append('p')
        .html(
          '<a href="' + url + '" target="_blank">See more</a> on the bill.'
        );
    }
    
    vizContainer.append('hr').attr('class','graphic-hr')
    vizContainer.append('div')
      .attr('class','vote-total-container')
      .html(
        `<span class="number-large">${totals.overall.yea}</span> in favor - <span class="number-large">${totals.overall.nay}</span> opposed`
      );
    vizContainer.append('hr').attr('class','graphic-hr')

    drawGrid(vizContainer, data)
    
    var sIfPlural = ((totals.overall.absent + totals.overall.excused) === 1) ? '' : 's';
    vizContainer.append('div')
    //   .attr('class','vote-total-container')
      .html(`${totals.overall.absent + totals.overall.excused} lawmaker${sIfPlural} excused/absent`)

    addMTFPCredit(vizContainer)
        
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

function drawGrid(elem, data){
    console.log(data)
    const bySeat = data.votesByDistrict
    const totals = data.totals
    const grid = elem.append('div').attr('class', 'grid-container')

    const headerRow = grid.append('div').attr('class', 'header-row')
    headerRow.append('div').attr('class','label-header') // spacing element
    headerRow.append('div').attr('class','header aye').text('For')
    headerRow.append('div').attr('class','header').text('Against')

    const gopRow = grid.append('div').attr('class', 'grid-row gop')
    const gopRowLabel = gopRow.append('div').attr('class', 'grid-row-label gop')
    gopRowLabel.append('div').attr('class','head').text('GOP')
    gopRowLabel.append('div').text(`${totals.ofGOP.yea}-${totals.ofGOP.nay}`)
    const gopAyeCol = gopRow.append('div').attr('class', 'grid-col gop aye')
    const gopNayCol = gopRow.append('div').attr('class', 'grid-col gop nay')

    const demRow = grid.append('div').attr('class', 'grid-row dem')
    const demRowLabel = demRow.append('div').attr('class', 'grid-row-label dem')
    demRowLabel.append('div').attr('class','head').text('Dem')
    demRowLabel.append('div').text(`${totals.ofDems.yea}-${totals.ofDems.nay}`)
    const demAyeCol = demRow.append('div').attr('class', 'grid-col dem aye')
    const demNayCol = demRow.append('div').attr('class', 'grid-col dem nay')

    gopAyeCol.selectAll('.seat')
        .data(getSeats(bySeat,'R','Y'))
        .enter().call(drawSeat)
    gopNayCol.selectAll('.seat')
        .data(getSeats(bySeat,'R','N'))
        .enter().call(drawSeat)
    demAyeCol.selectAll('.seat')
        .data(getSeats(bySeat,'D','Y'))
        .enter().call(drawSeat)
    demNayCol.selectAll('.seat')
        .data(getSeats(bySeat,'D','N'))
        .enter().call(drawSeat)
}

function getSeats(bySeat, party, vote){
    let filtered = bySeat.filter(d => d.party === party && d.vote === vote)
    const remaniningInParty = bySeat.filter(d => d.party === party && d.vote !== vote)
    remaniningInParty.forEach(d => {
        filtered.push({})
    })
    
    return filtered;
}

// function getSeats(bySeat, party, vote){
//     return bySeat.filter(d => d.party === party && d.vote === vote)
// }

function drawSeat(elem){
    elem.append('div')
        .attr('class', d=> `seat ${partyKey[d.party] || 'empty'}`)
        // .html(d => d.districtNum)
    // .text('x')
}

function addMTFPCredit(elem){
    elem.append('div')
        .attr('class', 'credit')
        .text("MTFP / Montana Free Press")
}