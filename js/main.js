!function(){
  $(function(){
    
    let canvas = document.querySelector('.drawIn');
    let clientHeight = document.documentElement.clientHeight;
    let clientWidth = document.documentElement.clientWidth;
    canvas.height = clientHeight - 68; // subtract bottom bar width
    canvas.width  = clientWidth - 6; // subtract border width 
    let prePoint = null; // pre point
    
    // bind events
    canvas.addEventListener('touchmove',function(e){
      e.preventDefault();
      let clientX = e.touches[0].clientX;
      let clientY = e.touches[0].clientY;
      let $index = $('.pen-tool').filter('.current').index();
      
      if($index == 0){
        if(prePoint){
          let ctx = canvas.getContext('2d');
          ctx.fillStyle = 'cyan';
          ctx.lineWidth = 1;
          ctx.strokeStyle = '#3cc';
          ctx.beginPath();
          ctx.moveTo(prePoint.x,prePoint.y);
          ctx.lineTo(clientX,clientY);
          ctx.stroke();
        }
        prePoint = {
          x:clientX,
          y:clientY
        }
      }else if($index == 1) {
        let ctx = canvas.getContext('2d');
        ctx.clearRect(clientX-10,clientY-10,20,20);
      }
    })

    canvas.addEventListener('touchend',function(){
      prePoint = null; // reset , or your line will start at the last point
    })

    $('.store').on('click',function(){
      let ctx = canvas.getContext('2d');
      let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
      for (let i = 0; i < imgData.data.length; i+=4) {
        // pixel bgc transparent -> white
        if(imgData.data[i+3]==0){
          imgData.data[i] = 255;
          imgData.data[i + 1] = 255;
          imgData.data[i + 2] = 255;
          imgData.data[i + 3] = 255;
        } 
      }
      ctx.putImageData(imgData,0,0);
      
      // https://segmentfault.com/a/1190000003853394
      // http://www.alloyteam.com/2014/01/use-js-file-download/
      // https://stackoverflow.com/questions/923885/capture-html-canvas-as-gif-jpg-png-pdf
      let image = canvas.toDataURL("image/png");
      let a = document.createElement('a');
      a.download = image;
      a.click();
    })

    $('.reset').on('click',function(){
      let ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
    })

    function init(){
      // click draw and eraser , add visual change
      $('.pen-tool').on('click',function(e){
        let $li = $(e.currentTarget);
        $li.addClass('current').siblings().removeClass('current');
      });

    }

    init();

  })
}()
