var ctx= document.getElementById("oCanvas").getContext("2d")
  , img = new Image();

img.src = '/img/01.svg';
img.onload = function() {
  ctx.drawImage(img, 10, 10, 100, 100);
  ctx.drawImage(img, 160, 10, 100, 100);
  ctx.drawImage(img, 310, 10, 100, 100);
};
