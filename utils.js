/* ----------------------- UTILITIES ----------------------- */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}
function toggleFullscreen() {
  if (
    document.fullscreenElement || 
    document.mozFullScreenElement || 
    document.webkitFullscreenElement || 
    document.msFullscreenElement 
  ) {
    closeFullscreen();
  } else {
    const element = document.documentElement;
    if (element.requestFullScreen) {
      element.requestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    }
  }
}
