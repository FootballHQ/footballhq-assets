
/* V55: tiny standalone mobile-nav controller.
   It does not depend on the main Football HQ script finishing initialization. */
function toggleFootballHQMobileMenu(event){
  if(event){
    event.preventDefault();
    event.stopPropagation();
  }
  document.body.classList.toggle('fhq-mobile-menu-open');
  return false;
}
function closeFootballHQMobileMenu(){
  document.body.classList.remove('fhq-mobile-menu-open');
}
