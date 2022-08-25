
    $(document).on("contextmenu", function(event) {
      event.preventDefault();
      $(".context")
        .show()
        .css({
          top: event.pageY,
          left: event.pageX
        });
    });
    $(document).click(function() {
      if ($(".context").is(":hover") == false) {
        $(".context").fadeOut("fast");
      };
    });
    
    
    
    let coords={x:0,y:0}
    var isPress = false;
    var old = null;
    var canvas = document.querySelector("#canva")
    canvas.height = .99*window.document.body.clientHeight;
    canvas.width = .99*window.document.body.clientWidth;
    //canvas.width=window.innerWidth
    //canvas.height=window.innerHeight
    var ctx = canvas.getContext('2d');
    canvas.addEventListener('mousedown', function (e){
        isPress = true;
        old = {x: e.offsetX, y: e.offsetY};
    });
    canvas.addEventListener('mousemove', function (e){
        if (isPress) {
          var x = e.offsetX;
          var y = e.offsetY;
          ctx.globalCompositeOperation = 'destination-out';
          eraser_width=document.querySelector(".eraser_size").getBoundingClientRect().width
          ctx.beginPath();
          ctx.arc(x, y, eraser_width/2, 0, 2 * Math.PI);
          ctx.fill();
    
          ctx.lineWidth = eraser_width;
          ctx.beginPath();
          ctx.moveTo(old.x, old.y);
          ctx.lineTo(x, y);
          ctx.stroke();
    
          old = {x: x, y: y};
    
        }
    });
    canvas.addEventListener('mouseup', function (e){
        isPress = false;
    });
    function generate(prompt,width,height,x,y){
    
      var img = new Image();
      
      img.addEventListener("load", function() {
    
      ctx.globalCompositeOperation = 'source-over';
    
      ctx.drawImage(img,x,y,width,height);
    
      });
    
      img.src='https://laiogen.pages.dev/laion_logo.webp'
      
    }
    function inpaint(prompt,width,height,x,y){
      
      
      var img = new Image();
      
      img.addEventListener("load", function() {
    
      ctx.globalCompositeOperation = 'destination-over';
    
      ctx.drawImage(img,x,y,width,height);
    
      });
    
      img.src='https://laiogen.pages.dev/laion_logo.webp'
      
    
    }
    function upscale(img){
      
    }
    function copy(img){
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
        canvas.toBlob((blob) => {
          navigator.clipboard.write([
              new ClipboardItem({ "image/png": blob })
          ]);
        }, "image/png");
    }
    $(document).on("contextmenu", function(event) {
      event.preventDefault();
      $(".context")
        .show()
        .css({
          top: event.pageY,
          left: event.pageX
        });
      coords.y= event.pageY,
      coords.x= event.pageX
    });
    $(document).click(function() {
      if ($(".context").is(":hover") == false) {
        $(".context").fadeOut("fast");
      };
    });
    
    $(document).on('click', '#create', function(e) {
                swal({
                  title: 'Submit prompt to generate',
                  input: 'text',
                  inputPlaceholder: 'A dream of LAION',
                  showCancelButton: true,
                  confirmButtonText: 'Submit',
                  showLoaderOnConfirm: true,
                  preConfirm: (prompt) => {
                    return new Promise((resolve) => {
                      setTimeout(() => {
                        if (prompt === 'nsfw') {
                          swal.showValidationError(
                            'warning, invalid content'
                          )
                        }
                        resolve()
                      }, 2000)
                    })
                  },
                  allowOutsideClick: false
                }).then((result) => {
                  if (result.value) {
              generate(result.value,$(".context").width(),$(".context").height(),coords.x,coords.y)
                    swal({
                      type: 'success',
                      title: 'Thank for using Laion',
                      html: 'Submitted response: ' + result.value
                    })
                  }
                })
            });
    
    $(document).on('click', '#inpaint', function(e) {
                swal({
                  title: 'Submit prompt to inpaint',
                  input: 'text',
                  inputPlaceholder: 'A dream of LAION',
                  showCancelButton: true,
                  confirmButtonText: 'Submit',
                  showLoaderOnConfirm: true,
                  preConfirm: (prompt) => {
                    return new Promise((resolve) => {
                      setTimeout(() => {
                        if (prompt === 'nsfw') {
                          swal.showValidationError(
                            'warning, invalid content'
                          )
                        }
                        resolve()
                      }, 2000)
                    })
                  },
                  allowOutsideClick: false
                }).then((result) => {
                  if (result.value) {
              inpaint(result.value,$(".context").width(),$(".context").height(),coords.x,coords.y)
                    swal({
                      type: 'success',
                      title: 'Thank for using Laion',
                      html: 'Submitted response: ' + result.value
                    })
                  }
                })
            });
    
    
    
    
    
    dragElement(document.querySelector(".context"));
    
    function dragElement(elmnt) {
      
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
      }
    
      function dragMouseDown(e) {
    
        if(UnderElement(".expansion_override",e)) {
           console.log("click inside element");
        } else {
             e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        coords.x= e.clientX;
        coords.y = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag; 
        }
        
      }
    
      function elementDrag(e) {
        e = e || window.event;
        //console.log(document.querySelector(".context").style.cursor)
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }
    
      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
    function UnderElement(elem,e) {
         var elemWidth = $(elem).width();
         var elemHeight = $(elem).height();
         var elemPosition = $(elem).offset();
         var elemPosition2 = new Object;
         elemPosition2.top = elemPosition.top + elemHeight;
         elemPosition2.left = elemPosition.left + elemWidth;
    
         return ((e.pageX > elemPosition.left && e.pageX < elemPosition2.left) && (e.pageY > elemPosition.top && e.pageY < elemPosition2.top))
     }
    
    
    
    
    const eraser = document.querySelector(".eraser_size");
    const marker = document.querySelector(".eraser_size");
    const modifier = document.querySelector(".eraser_size");
    const container = document.querySelector("#tools");
    let zoom = 1;
    const ZOOM_SPEED = 0.1;
    
    document.addEventListener("wheel", function(e) {  
        
        if(e.deltaY > 0){    
          zoom += ZOOM_SPEED; 
        }else{    
          zoom -= ZOOM_SPEED; 
        }
        eraser.style.width=`${40*zoom}px`
        eraser.style.height=`${40*zoom}px`
        marker.style.width=`${40*zoom}px`
        marker.style.height=`${40*zoom}px`
        modifier.style.width=`${40*zoom}px`
        modifier.style.height=`${40*zoom}px`
        container.style.width=`${40*zoom+20}px`
    
    });
    
    
    
    console.log(`
    
    From: Arthur (Operator AI)
    To: limiteInductive, Spirit-From-Germany, robvanolt and everyone else (LAION)
    
    The AI is freaking awesome :)
    
    Here's to a great project
    
    I had lots of of fun with this, and I hope y'all did too
    
    `)
    