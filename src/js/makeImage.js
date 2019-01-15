// MAKE STATIC IMAGE OF OUTPUT

import $ from 'jquery'
import html2canvas from 'html2canvas'

import { exportImageWidth, exportImageHeight } from './config'
  
export function makeDownloadImage(){
    // For FB: 1.91:1 aspect size, at least 1200 x 630 px
    // TODO: Break this out
    // var exportWidth = 800; //1200
    const exportWidth = +exportImageWidth.value
    // var exportAspect = 0.5
    // var exportHeight = exportWidth * exportAspect
    // const exportHeight = 400;
    const exportHeight = +exportImageHeight.value
    var initialScale = 0.1;
    var tolerance = 0;
    console.log('x', exportWidth, exportHeight)

    const renderContainer = $('.image-export');
    const elementsToRender = $('#viz-container')
    elementsToRender.clone().appendTo(renderContainer);
  
    // TODO: Troubleshoot this - need to think more clearly
    // about which elements are being resized and which being measured
    renderContainer.css({'display':'block'})
    renderContainer.css({
      'width': exportWidth + 'px',
      'height': 'auto',
      'transform': `scale(${initialScale})`,
      'transform-origin': 'top left',
      'position': 'fixed',
      // 'top': -10,
    });
  
    // renderContainer to fill exportWidth and exportHeight
    // let curHeight = renderContainer.outerHeight();
    let curHeight = renderContainer[0].getBoundingClientRect().height;
    // let curHeight = renderContainer.getBoundingClientRect().height
    let curScale = initialScale;
    // console.log(curScale, curHeight, (exportHeight - tolerance))
    while (curHeight < (exportHeight - tolerance)){
      curScale += 0.01;
      renderContainer.css('transform', 'scale(' + curScale + ')')
      renderContainer.css('width', exportWidth / curScale + 'px')
      curHeight = curHeight = renderContainer[0].getBoundingClientRect().height;
      // console.log(curScale, curHeight, (exportHeight - tolerance))
    }

    // renderContainer is jQuery selection array, not element

    html2canvas(renderContainer[0], {
      background: '#fff',
      height: curHeight, // was exportHeight
      width: exportWidth,
    })
    .then((canvas) => {
        $("#trigger-image-download").on('click', function(){
            this.href = canvas.toDataURL('image/png');
            this.download = 'mt-leg-vote.png';
        });
        renderContainer.html("")
        renderContainer.css({'display':'none'})

        // preview image
        const imagePreview = $('#image-preview')
        imagePreview.html('')
        imagePreview[0].appendChild(canvas)
    });
}