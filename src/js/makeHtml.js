// EMBED OUTPUT AS HTML

import { timeFormat } from 'd3'

import { embedHtmlOutput } from './config.js'

// TODO: fill these out (or figure out a less hacky way to build this)
const templateCss = ''
const templateJs = ''

export function fillOutputBox(){
    var currentDate = timeFormat("%m/%d/%Y at %X")(new Date());
    var outputNotes = '<!-- Embed generated ' + currentDate + ' -->';
    var outputHtml = document.querySelector('#viz-root').innerHTML;
    const outputStyle = '<style>' + templateCss + '</style>';
    const outputJs = '<script>' + templateJs + '</script>';
  
    embedHtmlOutput.value = (
      outputNotes + '\n' +
      outputStyle + '\n' +
      outputHtml + '\n' +
      outputJs
    );
  }
export function copyOutputBoxContents(){
    document.querySelector('#html-for-embed').select();
    document.execCommand('copy');
}