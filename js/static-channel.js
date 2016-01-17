(function () {

  // http://jsfiddle.net/AbdiasSoftware/t4Pvq/

  var canvas = document.getElementById('static-video'),
    ctx = canvas.getContext('2d');

  // a variant using fixed canvas size but strecthes the result.
  // emulates interference/bad reception
  // using a different "noise" algo
  canvas.width = canvas.height = '256';

  function resize() {
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
  }
  resize();
  window.onresize = resize;

  function noise(ctx) {

    var w = ctx.canvas.width,
      h = ctx.canvas.height,
      idata = ctx.getImageData(0, 0, w, h),
      buffer32 = new Uint32Array(idata.data.buffer),
      len = buffer32.length,
      i = 0,
      pr = 456 * Math.random(),
      prs = 716 * Math.random();;

    for(; i < len;) {

      buffer32[i++] = ((pr % 255)|0) << 24;
      pr += prs * 1.2;

    }

    canvas.style['background-color'] = '#' + Math.floor(Math.random() * 16777215).toString(16);

    ctx.putImageData(idata, 0, 0);

  }

  var toggleCanvas = true;

  // added toggle to get 30 FPS instead of 60 FPS
  (function loop() {

      toggleCanvas = !toggleCanvas;
      if (toggleCanvas) {

          requestAnimationFrame(loop);
          return;

      }

      noise(ctx);
      requestAnimationFrame(loop);

  })();

}());