// Animations init
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("scrollHide").style.backgroundColor = "transparent";
  } else {
    document.getElementById("scrollHide").style.backgroundColor = "gray";
  }
  prevScrollpos = currentScrollPos;
}
