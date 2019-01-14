// MAKE STATIC IMAGE OF OUTPUT

import $ from 'jquery'
import html2canvas from 'html2canvas'
  
export function makeDownloadImage(){
    var exportWidth = 600; //1200
    var exportHeight = 300; //630
    var initialScale = 0.5;
    var tolerance = 10;
  
    var sourceElements = $('#viz-root')
      .find('.vote-total-container, .party-header, .district-container');
    var renderContainer = $('.image-export');
    sourceElements.clone().appendTo(renderContainer);
  
    // For FB: 1.91:1 aspect size, at least 1200 x 630 px
  
    renderContainer.css({
      'width': exportWidth + 'px',
      'height': 'auto',
      'transform': 'scale(1)',
      'transform-origin': 'top left'
    });
  
    // scale up contents to fill exportWidth and exportHeight
    let curHeight = renderContainer.outerHeight();
    console.log('scaling', curHeight, (exportHeight - tolerance))
    let curScale = initialScale;
    // while (curHeight < exportHeight - tolerance){
    //   curScale += 1; // was 0.01
    //   renderContainer.css('transform', 'scale(' + curScale + ')');
    //   renderContainer.css('width', exportWidth / curScale + 'px');
    //   curHeight = renderContainer.outerHeight();
    //   console.log('scale iter', curHeight, curScale, (exportHeight - tolerance))
    // }
  
    const html2canvasOptions = {
      background: '#fff',
      height: curHeight, // was exportHeight
      width: exportWidth,
    }

    // renderContainer is jQuery selection array, not element
    html2canvas(renderContainer[0], html2canvasOptions)
        .then((canvas) => {
            $("#trigger-image-download").on('click', function(){
                console.log('dc')
                this.href = canvas.toDataURL('image/png');
                this.download = 'vote-map.png';
            });
            renderContainer.html("")

            // preview image
            const imagePreview = $('#image-preview')
            imagePreview.html('')
            imagePreview[0].appendChild(canvas)
        });
}