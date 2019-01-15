// DATA PROCESSING

import { voteKey } from './config'

export default function processData(text, roster){
    var parsedVoteText = parseVoteText(text);
    var mergedVotes = mergeVotesWithRoster(parsedVoteText, roster);
    var sortedVotes = mergedVotes.sort(function(a, b){
        // Sorts ascending by district number
        return (+a.districtNum > +b.districtNum) ? 1 : -1;
    });
    var voteTotals = calcTotals(sortedVotes);

    return {
        votesByDistrict: sortedVotes,
        totals: voteTotals
    };
}
  
  function calcTotals(data){
    var voteTotals = {
      overall: { yea: 0, nay: 0, absent: 0, excused: 0, totalRecorded: data.length, },
      ofDems: { yea: 0, nay: 0, absent: 0, excused: 0, numInParty: 0, },
      ofGOP: { yea: 0, nay: 0, absent: 0, excused: 0, numInParty: 0, },
      ofOther: { yea: 0, nay: 0, absent: 0, excused: 0, numInParty: 0, }
    }
    data.forEach(function(leg){
      let currentParty = 'ofOther';
      if (leg.party === 'D') {
        currentParty = 'ofDems';
      } else if (leg.party === 'R'){
        currentParty = 'ofGOP';
      }
      let voteType = voteKey[leg.vote] || 'other';
      if (voteType === 'other') {
        console.log('Error: vote recorded as', leg.vote);
      }
      voteTotals['overall'][voteType] += 1;
      voteTotals[currentParty][voteType] += 1;
      voteTotals[currentParty]['numInParty'] += 1;
    })
    return voteTotals;
}
  
function parseVoteText(text){
    // parses raw vote text, returning array of {'name', 'vote'} objects
  
    // replace '--' in committee votes with 'A' for absent
    text = text.replace(/\-{2}/g,'A');
  
    // Regex to match 'V  Last, First' legislator name pattern
    var voteRe = /[NYAE]\s{1,2}/;
    // var nameRe = /[A-Z][']?[\w\-\s]+, [\w]+( \w{2,})?/;
    var nameRe = /[A-Z][']?[\w\-\s]+, [\w]+( \w{2,})?(\s\(\w+\))?/;
    /* Explanation
    - [NYAE] matches vote indicators (Nay, Aye, Absent, Excused)
    - \s{1,2} matches one or two characters of white space following vote letter
    - [A-Z][']?[\w\-\s]+ matches last name, including second-letter apostrophes, hyphens and dual last names separated by single space
    - [\w]+ matches first name
    - ( \w{2,})? matchs optional second first name (e.g. "Mary Ann")
    - (\s\(\w+\))? matches optional nickname in parenthesis, e.g. (Eric)

    */
    var voteNameRe = new RegExp(voteRe.source + nameRe.source, 'g');
  
    var votesAndNames = text.match(voteNameRe);

    var voteNamesParsed = votesAndNames.map(function(voteAndName){
      var leg = {}
      // Messiness through here to deal with variable whitespace after vote letter
      var voteString = voteAndName.match(voteRe)[0];
      leg.name = voteAndName.slice(voteString.length);
      leg.vote = voteString.trim();
      return leg;
    });
    // console.log('parsedText', voteNamesParsed);
    return voteNamesParsed;
}
  
function mergeVotesWithRoster(votes, roster){
    const merged = votes.map(vote => {
      const match = roster.find(d => d.laws_vote_name.toUpperCase() === vote.name.toUpperCase())
      console.assert(match, `No match for ${vote.name}`)
      if (match) return {
        firstName: match.first_name,
        lastName: match.last_name,
        laws_name: vote.name,
        district: match.district,
        districtNum: match.district_num,
        party: match.party,
        city: match.city,
        vote: vote.vote,
      }
    })
    // console.log('m', merged)
    return merged;
}