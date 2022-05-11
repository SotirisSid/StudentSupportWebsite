var open = 0;

function openNav() {
    document.getElementById("navbar").style.display = "flex";
    

    open = open + 1;
    if (open > 1) {
      closeNav();
    }
    
  }

  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("navbar").style.display = "none";
    
    open = 0;
    
  }


window.addEventListener('resize', function(event) {
  const mediaQuery = window.matchMedia('(min-width: 900px)')

if (mediaQuery.matches) {
  open=0;
 document.getElementById("navbar").style.display = "flex";
 
} 
  
}, true);


window.addEventListener('resize', function(event) {
  const mediaQuery = window.matchMedia('(max-width: 900px)')

if (mediaQuery.matches) {
  open=0;
 document.getElementById("navbar").style.display = "none";
 
} 
  
}, true);