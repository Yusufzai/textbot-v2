new ClipboardJS('.input-group-text');


// Functionaliy for Showing the timer when audio is recording
function secondsToHmsVideo(d) {
	d = Number(d);

	// var h = Math.floor(d / 3600);
	var m = Math.floor(d % 3600 / 60);
	var s = Math.floor(d % 3600 % 60);

	return ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
}


var id = document.getElementById("drawflow");
    const editor = new Drawflow(id);
    editor.reroute = false;
    editor.reroute_fix_curvature = false;
    editor.force_first_input = false;
    editor.useuuid = true; // Default


    editor.updateConnectionNodes = function  (id) {

        // Aquí nos quedamos;
        const idSearch = 'node_in_'+id;
        const idSearchOut = 'node_out_'+id;
        var line_path = this.line_path/2;
        const container = this.container;
        const precanvas = this.precanvas;
        const curvature = this.curvature;
        const createCurvature = this.createCurvature;
        const reroute_curvature = this.reroute_curvature;
        const reroute_curvature_start_end = this.reroute_curvature_start_end;
        const reroute_fix_curvature = this.reroute_fix_curvature;
        const rerouteWidth = this.reroute_width;
        const zoom = this.zoom;
        let precanvasWitdhZoom = precanvas.clientWidth / (precanvas.clientWidth * zoom);
        precanvasWitdhZoom = precanvasWitdhZoom || 0;
        let precanvasHeightZoom = precanvas.clientHeight / (precanvas.clientHeight * zoom);
        precanvasHeightZoom = precanvasHeightZoom || 0;
        
        const elemsOut = container.querySelectorAll(`.${idSearchOut}`);
        
        Object.keys(elemsOut).map(function(item, index) {
          if(elemsOut[item].querySelector('.point') === null) {
        
            var elemtsearchId_out = container.querySelector(`#${id}`);
        
            var id_search = elemsOut[item].classList[1].replace('node_in_', '');
            var elemtsearchId = container.querySelector(`#${id_search}`);
        
            var elemtsearch = elemtsearchId.querySelectorAll('.'+elemsOut[item].classList[4])[0]
        
            var eX = elemtsearch.offsetWidth/2 + (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
            var eY = elemtsearch.offsetHeight/2 + (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
        
            var elemtsearchOut = elemtsearchId_out.querySelectorAll('.'+elemsOut[item].classList[3])[0]
        
            var line_x =  elemtsearchOut.offsetWidth/2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
            var line_y =  elemtsearchOut.offsetHeight/2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
        
            var x = eX;
            var y = eY;
        
            const lineCurve = createCurvature(line_x, line_y, x, y, curvature, 'openclose');
            elemsOut[item].children[0].setAttributeNS(null, 'd', lineCurve );
          } else {
            const points = elemsOut[item].querySelectorAll('.point');
            let linecurve = '';
            const reoute_fix = [];
            points.forEach((item, i) => {
              if(i === 0 && ((points.length -1) === 0)) {
        
                var elemtsearchId_out = container.querySelector(`#${id}`);
                var elemtsearch = item;
        
                var eX =  (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
                var eY =  (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
        
                var elemtsearchOut = elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[3])[0]
                var line_x =  elemtsearchOut.offsetWidth/2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
                var line_y =  elemtsearchOut.offsetHeight/2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
                var x = eX;
                var y = eY;
        
                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'open');
                linecurve += lineCurveSearch;
                reoute_fix.push(lineCurveSearch);
        
                var elemtsearchId_out = item;
                var id_search = item.parentElement.classList[1].replace('node_in_', '');
                var elemtsearchId = container.querySelector(`#${id_search}`);
                var elemtsearch = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[4])[0]
        
                var elemtsearchIn = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[4])[0]
                var eX =  elemtsearchIn.offsetWidth/2 + (elemtsearchIn.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
                var eY =  elemtsearchIn.offsetHeight/2 + (elemtsearchIn.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
        
        
                var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
                var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
                var x = eX;
                var y = eY;
        
                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'close');
                linecurve += lineCurveSearch;
                reoute_fix.push(lineCurveSearch);
        
              } else if(i === 0) {
        
                var elemtsearchId_out = container.querySelector(`#${id}`);
                var elemtsearch = item;
        
                var eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
                var eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
        
                var elemtsearchOut = elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[3])[0]
                var line_x =  elemtsearchOut.offsetWidth/2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
                var line_y =  elemtsearchOut.offsetHeight/2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
        
                var x = eX;
                var y = eY;
        
                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'open');
                linecurve += lineCurveSearch;
                reoute_fix.push(lineCurveSearch);
        
                // SECOND
                var elemtsearchId_out = item;
                var elemtsearch = points[i+1];
        
                var eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
                var eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
                var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
                var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
                var x = eX;
                var y = eY;
        
                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature, 'other');
                linecurve += lineCurveSearch;
                reoute_fix.push(lineCurveSearch);
        
              } else if (i === (points.length -1)) {
        
                var elemtsearchId_out = item;
        
                var id_search = item.parentElement.classList[1].replace('node_in_', '');
                var elemtsearchId = container.querySelector(`#${id_search}`);
                var elemtsearch = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[4])[0]
        
                var elemtsearchIn = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[4])[0]
                var eX =  elemtsearchIn.offsetWidth/2 + (elemtsearchIn.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
                var eY =  elemtsearchIn.offsetHeight/2 + (elemtsearchIn.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
                var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * (precanvas.clientWidth / (precanvas.clientWidth * zoom)) + rerouteWidth;
                var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * (precanvas.clientHeight / (precanvas.clientHeight * zoom)) + rerouteWidth;
                var x = eX;
                var y = eY;
        
                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'close');
                linecurve += lineCurveSearch;
                reoute_fix.push(lineCurveSearch);
        
              } else {
                var elemtsearchId_out = item;
                var elemtsearch = points[i+1];
        
                var eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * (precanvas.clientWidth / (precanvas.clientWidth * zoom)) + rerouteWidth;
                var eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * (precanvas.clientHeight / (precanvas.clientHeight * zoom)) +rerouteWidth;
                var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * (precanvas.clientWidth / (precanvas.clientWidth * zoom)) + rerouteWidth;
                var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * (precanvas.clientHeight / (precanvas.clientHeight * zoom)) + rerouteWidth;
                var x = eX;
                var y = eY;
        
                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature, 'other');
                linecurve += lineCurveSearch;
                reoute_fix.push(lineCurveSearch);
              }
        
            });
            if(reroute_fix_curvature) {
              reoute_fix.forEach((itempath, i) => {
                elemsOut[item].children[i].setAttributeNS(null, 'd', itempath);
              });
        
            } else {
              elemsOut[item].children[0].setAttributeNS(null, 'd', linecurve);
            }
        
          }
        })
        
        const elems = container.querySelectorAll(`.${idSearch}`);
        Object.keys(elems).map(function(item, index) {
        
          if(elems[item].querySelector('.point') === null) {
            var elemtsearchId_in = container.querySelector(`#${id}`);
        
            var id_search = elems[item].classList[2].replace('node_out_', '');
            var elemtsearchId = container.querySelector(`#${id_search}`);
            var elemtsearch = elemtsearchId.querySelectorAll('.'+elems[item].classList[3])[0]
        
            var line_x = elemtsearch.offsetWidth/2 + (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
            var line_y = elemtsearch.offsetHeight/2 + (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
        
            var elemtsearchId_in = elemtsearchId_in.querySelectorAll('.'+elems[item].classList[4])[0]
            var x = elemtsearchId_in.offsetWidth/2 + (elemtsearchId_in.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
            var y = elemtsearchId_in.offsetHeight/2 + (elemtsearchId_in.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
        
            const lineCurve = createCurvature(line_x, line_y, x, y, curvature, 'openclose');
            elems[item].children[0].setAttributeNS(null, 'd', lineCurve );
        
          } else {
            const points = elems[item].querySelectorAll('.point');
            let linecurve = '';
            const reoute_fix = [];
            points.forEach((item, i) => {
              if(i === 0 && ((points.length -1) === 0)) {
        
                var elemtsearchId_out = container.querySelector(`#${id}`);
                var elemtsearch = item;
        
                var line_x = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
                var line_y = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom +rerouteWidth;
        
                var elemtsearchIn = elemtsearchId_out.querySelectorAll('.'+item.parentElement.classList[4])[0]
                var eX =  elemtsearchIn.offsetWidth/2 + (elemtsearchIn.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
                var eY =  elemtsearchIn.offsetHeight/2 + (elemtsearchIn.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
        
                var x = eX;
                var y = eY;
        
                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'close');
                linecurve += lineCurveSearch;
                reoute_fix.push(lineCurveSearch);
        
                var elemtsearchId_out = item;
                var id_search = item.parentElement.classList[2].replace('node_out_', '');
                var elemtsearchId = container.querySelector(`#${id_search}`);
                var elemtsearch = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[3])[0]
        
                var elemtsearchOut = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[3])[0]
                var line_x =  elemtsearchOut.offsetWidth/2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
                var line_y =  elemtsearchOut.offsetHeight/2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
        
                var eX = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
                var eY = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
                var x = eX;
                var y = eY;
        
                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'open');
                linecurve += lineCurveSearch;
                reoute_fix.push(lineCurveSearch);
        
        
              } else if(i === 0) {
                // FIRST
                var elemtsearchId_out = item;
                var id_search = item.parentElement.classList[2].replace('node_out_', '');
                var elemtsearchId = container.querySelector(`#${id_search}`);
                var elemtsearch = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[3])[0]
                var elemtsearchOut = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[3])[0]
                var line_x =  elemtsearchOut.offsetWidth/2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
                var line_y =  elemtsearchOut.offsetHeight/2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
        
                var eX = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
                var eY = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
                var x = eX;
                var y = eY;
        
                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'open');
                linecurve += lineCurveSearch;
                reoute_fix.push(lineCurveSearch);
        
                // SECOND
                var elemtsearchId_out = item;
                var elemtsearch = points[i+1];
        
                var eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
                var eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom +rerouteWidth;
                var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
                var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
                var x = eX;
                var y = eY;
        
                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature, 'other');
                linecurve += lineCurveSearch;
                reoute_fix.push(lineCurveSearch);
        
              } else if (i === (points.length -1)) {
        
                var elemtsearchId_out = item;
        
                var id_search = item.parentElement.classList[1].replace('node_in_', '');
                var elemtsearchId = container.querySelector(`#${id_search}`);
                var elemtsearch = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[4])[0]
        
                var elemtsearchIn = elemtsearchId.querySelectorAll('.'+item.parentElement.classList[4])[0]
                var eX =  elemtsearchIn.offsetWidth/2 + (elemtsearchIn.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
                var eY =  elemtsearchIn.offsetHeight/2 + (elemtsearchIn.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
        
                var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
                var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
                var x = eX;
                var y = eY;
        
                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'close');
                linecurve += lineCurveSearch;
                reoute_fix.push(lineCurveSearch);
        
              } else {
        
                var elemtsearchId_out = item;
                var elemtsearch = points[i+1];
        
                var eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
                var eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom +rerouteWidth;
                var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom + rerouteWidth;
                var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom + rerouteWidth;
                var x = eX;
                var y = eY;
        
                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature, 'other');
                linecurve += lineCurveSearch;
                reoute_fix.push(lineCurveSearch);
              }
        
            });
            if(reroute_fix_curvature) {
              reoute_fix.forEach((itempath, i) => {
                elems[item].children[i].setAttributeNS(null, 'd', itempath);
              });
        
            } else {
              elems[item].children[0].setAttributeNS(null, 'd', linecurve);
            }
        
          }
        })
        
        // NEW CODE 
        const elemsOutIn = container.querySelectorAll(`.${idSearchOut}.${idSearch}`);
        Object.keys(elemsOutIn).map(function(item, index) {
        
         
        
          var elemtsearchId_out = container.querySelector(`#${id}`);
        
          var id_search = elemsOut[item].classList[1].replace('node_in_', '');
          var elemtsearchId = container.querySelector(`#${id_search}`);
          var elemtsearch = elemtsearchId_out.querySelectorAll('.'+elemsOutIn[item].classList[4])[0]
        
        
          var eX = elemtsearch.offsetWidth/2 + (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
          var eY = elemtsearch.offsetHeight/2 + (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
        
          var elemtsearchOut = elemtsearchId_out.querySelectorAll('.'+elemsOutIn[item].classList[3])[0]
        
          var line_x =  elemtsearchOut.offsetWidth/2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x ) * precanvasWitdhZoom;
          var line_y =  elemtsearchOut.offsetHeight/2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y ) * precanvasHeightZoom;
        
          var x = eX;
          var y = eY;
        
        // THIS LINE MODIFI WITH YOU CURVATURE
        
        //  let linecurve = ' M '+ line_x +' '+ line_y + ' L '+(line_x)+' '+(line_y+40)+' L '+(x+350)+ ' '+(line_y+40)+' L ' + (x+350) +'  ' + (y-45) +' L ' + (x) +'  ' + (y-48) + ' L ' + (x) +'  ' + (y+2) + ' L ' + (x-10) +'  ' + (y-16) + ' L ' + (x+10) +'  ' + (y-15) + ' L ' + (x) +'  ' + (y+6);

          let linecurve = ' M '+ line_x +' '+ line_y + ' L '+(line_x)+' '+(line_y+40)+' L '+(x+350)+ ' '+(line_y+40)+' L ' + (x+350) +'  ' + (y-45) +' L ' + (x) +'  ' + (y-45) + ' L ' + (x) +'  ' + (y-12) + ' L ' + (x-5) +'  ' + (y-19) + ' L ' + (x+7) +'  ' + (y-19) + ' L ' + (x) +'  ' + (y-10);
          
          elemsOutIn[item].children[0].setAttributeNS(null, 'd', linecurve);
        
        });
        
        // END NEW CODE
        
        
        }


    editor.curvature = 0;
    editor.reroute_curvature_start_end = 0;
    editor.reroute_curvature = 0;


    editor.createCurvature = function(start_pos_x, start_pos_y, end_pos_x, end_pos_y, curvature_value, type) {
        var line_x = start_pos_x;
        var line_y = start_pos_y;
        var x = end_pos_x;
        var y = end_pos_y;
        var curvature = curvature_value;
        //type openclose open close other
        switch (type) {
          case 'open':
            if(start_pos_x >= end_pos_x) {
              var hx1 = line_x + Math.abs(x - line_x) * curvature;
              var hx2 = x - Math.abs(x - line_x) * (curvature*-1);
            } else {
              var hx1 = line_x + Math.abs(x - line_x) * curvature;
              var hx2 = x - Math.abs(x - line_x) * curvature;
            }

            // console.log('iod 1')
            
            return ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;
  
            break
          case 'close':
            if(start_pos_x >= end_pos_x) {
              var hx1 = line_x + Math.abs(x - line_x) * (curvature*-1);
              var hx2 = x - Math.abs(x - line_x) * curvature;
            } else {
              var hx1 = line_x + Math.abs(x - line_x) * curvature;
              var hx2 = x - Math.abs(x - line_x) * curvature;
            }
            
            // console.log('iod 2')
            //M0 75H10L5 80L0 75Z
  
            return ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y +' M '+ (x-11)  + ' ' + y + ' L'+(x-20)+' '+ (y-5)+'  L'+(x-20)+' '+ (y+5)+'Z';
            break;
          case 'other':
            if(start_pos_x >= end_pos_x) {
              var hx1 = line_x + Math.abs(x - line_x) * (curvature*-1);
              var hx2 = x - Math.abs(x - line_x) * (curvature*-1);
            } else {
              var hx1 = line_x + Math.abs(x - line_x) * curvature;
              var hx2 = x - Math.abs(x - line_x) * curvature;
            }

            // console.log('iod 3')
            return ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;
            break;
          default:
  
            // var hx1 = line_x + Math.abs(x - line_x) * curvature;
            // var hx2 = x - Math.abs(x - line_x) * curvature;

            // console.log('iod 4')
  
            //return ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y;
            // return ' M '+ line_x +' '+ line_y +' C '+ hx1 +' '+ line_y +' '+ hx2 +' ' + y +' ' + x +'  ' + y +' M '+ (x-11)  + ' ' + y + ' L'+(x-20)+' '+ (y-5)+'  L'+(x-20)+' '+ (y+5)+'Z';


            // var center_x = ((end_pos_x - start_pos_x)/2)+start_pos_x;
            // return ' M ' + start_pos_x + ' ' + start_pos_y + ' L '+ center_x +' ' +  start_pos_y  + ' L ' + center_x + ' ' +  end_pos_y  + ' L ' + end_pos_x + ' ' + end_pos_y +' M '+ (x-11)  + ' ' + y + ' L'+(x-20)+' '+ (y-5)+'  L'+(x-20)+' '+ (y+5)+'Z';


            var center_y = ((end_pos_y - start_pos_y)/2)+start_pos_y;
            return ' M ' + start_pos_x + ' ' + start_pos_y + ' L '+ start_pos_x +' ' +  center_y  + ' L ' + end_pos_x + ' ' +  center_y  + ' L ' + end_pos_x + ' ' + end_pos_y +' M '+ x  + ' ' + (y-12) + ' L'+(x+5)+' '+ (y-22)+'  L'+(x-5)+' '+ (y-22)+'Z';
            // return ' M ' + start_pos_x + ' ' + start_pos_y + ' L '+ start_pos_x +' ' +  center_y  + ' L ' + end_pos_x + ' ' +  center_y  + ' L ' + end_pos_x + ' ' + end_pos_y +' M26 48 L32 48 L38 48 L32 54 Z';
            // return ' M ' + start_pos_x + ' ' + start_pos_y + ' L '+ start_pos_x +' ' +  center_y  + ' L ' + end_pos_x + ' ' +  center_y  + ' L ' + end_pos_x + ' ' + end_pos_y +' M '+ x  + ' ' +(y-11) + ' L'+(x-5)+' '+ (y-20)+'  L'+(x-5)+' '+ (y+20)+'Z';;
            // return ' M ' + start_pos_x + ' ' + start_pos_y + ' L '+ start_pos_x +' ' +  center_y  + ' L ' + end_pos_x + ' ' +  center_y  + ' L ' + end_pos_x + ' ' + end_pos_y + ' M '+ (x-11)  + ' ' + y + ' L'+(x-20)+' '+ (y-5)+'  L'+(x-20)+' '+ (y+5)+'Z';

            
        }
  
      }
    
    

    editor.dragEnd =  function(e) {
        if (e.type === "touchend") {
          var e_pos_x = this.mouse_x;
          var e_pos_y = this.mouse_y;
          var ele_last = document.elementFromPoint(e_pos_x, e_pos_y);
        } else {
          var e_pos_x = e.clientX;
          var e_pos_y = e.clientY;
          var ele_last = e.target;
        }
    
        if(this.drag) {
          if(this.pos_x_start != e_pos_x || this.pos_y_start != e_pos_y) {
            this.dispatch('nodeMoved', this.ele_selected.id.slice(5));
          }
        }
    
        if(this.drag_point) {
          this.ele_selected.classList.remove("selected");
            if(this.pos_x_start != e_pos_x || this.pos_y_start != e_pos_y) {
              this.dispatch('rerouteMoved', this.ele_selected.parentElement.classList[2].slice(14));
            }
        }
    
        if(this.editor_selected) {
          this.canvas_x = this.canvas_x + (-(this.pos_x - e_pos_x));
          this.canvas_y = this.canvas_y + (-(this.pos_y - e_pos_y));
          this.editor_selected = false;
        }
        if(this.connection === true) {
          if(ele_last.classList[0] === 'input' || (this.force_first_input && (ele_last.closest(".drawflow_content_node") != null || ele_last.classList[0] === 'drawflow-node'))) {
    
            if(this.force_first_input && (ele_last.closest(".drawflow_content_node") != null || ele_last.classList[0] === 'drawflow-node')) {
              if(ele_last.closest(".drawflow_content_node") != null) {
                var input_id = ele_last.closest(".drawflow_content_node").parentElement.id;
              } else {
                var input_id = ele_last.id;
              }
             if(Object.keys(this.getNodeFromId(input_id.slice(5)).inputs).length === 0) {
               var input_class = false;
             } else {
              var input_class = "input_1";
             }
    
    
           } else {
             // Fix connection;
             var input_id = ele_last.parentElement.parentElement.id;
             var input_class = ele_last.classList[1];
           }
           var output_id = this.ele_selected.parentElement.parentElement.id;
           var output_class = this.ele_selected.classList[1];
    
            if( input_class !== false) {
    
              if(this.container.querySelectorAll('.connection.node_in_'+input_id+'.node_out_'+output_id+'.'+output_class+'.'+input_class).length === 0) {
              // Conection no exist save connection
    
              this.connection_ele.classList.add("node_in_"+input_id);
              this.connection_ele.classList.add("node_out_"+output_id);
              this.connection_ele.classList.add(output_class);
              this.connection_ele.classList.add(input_class);
              var id_input = input_id.slice(5);
              var id_output = output_id.slice(5);
    
              this.drawflow.drawflow[this.module].data[id_output].outputs[output_class].connections.push( {"node": id_input, "output": input_class});
              this.drawflow.drawflow[this.module].data[id_input].inputs[input_class].connections.push( {"node": id_output, "input": output_class});
              this.updateConnectionNodes('node-'+id_output);
              this.updateConnectionNodes('node-'+id_input);
              this.dispatch('connectionCreated', { output_id: id_output, input_id: id_input, output_class:  output_class, input_class: input_class});
    
            } else {
              this.dispatch('connectionCancel', true);
              this.connection_ele.remove();
            }
    
              this.connection_ele = null;
          } else {
            // Connection exists Remove Connection;
            this.dispatch('connectionCancel', true);
            this.connection_ele.remove();
            this.connection_ele = null;
          }
    
          } else {
            // Remove Connection;
            this.dispatch('connectionCancel', true);
            this.connection_ele.remove();
            this.connection_ele = null;
          }
        }
    
        this.drag = false;
        this.drag_point = false;
        this.connection = false;
        this.ele_selected = null;
        this.editor_selected = false;
    
    }


    setUniqueID = uuidv4();
    setIncomingMsgUUID = uuidv4();
    setIncomingCallUUID = uuidv4();
    setIncomingRestApiUUID = uuidv4();
    
    
    const dataToImport =  {"drawflow":{"Home":{"data":{[setUniqueID]:{"id":setUniqueID,"name":"trigger","data":{"texbotName": "Test", "countryCode": "49", "phoneNumber": "98766125", "webhookurl": "https://lkdjfsf.dood", "sharecode": "7fd699s", "testcontact": "6sf9d55 d 669d55", "incomingvoice": "choose-voice", "press1voice": "choose-voice"},"class":"trigger","html":"\n                <div>\n                    <div class=\"title-box\"> <div class=\"content\"> <span class=\"icon\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-sliders\"><line x1=\"4\" y1=\"21\" x2=\"4\" y2=\"14\"></line><line x1=\"4\" y1=\"10\" x2=\"4\" y2=\"3\"></line><line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"3\"></line><line x1=\"20\" y1=\"21\" x2=\"20\" y2=\"16\"></line><line x1=\"20\" y1=\"12\" x2=\"20\" y2=\"3\"></line><line x1=\"1\" y1=\"14\" x2=\"7\" y2=\"14\"></line><line x1=\"9\" y1=\"8\" x2=\"15\" y2=\"8\"></line><line x1=\"17\" y1=\"16\" x2=\"23\" y2=\"16\"></line></svg></span> Trigger </div>\n                    \n   <div class=\"drawflow-delete-widget\">\n  x \n </div>  \n  </div>     \n </div> \n      ","typenode":false,"inputs":{},"outputs":{"output_1":{"connections":[], "info":{"id":setIncomingMsgUUID,"query":"incoming-messages","value":"incoming-messages","queryName":"Incoming Messages"} },"output_2":{"connections":[], "info":{"id":setIncomingCallUUID,"query":"incoming-calls","value":"incoming-calls","queryName":"Incoming Calls"} },"output_3":{"connections":[], "info":{"id":setIncomingRestApiUUID,"query":"rest-api","value":"rest-api","queryName":"Rest API"} }},"pos_x":82,"pos_y":25}}}}}
    
    
    editor.start();

    editor.import(dataToImport);
 
    
    count = 0;
    // Events!
    editor.on('nodeCreated', function(id) {

        getData = editor.getNodeFromId(id);

        updateNodeCount(id)
        getWidgetsList(id)
        addConnectionOutputData(id)

        
        
        // console.log(getData.name)

        if (getData.name === 'split-based-on') {
            setConnectionValues(id, "conditions", "queryName")
        } else {
            setConnectionValues(id, "info", "queryName")
        }

    })
        
    editor.on('nodeSelected', function(id) {
            
            // getData = editor.getNodeFromId(id);
            console.log(id)
            // console.log(getData.id);
            deleteNode(id);

            getSidebarFields(id);

            // console.log(id);
            
            getConnectionFields(id);
            

            connect(id);
    })

    editor.on('nodeUnselected', function(status) {

        if (status) {
            document.querySelector('.drawflow-widget-fields').classList.remove('show')
        }
    })

    function updateNodeCount(id) {
        
        getData = editor.getNodeFromId(id)

        getElements = document.querySelectorAll(`.${getData.class}`)

        getLength = getElements.length;

        getCurrentElementId = getElements[getLength - 1].id;
        getNodeName = getData.name;

        removeHyphen = getNodeName.replace('-', '_');

        document.querySelector(`#${getCurrentElementId} .content .w-title`).innerText = '{{ ' + removeHyphen + '_' + getLength + ' }}';

        defineVariables = {...getData.data, action_name: removeHyphen + '_' + getLength}

        editor.updateNodeDataFromId(id, defineVariables )
    }

    function addConnectionOutputData(id) {

        getData = editor.getNodeFromId(id);
        getDataName = getData.name;


        switch (getDataName) {            
            
            case 'split-based-on':
                
                defineVariables = {"id":uuidv4(), "query":"no-condition-matches","value":"no-condition-matches","queryName":"No Condition Matches"}
                editor.drawflow.drawflow.Home.data[id].outputs['output_1'].conditions = defineVariables;

                break;

            case 'set-variables':
                
                defineVariables = {"id":uuidv4(), "query":"next","value":"next","queryName":"Next"}
                editor.drawflow.drawflow.Home.data[id].outputs['output_1'].info = defineVariables;
                
                break;
                
            case 'send-message':
                
                sent = {"id":uuidv4(), "query":"sent","value":"sent","queryName":"Sent"}
                editor.drawflow.drawflow.Home.data[id].outputs['output_1'].info = sent;

                failToSent = {"id":uuidv4(), "query":"failToSent","value":"failToSent","queryName":"Fail to Sent"}
                editor.drawflow.drawflow.Home.data[id].outputs['output_2'].info = failToSent;
                
                break;

            case 'send-message-wait':

                reply = {"id":uuidv4(), "query":"reply","value":"reply","queryName":"Reply"}
                editor.drawflow.drawflow.Home.data[id].outputs['output_1'].info = reply;

                noReply = {"id":uuidv4(), "query":"noReply","value":"noReply","queryName":"No Reply"}
                editor.drawflow.drawflow.Home.data[id].outputs['output_2'].info = noReply;

                deliveryFails = {"id":uuidv4(), "query":"deliveryFails","value":"deliveryFails","queryName":"Delivery Fails"}
                editor.drawflow.drawflow.Home.data[id].outputs['output_3'].info = deliveryFails;
                
                break;

            case 'run-function':

                success = {"id":uuidv4(), "query":"success","value":"success","queryName":"Success"}
                editor.drawflow.drawflow.Home.data[id].outputs['output_1'].info = success;

                fail = {"id":uuidv4(), "query":"fail","value":"fail","queryName":"Fail"}
                editor.drawflow.drawflow.Home.data[id].outputs['output_2'].info = fail;
                
                break;

            case 'make-http-request':

                success = {"id":uuidv4(), "query":"success","value":"success","queryName":"Success"}
                editor.drawflow.drawflow.Home.data[id].outputs['output_1'].info = success;

                fail = {"id":uuidv4(), "query":"fail","value":"fail","queryName":"Fail"}
                editor.drawflow.drawflow.Home.data[id].outputs['output_2'].info = fail;
                
                break;
        
            default:
                break;
        }
        
    }

    /**
     * 
     * @param getWidgetsList  - Gets all the widgets currently on Fields
     */

    function getWidgetsList(id) {

        dataSet = editor.export().drawflow.Home.data;

        getDrawFlowFieldsContainer = document.querySelector('.drawflow-widget-fields');

        sleectHTML = getDrawFlowFieldsContainer.querySelectorAll('.if-next');
        console.log(sleectHTML);

        for (let index = 0; index < sleectHTML.length; index++) {
            const selectField = sleectHTML[index];


            selectOptions = sleectHTML[index].options;
            selectOptionsGroups = sleectHTML[index].querySelectorAll('optgroup');
            
            
            if (selectOptionsGroups !== null) {

                for (let index = 0; index < selectOptionsGroups.length; index++) {
                    const element = selectOptionsGroups[index];
                        element.remove();
                }
            }
            
            
            
            for (let index = 0; index < selectOptions.length; index++) {
                const element = selectOptions[index];
                element.remove();
            }
            
            
            Object.keys(dataSet).map(function(k){

                dataValue_k = dataSet[k];
                dataAgent_k = k;
    
    
                option = '';

                option += `<option id="select" value="choose">Select</option>`;
                Object.keys(dataValue_k).map(function(l){
    
                    dataValue_l = dataValue_k[l]

                    if (l === 'name') {
    
                        option = selectField.innerHTML;
                        
                        option += `<optgroup label="${dataValue_l}">`;
                        option += `<option id="${dataAgent_k}" input-id-class="input_1" value="${dataValue_l}">${dataValue_l}</option>`;
                        option += `</optgroup>`;
                        
                    }
    
                })
    
                selectField.innerHTML = option; 
                
            })
            
        }

    }
    
    function connect(id) {

         // Selected Element Data -> OUTPUT DATA/SED
         getSED_ID = id;

         getSED_data = editor.getNodeFromId(getSED_ID);
        
        ifNextElement = document.querySelectorAll('.if-next');

        for (let index = 0; index < ifNextElement.length; index++) {
            const element = ifNextElement[index];
            
            element.addEventListener('change', function() {

                getSED_OutputClass = `output_${this.getAttribute('output')}`;

                // Selected Option Data -> INPUT DATA/SOD
                getSOD_ID = this[this.selectedIndex].id;
                getSOD_InputClass = this[this.selectedIndex].getAttribute('input-id-class');
    
                editor.addConnection(getSED_ID, getSOD_ID, getSED_OutputClass, getSOD_InputClass)

            })
        }


    }
    
    
    /**
     * 
     * @param getSidebarFields  - Gets All The Fields On Select Of The Widget 
     */
    
    
    function getSidebarFields(id) {

        getDrawFlowFieldsContainer = document.querySelector('.drawflow-widget-fields')
        getData = editor.getNodeFromId(id);
        getDataName = getData.name;

        if (document.querySelector(".drawflow-widget-fields .df-fields-content .active")) {
            document.querySelector(".drawflow-widget-fields .df-fields-content .active").classList.remove('active');
        }
        
        element = document.querySelector(`.drawflow-widget-fields .df-fields-content .df_${getDataName}_fields`).classList.add('active');

        document.querySelector('.drawflow-widget-fields').classList.add('show');

        switch (getDataName) {

            case 'trigger':

                getValues = getData.data;
                getId = getData.id;


                Object.keys(getValues).map(function(k){


                    switch (k) {
                        case 'texbotName':

                            getDrawFlowFieldsContainer.querySelector('#trigger-flowName').value = getValues[k];
                            
                            break;

                        case 'countryCode':

                            getDrawFlowFieldsContainer.querySelector('#countryCd').value = getValues[k];
                            // console.log(getValues[k])
                            
                            break;
                            
                        case 'phoneNumber':

                            getDrawFlowFieldsContainer.querySelector('#trigger-phone-number').value = getValues[k];
                            
                            break;

                        case 'webhookurl':

                            getDrawFlowFieldsContainer.querySelector('#trigger-webhookurl').value = getValues[k];
                            
                            break;

                        case 'sharecode':

                            getDrawFlowFieldsContainer.querySelector('#trigger-sharecode').value = getValues[k];
                            
                            break;
                        
                        case 'testcontact':

                            getDrawFlowFieldsContainer.querySelector('#trigger-testcontact').value = getValues[k];
                            
                            break;

                        case 'incomingvoice':

                            getDrawFlowFieldsContainer.querySelector('#trigger-incoming-voice').value = getValues[k];
                            
                            break;

                    
                        default:
                            break;
                    }
                    
                })

                getDrawFlowFieldsContainer.querySelector(`.df_trigger_fields .save-fields`).setAttribute('widget-id', getId)

                break;
            
            
            case 'split-based-on':

                getValues = getData.data;
                getId = getData.id;


                Object.keys(getValues).map(function(k){

                    switch (k) {
                        case 'action_name':

                            getDrawFlowFieldsContainer.querySelector('#split-based-actionName').value = getValues[k];
                            
                            break;
                    
                        default:
                            break;
                    }
                    
                })

                getDrawFlowFieldsContainer.querySelector(`.df_split-based-on_fields .save-fields`).setAttribute('widget-id', getId)
                
                break;

            case 'set-variables':

                getValues = getData.data;
                getId = getData.id;
                

                Object.keys(getValues).map(function(k){

                    dataValue_k = getValues[k]

                    switch (k) {
                        case 'action_name':

                            getDrawFlowFieldsContainer.querySelector('#set-variable-actionName').value = dataValue_k;
                            
                            break;

                        case 'field':

                            getDrawFlowFieldsContainer.querySelector('#set-variable-field').value = dataValue_k;
                            
                            break;

                        case 'setValueAs':

                            getDrawFlowFieldsContainer.querySelector('#set-variable-setValueAs').value = dataValue_k;
                            
                            break;

                        case 'textReplyFromActions':

                            getDrawFlowFieldsContainer.querySelector('#set-variable-textReplyFromActions').value = dataValue_k;
                            
                            break;

                        case 'customValue':

                            getDrawFlowFieldsContainer.querySelector('#set-variable-customValue').value = dataValue_k;
                            
                            break;

                    
                        default:
                            break;
                    }
                    
                })


                getDrawFlowFieldsContainer.querySelector(`.df_set-variables_fields .add-variable.add-content`).setAttribute('widget-id', getId)
                getDrawFlowFieldsContainer.querySelector(`.df_set-variables_fields .save-variable.save-content`).setAttribute('widget-id', getId)
                getDrawFlowFieldsContainer.querySelector(`.df_set-variables_fields .save-fields`).setAttribute('widget-id', getId)
                
                break;
                
            case 'send-message':

                getValues = getData.data;
                getId = getData.id;
                

                Object.keys(getValues).map(function(k){


                    dataValue_k = getValues[k]

                    switch (k) {
                        case 'widget_name':
                            getDrawFlowFieldsContainer.querySelector('#message-widgetName').value = dataValue_k;
                            break;

                        case 'widget_name':
                            getDrawFlowFieldsContainer.querySelector('#gridRadios1').value = dataValue_k;
                            break;

                        // Text Message
                        
                        case 'widget_name':
                            getDrawFlowFieldsContainer.querySelector('#message-template').value = dataValue_k;
                            break;

                        case 'widget_name':
                            getDrawFlowFieldsContainer.querySelector('#send_msg-custom-text-Msg').value = dataValue_k;
                            break;
                            
                        
                        default:
                            break;
                    }
                    
                })


                getDrawFlowFieldsContainer.querySelector(`.df_send-message_fields .save-fields`).setAttribute('widget-id', getId)
                
                break;

            case 'send-message-wait':

                getValues = getData.data;
                getId = getData.id;
                
                Object.keys(getValues).map(function(k){


                    dataValue_k = getValues[k]

                    switch (k) {
                        case 'action_name':

                            getDrawFlowFieldsContainer.querySelector('#message-wait-actionName').value = dataValue_k;
                            
                            break;
                            
                        case 'number':
                            
                            getDrawFlowFieldsContainer.querySelector('#message-wait-chooseNumber').value = dataValue_k;
                            
                            break;

                        case 'unit':
                            getDrawFlowFieldsContainer.querySelector('#message-wait-chooseUnit').value = dataValue_k;
                                break;

                        case 'message':
                            getDrawFlowFieldsContainer.querySelector('#message-wait-msg').value = dataValue_k;
                                break;

                        default:
                            break;
                    }
                    
                })

                getDrawFlowFieldsContainer.querySelector(`.df_send-message-wait_fields .save-fields`).setAttribute('widget-id', getId)
                
                break;

            case 'run-function':

                getValues = getData.data;
                getId = getData.id;


                Object.keys(getValues).map(function(k){


                    dataValue_k = getValues[k]

                    switch (k) {
                        case 'action_name':

                            console.log(dataValue_k);
                            // console.log(getDrawFlowFieldsContainer.querySelector('#run-function-actionName');
                            getDrawFlowFieldsContainer.querySelector('#run-function-actionName').value = dataValue_k;
                            break;

                        case 'message':

                            getDrawFlowFieldsContainer.querySelector('#run-function-message').value = dataValue_k;
                            
                            break;
                    
                        default:
                            break;
                    }
                    
                })
                
                // getDrawFlowFieldsContainer.querySelector(`.df_run-function_fields .add-fp.add-content`).setAttribute('widget-id', getId)
                // getDrawFlowFieldsContainer.querySelector(`.df_run-function_fields .save-fp.save-content`).setAttribute('widget-id', getId)
                getDrawFlowFieldsContainer.querySelector(`.df_run-function_fields .save-fields`).setAttribute('widget-id', getId)
                
                break;

            case 'make-http-request':

                getValues = getData.data;
                getId = getData.id;

                Object.keys(getValues).map(function(k){


                    dataValue_k = getValues[k]
                
                    switch (k) {
                        case 'pingWebhookURL':

                            getDrawFlowFieldsContainer.querySelector('#http-request-fields-ping-webhook-url').value = dataValue_k;
                            
                            break;

                        case 'requestBody':

                            getDrawFlowFieldsContainer.querySelector('#http-request-fields-requestBody').value = dataValue_k;
                            
                            break;

                        default:
                            break;
                    }

                })

                getDrawFlowFieldsContainer.querySelector(`.df_make-http-request_fields .save-fields`).setAttribute('widget-id', getId)
                
                break;
        
            default:
                break;
        }
        
    }



    /**
     * 
     * @param getConnectionFields  - Gets The Fields Connections
     */
    
    function getConnectionFields(id) {

        getDrawFlowFieldsContainer = document.querySelector('.drawflow-widget-fields')
        getData = editor.getNodeFromId(id);
        
        getDataName = getData.name;

        if (document.querySelector(".drawflow-widget-fields .df-transition-fields-content .active")) {
            document.querySelector(".drawflow-widget-fields .df-transition-fields-content .active").classList.remove('active');
        }

        document.querySelector('.drawflow-widget-fields').classList.add('show');

        // console.log(getData)

        switch (getDataName) {

            case 'trigger':


                getValues = getData.data;
                getId = getData.id;


                Object.keys(getValues).map(function(k){


                    switch (k) {
                        case 'name':

                            getDrawFlowFieldsContainer.querySelector('#trigger-flowName').value = getValues[k];
                            
                            break;

                        case 'resetapi':

                            getDrawFlowFieldsContainer.querySelector('#trigger-resetApi').value = getValues[k];
                            
                            break;

                        case 'webhookurl':

                            getDrawFlowFieldsContainer.querySelector('#trigger-webhookurl').value = getValues[k];
                            
                            break;

                        case 'testusers':

                            getDrawFlowFieldsContainer.querySelector('#trigger-testsers').value = getValues[k];
                            
                            break;
                    
                        default:
                            break;
                    }
                    
                })


                break;
            
            case 'split-based-on':

                getValues = getData.data;
                getId = getData.id;


                Object.keys(getValues).map(function(k){

                    switch (k) {
                        case 'action_name':

                            getDrawFlowFieldsContainer.querySelector('#split-based-actionName').value = getValues[k];
                            // console.log(getValues[k]);
                            break;
                            
                        case 'set_value_as':
                            
                            if (getValues[k].value === 'times-called') {
                                getDrawFlowFieldsContainer.querySelector('.form-split-based-on_setValueas[style="display: block;"]').style.display = 'none';
                                console.log(getValues[k].value);
                                console.log(getValues[k].number_times_called);
                                
                                getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs').value = getValues[k].value;
                                getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs-times_called').value = getValues[k].number_times_called;
                                getDrawFlowFieldsContainer.querySelector('#times-called_container').style.display = 'block';
                                
                            } else if (getValues[k].value === 'permission') {
                                getDrawFlowFieldsContainer.querySelector('.form-split-based-on_setValueas[style="display: block;"]').style.display = 'none';
                                console.log(getValues[k].value);
                                console.log(getValues[k].permission);
                                
                                getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs').value = getValues[k].value;
                                getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs-premission').value = getValues[k].permission;
                                getDrawFlowFieldsContainer.querySelector('#permission_container').style.display = 'block';
                                
                            } else if (getValues[k].value === 'contact') {
                                getDrawFlowFieldsContainer.querySelector('.form-split-based-on_setValueas[style="display: block;"]').style.display = 'none';
                                console.log(getValues[k].value);
                                console.log(getValues[k].contact);

                                getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs').value = getValues[k].value;
                                getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs-contact').value = getValues[k].contact;
                                getDrawFlowFieldsContainer.querySelector('#contact_container').style.display = 'block';

                            } else if (getValues[k].value === 'tags') {
                                getDrawFlowFieldsContainer.querySelector('.form-split-based-on_setValueas[style="display: block;"]').style.display = 'none';
                                console.log(getValues[k].value);
                                console.log(getValues[k].tag);

                                getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs').value = getValues[k].value;
                                getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs-tag_condition').value = getValues[k].tag;
                                getDrawFlowFieldsContainer.querySelector('#tags_container').style.display = 'block';
                                
                            } else if (getValues[k].value === 'contact-rank') {
                                getDrawFlowFieldsContainer.querySelector('.form-split-based-on_setValueas[style="display: block;"]').style.display = 'none';
                                console.log(getValues[k].value);
                                console.log(getValues[k].set_condition);
                                console.log(getValues[k].set_number);

                                getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs').value = getValues[k].value;
                                getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs-contact_rank').value = getValues[k].set_condition;
                                getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs-select_number').value = getValues[k].set_number;
                                getDrawFlowFieldsContainer.querySelector('#contact-rank_container').style.display = 'block';

                            } else if (getValues[k].value === 'custom-variable') {
                                getDrawFlowFieldsContainer.querySelector('.form-split-based-on_setValueas[style="display: block;"]').style.display = 'none';
                                console.log(getValues[k].value);
                                console.log(getValues[k].variables);
                                console.log(getValues[k].variable_value);

                                getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs').value = getValues[k].value;
                                getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs-custom_variable').value = getValues[k].variables;
                                getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs-value_is').value = getValues[k].variable_value;
                                getDrawFlowFieldsContainer.querySelector('#custom-variable_container').style.display = 'block';
                                
                            } else {
                                defineVariables = {...getData.data, action_name: getDrawFlowFieldsContainer.querySelector('#split-based-actionName').value, set_value_as: getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs').value }
                            }
                            
                            
                            break;
                    
                        default:
                            break;
                    }
                    
                })

                getDrawFlowFieldsContainer.querySelector(`.df_split-based-on_fields .save-fields`).setAttribute('widget-id', getId)
                
                break;

            case 'set-variables':

                getValues = getData.data;
                getId = getData.id;

                Object.keys(getValues).map(function(k){

                    dataValue_k = getValues[k]

                    switch (k) {


                        case 'action_name':

                            getDrawFlowFieldsContainer.querySelector('#set-variable-actionName').value = dataValue_k;
                            
                            break;

                        case 'field':

                            getDrawFlowFieldsContainer.querySelector('#set-variable-field').value = dataValue_k;
                            
                            break;

                        case 'setValueAs':

                            getDrawFlowFieldsContainer.querySelector('#set-variable-setValueAs').value = dataValue_k;
                            
                            break;

                        case 'textReplyFromActions':

                            getDrawFlowFieldsContainer.querySelector('#set-variable-textReplyFromActions').value = dataValue_k;
                            
                            break;

                        case 'customValue':

                            getDrawFlowFieldsContainer.querySelector('#set-variable-customValue').value = dataValue_k;
                            
                            break;
                    
                        default:
                            break;
                    }
                    
                })

                getDrawFlowFieldsContainer.querySelector(`.df_set-variables_fields .save-fields`).setAttribute('widget-id', getId)
                
                break;
                
            case 'send-message':

                getValues = getData.data;
                getId = getData.id;

                getDrawFlowFieldsContainer.querySelector(`.df_send-message_fields .save-fields`).setAttribute('widget-id', getId)
                
                break;

            case 'send-message-wait':

                getValues = getData.data;
                getId = getData.id;

                Object.keys(getValues).map(function(k){


                    dataValue_k = getValues[k]

                    switch (k) {
                        case 'action_name':
                            getDrawFlowFieldsContainer.querySelector('#message-wait-actionName').value = dataValue_k;
                            break;

                        case 'number':
                            getDrawFlowFieldsContainer.querySelector('#message-wait-chooseNumber').value = dataValue_k;
                            break;

                        case 'unit':
                            getDrawFlowFieldsContainer.querySelector('#message-wait-chooseUnit').value = dataValue_k;
                            break;

                        case 'message':
                            getDrawFlowFieldsContainer.querySelector('#message-wait-msg').value = dataValue_k;
                            break;

                        default:
                            break;
                    }
                    
                })

                getDrawFlowFieldsContainer.querySelector(`.df_send-message-wait_fields .save-fields`).setAttribute('widget-id', getId)
                
                break;

            case 'run-function':

                getValues = getData.data;
                getId = getData.id;

                Object.keys(getValues).map(function(k){

                    dataValue_k = getValues[k]

                    switch (k) {
                        case 'action_name':

                            getDrawFlowFieldsContainer.querySelector('#run-function-actionName').value = dataValue_k;
                            
                            break;

                        case 'message':

                            getDrawFlowFieldsContainer.querySelector('#run-function-message').value = dataValue_k;
                            
                            break;
                    
                        default:
                            break;
                    }
                    
                })
                
                getDrawFlowFieldsContainer.querySelector(`.df_run-function_fields .save-fields`).setAttribute('widget-id', getId)
                
                break;

            case 'make-http-request':
                // console.log(`I am ${getDataName}`);

                getValues = getData.data;
                getId = getData.id;
                // console.log(getValues)

                Object.keys(getValues).map(function(k){

                    // console.log(k +" = "+getValues[k])

                    dataValue_k = getValues[k]
                
                    switch (k) {
                        case 'pingWebhookURL':

                            getDrawFlowFieldsContainer.querySelector('#http-request-fields-ping-webhook-url').value = dataValue_k;
                            
                            break;

                        case 'requestBody':

                            getDrawFlowFieldsContainer.querySelector('#http-request-fields-requestBody').value = dataValue_k;
                            
                            break;

                        default:
                            break;
                    }

                })

                getDrawFlowFieldsContainer.querySelector(`.df_make-http-request_fields .save-fields`).setAttribute('widget-id', getId)
                
                break;
        
            default:
                break;
        }


        addVariable(id)
        editVariable(id)
        deleteVariable(id)

        // saveChanges(id)
        
    }
    

    /**
     * 
     * @param saveChanges  - Save The Changes
     */

    function saveChanges(widgetId) {

        console.log(widgetId);
        
        saveField = document.querySelectorAll(`.save-fields`);
        getDrawFlowFieldsContainer = document.querySelector('.drawflow-widget-fields');

        for (let index = 0; index < saveField.length; index++) {
            const element = saveField[index];
        
            element.addEventListener('click', function(e) {

                getElementId = this.getAttribute('widget-id');

                getData = editor.getNodeFromId(getElementId);
                getDataName = getData.name;
        
                switch (getDataName) {
        
                    case 'trigger':

                        getValues = getData.data;
                        getId = getData.id;
                        defineVariables = {...getData.data, "texbotName": getDrawFlowFieldsContainer.querySelector('#trigger-flowName').value, "countryCode": getDrawFlowFieldsContainer.querySelector('#countryCd').value, "phoneNumber": getDrawFlowFieldsContainer.querySelector('#trigger-phone-number').value, "webhookurl": getDrawFlowFieldsContainer.querySelector('#trigger-webhookurl').value, "sharecode": getDrawFlowFieldsContainer.querySelector('#trigger-sharecode').value, "testcontact": getDrawFlowFieldsContainer.querySelector('#trigger-testcontact').value, "incomingvoice": getDrawFlowFieldsContainer.querySelector('#trigger-incoming-voice').value, "press1voice": getDrawFlowFieldsContainer.querySelector('#trigger-press1-voice').value }

                        editor.updateNodeDataFromId(getElementId, defineVariables);
                        break;
                    
                    case 'split-based-on':
        
                        getValues = getData.data;
                        getId = getData.id;
                        setValueAs = getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs').value;
        
                        
                        if (setValueAs === 'times-called') {
                            defineVariables = {...getData.data, action_name: getDrawFlowFieldsContainer.querySelector('#split-based-actionName').value, set_value_as: {value: getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs').value, number_times_called: getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs-times_called').value} }
                        } else if (setValueAs === 'permission') {
                            defineVariables = {...getData.data, action_name: getDrawFlowFieldsContainer.querySelector('#split-based-actionName').value, set_value_as: {value: getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs').value, permission: getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs-premission').value} }
                        } else if (setValueAs === 'contact') {
                            defineVariables = {...getData.data, action_name: getDrawFlowFieldsContainer.querySelector('#split-based-actionName').value, set_value_as: {value: getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs').value, contact: getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs-contact').value} }
                        } else if (setValueAs === 'tags') {
                            defineVariables = {...getData.data, action_name: getDrawFlowFieldsContainer.querySelector('#split-based-actionName').value, set_value_as: {value: getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs').value, tag: getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs-tag_condition').value} }
                        } else if (setValueAs === 'contact-rank') {
                            defineVariables = {...getData.data, action_name: getDrawFlowFieldsContainer.querySelector('#split-based-actionName').value, set_value_as: {value: getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs').value, set_condition: getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs-contact_rank').value, select_number: getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs-select_number').value} }
                        } else if (setValueAs === 'custom-variable') {
                            defineVariables = {...getData.data, action_name: getDrawFlowFieldsContainer.querySelector('#split-based-actionName').value, set_value_as: {value: getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs').value, variables: getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs-custom_variable').value, variable_value: getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs-value_is').value} }
                        } else {
                            defineVariables = {...getData.data, action_name: getDrawFlowFieldsContainer.querySelector('#split-based-actionName').value, set_value_as: getDrawFlowFieldsContainer.querySelector('#split_based-setValueAs').value }
                        }
                        
                        document.querySelector(`#node-${getElementId} .content .w-title`).innerText = '{{ ' + getDrawFlowFieldsContainer.querySelector('#split-based-actionName').value+ ' }}';
                        editor.updateNodeDataFromId(getElementId, defineVariables);
                        
                        break;
        
                    case 'set-variables':
        
                        getValues = getData.data;
                        getId = getData.id;
        
                        defineVariables = {...getData.data, action_name: getDrawFlowFieldsContainer.querySelector('#set-variable-actionName').value, field: getDrawFlowFieldsContainer.querySelector('#set-variable-field').value, setValueAs: getDrawFlowFieldsContainer.querySelector('#set-variable-setValueAs').value, textReplyFromActions: getDrawFlowFieldsContainer.querySelector('#set-variable-textReplyFromActions').value, customValue: getDrawFlowFieldsContainer.querySelector('#set-variable-customValue').value }
        
                        document.querySelector(`#node-${getElementId} .content .w-title`).innerText = '{{ ' + getDrawFlowFieldsContainer.querySelector('#set-variable-actionName').value+ ' }}';
                        editor.updateNodeDataFromId(getElementId, defineVariables);
                        
                        break;
                        
                    case 'send-message':
                        
                        getValues = getData.data;
                        getId = getData.id;
                        msgFormatValue = getDrawFlowFieldsContainer.querySelector('[name="msg-options"]:checked').value;

                        if (msgFormatValue === 'text-message') {
                            defineVariables = {...getData.data, action_name: getDrawFlowFieldsContainer.querySelector('#message-widgetName').value, message_format: {value: getDrawFlowFieldsContainer.querySelector('[name="msg-options"]:checked').value, msg_template: getDrawFlowFieldsContainer.querySelector('#message-template').value, custom_msg: getDrawFlowFieldsContainer.querySelector('#custom-msg')}  }
                        } else if (msgFormatValue === 'audio-message') {

                            audioFormatValue = getDrawFlowFieldsContainer.querySelector('#audio-msg-option').value;

                            if (audioFormatValue === 'rec-upload-msg') {
                                defineVariables = {...getData.data, action_name: getDrawFlowFieldsContainer.querySelector('#message-widgetName').value, message_format: {value: getDrawFlowFieldsContainer.querySelector('[name="msg-options"]:checked').value, audio_format: {value: getDrawFlowFieldsContainer.querySelector('#audio-msg-option').value, recording: getDrawFlowFieldsContainer.querySelector('.setRecordedAudio').value, uploaded: getDrawFlowFieldsContainer.querySelector('.setuploadedAudio').value, notify_me: getDrawFlowFieldsContainer.querySelector('#notify-me').value, allow_reply: getDrawFlowFieldsContainer.querySelector('#allow-reply').value }} }
                            } else if (audioFormatValue === 'use-tts') {
                                defineVariables = {...getData.data, action_name: getDrawFlowFieldsContainer.querySelector('#message-widgetName').value, message_format: {value: getDrawFlowFieldsContainer.querySelector('[name="msg-options"]:checked').value, audio_format: {value: getDrawFlowFieldsContainer.querySelector('#audio-msg-option').value, text: getDrawFlowFieldsContainer.querySelector('#your-text').value, voice_list: getDrawFlowFieldsContainer.querySelector('#new-voice-list').value, notify_me: getDrawFlowFieldsContainer.querySelector('#notify-me').value, allow_reply: getDrawFlowFieldsContainer.querySelector('#allow-reply').value }} }
                            } else if (audioFormatValue === 'voice-url') {
                                defineVariables = {...getData.data, action_name: getDrawFlowFieldsContainer.querySelector('#message-widgetName').value, message_format: {value: getDrawFlowFieldsContainer.querySelector('[name="msg-options"]:checked').value, audio_format: {value: getDrawFlowFieldsContainer.querySelector('#audio-msg-option').value, url: getDrawFlowFieldsContainer.querySelector('#setAudoMsgUrl').value, notify_me: getDrawFlowFieldsContainer.querySelector('#notify-me').value, allow_reply: getDrawFlowFieldsContainer.querySelector('#allow-reply').value }} }
                            } else {
                                defineVariables = {...getData.data, action_name: getDrawFlowFieldsContainer.querySelector('#message-widgetName').value, message_format: {value: getDrawFlowFieldsContainer.querySelector('[name="msg-options"]:checked').value, audio_format: {value: getDrawFlowFieldsContainer.querySelector('#audio-msg-option').value }} }
                            }
                            
                            
                        } else if (msgFormatValue === 'video-message') {

                            audioFormatValue = getDrawFlowFieldsContainer.querySelector('#video-msg-option').value;

                            if (audioFormatValue === 'video-rec-upload-msg') {
                                
                                defineVariables = {...getData.data, action_name: getDrawFlowFieldsContainer.querySelector('#message-widgetName').value, message_format: {value: getDrawFlowFieldsContainer.querySelector('[name="msg-options"]:checked').value, video_format: {value: getDrawFlowFieldsContainer.querySelector('#video-msg-option').value, recording: getDrawFlowFieldsContainer.querySelector('.setRecordedAudio').value, uploaded: getDrawFlowFieldsContainer.querySelector('.video-input').value, notify_me: getDrawFlowFieldsContainer.querySelector('#notify-me').value, allow_reply: getDrawFlowFieldsContainer.querySelector('#allow-reply').value }} }
                                
                            } else if (audioFormatValue === 'video-url') {
                                defineVariables = {...getData.data, action_name: getDrawFlowFieldsContainer.querySelector('#message-widgetName').value, message_format: {value: getDrawFlowFieldsContainer.querySelector('[name="msg-options"]:checked').value, video_format: {value: getDrawFlowFieldsContainer.querySelector('#video-msg-option').value, url: getDrawFlowFieldsContainer.querySelector('#setVideoMsgUrl').value, notify_me: getDrawFlowFieldsContainer.querySelector('#notify-me').value, allow_reply: getDrawFlowFieldsContainer.querySelector('#allow-reply').value }} }
                            } else {
                                defineVariables = {...getData.data, action_name: getDrawFlowFieldsContainer.querySelector('#message-widgetName').value, message_format: {value: getDrawFlowFieldsContainer.querySelector('[name="msg-options"]:checked').value, video_format: {value: getDrawFlowFieldsContainer.querySelector('#video-msg-option').value }} }
                            }
                            
                        }
                        
                        
                        document.querySelector(`#node-${getElementId} .content .w-title`).innerText = '{{ ' + getDrawFlowFieldsContainer.querySelector('#message-widgetName').value+ ' }}';
                        editor.updateNodeDataFromId(getElementId, defineVariables);
                        
                        break;
                        
                    case 'send-message-wait':
                        
                        getValues = getData.data;
                        getId = getData.id;
        
                        defineVariables = {...getData.data, action_name: getDrawFlowFieldsContainer.querySelector('#message-wait-actionName').value, number: getDrawFlowFieldsContainer.querySelector('#message-wait-chooseNumber').value, unit: getDrawFlowFieldsContainer.querySelector('#message-wait-chooseUnit').value, replyTime: getDrawFlowFieldsContainer.querySelector('#message-wait-chooseNumber').value + ' ' + getDrawFlowFieldsContainer.querySelector('#message-wait-chooseUnit').value, message: getDrawFlowFieldsContainer.querySelector('#message-wait-msg').value,  }
        
                        document.querySelector(`#node-${getElementId} .content .w-title`).innerText = '{{ ' + getDrawFlowFieldsContainer.querySelector('#message-wait-actionName').value+ ' }}';
                        editor.updateNodeDataFromId(getElementId, defineVariables);
                        
                        break;
        
                    case 'run-function':
                            
                        getValues = getData.data;
                        getId = getData.id;
        
        
                        defineVariables = {...getData.data, action_name: getDrawFlowFieldsContainer.querySelector('#run-function-actionName').value, message: getDrawFlowFieldsContainer.querySelector('#run-function-message').value }
                        document.querySelector(`#node-${getElementId} .content .w-title`).innerText = '{{ ' + getDrawFlowFieldsContainer.querySelector('#run-function-actionName').value+ ' }}';
                        editor.updateNodeDataFromId(getElementId, defineVariables);
                        
                        break;
        
                    case 'make-http-request':
                            
                        getValues = getData.data;
                        getId = getData.id;
        
                        defineVariables = {...getData.data, pingWebhookURL: getDrawFlowFieldsContainer.querySelector('#http-request-fields-ping-webhook-url').value, requestBody: getDrawFlowFieldsContainer.querySelector('#http-request-fields-requestBody').value  }
                        document.querySelector(`#node-${getElementId} .content .w-title`).innerText = '{{ ' + getDrawFlowFieldsContainer.querySelector('#http-request-fields-ping-webhook-url').value+ ' }}';
                        editor.updateNodeDataFromId(getElementId, defineVariables);
                        
                        break;
                
                    default:
                        break;
                }
        
        
                Snackbar.show({text: 'Changes Saved', textColor: '#060818', actionTextColor: '#060818', backgroundColor: '#02beaf'});
                
            })
            
        }

        
    }
    saveChanges(id)

    /**
     * 
     * @param CONNECTION_CREATED  - On Connection Create
     */
    
    editor.on('connectionCreated', function(connection) {
        connectionCreationObj = connection;

        const connectionsOutput = editor.container.querySelector(`.connection.node_in_node-${connectionCreationObj.input_id}.node_out_node-${connectionCreationObj.output_id}.${connectionCreationObj.output_class}.${connectionCreationObj.input_class}`);
        getData = editor.getNodeFromId(connectionCreationObj.output_id);
        getDataName = getData.name;

        editor.container.querySelector(`#node-${connectionCreationObj.output_id}`).classList.add("node-connected");
        editor.container.querySelector(`#node-${connectionCreationObj.output_id} .outputs .output.${connectionCreationObj.output_class}`).classList.add("connected");
        editor.container.querySelector(`#node-${connectionCreationObj.input_id} .inputs .input.${connectionCreationObj.input_class}`).classList.add("connected");


        switch (getDataName) {

            case 'trigger':
                
                connectionsOutput.classList.add(getDataName)

                break;
            
            
            case 'split-based-on':
                
                connectionsOutput.classList.add(getDataName)
                
                break;

            case 'set-variables':
                
                connectionsOutput.classList.add(getDataName)
                
                break;
                
            case 'send-message':
                
                connectionsOutput.classList.add(getDataName)
                
                break;

            case 'send-message-wait':
                
                connectionsOutput.classList.add(getDataName)
                
                break;

            case 'run-function':
                
                connectionsOutput.classList.add(getDataName)
                
                break;

            case 'make-http-request':
                
                connectionsOutput.classList.add(getDataName)

                break;
        
            default:
                break;
        }

        
    })

    /**
     * 
     * @param CONNECTION_REMOVED  - On Connection Remove
     */
    
    editor.on("connectionRemoved", (connection) => {
        
        connectionRemovalObj = connection;
        
        const connectionsOutput = editor.container.querySelectorAll(`.connection.node_out_node-${connectionRemovalObj.output_id}.${connectionRemovalObj.output_class}`);
        if(connectionsOutput.length === 0) {
            editor.container.querySelector(`#node-${connectionRemovalObj.output_id} .outputs .output.${connectionRemovalObj.output_class}`).classList.remove("connected");
        }
        
        const connectionsInput = editor.container.querySelectorAll(`.connection.node_in_node-${connectionRemovalObj.input_id}.${connectionRemovalObj.input_class}`);
        if(connectionsInput.length === 0) {
            editor.container.querySelector(`#node-${connectionRemovalObj.input_id} .inputs .input.${connectionRemovalObj.input_class}`).classList.remove("connected");
        }
        
    })

    /* DRAG EVENT */

    /* Mouse and Touch Actions */

    var elements = document.getElementsByClassName('drag-drawflow');
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('touchend', drop, false);
        elements[i].addEventListener('touchmove', positionMobile, false);
        elements[i].addEventListener('touchstart', drag, false );
    }

    var mobile_item_selec = '';
    var mobile_last_move = null;
    function positionMobile(ev) {
        mobile_last_move = ev;
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        if (ev.type === "touchstart") {
            mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute('data-node');
        } else {
        ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
        }
    }

    // let count = 0;

    function drop(ev) {
        if (ev.type === "touchend") {
            var parentdrawflow = document.elementFromPoint( mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY).closest("#drawflow");
            if(parentdrawflow != null) {
            addNodeToDrawFlow(mobile_item_selec, mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY);
            }
            mobile_item_selec = '';
            console.log('99')
        } else {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("node");
            addNodeToDrawFlow(data, ev.clientX, ev.clientY);

        }       

    }

    function addNodeToDrawFlow(name, pos_x, pos_y) {
        if(editor.editor_mode === 'fixed') {
            return false;
        }
        pos_x = pos_x * ( editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)) - (editor.precanvas.getBoundingClientRect().x * ( editor.precanvas.clientWidth / (editor.precanvas.clientWidth * editor.zoom)));
        pos_y = pos_y * ( editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)) - (editor.precanvas.getBoundingClientRect().y * ( editor.precanvas.clientHeight / (editor.precanvas.clientHeight * editor.zoom)));


        switch (name) {

            case 'split-based-on':
            var splitBasedOn = `
                <div>
                    <div class="title-box"> <div class="content"><span class="w-title">Split Based On</span> <p class="w-name">Split Based On</p></div>  <div class="drawflow-delete-widget">x</div> </div>
                </div>
            `;
            editor.addNode('split-based-on', 1, 1, pos_x, pos_y, 'split-based-on', { widget_name: '', variable: 'Choose Variables'}, splitBasedOn );
            break;

            case 'set-variables':
            var setVariable = `
                <div>
                    <div class="title-box"><div class="content"><span class="w-title">Set Variables</span> <p class="w-name">Set Variables</p></div>  <div class="drawflow-delete-widget">x</div></div>
                </div>
            `;
            editor.addNode('set-variables', 1, 1, pos_x, pos_y, 'set-variables', { action_name: '', field: '', setValueAs: '', textReplyFromActions: '', customValue: '' }, setVariable );
            
            break;

            case 'send-message':
            var sendMessage = `
                <div>
                    <div class="title-box"> <div class="content"><span class="w-title">Send Message</span> <p class="w-name">Send Message</p></div> <div class="drawflow-delete-widget">x</div></div>
                </div>
            `;
            editor.addNode('send-message', 1, 2, pos_x, pos_y, 'send-message', { widget_name: '', message: '', mediaurl: '', sendmsg_from: '', sendmsg_to: '', programmable_chat_service: '', programmable_chat_channel: '', msg_attribute: ''}, sendMessage );
            break;

            case 'send-message-wait':
            var sendMessageWait = `
                <div>
                    <div class="title-box"> <div class="content"><span class="w-title">Send Message and Wait</span> <p class="w-name">Send Message and Wait</p></div>  <div class="drawflow-delete-widget">x</div></div>
                </div>
            `;
            editor.addNode('send-message-wait', 1, 3, pos_x, pos_y, 'send-message-wait', { action_name: '', number: '', unit: '', replyTime: '', message: '' }, sendMessageWait );
            break;

            case 'run-function':
            var runFunction = `
                <div>
                    <div class="title-box"> <div class="content"><span class="w-title">Send Notification</span> <p class="w-name">Send Notification</p></div> <div class="drawflow-delete-widget">x</div></div>
                </div>
            `;
            editor.addNode('run-function', 1, 2, pos_x, pos_y, 'run-function', { action_name: '', message: ''}, runFunction );
            break;

            case 'make-http-request':
            var makeHttpRequest = `
                <div>
                    <div class="title-box"> <div class="content"><span class="w-title">Make HTTP Request</span> <p class="w-name">Make HTTP Request</p></div> <div class="drawflow-delete-widget">x</div></div>
                </div>
            `;
            editor.addNode('make-http-request', 1, 2, pos_x, pos_y, 'make-http-request', { pingWebhookURL: '', requestBody: ''}, makeHttpRequest );
            break;

            default:
        }
    }


    document.querySelector('#set-variable-field').addEventListener('change', function() {
        // console.log('mid')
        getRelationshipValue = this.dataset.relationship;

        if (this.value === 'custom') {
            document.querySelector(`.${getRelationshipValue}`).style.display = 'block';
        } else {
            // document.querySelector(`.${getRelationshipValue}`).style.display = 'block';
            document.querySelector(`.${getRelationshipValue}`).removeAttribute('style');
        }
    })


    /*
    |
    |****************************************************************
    |
    |   @VARIABLES
    |   
    |   Defining the VARIABLES Functionality
    |
    |****************************************************************
    |    
    */

    function setVariable() {
        
        var setVariableBtn = document.querySelectorAll('.create-variables');
    
        for (let index = 0; index < setVariableBtn.length; index++) {
    
            setVariableBtn[index].addEventListener('click', function(e) {
                // console.log('.ddfd');
                this.parentElement.querySelector('#expand').classList.add('add-active');
                this.parentElement.querySelector('#expand').classList.remove('edit-active');
            })
            
        }
    }

    function addVariable() {
        
        var setVariableBtn = document.querySelector('.add-variable');
        // var getTable = document.querySelectorAll('.variable-table')
    
        setVariableBtn.addEventListener('click', function(e) {
            // console.log('.ddfd')

            e.stopImmediatePropagation();
            getWidgetID = this.getAttribute('widget-id');

            getKey = this.parentElement.querySelector('.var-key');
            getValue = this.parentElement.querySelector('.var-value');

            getTable = this.closest('.create-variable-container').querySelector('.variable-table');

            getTableBody = this.closest('.create-variable-container').querySelector('.variable-table > tbody');
            setID = uuidv4();
            // getTableRows = getTable.rows.length

            if (getKey.value !== '' && getValue.value !== '') {
                

                // editor.getNodeFromId(id).data

                getData = editor.getNodeFromId(getWidgetID);
                

                updatedData = {...getData.data, [getKey.value]: getValue.value}

                if (getData.data.variables === undefined) {

                    defineVariables = {...getData.data, variables: { [setID]: { key: getKey.value, value: getValue.value} }}
                    
                    // console.log(abc);
                    editor.updateNodeDataFromId(getWidgetID, defineVariables);

                    getDataObj = editor.getNodeFromId(getWidgetID);

                    getObjValue = getDataObj.data;
                    
                    getVariableKeyObject = Object.keys(getObjValue.variables)
                    

                    getVariableKeyObject.forEach(function(key) {

                        variablesIDKey =  getObjValue.variables[key]

                        // console.log(variablesIDKey.key)
                        // console.log(variablesIDKey.value)

                        content = getTableBody.innerHTML;

                        content += '<tr class="testAddVariable"><td>' + variablesIDKey.key + '</td> <td>' + variablesIDKey.value + '</td> <td><a href="javascript:void(0);" class="edit-variables" widget-id="'+ getWidgetID +'" data-id="'+ key +'"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></a> <a href="javascript:void(0);" class="delete-variables" widget-id="'+ getWidgetID +'" data-id="'+ key +'"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></a></td></tr>';

                        
                    });

                    getTableBody.innerHTML = content;
                    
                    editVariable(id)
                    
                } else {
                    getVariables = {...getData.data.variables, [setID]: { key: getKey.value, value: getValue.value}}

                    currentData = {...getData.data, variables: getVariables}
                    editor.updateNodeDataFromId(getWidgetID, currentData);

                    getDataObj = editor.getNodeFromId(getWidgetID);

                    getObjValue = getDataObj.data;
                    
                    getVariableKeyObject = Object.keys(getObjValue.variables);
                    // getVariableKeyObject = Object.keys(getObjValue.variables[])
                    
                    // console.log(getVariableKeyObject);
                    
                    getVariableKeyObject.forEach(function(key) {

                        variablesIDKey =  getObjValue.variables[key]

                        content = getTableBody.innerHTML;

                        content += '<tr class="testAddVariableElse"><td>' + variablesIDKey.key + '</td> <td>' + variablesIDKey.value + '</td> <td><a href="javascript:void(0);" class="edit-variables" widget-id="'+ getWidgetID +'" data-id="'+ key +'"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></a> <a href="javascript:void(0);" class="delete-variables" widget-id="'+ getWidgetID +'" data-id="'+ key +'"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></a></td></tr>';
                    });

                    getTableBody.innerHTML = content;

                    // editVariable(id)

                }                    
            }

            getKey.value = ''; 
            getValue.value = '';

            editVariable(id)
            deleteVariable(id)
            
        })
        
    }
    function editVariable() {

        var editVariableBtn = document.querySelectorAll('.edit-variables')

        for (let index = 0; index < editVariableBtn.length; index++) {
    
            editVariableBtn[index].addEventListener('click', function() {
                iterateElement = this;

                getWidgetId = iterateElement.getAttribute('widget-id');
                getId = iterateElement.getAttribute('data-id');
                getOutput = iterateElement.getAttribute('data-output');
                
                getDataObj = editor.getNodeFromId(getWidgetId);
                getObjValue = getDataObj.data;
                getVariableKey = getObjValue.variables[getId].key;
                getVariableValue = getObjValue.variables[getId].value;


                this.closest('.box').querySelector('.var-key').value = getVariableKey;
                this.closest('.box').querySelector('.var-value').value = getVariableValue;

                iterateElement.closest('.box').querySelector('#expand').classList.add('edit-active');
                iterateElement.closest('.box').querySelector('#expand').classList.remove('add-active');

                getSaveBtn = this.closest('.box').querySelector('.save-variable');

                
                getSaveBtn.addEventListener('click', function(e) {

                    e.stopImmediatePropagation();
                    
                    getKey = this.closest('.form-variable').querySelector('.var-key');
                    getValue = this.closest('.form-variable').querySelector('.var-value');


                    UpdateData = {...getObjValue.variables, [getId] : { key: getKey.value, value: getValue.value} }
                    CurrentData = { ...getObjValue, variables: UpdateData }

                    editor.updateNodeDataFromId(getWidgetId, CurrentData)


                    getDataObj = editor.getNodeFromId(getWidgetId);

                    getObjValue = getDataObj.data;
                    
                    getVariableKeyObject = Object.keys(getObjValue.variables)

                    getTable = this.closest('.create-variable-container').querySelector('.variable-table')

                    getTableBody = this.closest('.create-variable-container').querySelector('.variable-table > tbody')

                    getTableRows = getTableBody.querySelectorAll('tr')


                    for (let index = 0; index < getTableRows.length; index++) {
                        const element = getTableRows[index];
                        element.remove()
                    }
                    
                    getVariableKeyObject.forEach(function(key) {

                        variablesIDKey =  getObjValue.variables[key]

                        content = getTableBody.innerHTML;

                        content += '<tr class="testSaveVariable"><td>' + variablesIDKey.key + '</td> <td>' + variablesIDKey.value + '</td> <td><a href="javascript:void(0);" class="edit-variables" widget-id="'+ getWidgetId +'" data-id="'+ key +'"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></a> <a href="javascript:void(0);" class="delete-variables" widget-id="'+ getWidgetId +'" data-id="'+ key +'"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></a></td></tr>';

                        getTableBody.innerHTML = content;
                        editVariable(id)
                        deleteVariable(id)

                        
                    });
                    getKey.value = "";
                    getValue.value = "";

                    
                    this.closest('.box').querySelector('#expand').classList.add('add-active');
                    this.closest('.box').querySelector('#expand').classList.remove('edit-active');

                    
                    
                })

                
                
            })
        }
        
    }

    function deleteVariable() {
        var deleteVariableBtn = document.querySelectorAll('.delete-variables')

        for (let index = 0; index < deleteVariableBtn.length; index++) {
            deleteVariableBtn[index].addEventListener('click', function(e) {

                iterateElement = this;
                
                // getId = this.getAttribute('data-id');
                getWidgetId = iterateElement.getAttribute('widget-id');
                getId = iterateElement.getAttribute('data-id');
                getOutput = iterateElement.getAttribute('data-output');
                
                
                getDataObj = editor.getNodeFromId(getWidgetId);
                getObjValue = getDataObj.data;


                delete getObjValue.variables[getId]

                
                editor.updateNodeDataFromId(getWidgetId, getObjValue)

                this.closest('.box').querySelector('.var-key').value = '';
                this.closest('.box').querySelector('.var-value').value = ''; 
                
                iterateElement.parentElement.parentElement.remove();
                
            })
        }
    }

    function getSelectionOptions() {
        document.querySelector('#set-variable-setValueAs').addEventListener('change', function() {
            // console.log(this.value)

            if (this.value === 'text-reply') {
                document.querySelector(`#${this.value}_container`).style.display = 'block'
            } else {
                document.querySelector(`#text-reply_container`).style.display = 'none'
            }
            
            if (this.value === 'custom-value') {
                document.querySelector(`#${this.value}_container`).style.display = 'block'
            } else {
                document.querySelector(`#custom-value_container`).style.display = 'none'
            }
        })
    }
    
    setVariable()
    addVariable()
    editVariable()
    deleteVariable()
    getSelectionOptions()



    /*
    |
    |****************************************************************
    |
    |   @SEND MESSAGE FUNCTIONS PARAMETERS
    |   
    |   Defining the SEND MESSAGE FUNCTIONS Functionality
    |
    |****************************************************************
    |    
    */

    function setSMessageParameters() {

    }

    function radioSMessageParameters() {
        const msgOptions = document.querySelectorAll('[name="msg-options"]');

        for (let index = 0; index < msgOptions.length; index++) {
            
            msgOptions[index].addEventListener('change', function() {
                console.log(this.value)
                
                if (this.value === 'text-message') {
                    document.querySelector(`.${this.value}`).classList.add('show');
                } else {
                    document.querySelector(`.text-message`).classList.remove('show');
                }
                
                
                if (this.value === 'audio-message') {
                    document.querySelector(`.${this.value}`).classList.add('show');
                } else {
                    document.querySelector(`.audio-message`).classList.remove('show');
                }
                
                
                if (this.value === 'video-message') {
                    document.querySelector(`.${this.value}`).classList.add('show');
                } else {
                    document.querySelector(`.video-message`).classList.remove('show');
                }


                
                
            })

        }
        
    }

    // Audio
    
    function chooseAudioMsgFormat() {
        const audioMsgOption = document.querySelector('#audio-msg-option');

        audioMsgOption.addEventListener('change', function() {
            console.log(this.value);

            if (this.value === 'rec-upload-msg') {
                document.querySelector(`.${this.value}`).classList.add('show');
            } else {
                document.querySelector('.rec-upload-msg').classList.remove('show')
            }

            if (this.value === 'use-tts') {
                document.querySelector(`.${this.value}`).classList.add('show');
            } else {
                document.querySelector('.use-tts').classList.remove('show')
            }
            
            if (this.value === 'voice-url') {
                document.querySelector(`.${this.value}`).classList.add('show');
            } else {
                document.querySelector('.voice-url').classList.remove('show')
            }
            
        })
        
    }


    // Video
    
    function chooseVideoMsgFormat() {
        const audioMsgOption = document.querySelector('#video-msg-option');

        audioMsgOption.addEventListener('change', function() {
            console.log(this.value);

            if (this.value === 'video-rec-upload-msg') {
                document.querySelector(`.${this.value}`).classList.add('show');
            } else {
                document.querySelector('.video-rec-upload-msg').classList.remove('show')
            }
            
            if (this.value === 'video-url') {
                document.querySelector(`.${this.value}`).classList.add('show');
            } else {
                document.querySelector('.video-url').classList.remove('show')
            }
            
        })
    }
    
    radioSMessageParameters();
    chooseAudioMsgFormat()
    chooseVideoMsgFormat();


    // setTimeout(() => {
        
    //  Text To speech Functionality
    
        var inputSpeakBtn = document.querySelector('.btn-text-voice');
        var inputTxt = document.querySelector('#your-text');
        var voiceSelect = document.querySelector('#new-voice-list');
    
        var synth = window.speechSynthesis;
        
        setTimeout(() => {
            
            var voices = synth.getVoices();
            
            for (let index = 0; index < voices.length; index++) {
                const voicesElement = voices[index];
    
                var option = document.createElement('option');
                option.textContent = voicesElement.name + ' (' + voicesElement.lang + ')';
                option.value = index;

                voiceSelect.appendChild(option);
            }
            
            inputSpeakBtn.addEventListener('click', function() {
                var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
                utterThis.voice = voices[voiceSelect.value];
                synth.speak(utterThis);
                inputTxt.blur();
            })
        }, 1000);
        
        
        
    // }, 1000);
    
    


    // Function to detact Touch Screens

    // The Functionaliy is being use to detect and a pply ADDPIPE Video according to condition
    function is_touch_enabled() {
        return ( 'ontouchstart' in window ) || 
            ( navigator.maxTouchPoints > 0 ) || 
            ( navigator.msMaxTouchPoints > 0 );
    }

    const recordVideoModal = document.querySelector('.recordVideoModal')
    const videoFrameOuter = document.querySelector('.video-frame-outer')
    
    
    if( is_touch_enabled() ) {
        recordVideoModal.style.display = 'none';
        // var pipeParams = {size:{width:640,height:390}, qualityurl:"avq/720p.xml", accountHash:"892e1969fbf13a5153eba06c55bfba0d", eid:"0cB5zb", mrt:120, asv:0};
    
        var pipeParams = {size:{width:640,height:390}, qualityurl:"avq/720p.xml", accountHash:"892e1969fbf13a5153eba06c55bfba0d", eid:"0cB5zb", mrt:120, showMenu:0, asv:0};
        
        PipeSDK.insert("custom-idq",pipeParams,function(recorderObject){});
    }
    else {
        // videoFrameOuter.style.display = 'none';
        
        $('#recordVideo').on('show.bs.modal', function (event) {
            
            // var pipeParams = {size:{width:640,height:390}, qualityurl:"avq/720p.xml", accountHash:"892e1969fbf13a5153eba06c55bfba0d", eid:"0cB5zb", mrt:20, asv:0};
            var pipeParams = {size:{width:640,height:390}, qualityurl:"avq/720p.xml", accountHash:"892e1969fbf13a5153eba06c55bfba0d", eid:"0cB5zb", mrt:120, showMenu:0, asv:0, sis: 1};
            PipeSDK.insert("custom-id",pipeParams,function(recorderObject){
    
                console.log(recorderObject)
                console.log(pipeParams)
                console.log(pipeParams.mrt)
                
                var getRecorderActions = document.querySelector('.v-recorder-actions');
                var getStartBtn = document.querySelector('.v-record-start');
                var getStopBtn = document.querySelector('.v-record-stop');
                var getPlayBtn = document.querySelector('.v-record-play');
                var getPauseBtn = document.querySelector('.v-record-pause');
                var getSaveBtn = document.querySelector('.v-record-save');
                
                
                recorderObject.onReadyToRecord = function(id, type){
                    
                    
                    getRecorderActions.style.display = 'flex';
                    getStartBtn.addEventListener('click', function() {
                        recorderObject.record();
                        this.disabled = true;                   
                    })
    
                    getPlayBtn.addEventListener('click', function() {
                        recorderObject.playVideo();
                        getPauseBtn.disabled = false;
                        getPauseBtn.style.display = 'block';
                        this.style.display = 'none';
                        getSaveBtn.disabled = true;
                        getStartBtn.disabled = true;
                    })
                    
                    getPauseBtn.addEventListener('click', function() {
                        recorderObject.pause();
                    })
                    
                    getStopBtn.addEventListener('click', function() {
                        recorderObject.stopVideo();
                    })
                    
                    
                    getSaveBtn.addEventListener('click', function() {
                        recorderObject.save();
                    })
    
    
                    setTimeout(() => {
                        document.querySelector('.stream-time').textContent = secondsToHmsVideo(pipeParams.mrt)
                        document.querySelector('.stream-time').style.display = 'block';
                        // document.querySelector('.stream-time').textContent = '';
                        getStartBtn.disabled = false;
                        Snackbar.show({
                            text: `Recorder Initialized`,
                            duration: 3000,
                            pos: 'top-right',
                            backgroundColor: '#4361ee',
                            textColor: '#fff',
                            showAction: false
                        });
                    }, 1000);
                    
    
                }
    
    
                // getStreamTime();pipeParams.mrt
    
                recorderObject.onRecordingStarted = function() {
    
                    var i = pipeParams.mrt-1;
                    storeCurrentIValue = 0; 
                    RecordingStartInverval = setInterval(function() {
                        if (i < 0) {
                            clearInterval(this);
                            return storeCurrentIValue = i;
                        } else {
                            document.querySelector('.stream-time').textContent = secondsToHmsVideo(i--);
                        }
                    }, 1000);
                    
                    
                    getStopBtn.disabled = false;
                    getPauseBtn.disabled = true;
                    getPlayBtn.disabled = true;
                    getSaveBtn.disabled = true;
                    document.querySelector('.v-recorded-time').style.display = 'none';
                    document.querySelector('.stream-time').style.display = 'block';
    
                    Snackbar.show({
                        text: `Recording Started....`,
                        duration: 3000,
                        pos: 'top-right',
                        backgroundColor: '#4073ff',
                        textColor: '#fff',
                        showAction: false
                    });
                }
    
                recorderObject.btStopRecordingPressed = function(recorderId){
                    // console.log(storeCurrentIValue)
                    getStartBtn.disabled = false;
                    clearInterval(RecordingStartInverval);
                }
                
    
                recorderObject.btPlayPressed = function(recorderId){
                    
                    console.log('Play');
                    console.log(recorderObject.getPlaybackTime());
                    console.log(recorderObject.getStreamTime());
    
                    document.querySelector('.v-recorded-time').textContent = secondsToHmsVideo(recorderObject.getPlaybackTime())
                    document.querySelector('.v-recorded-time').style.display = 'block';
                    document.querySelector('.stream-time').style.display = 'none';
                    
                    var getVideoStreamedTime = recorderObject.getStreamTime();
    
                    j = -1;
                    RecordedVideoStreamTime = setInterval(function() {
                        if (j === getVideoStreamedTime) {
                            clearInterval(this);
                        } else if (j === -1) {
                            j++
                        } else {
                            document.querySelector('.v-recorded-time').textContent = secondsToHmsVideo(j++);
                        }
                    }, 1000);
                    
                }
                
                
                recorderObject.btPausePressed = function(recorderId){
                    getPauseBtn.style.display = 'none';
                    getPlayBtn.style.display = 'block';
                    getSaveBtn.disabled = false;
                    clearInterval(RecordedVideoStreamTime);
                    
                }
    
                recorderObject.onPlaybackComplete = function() {
                    getPauseBtn.style.display = 'none';
                    getPlayBtn.style.display = 'block';
                    getSaveBtn.disabled = false;
                    getStartBtn.disabled = false;
                    clearInterval(RecordedVideoStreamTime);
                }
                recorderObject.onUploadDone = function() {
                    getStopBtn.disabled = true;
                    getPlayBtn.disabled = false;
                    getSaveBtn.disabled = false;
                    Snackbar.show({
                        text: `Recording Stopped`,
                        duration: 3000,
                        pos: 'top-right',
                        backgroundColor: '#9c541d',
                        textColor: '#fff',
                        showAction: false
                    });
                }
                recorderObject.onSaveOk = function() {
                    getSaveBtn.disabled = true
                    getPlayBtn.disabled = true;
                    getStartBtn.disabled = false;
                    $('#recordVideo').modal('hide');
                    Snackbar.show({
                        text: `Video Saved Successfully`,
                        duration: 5000,
                        pos: 'top-right',
                        backgroundColor: '#009688',
                        textColor: '#fff',
                        showAction: false
                    });
                    recorderObject.remove();
                    getRecorderActions.style.display = 'none';
                    document.querySelector('.stream-time').style.display = 'none';
                    document.querySelector('.v-recorded-time').style.display = 'none';
                }
                
                
            });
    
        })
    
    }

    const videoSrc = document.querySelector("#video-source");
    const videoTag = document.querySelector("#video-tag");
    const inputTag = document.querySelector(".video-input");

    // Functionaliy is to change and render the video when uploaded from the input[type='file'] 
    inputTag.addEventListener('change',  readVideo)

    function readVideo(event) {
        console.log(event.target.files)
        if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        console.log(reader)
            
        reader.onload = function(e) {
            videoSrc.src = e.target.result
            // aTag.href = e.target.result
            videoTag.load();

            document.querySelector('.viewUploadedVideo').style.display = 'inline-block';
            
        }.bind(this)
    
        reader.readAsDataURL(event.target.files[0]);
        }
    }
    
    /*
    |
    |****************************************************************
    |
    |   @RUN FUNCTIONS PARAMETERS
    |   
    |   Defining the RUN FUNCTIONS Functionality
    |
    |****************************************************************
    |    
    */
    
    function setRFunctionParameters() {
        
        var setFPBtn = document.querySelectorAll('.create-fp');
    
        for (let index = 0; index < setFPBtn.length; index++) {
            const element = setFPBtn[index];
    
            setFPBtn[index].addEventListener('click', function(e) {
                // console.log('.ddfd');
                this.parentElement.querySelector('#expand').classList.add('add-active');
                this.parentElement.querySelector('#expand').classList.remove('edit-active');
            })
            
        }
    }

    setRFunctionParameters()
    // addRFunctionParameters()
    // editRFunctionParameters()
    // deleteRFunctionParameters()


    /*
    |
    |****************************************************************
    |
    |   @SPLIT BASED ON
    |
    |   Defining the SPLIT BASED ON Functionality
    |
    |****************************************************************
    |
    */


    function setSplitBased() {
        
        var setFPBtn = document.querySelectorAll('.create-split-based-conditions');
    
        for (let index = 0; index < setFPBtn.length; index++) {
            const element = setFPBtn[index];
    
            setFPBtn[index].addEventListener('click', function(e) {
                // console.log('.ddfd');
                this.parentElement.querySelector('#expand').classList.add('add-active');
                this.parentElement.querySelector('#expand').classList.remove('edit-active');
            })
            
        }
    }

    function addSplitBased() {
        
        var setVariableBtn = document.querySelector(`.add-split-based-conditions`);


        setVariableBtn.addEventListener('click', function(e) {
                
            e.stopImmediatePropagation();
            getWidgetID = this.getAttribute('widget-id');


            getKey = this.parentElement.querySelector('.split-based-conditions-key');
            getValue = this.parentElement.querySelector('.split-based-conditions-value');
            // getquery = this.parentElement.querySelector('.full-query');
            getCurrentQuery = this.parentElement.querySelector('.current-condition');
            getCurrentQueryValue = this.parentElement.querySelector('.current-condition-value');

            getTable = this.closest('.create-split-based-conditions-container').querySelector('.split-based-conditions-table');

            getTableBody = this.closest('.create-split-based-conditions-container').querySelector('.split-based-conditions-table > tbody');
            setID = uuidv4();
            // getTableRows = getTable.rows.length
            
            // console.log(getTableRows)

            if (getKey.value !== '' && getValue.value !== '') {


                getQueryName = 'If value ' + getKey.value + ' ' + getValue.value;

                getData = editor.getNodeFromId(getWidgetID);
                
                getOutputs = getData.outputs;

                const numInputs = Object.keys(getOutputs).length;
                const increaseNumOutput = numInputs + 1;

                // console.log(numInputs)

                editor.addNodeOutput(getWidgetID);

                    defineVariables = { id: setID, query: getKey.value, value: getValue.value, queryName: getQueryName }
                    

                    getDataObj = editor.getNodeFromId(getWidgetID);
                    getObjValue = getDataObj.outputs['output_' + increaseNumOutput];


                    editor.drawflow.drawflow.Home.data[getWidgetID].outputs['output_' + increaseNumOutput].conditions = defineVariables;

                    updatedEditorData =  editor.getNodeFromId(getWidgetID)

                    getConnectionsValue = updatedEditorData.outputs['output_' + increaseNumOutput].conditions;
                    getConditionsValue = getConnectionsValue.queryName
                    getVariableKeyObject = Object.keys(getConnectionsValue)

                    console.log(getConnectionsValue.queryName)

                    getVariableKeyObject.forEach(function(key) {

                        variablesIDKey =  getConnectionsValue[key];


                        content = getTableBody.innerHTML;

                        content += '<tr data-connection="output_'+ increaseNumOutput +'" data-queryName="'+ getConnectionsValue.queryName  +'"><td>' + getConnectionsValue.query + '</td> <td>' + getConnectionsValue.value + '</td> <td><a href="javascript:void(0);" class="edit-split-based-conditions" widget-id="'+ getWidgetID +'" data-id="'+ setID +'" data-output="'+increaseNumOutput+'"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></a> <a href="javascript:void(0);" class="delete-split-based-conditions" widget-id="'+ getWidgetID +'" data-id="'+ setID +'"  data-output="'+increaseNumOutput+'"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></a></td></tr>';
                        
                    });
                    
                    // editor.addNodeOutput(id);

                    getTableBody.innerHTML = content;
                    
                    editRFunctionParameters(getWidgetID)

                    setConnectionValues(getWidgetID, "conditions", "queryName")
                
            }

            getKey.value = ''; 
            getValue.value = '';
            getCurrentQuery.innerText = '';
            getCurrentQueryValue.innerText = '';

            editSplitBased(getWidgetID)
            deleteSplitBased(getWidgetID)


            // this.removeEventListener('click');
            
        })
    }

    function editSplitBased() {

        var editVariableBtn = document.querySelectorAll('.edit-split-based-conditions')
        
        for (let index = 0; index < editVariableBtn.length; index++) {

            editVariableBtn[index].addEventListener('click', function(e) {

                e.stopImmediatePropagation();

                iterateElement = this;

                getId = iterateElement.getAttribute('widget-id');
                getOutput = iterateElement.getAttribute('data-output');

                getDataObj = editor.getNodeFromId(getId);
                getObjValue = getDataObj.outputs;

                getVariableID = getObjValue['output_' + getOutput].conditions.id;
                getVariableKey = getObjValue['output_' + getOutput].conditions.query;
                getVariableValue = getObjValue['output_' + getOutput].conditions.value;
                
                this.closest('.box').querySelector('#expand').classList.add('edit-active');
                this.closest('.box').querySelector('#expand').classList.remove('add-active');
                
                this.closest('.box').querySelector('.split-based-conditions-key').value = getVariableKey;
                this.closest('.box').querySelector('.split-based-conditions-value').value = getVariableValue;

                this.closest('.box').querySelector('.current-condition').innerText = getVariableKey;
                this.closest('.box').querySelector('.current-condition-value').innerText = getVariableValue;

                getSaveBtn = this.closest('.box').querySelector('.save-split-based-conditions');

                
                getSaveBtn.addEventListener('click', function(e) {
                    e.stopImmediatePropagation();
                    getKey = this.closest('.box').querySelector('.split-based-conditions-key');
                    getValue = this.closest('.box').querySelector('.split-based-conditions-value');
                    getQueryName = 'If value ' + getKey.value + ' ' + getValue.value;


                    UpdateData = { id: getVariableID, query: getKey.value, value: getValue.value, queryName: getQueryName }
                    // CurrentData = { ...getObjValue['output_' + getOutput], conditions: UpdateData }

                    editor.drawflow.drawflow.Home.data[getId].outputs['output_' + getOutput].conditions = UpdateData;

                    updatedEditorData =  editor.getNodeFromId(getId)

                    getConnectionsValue = updatedEditorData.outputs['output_' + getOutput].conditions;
                    // getConditionsValue = getConnectionsValue[setID]
                    getVariableKeyObject = Object.keys(getConnectionsValue)


                    
                    // getVariableKeyObject = Object.keys(getObjValue.conditions)

                    getTable = this.closest('.create-split-based-conditions-container').querySelector('.split-based-conditions-table')

                    getTableBody = this.closest('.create-split-based-conditions-container').querySelector('.split-based-conditions-table > tbody')

                    getTableRows = getTableBody.querySelectorAll('tr')

                    // console.log('[data-connection="output_'+ getOutput + '"] td:nth-child(1)')

                    getConnectionTableRowKey = iterateElement.closest('.split-based-conditions-table').querySelector('tr[data-connection="output_'+ getOutput + '"] td:nth-child(1)').innerText = getKey.value;
                    getConnectionTableRowValue = iterateElement.closest('.split-based-conditions-table').querySelector('tr[data-connection="output_'+ getOutput + '"] td:nth-child(2)').innerText = getValue.value;
                    // getConnectionTableRowValue = iterateElement.parentElement.parentElement.innerText = getValue.value


                    setConnectionValues(getId, "conditions", "queryName")


                    editSplitBased(getId)
                    deleteSplitBased(getId)

                    getKey.value = "";
                    getValue.value = "";
                    document.querySelector('.current-condition').innerText = '';
                    document.querySelector('.current-condition-value').innerText = '';

                    this.closest('.box').querySelector('#expand').classList.add('add-active');
                    this.closest('.box').querySelector('#expand').classList.remove('edit-active');
                    
                    
                })

                
                
            })
            
        }
        
    }

    function deleteSplitBased() {
        var deleteVariableBtn = document.querySelectorAll('.delete-split-based-conditions')

        for (let index = 0; index < deleteVariableBtn.length; index++) {
            deleteVariableBtn[index].addEventListener('click', function(e) {

                iterateElement = this;

                getId = iterateElement.getAttribute('data-id');
                getOutput = iterateElement.getAttribute('data-output');

                getDataObj = editor.getNodeFromId(id);
                getObjValue = getDataObj.outputs;


                this.closest('.box').querySelector('.split-based-conditions-key').value = '';
                this.closest('.box').querySelector('.split-based-conditions-value').value = '';

                iterateElement.parentElement.parentElement.remove();

                editor.removeNodeOutput(id, 'output_' + getOutput);
 
            })
        }
    }
    
    function dynamicTextSplitBased() {

        const splitBasedConditionsKey = document.querySelector('.split-based-conditions-key')
        const splitBasedConditionsValue = document.querySelector('.split-based-conditions-value')
        
        
        splitBasedConditionsKey.addEventListener('change', function() {
            this.parentElement.closest('.form-split-based-conditions').querySelector('.current-condition').innerText = this.value;
        })
        
        splitBasedConditionsValue.addEventListener('input', function() {
            this.parentElement.closest('.form-split-based-conditions').querySelector('.current-condition-value').innerText = this.value;
        })
    }

    function collapsableTextSplitBased() {

        const collapsableBtn = document.querySelectorAll('.collapsable-toggle');
        
        for (let index = 0; index < collapsableBtn.length; index++) {
            collapsableBtn[index].addEventListener('click', function(e) {
                // e.preventDefault();
                e.stopImmediatePropagation();

                iterateElement = this;

                getCollapsableParent = iterateElement.parentElement;

                if(getCollapsableParent.classList.contains('show')) {
                    getCollapsableParent.classList.remove('show')
                    iterateElement.innerHTML = iterateElement.getAttribute('data-onCloseText');
                    // return;
                } else {
                    getCollapsableParent.classList.add('show');
                    iterateElement.innerHTML = iterateElement.getAttribute('data-onOpenText');
                    // return;
                }
            })
        }
        
    }


    // Number Of Times Called

    // function getSelectionOptions() {
    document.querySelector('#split_based-setValueAs').addEventListener('change', function() {
        // console.log(this.value)

        if (this.value === 'times-called') {
            document.querySelector(`#${this.value}_container`).style.display = 'block'
        } else {
            document.querySelector(`#times-called_container`).style.display = 'none'
        }

        if (this.value === 'permission') {
            document.querySelector(`#${this.value}_container`).style.display = 'block'
        } else {
            document.querySelector(`#permission_container`).style.display = 'none'
        }

        if (this.value === 'contact') {
            document.querySelector(`#${this.value}_container`).style.display = 'block'
        } else {
            document.querySelector(`#contact_container`).style.display = 'none'
        }

        console.log(this.value);
        if (this.value === 'tags') {
            console.log(this.value);
            document.querySelector(`#${this.value}_container`).style.display = 'block'
        } else {
            document.querySelector(`#tags_container`).style.display = 'none'
        }

        if (this.value === 'contact-rank') {
            document.querySelector(`#${this.value}_container`).style.display = 'block'
        } else {
            document.querySelector(`#contact-rank_container`).style.display = 'none'
        }

        if (this.value === 'custom-variable') {
            document.querySelector(`#${this.value}_container`).style.display = 'block'
        } else {
            document.querySelector(`#custom-variable_container`).style.display = 'none'
        }
    })
    // }


    document.querySelector('#split_based-setValueAs-contact').addEventListener('change', function() {
        // console.log(this.value)

        if (this.value === 'in-group') {
            document.querySelector(`#${this.value}_container`).style.display = 'block'
        } else {
            document.querySelector(`#in-group_container`).style.display = 'none'
        }
    })

    var input = document.querySelector('#split_based-setValueAs-tag_condition'),
    // init Tagify script on the above inputs
    splitBased = new Tagify(input, {
      whitelist: ["A# .NET", "A# (Axiom)", "A-0 System", "A+", "A++", "ABAP", "ABC", "ABC ALGOL", "ABSET", "ABSYS", "ACC", "Accent", "Ace DASL", "ACL2", "Avicsoft", "ACT-III", "Action!", "ActionScript", "Ada", "Adenine", "Agda", "Agilent VEE", "Agora", "AIMMS", "Alef", "ALF", "ALGOL 58", "ALGOL 60", "ALGOL 68", "ALGOL W", "Alice", "Alma-0", "AmbientTalk", "Amiga E", "AMOS", "AMPL", "Apex (Salesforce.com)", "APL", "AppleScript", "Arc", "ARexx", "Argus", "AspectJ", "Assembly language", "ATS", "Ateji PX", "AutoHotkey", "Autocoder", "AutoIt", "AutoLISP / Visual LISP", "Averest", "AWK", "Axum", "Active Server Pages", "ASP.NET", "B", "Babbage", "Bash", "BASIC", "bc", "BCPL", "BeanShell", "Batch (Windows/Dos)", "Bertrand", "BETA", "Bigwig", "Bistro", "BitC", "BLISS", "Blockly", "BlooP", "Blue", "Boo", "Boomerang", "Bourne shell (including bash and ksh)", "BREW", "BPEL", "B", "C--", "C++ – ISO/IEC 14882", "C# – ISO/IEC 23270", "C/AL", "Caché ObjectScript", "C Shell", "Caml", "Cayenne", "CDuce", "Cecil", "Cesil", "Céu", "Ceylon", "CFEngine", "CFML", "Cg", "Ch", "Chapel", "Charity", "Charm", "Chef", "CHILL", "CHIP-8", "chomski", "ChucK", "CICS", "Cilk", "Citrine (programming language)", "CL (IBM)", "Claire", "Clarion", "Clean", "Clipper", "CLIPS", "CLIST", "Clojure", "CLU", "CMS-2", "COBOL – ISO/IEC 1989", "CobolScript – COBOL Scripting language", "Cobra", "CODE", "CoffeeScript", "ColdFusion", "COMAL", "Combined Programming Language (CPL)", "COMIT", "Common Intermediate Language (CIL)", "Common Lisp (also known as CL)", "COMPASS", "Component Pascal", "Constraint Handling Rules (CHR)", "COMTRAN", "Converge", "Cool", "Coq", "Coral 66", "Corn", "CorVision", "COWSEL", "CPL", "CPL", "Cryptol", "csh", "Csound", "CSP", "CUDA", "Curl", "Curry", "Cybil", "Cyclone", "Cython", "Java", "Javascript", "M2001", "M4", "M#", "Machine code", "MAD (Michigan Algorithm Decoder)", "MAD/I", "Magik", "Magma", "make", "Maple", "MAPPER now part of BIS", "MARK-IV now VISION:BUILDER", "Mary", "MASM Microsoft Assembly x86", "MATH-MATIC", "Mathematica", "MATLAB", "Maxima (see also Macsyma)", "Max (Max Msp – Graphical Programming Environment)", "Maya (MEL)", "MDL", "Mercury", "Mesa", "Metafont", "Microcode", "MicroScript", "MIIS", "Milk (programming language)", "MIMIC", "Mirah", "Miranda", "MIVA Script", "ML", "Model 204", "Modelica", "Modula", "Modula-2", "Modula-3", "Mohol", "MOO", "Mortran", "Mouse", "MPD", "Mathcad", "MSIL – deprecated name for CIL", "MSL", "MUMPS", "Mystic Programming L"],
      maxTags: 10,
      dropdown: {
        maxItems: 20,           // <- mixumum allowed rendered suggestions
        classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
        enabled: 0,             // <- show suggestions on focus
        closeOnSelect: false    // <- do not hide the suggestions dropdown once an item has been selected
      }
    })
    


    editSplitBased()
    deleteSplitBased()
    collapsableTextSplitBased();
    
    function deleteNode(id) {
        drawflowDelete = document.querySelector(`#node-${id} .drawflow-delete-widget`);
        drawflowDelete.addEventListener('click', function() {
            editor.removeNodeId(`node-${getData.id}`)
            document.querySelector('.drawflow-widget-fields').classList.remove('show')
        })        
    }
    
    
    function setConnectionValues(ID, query, key) {

        getTWData = editor.getNodeFromId(ID)
        getTWOutputs = editor.drawflow.drawflow.Home.data[ID].outputs;
        extractTWOutputKeys = Object.keys(getTWOutputs);

        for (let index = 0; index < extractTWOutputKeys.length; index++) {
            const element = extractTWOutputKeys[index];
            // console.log(element)
            outputs = editor.drawflow.drawflow.Home.data[ID].outputs[element];
            document.querySelector(`#node-${ID} .outputs .${element}`).innerHTML = outputs[query][key];


        }
        
    }
    
    setConnectionValues(setUniqueID, "info", "queryName")
    
    

    /*
    |
    |****************************************************************
    |
    |   @EXPORTING DATA TO CODE MIRROR
    |
    |   Defining the EXPORTING DATA TO CODE MIRROR Functionality
    |
    |****************************************************************
    |
    */

    var myCodeMirror = CodeMirror(document.querySelector('.codemirror-init'), {
        lineNumbers: true,
        tabSize: 2,
        mode: 'javascript',
        theme: 'darcula'
    });
    
    


    getModalOpeners = document.querySelectorAll('.modal-activity')
    
    // console.log(getModalOpeners)
    for (let index = 0; index < getModalOpeners.length; index++) {
        
        // console.log(getModalOpeners.length)

        getModalOpeners[index].addEventListener('click', function() {

            // console.log(getModalOpeners[index])
    
            if (this.classList.contains('export-data')) {
    
                // $('#exampleModal').on('shown.bs.modal', function() {        
                    // });

                    
                // Compare new and old JSON data
                if (myCodeMirror.getValue()  !== JSON.stringify(editor.export(), null,4)) {
                    Snackbar.show({text: 'Loading Data...', pos: 'bottom-center', textColor: '#060818', actionTextColor: '#060818', backgroundColor: '#02beaf', showAction: false, duration: 1700});
                }
                
                setTimeout(function(){
                    myCodeMirror.setValue(JSON.stringify(editor.export(), null,4));
                    myCodeMirror.refresh();
                }, 2000);//wait 2 seconds
                
                document.querySelector('.exportjson').style.display = 'inline-block';
                document.querySelector('.importjson').style.display = 'none';
                document.querySelector('.saveData').style.display = 'none';
    
                // console.log('sdfsfsfs')
                
            } else if (this.classList.contains('import-data')) {

                setTimeout(function(){
                    myCodeMirror.setValue('Paste JSON data here\n OR \nUpload the file directly');
                    myCodeMirror.refresh();
                }, 300);//wait 2 seconds

                document.querySelector('.exportjson').style.display = 'none';
                document.querySelector('.importjson').style.display = 'flex';
                document.querySelector('.saveData').style.display = 'inline-block';
                
                // console.log('oid')
            }
            
        })
    }
    
    
    
    
    

    document.querySelector('.toggle-widget-list').addEventListener('click', function() {

        if (window.innerWidth < 768 ) {
            Snackbar.show({text: 'Editing is not allowed on this resolution'});
            return;
        }

        if (this.parentElement.classList.contains('show')) {
            this.parentElement.classList.remove('show')
        } else {
            this.parentElement.classList.add('show')
        }
        
    })

    document.querySelector('.toggle-widget-fields').addEventListener('click', function() {

        if (window.innerWidth < 768 ) {
            Snackbar.show({text: 'Editing is not allowed on this resolution'});
            return;
        }

        if (this.parentElement.classList.contains('show')) {
            this.parentElement.classList.remove('show')
        } else {
            this.parentElement.classList.add('show')
        }
        
    })

   

    function chkOninit() {
        if (window.innerWidth < 768 ) {
            document.querySelector('.drawflow-widget').classList.remove('show')
            editor.editor_mode='fixed';
            changeMode('lock');
        } else {
            document.querySelector('.drawflow-widget').classList.add('show')
            editor.editor_mode='edit';
            changeMode('unlock');
        }
    }
    
    setTimeout(() => {
        chkOninit();
        
    }, 1500);
    // console.log(window.innerWidth)
    window.addEventListener('resize', function(event) {
        chkOninit();
    }, true);
    
    

    document.querySelector('.btn-publish').addEventListener('click', function() {
        Snackbar.show({text: 'Successfully Published', textColor: '#060818', actionTextColor: '#060818',
        backgroundColor: '#02beaf'});
    })

    
    
    document.querySelector('#exportJSON').addEventListener('click', function() {
        var obj = editor.export();
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj, null,4));
        // what to return in order to show download window?
    
        this.setAttribute("href", "data:"+data);
        this.setAttribute("download", "my-work-flow-"+ uuidv4() +".json");    
        
    })


    document.querySelector('.saveData').addEventListener('click', function() {
        importValue = myCodeMirror.getValue()
        // console.log(typeof importValue)
        
        convertToSting =  JSON.parse(importValue);
        
        // editor.import({"drawflow":{"Home":{"data":{"8bff12a8-d5fb-4924-8a5c-7777abc39bda":{"id":"8bff12a8-d5fb-4924-8a5c-7777abc39bda","name":"trigger","data":{"name":"","resetapi":"","webhookurl":"","testusers":""},"class":"trigger","html":"\n                <div>\n                    <div class=\"title-box\"><span class=\"icon\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-sliders\"><line x1=\"4\" y1=\"21\" x2=\"4\" y2=\"14\"></line><line x1=\"4\" y1=\"10\" x2=\"4\" y2=\"3\"></line><line x1=\"12\" y1=\"21\" x2=\"12\" y2=\"12\"></line><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"3\"></line><line x1=\"20\" y1=\"21\" x2=\"20\" y2=\"16\"></line><line x1=\"20\" y1=\"12\" x2=\"20\" y2=\"3\"></line><line x1=\"1\" y1=\"14\" x2=\"7\" y2=\"14\"></line><line x1=\"9\" y1=\"8\" x2=\"15\" y2=\"8\"></line><line x1=\"17\" y1=\"16\" x2=\"23\" y2=\"16\"></line></svg></span> Trigger </div>\n                    <div class=\"box\">\n\n                        <div class=\"trigger-fields\">\n\n                            <div class=\"form-row\">\n                                <div class=\"form-group col-md-6\">                        \n                                    <input id=\"trigger-flowName\" placeholder=\"Flow Name\" type=\"text\" df-name>\n                                </div>\n                                <div class=\"form-group col-md-6\">\n                                    <input id=\"trigger-resetApi\" placeholder=\"Reset Api\" type=\"text\" df-resetapi>\n                                </div>\n                            </div>\n\n                            <div class=\"form-row\">\n                                <div class=\"form-group col-md-12\">                        \n                                    <input id=\"trigger-webhookurl\" placeholder=\"Webhook Url\" type=\"text\" df-webhookurl>\n                                </div>\n                                <div class=\"form-group col-md-12\">\n                                    <textarea id=\"trigger-testsers\" placeholder=\"Test Users\" df-testusers></textarea>\n                                </div>\n                            </div>                            \n                            \n                        </div>\n                            \n                    </div>\n                </div>\n            ","typenode":false,"inputs":{},"outputs":{"output_1":{"connections":[]},"output_2":{"connections":[]},"output_3":{"connections":[]}},"pos_x":415,"pos_y":25}}}}});
        
        Snackbar.show({text: 'Processing Data...', pos: 'bottom-center', textColor: '#060818', actionTextColor: '#060818', backgroundColor: '#02beaf', showAction: false, duration: 1700});
        
        setTimeout(function() {
            try {
                editor.import(convertToSting);
                $('#exampleModal').modal('hide')


                setVariable()
                addVariable(id)
                editVariable(id)
                deleteVariable(id)


                setRFunctionParameters()
                addRFunctionParameters(id)
                editRFunctionParameters(id)
                deleteRFunctionParameters(id)


                setSplitBased()
                addSplitBased(id)
                editSplitBased(id)
                deleteSplitBased(id)
                dynamicTextSplitBased()
                collapsableTextSplitBased();
            } catch (err) {
                Snackbar.show({text: 'Invalid Data', pos: 'bottom-center', textColor: '#060818', actionTextColor: '#060818', backgroundColor: '#ff7d75', showAction: false});
            }
        }, 2000);//wait 2 seconds
        
        
    })

    editor.on('import', function() {
        console.log('dfddf');
        Snackbar.show({text: 'Data Imported Successfully', pos: 'bottom-center', textColor: '#060818', actionTextColor: '#060818', backgroundColor: '#02beaf', showAction: false, duration: 1700});
    })
    
   

    document.querySelector('#importJSON').onclick = function() {
        var files = document.getElementById('selectFiles').files;
        if (files.length <= 0) {
            return false;
        }
      
        var fr = new FileReader();
      
        fr.onload = function(e) {
            var result = JSON.parse(e.target.result);
            var formatted = JSON.stringify(result, null, 2);
                // document.getElementById('result').value = formatted;
            myCodeMirror.setValue(formatted);
        }
        
        fr.readAsText(files.item(0));
        document.querySelector('#selectFiles').value = '';

    };

    bsCustomFileInput.init()
    

    function changeModule(event) {
      var all = document.querySelectorAll(".menu ul li");
        for (var i = 0; i < all.length; i++) {
          all[i].classList.remove('selected');
        }
      event.target.classList.add('selected');
    }

    function changeMode(option) {

    //console.log(lock.id);
      if(option == 'lock') {
        lock.classList.add('active');
        unlock.classList.remove('active');
      } else {
        lock.classList.remove('active');
        unlock.classList.add('active');
      }

    }


 
    // Manual Select

    var x, i, j, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("manual-select");
    for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            /* When an item is clicked, update the original select box,
            and the selected item: */
            var y, i, k, s, h;
            // console.log('sfsd');
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            h = this.parentNode.previousSibling;
            for (i = 0; i < s.length; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                // console.log(h.classList.add('has-Value'));
                // h.innerHTML = '<img src="' + this.innerHTML +'">';
                if (s.options[i].getAttribute('data-img') === '+000') {
                    h.innerHTML = s.options[i].getAttribute('data-img');
                    h.classList.remove('has-value');
                } else {
                    h.innerHTML = '<img src="./assets/img/flags/' + s.options[i].getAttribute('data-img') +'.png">';
                    h.classList.add('has-value');
                }
                // console.log(this.innerHTML);
                // console.log(s.options[i].getAttribute('data-img'));
                y = this.parentNode.getElementsByClassName("same-as-selected");
                for (k = 0; k < y.length; k++) {
                y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                break;
            }
            }
            h.click();
        });
        b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
    }

    function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
        arrNo.push(i)
        } else {
        y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
        }
    }
    }

    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelect);





// Functionaliy for Textarea Counter ( If you need to chagne the max value you can change it directly from the HTML by chaging the maxlength attribute in textarea )
var getTextareaMaxlengthAttr = document.querySelector('#message-wait-msg').getAttribute('maxlength');
var getRemainingValueCount = document.querySelector('.numeric-count');

document.querySelector('#message-wait-msg').onkeyup = function () {

    var getCalculatedVal = (getTextareaMaxlengthAttr - this.value.length);
    var halfvalue = getTextareaMaxlengthAttr/2;

    document.querySelector('.numeric-count').innerHTML = getCalculatedVal;
    
    console.log(halfvalue)
    console.log(getCalculatedVal)
    
    if (halfvalue === getCalculatedVal) {
        console.log('its half')
        getRemainingValueCount.classList.add('numeric-half')
        
    } else if (getCalculatedVal === 0) {
        console.log('Its 0')
        getRemainingValueCount.classList.remove('numeric-half')
        getRemainingValueCount.classList.add('numeric-zero')
    } else if (getCalculatedVal > 0) {
        getRemainingValueCount.classList.remove('numeric-zero')
        getRemainingValueCount.classList.add('numeric-half')
        // return
    } else if (getCalculatedVal > halfvalue) {
        getRemainingValueCount.classList.remove('numeric-half')
    }
    
};

getRemainingValueCount.innerText = getTextareaMaxlengthAttr;



var whitelist_2 = [
  'First Name', 
  'Last Name', 
  'Email', 
  'Street 1', 
  'Street 2', 
  'City', 
  'State', 
  'Zip', 
  'Country',
  'Company Name',
  'Title',
  'Rank',
  'Custom'
];

// initialize Tagify
var input = document.querySelector('.txtarea'),
    
    // init Tagify script on the above inputs
    txtarea = new Tagify(input, {
    //  mixTagsInterpolator: ["{{", "}}"],
        mode: 'mix',  // <--  Enable mixed-content
        pattern: /@|#/,  // <--  Text starting with @ or # (if single, String can be used here)

        // Array for initial interpolation, which allows only these tags to be used
        // whitelist: whitelist_1.concat(whitelist_2).map(function(item){ return typeof item == 'string' ? {value:item} : item}),

        dropdown : {
            enabled: 0,
            position: "text",
            highlightFirst: true  // automatically highlights first sugegstion item in the dropdown
        },
        callbacks: {
            add: console.log,  // callback when adding a tag
            remove: console.log   // callback when removing a tag
        }
    })


// A good place to pull server suggestion list accoring to the prefix/value
txtarea.on('input', function(e){
    var prefix = e.detail.prefix;

    // first, clean the whitlist array, because the below code, while not, might be async,
    // therefore it should be up to you to decide WHEN to render the suggestions dropdown
    // tagify.settings.whitelist.length = 0;

    if( prefix ) {
        if( prefix == '@' )
            txtarea.whitelist = whitelist_2;

        // if( prefix == '#' )
        //     txtarea.whitelist = whitelist_1;

        if( e.detail.value.length > 1 )
            txtarea.dropdown.show.call(txtarea, e.detail.value);
    }

    // console.log( txtarea.value )
    console.log('mix-mode "input" event value: ', e.detail)
})

txtarea.on('add', function(e){
    console.log(e)

    getInnerTextLength = document.querySelector('.txtarea .tagify__input').innerText.length;
    var getCalculatedVal = (getTextareaMaxlengthAttr - getInnerTextLength);
    var halfvalue = getTextareaMaxlengthAttr/2;


    if (getInnerTextLength === getTextareaMaxlengthAttr) {
        e.preventDefault();
        // return;
    } else if (getInnerTextLength > getTextareaMaxlengthAttr) {
        this.innerText = this.innerText.substring(0, getTextareaMaxlengthAttr);
    } else {
        document.querySelector('.numeric-count').innerHTML = getCalculatedVal;
    }
})


document.querySelector('.txtarea .tagify__input').addEventListener('keypress', function(e) {
    
    getInnerTextLength = this.innerText.length;
    var getCalculatedVal = (getTextareaMaxlengthAttr - getInnerTextLength);
    var halfvalue = getTextareaMaxlengthAttr/2;

    console.log(`Inner Text =  ${getInnerTextLength}`);
    console.log(`Max Text = ${getTextareaMaxlengthAttr}`);

    if (getInnerTextLength === getTextareaMaxlengthAttr) {
        e.preventDefault();
        // return;
    } else if (getInnerTextLength > getTextareaMaxlengthAttr) {
        this.innerText = this.innerText.substring(0, getTextareaMaxlengthAttr);
    } else {
        document.querySelector('.numeric-count').innerHTML = getCalculatedVal;
    }
    
})




var whitelist_2 = [
    'First Name', 
    'Last Name', 
    'Email', 
    'Street 1', 
    'Street 2', 
    'City', 
    'State', 
    'Zip', 
    'Country',
    'Company Name',
    'Title',
    'Rank',
    'Custom'
  ];
  
  // initialize Tagify
  var input = document.querySelector('.send_msg-custom-text-Msg'),
      
      // init Tagify script on the above inputs
      sendMSG = new Tagify(input, {
      //  mixTagsInterpolator: ["{{", "}}"],
          mode: 'mix',  // <--  Enable mixed-content
          pattern: /@|#/,  // <--  Text starting with @ or # (if single, String can be used here)
  
          // Array for initial interpolation, which allows only these tags to be used
          // whitelist: whitelist_1.concat(whitelist_2).map(function(item){ return typeof item == 'string' ? {value:item} : item}),
  
          dropdown : {
              enabled: 0,
              position: "text",
              highlightFirst: true  // automatically highlights first sugegstion item in the dropdown
          },
          callbacks: {
              add: console.log,  // callback when adding a tag
              remove: console.log   // callback when removing a tag
          }
      })
  
  
  // A good place to pull server suggestion list accoring to the prefix/value
  sendMSG.on('input', function(e){
      var prefix = e.detail.prefix;
  
      // first, clean the whitlist array, because the below code, while not, might be async,
      // therefore it should be up to you to decide WHEN to render the suggestions dropdown
      // tagify.settings.whitelist.length = 0;
  
      if( prefix ) {
          if( prefix == '@' )
              sendMSG.whitelist = whitelist_2;
  
          // if( prefix == '#' )
          //     sendMSG.whitelist = whitelist_1;
  
          if( e.detail.value.length > 1 )
              sendMSG.dropdown.show.call(sendMSG, e.detail.value);
      }
  
      console.log( sendMSG.value )
      console.log('mix-mode "input" event value: ', e.detail)
  })
  
  sendMSG.on('add', function(e){
      console.log(e)
  })


































































