// MAKE STATIC IMAGE OF OUTPUT

import $ from 'jquery'
import html2canvas from 'html2canvas'
  
export function makeDownloadImage(){
    console.log('makeDownload');
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
    var curHeight = renderContainer.outerHeight();
    var curScale = initialScale;
    while (curHeight < exportHeight - tolerance){
      curScale += 0.01;
      renderContains.css('display', 'block')
      renderContainer.css('transform', 'scale(' + curScale + ')');
      renderContainer.css('width', exportWidth / curScale + 'px');
      curHeight = renderContainer.outerHeight();
    }
  
    var options = {
    //   onrendered: function(canvas){
    //     // $("#trigger-image-download").on('click', function(){
    //     //   this.href = canvas.toDataURL('image/png');
    //     //   this.download = 'vote-map.png';
  
    //     // });
    //     // $('.static-image-indicator').text('Yes');
    //     // renderContainer.html("");
    //   },
      background: '#fff',
      height: exportHeight,
      width: exportWidth,
    }

    // elegantize --> renderContainer is jQuery selection array, not element
    console.log('rc', renderContainer)
    html2canvas(renderContainer[0], options)
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