/** Shopify CDN: Minification failed

Line 13:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 27:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 28:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 30:0 Transforming let to the configured target environment ("es5") is not supported yet
Line 33:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 42:4 Transforming let to the configured target environment ("es5") is not supported yet
Line 43:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 60:2 Transforming let to the configured target environment ("es5") is not supported yet

**/
const layouts = [{
    name: 'mobile',
    width: 768
  },
  {
    name: 'tablet',
    width: 1200
  },
  {
    name: 'desktop',
    width: 999999
  }
];

const RESPONSIVE_ID_ATTR = 'data-responsive-id';
const RESPONSIVE_LAYOUT_ATTR = 'data-responsive-layout';

let currentLayout;

function getLayout(){
  const windowWidth = window.innerWidth;

  return layouts.find((layout) => windowWidth < layout.width).name;
}

function moveResponsiveElements(){
  $(`[${RESPONSIVE_LAYOUT_ATTR}~="${currentLayout}"]`).each(function(){
    if (this.childElementCount !== 0) return;

    let targetNode = this;
    const id = this.getAttribute(RESPONSIVE_ID_ATTR);

    $(`[${RESPONSIVE_ID_ATTR}="${id}"]`).each(function(){
      if (this.getAttribute(RESPONSIVE_LAYOUT_ATTR) === currentLayout || this.childElementCount === 0) return;
      $(this).children().appendTo($(targetNode));
    })
  })
}



$(document).ready(function(){
  currentLayout = getLayout();
  moveResponsiveElements();
});

$(window).resize(function(){
  let layout = getLayout();

  if (layout !== currentLayout){
    currentLayout = layout;
    moveResponsiveElements();
  }
});