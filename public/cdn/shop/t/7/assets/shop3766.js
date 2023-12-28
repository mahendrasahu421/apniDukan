/** Shopify CDN: Minification failed

Line 36:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 38:45 Transforming default arguments to the configured target environment ("es5") is not supported yet
Line 92:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 93:4 Transforming let to the configured target environment ("es5") is not supported yet
Line 94:4 Transforming let to the configured target environment ("es5") is not supported yet
Line 117:40 Transforming default arguments to the configured target environment ("es5") is not supported yet
Line 172:0 Transforming class syntax to the configured target environment ("es5") is not supported yet
Line 173:15 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
Line 177:8 Transforming const to the configured target environment ("es5") is not supported yet
Line 187:14 Transforming object literal extensions to the configured target environment ("es5") is not supported yet
... and 20 more hidden warnings

**/
// SWITCH CURRENCY
if ( typeof theme.shopCurrency != 'undefined') {
	theme.updateCurrencies = function (){
		if ($('#js-currency-switcher').length > 0) {
			Currency.convertAll(theme.shopCurrency, jQuery('.currency_selector li.active').attr('data-currency'));
		} else {
			return;
		}
	};
}


function getFocusableElements(container) {
    return Array.from(
        container.querySelectorAll(
            "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
        )
    );
}

const trapFocusHandlers = {};

function trapFocus(container, elementToFocus = container) {
    var elements = getFocusableElements(container);
    var first = elements[0];
    var last = elements[elements.length - 1];

    removeTrapFocus();

    trapFocusHandlers.focusin = (event) => {
        if (
            event.target !== container &&
            event.target !== last &&
            event.target !== first
        )
            return;

        document.addEventListener('keydown', trapFocusHandlers.keydown);
    };

    trapFocusHandlers.focusout = function() {
        document.removeEventListener('keydown', trapFocusHandlers.keydown);
    };

    trapFocusHandlers.keydown = function(event) {
        if (event.code.toUpperCase() !== 'TAB') return; // If not TAB key
        // On the last focusable element and tab forward, focus the first element.
        if (event.target === last && !event.shiftKey) {
            event.preventDefault();
            first.focus();
        }

        //  On the first focusable element and tab backward, focus the last element.
        if (
            (event.target === container || event.target === first) &&
            event.shiftKey
        ) {
            event.preventDefault();
            last.focus();
        }
    };

    document.addEventListener('focusout', trapFocusHandlers.focusout);
    document.addEventListener('focusin', trapFocusHandlers.focusin);

    elementToFocus.focus();
}

// Here run the querySelector to figure out if the browser supports :focus-visible or not and run code based on it.
try {
    document.querySelector(":focus-visible");
} catch {
    focusVisiblePolyfill();
}

function focusVisiblePolyfill() {
    const navKeys = ['ARROWUP', 'ARROWDOWN', 'ARROWLEFT', 'ARROWRIGHT', 'TAB', 'ENTER', 'SPACE', 'ESCAPE', 'HOME', 'END', 'PAGEUP', 'PAGEDOWN']
    let currentFocusedElement = null;
    let mouseClick = null;

    window.addEventListener('keydown', (event) => {
        if(navKeys.includes(event.code.toUpperCase())) {
            mouseClick = false;
        }
    });

    window.addEventListener('mousedown', (event) => {
        mouseClick = true;
    });

    window.addEventListener('focus', () => {
        if (currentFocusedElement) currentFocusedElement.classList.remove('focused');

        if (mouseClick) return;

        currentFocusedElement = document.activeElement;
        currentFocusedElement.classList.add('focused');

    }, true);
}

function removeTrapFocus(elementToFocus = null) {
    document.removeEventListener('focusin', trapFocusHandlers.focusin);
    document.removeEventListener('focusout', trapFocusHandlers.focusout);
    document.removeEventListener('keydown', trapFocusHandlers.keydown);

    if (elementToFocus) elementToFocus.focus();
}

if ((typeof window.Shopify) == 'undefined') {
    window.Shopify = {};
}

Shopify.bind = function(fn, scope) {
    return function() {
        return fn.apply(scope, arguments);
    }
};


Shopify.setSelectorByValue = function(selector, value) {
    for (var i = 0, count = selector.options.length; i < count; i++) {
        var option = selector.options[i];
        if (value == option.value || value == option.innerHTML) {
            selector.selectedIndex = i;
            return i;
        }
    }
};

Shopify.addListener = function(target, eventName, callback) {
    target.addEventListener ? target.addEventListener(eventName, callback, false) : target.attachEvent('on'+eventName, callback);
};

Shopify.postLink = function(path, options) {
    options = options || {};
    var method = options['method'] || 'post';
    var params = options['parameters'] || {};

    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
};


class MenuDrawer extends HTMLElement {
    constructor() {
        super();

        this.mainDetailsToggle = this.querySelector('details');
        const summaryElements = this.querySelectorAll('summary');
        this.addAccessibilityAttributes(summaryElements);

        if (navigator.platform === 'iPhone') document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);

        this.addEventListener('keyup', this.onKeyUp.bind(this));
        this.addEventListener('focusout', this.onFocusOut.bind(this));
        this.bindEvents();
    }

    bindEvents() {
        this.querySelectorAll('summary').forEach(summary => summary.addEventListener('click', this.onSummaryClick.bind(this)));
        this.querySelectorAll('button').forEach(button => button.addEventListener('click', this.onCloseButtonClick.bind(this)));
    }

    addAccessibilityAttributes(summaryElements) {
        summaryElements.forEach(element => {
            element.setAttribute('role', 'button');
            element.setAttribute('aria-expanded', false);
            element.setAttribute('aria-controls', element.nextElementSibling.id);
        });
    }

    onKeyUp(event) {
        if(event.code.toUpperCase() !== 'ESCAPE') return;

        const openDetailsElement = event.target.closest('details[open]');
        if(!openDetailsElement) return;

        openDetailsElement === this.mainDetailsToggle ? this.closeMenuDrawer(this.mainDetailsToggle.querySelector('summary')) : this.closeSubmenu(openDetailsElement);
    }

    onSummaryClick(event) {
        const summaryElement = event.currentTarget;
        const detailsElement = summaryElement.parentNode;
        const isOpen = detailsElement.hasAttribute('open');

        if (detailsElement === this.mainDetailsToggle) {
            if(isOpen) event.preventDefault();
            isOpen ? this.closeMenuDrawer(summaryElement) : this.openMenuDrawer(summaryElement);
        } else {
            trapFocus(summaryElement.nextElementSibling, detailsElement.querySelector('button'));

            setTimeout(() => {
                detailsElement.classList.add('menu-opening');
            });
        }
    }

    openMenuDrawer(summaryElement) {
        setTimeout(() => {
            this.mainDetailsToggle.classList.add('menu-opening');
        });
        summaryElement.setAttribute('aria-expanded', true);
        trapFocus(this.mainDetailsToggle, summaryElement);
        document.body.classList.add(`overflow-hidden-${this.dataset.breakpoint}`);
    }

    closeMenuDrawer(event, elementToFocus = false) {
        if (event !== undefined) {
            this.mainDetailsToggle.classList.remove('menu-opening');
            this.mainDetailsToggle.querySelectorAll('details').forEach(details =>  {
                details.removeAttribute('open');
                details.classList.remove('menu-opening');
            });
            this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
            document.body.classList.remove(`overflow-hidden-${this.dataset.breakpoint}`);
            removeTrapFocus(elementToFocus);
            this.closeAnimation(this.mainDetailsToggle);
        }
    }

    onFocusOut(event) {
        setTimeout(() => {
            if (this.mainDetailsToggle.hasAttribute('open') && !this.mainDetailsToggle.contains(document.activeElement)) this.closeMenuDrawer();
        });
    }

    onCloseButtonClick(event) {
        const detailsElement = event.currentTarget.closest('details');
        this.closeSubmenu(detailsElement);
    }

    closeSubmenu(detailsElement) {
        detailsElement.classList.remove('menu-opening');
        removeTrapFocus();
        this.closeAnimation(detailsElement);
    }

    closeAnimation(detailsElement) {
        let animationStart;

        const handleAnimation = (time) => {
            if (animationStart === undefined) {
                animationStart = time;
            }

            const elapsedTime = time - animationStart;

            if (elapsedTime < 400) {
                window.requestAnimationFrame(handleAnimation);
            } else {
                detailsElement.removeAttribute('open');
                if (detailsElement.closest('details[open]')) {
                    trapFocus(detailsElement.closest('details[open]'), detailsElement.querySelector('summary'));
                }
            }
        }

        window.requestAnimationFrame(handleAnimation);
    }
}

customElements.define('menu-drawer', MenuDrawer);


(function($){
    var doc = $(document),
        _docBody = $(document.body),
    	body = $('body');
    
	// Product quick view
    _docBody.on('click', '.js_quick_view', function(e) {
			e.preventDefault();
            _docBody.append(qvModal);
        
			// Showing fancybox loading animation
			$.fancybox.showLoading();
			$.fancybox.helpers.overlay.open({parent: body});

			// Getting product info (Json)
			$.getJSON( $(this).attr( 'href' ).split('?')[0] + '.js', function( product ) {
				
				// PRODUCT TITLE
				var productTitle = product.title;
				var productAvailable = product.available;
				
				$('#quick_view__name').html( '<span>' + productTitle + '</span>' );
				
				$('#quick_view__availability').html( '<span>' + productAvailable + '</span>' );
				

				// PRODUCT VARIANTS
				$.each(product.variants, function(i, variant) {
					$('#product-select').append('<option value="' + variant.id + '">' + variant.title + ' - ' + variant.price + '</option>')
				});

				// PRODUCT ALL INFO LINK
				$('#product_info_link a').attr( 'href', product.url );

				// QUANTITY FORM MINI
				$("#quantity").on("focusout",function(){var t=$(this).val();$(this).val(isNaN(parseFloat(t))&&!isFinite(t)||0==parseInt(t)||""==t?1:parseInt(t)<0?parseInt(t)-2*parseInt(t):parseInt(t))}),$("#quantity_up").on("click",function(){var t=$("#quantity").val();$("#quantity").val(!isNaN(parseFloat(t))&&isFinite(t)?parseInt(t)+1:1)}),$("#quantity_down").on("click",function(){var t=$("#quantity").val();$("#quantity").val(!isNaN(parseFloat(t))&&isFinite(t)&&t>1?parseInt(t)-1:1)});

				// UPLOADING option_selection.js TO MANAGE PRODUCT VARIANTS
				$.getScript( "//cdn.shopify.com/shopifycloud/shopify/assets/themes_support/option_selection-9f517843f664ad329c689020fb1e45d03cac979f64b9eb1651ea32858b0ff452.js", function() {

				
						// IMAGES PRELOADER (INIT)
					preloadImages( product.images, function() {
							
							// APPENDING ALL IMAGES TO GALLERY
							
							$.each(product.images, function(i, src) {
								var bigSrc = src.replace('.png', '_410x520_crop_center.png').replace('.jpg', '_410x520_crop_center.jpg');
								$('#img_big .swiper-wrapper').append( '<div class="swiper-slide"><img class="w-100 lazyload" src="' + bigSrc + '"  data-src="' + bigSrc + '" alt="" /></div>' );
							});
							
							// VARIANT CHANGE FUNCTION
							var selectCallback = function(variant, selector) {
								if ( variant && variant.available ) {
									jQuery('#quick_view__add').removeAttr('disabled').removeClass('disabled');
									// VARIANT PRICES
									if( variant.price < variant.compare_at_price ){
										jQuery('#quick_view__price').html('<span class="product-price with-discount item_price">' + Shopify.formatMoney(variant.price, theme.moneyFormat) + '</span><span class="compare-at-price product-regular-price">' + Shopify.formatMoney(variant.compare_at_price, theme.moneyFormat) + '</span><span class="product-sale-price">Save ' + parseInt( 100 - ( variant.price*100 )/variant.compare_at_price ) + '% OFF</span>');
									}
									else {
										jQuery('#quick_view__price').html('<span class="product-price item_price">' + Shopify.formatMoney(variant.price, theme.moneyFormat) + '</span>');
									}
									
									// PRODUCT QUANTITY
									if ( variant.inventory_management != null ) {
										jQuery('#quick_view__availability span').removeClass('out_stock').addClass('in_stock').html('In stock');
									}
									else {
										jQuery('#quick_view__availability span').removeClass('out_stock').addClass('in_stock').html( 'In stock' );
									}
								} else {
									jQuery('#quick_view__add').addClass('disabled').attr('disabled', 'disabled'); // set add-to-cart button to unavailable class and disable button
									jQuery('#quick_view__availability span').removeClass('in_stock').addClass('out_stock').html( 'Out stock' );
									jQuery('#quick_view__price').html('<span class="product-price">' + Shopify.formatMoney(product.price, theme.moneyFormat) + '</span>');
								}
								
								// COLOR & SIZE OPTIONS
								for (var i = 0; i < selector.product.options.length; i++) {
									if ( selector.product.options[i].name.toLowerCase() == 'color' ) {
										var selectorNum = i;
										var selectorName = selector.product.options[i].name;
										
										renderColorOptions(selectorNum, selectorName);
									}
									if ( selector.product.options[i].name.toLowerCase() == 'size' ) {
										var selectorNum = i;
										var selectorName = selector.product.options[i].name;
										
										renderSizeOptions(selectorNum, selectorName);
									}
								}
								
								// CHANGING VARIANT IMAGE
								if ( variant && variant.featured_image ) {
									var originalImage = $("#img_big img");
									var newImage = variant.featured_image;
									var element = originalImage[0];
									
									Shopify.Image.switchImage(newImage, element, function (newImageSizedSrc, newImage, element) {
										
										quickViewGallery.slides.each(function(i) {
											var thumb = $(this).find('img').attr('src').replace('_crop_top', '').replace('_crop_center', '').replace('_crop_bottom', '').replace(/\?v=.*/ , '');
											var newImg = newImageSizedSrc.replace(/\?v=.*/ , '');
											if ( thumb == newImg ) {
												quickViewGallery.slideTo(i);
											}
										});
									});
								}
								
								theme.updateCurrencies();
							};
						
						
						// ADDING THUMBS SLIDER
						
						var quickViewGallery = new Swiper('#img_big', {
							effect: 'fade',
							spaceBetween: 0,
							updateOnImagesReady: true,
							observer: true,
							observeParents: true,
							navigation: {
								nextEl: $('#next_quick_view_gallery'),
								prevEl: $('#prev_quick_view_gallery')
							},
							pagination: {
								el: $('#quick_view_gallery_pagination'),
								clickable: true
							}
						});
							
							// VARIANT CHANGE FUNCTION (INIT)
							new Shopify.OptionSelectors( "product-select", {
								product: product,
								onVariantSelected: selectCallback,
								enableHistoryState: false
							});
							
							// HIDING DEFAULT VARIANT SELECTOR
							$.each( $('#quick_view__variants select option'), function() {
								if ( $(this).val() == 'Default Title' ) {
									$('#quick_view__variants').hide();
								}
							});
						
						});
					
					// IMAGES PRELOADER (FUNCTION)
					function preloadImages(images, callback) {
					    var images = new Array();
						var countImages = images.length;
						if (countImages === 0) {
							callback();
						}
						var loaded = 0;
						$(images).each(function() {
							$('<img>').attr('src', this).load(function() {
								loaded++;
								if (loaded === countImages) {
									callback();
								}
							});
						});
					}
					
					
					// SHOWING QUICK VIEW MODAL
					
					$.fancybox( $('#product_quick_view'), {
							'openSpeed': 600,
							'closeSpeed': 300,
							'fitToView' : true,
							'autoSize' : false,
							'autoDimensions': true,
							'openEffect' : 'fade',
							'tpl': {
								wrap: '<div id="quick_view__wrap" class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
								closeBtn : '<a title="Close" id="quick_view__close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
							},
							'afterClose': function() {
								$('#product_quick_view').remove(); // REMOVING QUICK VIEW MODAL AFTER CLOSE
							}
						});
				
				});
                // RENDER COLOR OPTION
				function renderColorOptions(num, name) {
					var colorSelect = $('#product_quick_view .single-option-selector').eq(num);
					var selectId = '#' + colorSelect.attr('id');
					var container = $('#product_quick_view #quick_view_colors');
					var content = '<label>' + name + ': </label>';

					colorSelect.parent('.selector-wrapper').addClass('hidden');

					if ( $('#product_quick_view .single-option-selector').length == 1 ) {
						$('#quick_view__variants label').hide();
					}

					$('#product_quick_view ' + selectId + ' option' ).each(function(){
						var value = $(this).val();
						if ( colorSelect.val() == value ) {
							return content = content + '<div class="color_item current" data-val="' + value + '" title="' + value + '"><span class="color_inner" style="background-color: ' + value + '"></span></div>';
						} else {
							return content = content + '<div class="color_item" data-val="' + value + '" title="' + value + '"><span class="color_inner" style="background-color: ' + value + '"></span></div>';
						}
					});
					
					container.html(content);
					$('#product_quick_view .color_item').on('click', function(e){
						colorSelect.val( $(this).data('val') ).trigger('change');
					});
				}
				// RENDER SIZE OPTION
				function renderSizeOptions(num, name){
					var sizeSelect = $('#product_quick_view .single-option-selector').eq(num);
					var selectId = '#' + sizeSelect.attr('id');
					var container = $('#product_quick_view #quick_view_size');
					var content = '<label>' + name + ': </label>';
					sizeSelect.parent('.selector-wrapper').addClass('hidden');
					if ( $('#product_quick_view .single-option-selector').length == 1 ) {
						$('#quick_view__variants label').hide();
					}
					$('#product_quick_view ' + selectId + ' option' ).each(function(){
						var value = $(this).val();
						if ( sizeSelect.val() == value ) {
							return content = content + '<div class="size_item current" data-val="' + value + '"><span class="size_inner">' + value + '</span></div>';
						} else {
							return content = content + '<div class="size_item" data-val="' + value + '"><span class="size_inner">' + value + '</span></div>';
						}
					});
					container.html(content);
					$('#product_quick_view .size_item').on('click', function(e){
						sizeSelect.val( $(this).data('val') ).trigger('change');
					});
				}

				// CLOSING QUICK VIEW MODAL AFTER ADDING TO CART
				$('#quick_view__add').on('click', function() {
					$.fancybox.close();
				});
				
				
			});
   
		});
  
	// AJAX CART
	function ajaxCartRender() {
		$('.cart_content_preloader').removeClass('off');
		jQuery.getJSON('/cart.js', function(data) {
			var newHtml = '';

			if ( data.items.length == 0 ) {
				newHtml += '<p class="empty_alert text-center mb-0"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 8V6C7 4.67392 7.52678 3.40215 8.46447 2.46447C9.40215 1.52678 10.6739 1 12 1C13.3261 1 14.5979 1.52678 15.5355 2.46447C16.4732 3.40215 17 4.67392 17 6V8H20C20.2652 8 20.5196 8.10536 20.7071 8.29289C20.8946 8.48043 21 8.73478 21 9V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V9C3 8.73478 3.10536 8.48043 3.29289 8.29289C3.48043 8.10536 3.73478 8 4 8H7ZM7 10H5V20H19V10H17V12H15V10H9V12H7V10ZM9 8H15V6C15 5.20435 14.6839 4.44129 14.1213 3.87868C13.5587 3.31607 12.7956 3 12 3C11.2044 3 10.4413 3.31607 9.87868 3.87868C9.31607 4.44129 9 5.20435 9 6V8Z" /></svg><span class="mt-2">' + theme.cartAjaxTextEmpty + '</span></p>';
			} else {
				data.items.forEach( function( item, i ) {
					var image_url = item.image.replace('.png','_130x130_crop_center.png').replace('.jpg','_100x100_crop_center.jpg');
					newHtml += '<ul class="cart_list_items"><li class="cart_items"><img class="product-thumbnail item_img img-fluid" src="' + image_url + '"  alt="' + item.title + '" /><div class="item_desc"><a class="product_title" href="' + item.url + '">' + item.title.slice(0,50) + '</a><div class="product-price product-price-sm mt-2"><span class="product_quantity">' + item.quantity + ' X </span><span class="product-price">' + Shopify.formatMoney(item.price, theme.moneyFormat) + '</span></div><a class="item_remove_btn" href="#" data-id="' + item.id + '"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M17 6H22V8H20V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V8H2V6H7V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H16C16.2652 2 16.5196 2.10536 16.7071 2.29289C16.8946 2.48043 17 2.73478 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z" fill="#121212"/></svg></a></div></li></ul>';
				});
				newHtml += '<div class="box_footer"><div class="cart_total mt-md-2"><span class="label mr-1">' + theme.cartAjaxTextTotalPrice + ': </span><span class="product-price value">' + Shopify.formatMoney(data.total_price, theme.moneyFormat)  + '</span></div><a  class="cart_clear clear_cart_all_items-js link d-block mt-2" href="/cart/clear"> <span>' + theme.cartAjaxTextClearCart + '</span> </a><div class="btn-group mt-3"><a class="btn btn-primary btn-block w-100" href="/cart">' + theme.cartAjaxTextGoCart + '</a><a class="btn btn-alternate btn-block w-100 mt-2" href="/checkout">' + theme.cartAjaxTextGoCheckout + '</a></div></div>';
			}

			$('.cart_content_box').html(newHtml);
			$('.header_cart #cart_items, .header_cart #cart_item_mobile').html(data.item_count).removeClass('hidden');
			removeItemFromCart();
			clearAllItemsFromCart();
			$('.cart_content_preloader').addClass('off');
			theme.updateCurrencies();
		});
	}

	// REMOVE AJAX CART ITEMS
	function removeItemFromCart(){
		$('.header_cart .item_remove_btn').on('click', function(e){
			e.preventDefault();
			itemId = $(this).attr('data-id');
			var postData = "updates[" + itemId + "]=0";
			jQuery.post('/cart/update.js', postData, function(){
				ajaxCartRender();
			}, "json");
		});
	}
	removeItemFromCart();

	// CLEAR AJAX CART 
	function clearAllItemsFromCart(){
		$('.cart_content_box .clear_cart_all_items-js').on('click', function(e){
			e.preventDefault();
			jQuery.post('/cart/clear.js', function(){
				ajaxCartRender();
			}, "json");
		});
	}
	clearAllItemsFromCart();

	// JQUERY.AJAX-CART.JS MINI
	doc.ready(function(t){var e={TOTAL_ITEMS:".cart-total-items",TOTAL_PRICE:".cart-total-price",SUBMIT_ADD_TO_CART:"input[type=image], input.submit-add-to-cart",FORM_UPDATE_CART:"form[name=cartform]",FORM_UPDATE_CART_BUTTON:"form[name=cartform] input[name=update]",FORM_UPDATE_CART_BUTTONS:"input[type=image], input.button-update-cart",LINE_ITEM_ROW:".cart-line-item",LINE_ITEM_QUANTITY_PREFIX:"input#updates_",LINE_ITEM_PRICE_PREFIX:".cart-line-item-price-",LINE_ITEM_REMOVE:".remove a",EMPTY_CART_MESSAGE:"#empty"},a=function(t){return Shopify.formatMoney(t,"${{ amount }}")};t(document).on("submit",'form[action*="/cart/add"]',function(e){e.preventDefault(),t(e.target).find(".btn-cart").attr("disabled",!0).addClass("disabled"),Shopify.addItemFromForm(e.target)}),t(document).on("click",".btn-cart",function(){t.fancybox.showLoading(),t.fancybox.helpers.overlay.open({parent:t("body")})}),t(e.FORM_UPDATE_CART_BUTTON).click(function(a){a.preventDefault(),t(a.target.form).find(e.FORM_UPDATE_CART_BUTTONS).attr("disabled",!0).addClass("disabled"),Shopify.updateCartFromForm(a.target.form)}),t(e.FORM_UPDATE_CART).delegate(e.LINE_ITEM_REMOVE,"click",function(a){a.preventDefault();var i=this.href.split("/").pop().split("?").shift();Shopify.removeItem(i),t(this).parents(e.LINE_ITEM_ROW).remove()}),Shopify.onItemAdded=function(e,a){t(a).find(".btn-cart").attr("disabled",!1).removeClass("disabled"),Shopify.getCart()},Shopify.onCartUpdate=function(i,n){t("#cart_items").html(i.item_count);if(theme.cartAjaxOn){ajaxCartRender();}var r=a(i.total_price);t(e.TOTAL_PRICE).html(r),t(e.EMPTY_CART_MESSAGE).length>0&&0==i.item_count&&(t(e.FORM_UPDATE_CART).hide(),t(e.EMPTY_CART_MESSAGE).show()),n=n||!1,n&&i.item_count>0&&(t.each(i.items,function(i,n){t(e.LINE_ITEM_PRICE_PREFIX+n.id).html(a(n.line_price)),t(e.LINE_ITEM_QUANTITY_PREFIX+n.id).val(n.quantity)}),t(n).find("input[value=0]").parents(e.LINE_ITEM_ROW).remove(),t(n).find(e.FORM_UPDATE_CART_BUTTONS).attr("disabled",!1).removeClass("disabled"))},Shopify.onError=function(){t("form").find(".btn-cart").attr("disabled",!1).removeClass("disabled")}});
	
  // JQUERY.API.JS FULL
	function floatToString(t, o) {
		var r = t.toFixed(o).toString();
		return r.match(/^\.\d+/) ? "0" + r : r
	}

	function attributeToString(t) {
		return "string" != typeof t && (t += "", "undefined" === t && (t = "")),
		jQuery.trim(t)
	}
	"undefined" == typeof Shopify && (Shopify = {}), Shopify.money_format = "$ {{amount}}", Shopify.onError = function(XMLHttpRequest, textStatus) {
		var data = eval("(" + XMLHttpRequest.responseText + ")");
		alert(data.message + "(" + data.status + "): " + data.description)
	}, Shopify.onCartUpdate = function(t) {
		alert("There are now " + t.item_count + " items in the cart.")
	}, Shopify.onItemAdded = function(t) {
		alert(t.title + " was added to your shopping cart.")
	}, Shopify.onProduct = function(t) {
		alert("Received everything we ever wanted to know about " + t.title)
	}, Shopify.formatMoney = function(t, o) {
		var r = "",
			e = /\{\{\s*(\w+)\s*\}\}/,
			a = o || this.money_format;
		switch (a.match(e)[1]) {
			case "amount":
				r = floatToString(t / 100, 2).replace(/(\d+)(\d{3}[\.,]?)/, "$1 $2");
				break;
			case "amount_no_decimals":
				r = floatToString(t / 100, 0).replace(/(\d+)(\d{3}[\.,]?)/, "$1 $2");
				break;
			case "amount_with_comma_separator":
				r = floatToString(t / 100, 2).replace(/\./, ",").replace(/(\d+)(\d{3}[\.,]?)/, "$1.$2")
		}
		return a.replace(e, r);
	}, Shopify.resizeImage = function(t, o) {
		try {
			if ("original" == o) return t;
			var r = t.match(/(.*\/[\w\-\_\.]+)\.(\w{2,4})/);
			return r[1] + "_" + o + "." + r[2];
		} catch (e) {
			return t;
		}
	}, Shopify.addItem = function(t, o, r) {
		o = o || 1;
		var e = {
			type: "POST",
			url: "/cart/add.js",
			data: "quantity=" + o + "&id=" + t,
			dataType: "json",
			success: function(t) {
				"function" == typeof r ? r(t) : Shopify.onItemAdded(t)
			},
			error: function(t, o) {
				Shopify.onError(t, o)
			}
		};
		jQuery.ajax(e)
	}, Shopify.addItemFromForm = function(t, o) {
	
		var r = {
			type: "POST",
			url: "/cart/add.js",
			data: jQuery(t).serialize(),
			dataType: "json",
			success: function(r) {
				
				"function" == typeof o ? o(r, t) : Shopify.onItemAdded(r, t);
				
				_docBody.append(cartModal);
				// Showing fancybox loading animation
				$.fancybox.showLoading();
				$.fancybox.helpers.overlay.open({parent: body});
				
				body.on('touchmove', function(e) {
					if($('.fancybox-overlay').length) { e.preventDefault(); }
				});
				
				if ( r.title.length < 60 ) {
					var productTitle = r.title;
				}
				else {
					var productTitle = $.trim( r.title ).substring(0, 60) + '...';
				}

				$('#cart_added__name').html( productTitle );
				$('#cart_added__price .value').html( Shopify.formatMoney(r.price, theme.moneyFormat));
				$('#cart_added__total_quantity .value').html( r.quantity );
				$('#cart_added__quantity .value').html(r.quantity);
				$('#cart_added__total_price .value').html( Shopify.formatMoney(r.final_line_price, theme.moneyFormat));
				$('#cart_added__close').on( 'click', function(e) {
					e.preventDefault();
					theme.updateCurrencies();
					$('.fancybox-close').trigger('click');
				});
				
				if (r.image) {
				var cartAddImg = r.image.replace('.jpg','_130x160_crop_center.jpg').replace('.png','_130x160_crop_center.png');
				$('#cart_added__img').append( '<img class="product-thumbnail item_img img-fluid lazyload" src="' + cartAddImg + '" data-src="' + cartAddImg + '" alt="" />' );
					setTimeout(function () {
						$.fancybox.open( $('#cart_added'), {
							'openSpeed': 600,
							'closeSpeed': 300,
							'width': 424,
							'height': 423,
							'autoSize': false,
							'afterClose': function() {
								$('#cart_added').remove();
							}}
						);
					}, 300);
					
				}  else {
					$('#cart_added__img').hide();
					$.fancybox.open( $('#cart_added'),
							{
								'openSpeed': 500,
								'closeSpeed': 300,
								'afterClose': function() {
									$('#cart_added').remove();
								}
							}
					);
				}

			},
			error: function(t, o) {
				Shopify.onError(t, o);

				var errorData = eval('(' + t.responseText + ')');

				body.append('<div id="cart_added" class="cart_error"><h4></h4><p class="alert alert-error"></p></div>');
				$('#cart_added h4').html( errorData.message );
				$('#cart_added p').html( errorData.description );

				$.fancybox.open( $('#cart_added'),
					{
						'openSpeed': 500,
						'closeSpeed': 300,
						'topRatio'    : 0.5,
						'afterClose': function() {
							$('#cart_added').remove();
						}
					}
				);
			}
		};
		jQuery.ajax(r)
	}, Shopify.getCart = function(t) {
		jQuery.getJSON("/cart.js", function(o) {
			"function" == typeof t ? t(o) : Shopify.onCartUpdate(o)
		})
	}, Shopify.getProduct = function(t, o) {
		jQuery.getJSON("/products/" + t + ".js", function(t) {
			"function" == typeof o ? o(t) : Shopify.onProduct(t)
		})
	}, Shopify.changeItem = function(t, o, r) {
		var e = {
			type: "POST",
			url: "/cart/change.js",
			data: "quantity=" + o + "&id=" + t,
			dataType: "json",
			success: function(t) {
				"function" == typeof r ? r(t) : Shopify.onCartUpdate(t)
			},
			error: function(t, o) {
				Shopify.onError(t, o)
			}
		};
		jQuery.ajax(e)
	}, Shopify.removeItem = function(t, o) {
		var r = {
			type: "POST",
			url: "/cart/change.js",
			data: "quantity=0&id=" + t,
			dataType: "json",
			success: function(t) {
				"function" == typeof o ? o(t) : Shopify.onCartUpdate(t)
			},
			error: function(t, o) {
				Shopify.onError(t, o)
			}
		};
		jQuery.ajax(r)
	}, Shopify.clear = function(t) {
		var o = {
			type: "POST",
			url: "/cart/clear.js",
			data: "",
			dataType: "json",
			success: function(o) {
				"function" == typeof t ? t(o) : Shopify.onCartUpdate(o)
			},
			error: function(t, o) {
				Shopify.onError(t, o)
			}
		};
		jQuery.ajax(o)
	}, Shopify.updateCartFromForm = function(t, o) {
		var r = {
			type: "POST",
			url: "/cart/update.js",
			data: jQuery(t).serialize(),
			dataType: "json",
			success: function(r) {
				"function" == typeof o ? o(r, t) : Shopify.onCartUpdate(r, t)
			},
			error: function(t, o) {
				Shopify.onError(t, o)
			}
		};
		jQuery.ajax(r)
	}, Shopify.updateCartAttributes = function(t, o) {
		var r = "";
		jQuery.isArray(t) ? jQuery.each(t, function(t, o) {
			var e = attributeToString(o.key);
			"" !== e && (r += "attributes[" + e + "]=" + attributeToString(o.value) + "&")
		}) : "object" == typeof t && null !== t && jQuery.each(t, function(t, o) {
			r += "attributes[" + attributeToString(t) + "]=" + attributeToString(o) + "&"
		});
		var e = {
			type: "POST",
			url: "/cart/update.js",
			data: r,
			dataType: "json",
			success: function(t) {
				"function" == typeof o ? o(t) : Shopify.onCartUpdate(t)
			},
			error: function(t, o) {
				Shopify.onError(t, o)
			}
		};
		jQuery.ajax(e)
	}, Shopify.updateCartNote = function(t, o) {
		var r = {
			type: "POST",
			url: "/cart/update.js",
			data: "note=" + attributeToString(t),
			dataType: "json",
			success: function(t) {
				"function" == typeof o ? o(t) : Shopify.onCartUpdate(t)
			},
			error: function(t, o) {
				Shopify.onError(t, o)
			}
		};
		jQuery.ajax(r)
	};

    
    doc.ready(function () {
     	zmz.init();
    });

    var zmz = {
        init: function () {
            this.getCookie();
            this.searchForms();
            this.ajaxSearch();
            this.initSwiperCarousel();
            this.initCountdown();
            this.backToTop();
            this.showPolicyPage();
            this.clickColorOpt();
            this.passwordShowHide();
            this.widgetToggle();
            this.mobileToggle();
            this.itemAccordion();
            this.itemTabs();
		  	
  				this.wishlistInit();
		  	
			this.videoFancy();
			this.quantityProductBox();
			this.collectionItemHover();
            if(body.hasClass('rte')) {
                 this.rteYoutubeWrap();
            }
            this.formValidation();
            this.sidebarWidgetMenu();
        },

     	 getCookie: function (cname) {
     	   var name = cname + "=";
     	   var ca = document.cookie.split(';');
     	   for (var i = 0; i < ca.length; i++) {
     	       var c = ca[i];
     	       while (c.charAt(0) == ' ') c = c.substring(1);
     	       if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
     	   }
     	   return "";
   	 	},

        // Search forms
		searchForms: function () {
            doc.on('submit', '.search_form', function(e) {
                var searchQuery = $(this).find('input').val().replace(/ /g, '+');
                var placeHolder = $(this).find('input').attr('placeholder').replace(/ /g, '+');

                if ( !(searchQuery.length && searchQuery != placeHolder) ) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
		},

        // 	AJAX SEARCH  =============================================================================================
       
       	ajaxSearch: function () {
            if( theme.searchAjaxOn ){
                var container = $('[data-search]');

                var url = '/search?q=';

                $('.search_content_wrapper input[type=search]').on('keyup change', function(e){
                    var inputVal = $(this).val(),
                        _that = $(this);

                    if(_that){
                        setTimeout(function(){
                            return false;
                        }, 0);
                    }

                    if(e.key == "Backspace" || e.key == "Delete"){
                        container.load(url + inputVal + ' #hidden_search_result> *');
                    }

                    if( inputVal.length > 2 ){
                        container.show().addClass('active');
                        $('.icon-search-reset').addClass('active');

                        container.load(url + inputVal + ' #hidden_search_result> *', function(){
                            var list = container.find('.search_results');
                            theme.updateCurrencies();
                            if (parseInt( list.data('count_result') ) > 5 ){
                                list.append('<li class="text-center col-12 count"><a class="btn btn-secondary mt-1" href="' + url + inputVal + '">' + list.data('caption') + ': ' + list.data('count_result') + '</a></li>');
                            }
                        });
                    }
                });

                $('.icon-search-reset').on('click', function(){
                    container.hide();
                });


                $('.search_toggle, .icon-search-reset, .search_form_overlay').on('click', function(){
                    container.removeClass('active').html('');
                });
            }
		},
		
        // Swiper carousel by option
        initSwiperCarousel: function(){
            $('.zmz-swiper-container').each(function () {
                var sliderId = '#' + $(this).attr('id');
                var swiperOptions = $(this).data('options');
                var zmzCarousel = new Swiper(sliderId, swiperOptions);
            });
        },
        // Countdown timer
		initCountdown: function(){
        	$(".js-countdown").each(function() {
        	    var endTime = $(this).data('time'),
        	        htmlLayout = "<ul class='countdown_timer'><li class='countdown_item'><span class='countdown-time'>%%D%%</span><span class='countdown-text'>d</span></li><li class='countdown_item'><span class='countdown-time'>%%H%%</span><span class='countdown-text'>h</span></li><li class='countdown_item'><span class='countdown-time'>%%M%%</span><span class='countdown-text'>m</span></li><li class='countdown_item'><span class='countdown-time'>%%S%%</span><span class='countdown-text'>s</span></li></ul>";
        	    $(this).lofCountDown({
        	        TargetDate:endTime,
        	        DisplayFormat:htmlLayout,
        	        FinishMessage: '<span class="alert alert-warning d-inline-block">'+ theme.strings.timerEnd +'</span>'
        	    });
        	});
    	},

        // Back to top button
        backToTop: function (){
            $(window).on('scroll', function(){
                if ( $(this).scrollTop() > 300 ) {
                    $('#back_top').fadeIn("slow");
                }
                else {
                    $('#back_top').fadeOut("slow");
                }
            });
            $('#back_top').on('click', function(e) {
                e.preventDefault();
                $('html, body').animate( {scrollTop : 0}, 800 );
                $('#back_top').fadeOut("slow").stop();
            });
		},

        // SHOW POLICY PAGE
		showPolicyPage: function (){
            $('.item_policy__link').on('click', function(e){
                if ( $(window).width() > 992 ) {
                    e.preventDefault();
                    var link = $(this).attr('href');
                    $.ajax({
                        url:link,
                        type:'GET',
                        success: function(data){
                            var content = $(data).find('.main_content').html();
                            $.fancybox(content,{
                                'maxWidth': 768
                            });
                        }
                    });
                }
            });
		},
		
        // CLICKABLE COLOR OPTIONS
		clickColorOpt: function () {
            $('.color_options_clickable').on('click', function(){
                var variantImage = $(this).data('image');
                if (variantImage.length > 0) {
                    $(this).parent().parent().parent().parent().find('.product_img img').attr('src', variantImage);
                }
            });
		},
		
        // Show/Hide password input
        passwordShowHide: function() {
            $('[data-action="show-password"]').on('click', function () {
                var elm = $(this).closest('.input-group').children('input.js-visible-password');
                if (elm.attr('type') === 'password') {
                    elm.attr('type', 'text');
                    $(this).html('<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="file_eye_el"><path d="M0.0999997 10.5C-0.1 11 0.2 11.6 0.7 11.8C1.2 12 1.8 11.7 2 11.2C3.6 8.00002 6.6 5.90002 10 5.90002C13.4 5.90002 16.5 8.00002 17.9 11.2C18.1 11.7 18.7 12 19.2 11.8H19.3C19.9 11.6 20.2 11 19.9 10.5C19.3 9.20002 18.5 8.00002 17.5 7.10002C17.1 6.70002 17 6.20002 17.3 5.80002L17.6 5.30002C17.9 4.80002 17.7 4.20002 17.2 3.90002C16.7 3.60002 16.1 3.80002 15.8 4.30002L15.7 4.50002C15.4 5.00002 14.8 5.10002 14.3 4.90002C13.5 4.60002 12.7 4.30002 11.9 4.10002C11.4 4.00002 11 3.60002 11 3.10002V2.90002C11 2.30002 10.5 1.90002 10 1.90002C9.4 1.90002 9 2.40002 9 2.90002V3.10002C9 3.60002 8.6 4.00002 8.1 4.10002C7.3 4.20002 6.5 4.50002 5.8 4.80002C5.3 5.00002 4.6 4.90002 4.3 4.40002L4.2 4.30002C4 3.80002 3.4 3.70002 2.9 3.90002C2.4 4.20002 2.2 4.80002 2.5 5.30002L2.8 5.70002C3.1 6.10002 3 6.70002 2.6 7.00002C1.5 8.00002 0.7 9.20002 0.0999997 10.5Z" /><path d="M19.9 10.6C18.2 6.6 14.3 4 10 4C5.7 4 1.8 6.6 0.2 10.6L0 11L0.2 11.4C1.9 15.4 5.7 18 10.1 18C14.4 18 18.3 15.4 19.9 11.4L20 11L19.9 10.6ZM10 16C6.6 16 3.6 14.1 2.2 11C3.6 7.9 6.6 6 10 6C13.4 6 16.4 7.9 17.8 11C16.4 14.1 13.4 16 10 16Z" /><path d="M10 8C8.4 8 7 9.3 7 11C7 12.7 8.3 14 10 14C11.7 14 13 12.7 13 11C13 9.3 11.7 8 10 8ZM10 12C9.5 12 9 11.6 9 11C9 10.4 9.4 10 10 10C10.6 10 11 10.4 11 11C11 11.6 10.6 12 10 12Z" /></svg>');
                } else {
                    elm.attr('type', 'password');
                    $(this).html('<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="file_eye_el"><path d="M19.9213 6.33664C20.1557 5.81077 19.844 5.21824 19.2848 5.05073C18.7566 4.89251 18.1987 5.17332 17.9664 5.66527C16.4415 8.89505 13.3725 10.966 10.0416 10.966C6.6215 10.966 3.54948 8.90232 2.10083 5.68227C1.876 5.18253 1.32023 4.88805 0.785864 5.04012L0.728076 5.05657C0.155103 5.21963 -0.161611 5.82638 0.0839321 6.36027C0.677994 7.65193 1.46566 8.82793 2.44692 9.79417C2.80378 10.1456 2.90358 10.6891 2.64628 11.1163L2.37452 11.5674C2.08511 12.0479 2.25306 12.668 2.74729 12.9438C3.22751 13.2118 3.83775 13.0542 4.12169 12.589L4.23541 12.4027C4.52288 11.9316 5.1386 11.7753 5.64786 12.0022C6.39877 12.3366 7.2005 12.6011 8.01571 12.7778C8.51904 12.8869 8.90067 13.3108 8.90067 13.817V13.9866C8.90067 14.5463 9.3679 15 9.93786 15C10.5078 15 10.9751 14.5463 10.9751 13.9866V13.817C10.9751 13.3108 11.3565 12.887 11.8618 12.7872C12.6628 12.6289 13.4508 12.3976 14.1903 12.0598C14.7189 11.8183 15.372 11.963 15.6717 12.4541L15.754 12.589C16.038 13.0542 16.6482 13.2118 17.1284 12.9438C17.6227 12.668 17.7906 12.0479 17.5012 11.5674L17.2439 11.1403C16.9803 10.7027 17.0921 10.1451 17.4697 9.79728C18.5171 8.83258 19.3228 7.67903 19.9213 6.33664Z"/></svg>');
                }
            });
        },
		
		// Widget Toggle
		widgetToggle: function () {
            $('.widget_toggle').each(function(){
                var navItem = $(this);
                var itemEl = navItem.parent().find('.content-widget_toggle');
                itemEl.hide();
                navItem.on('click', function(){
                    if (navItem.hasClass('open')) {
                        itemEl.slideUp(400);
                        navItem.removeClass('open');
                    } else {
                        itemEl.slideDown(400);
                        navItem.addClass('open');
                    }
                });
                if ( $(window).innerWidth() > 767 ) {
                    if (navItem.hasClass('open')) {
                        itemEl.show();
                    }
                    else {
                        if (navItem.hasClass('open')) {
                            navItem.removeClass('open');
                        }
					}
                }
            });
		},
		
        // lINKLIST IN MENU TOGGLE
		mobileToggle: function (){
            
            if ( $(window).innerWidth() < 768 ) {
                $('.toggle-mobile').each(function(){
                    var navItem = $(this);
                    var itemEl = navItem.parent().find('.content-toggle-mobile');
                    itemEl.hide();
                    navItem.on('click', function(){
                        if (navItem.hasClass('open')) {
                            itemEl.slideUp(400);
                            navItem.removeClass('open');
                        } else {
                            itemEl.slideDown(400);
                            navItem.addClass('open');
                        }
                    })
                });
            }
		},
		
		
        // ACCORDION
		itemAccordion: function () {
            $('.item-accordion-js').each(function() {
                var accordionItem = $(this).find('.accordion-header');
                accordionItem.on('click', function(event){
                    event.preventDefault();
                    var accordion = $(this);
                    var accordionContent = accordion.next('.accordion-content');
                    accordion.toggleClass("active");
                    accordionContent.slideToggle(250);
                });
            });
		},

        // TABS
		itemTabs: function () {
            $('.tab_content_wrapper').each(function(i) {
                var navItem = $(this).find('.tab_nav');
                var tabItem = $(this).find('.tab_item');
                navItem.on('click',function(e){
                    navItem.removeClass('active');
                    $(this).addClass('active');
                    tabItem.removeClass('active');
                    tabItem.eq($(this).data('tab')).addClass('active');
                });
            });
		},

        // Fancybox video
        videoFancy: function () {
            $(".fancybox-media").fancybox({
                maxWidth    : 800,
                maxHeight   : 600,
                fitToView   : false,
                width       : '70%',
                height      : '70%',
                autoSize    : false,
                closeClick  : false,
                openEffect  : 'elastic',
                closeEffect : 'none',
                beforeLoad  : function(){
                    var url= $(this.element).attr("href");
                    url = url.replace(new RegExp("watch\\?v=", "i"), 'v/');
                    url += '?fs=1&autoplay=1&rel=0&controls=0';
                    this.href = url
                }
            });
        },

        // WISHLIST
        wishlistInit: function () {
            const t = $(".zemez_wishlist_total");
            zemezWishlist = async e => {
                if (e.dataset.action === "remove" && location.href !== e.href) {
                    location = e.href;
                    return;
                }
                e.setAttribute("loading", "");
                e.setAttribute("disabled", "");
                await fetch("https://prestashop7.devoffice.com/shopify/wishlist.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(e.dataset)
                }).then(r => r.json()).then(r => {
                    t.removeClass('hidden').html(r.total);
                    if (e.dataset.action === "remove" && location.href === e.href) {
                        location = e.href;
                        return;
                    }
                    e.dataset.action = r.action;
                    e.removeAttribute("loading");
                    e.removeAttribute("disabled");
                });
            }
        },

        // Product quantity box
		quantityProductBox: function () {
            doc.on("focusout",".quantity_input",function(){
                var a=$(this).val();
                isNaN(parseFloat(a))&&!isFinite(a)||0==parseInt(a)||""==a?$(this).val(1):parseInt(a)<0?$(this).val(parseInt(a)-2*parseInt(a)):$(this).val(parseInt(a))
            }), doc.on("click",".quantity_up",function(){
			    var a=$(this).parent().find(".quantity_input");isNaN(parseFloat(a.val()))||!isFinite(a.val())||a.attr("disabled")?a.val(1):a.val(parseInt(a.val())+1)
			}), doc.on("click",".quantity_down",function(){
			    var a=$(this).parent().parent().find(".quantity_input");!isNaN(parseFloat(a.val()))&&isFinite(a.val())&&a.val()>1&&!a.attr("disabled")?a.val(parseInt(a.val())-1):a.val(1)
			});
        },
		
        // Collection item hover effect
		collectionItemHover: function () {
            var o = $(".collection_item");
            if (o.length > 0) {
                doc.ready(function () {

                    body.delegate('.collection_caption', 'mouseover', function () {
                        $(this).addClass('rollOut');
                    });

                    body.delegate('.collection_caption', 'mouseout', function () {
                        $(this).removeClass('rollOut');
                    });

                });
			}
    	},
        // RTE youtube wrapper
      	rteYoutubeWrap: function () {
          $('.rte iframe[src *= youtube]').wrap('<div class="rte_youtube_wrapper"></div>');
		},

        formValidation: function(elem) {
           var elem = $('.footer_newsletter_form');
		},


        sidebarWidgetMenu: function() {
            // LINKLIST ITEM SHOW/HIDE ELEMENT
            $('.sidebar_widget__linklist .menu_trigger').each(function() {
                $(this).on('click', function(){
                    $(this).parent().siblings('a').toggleClass('active');
                    $(this).toggleClass('active');
                    $(this).parent().siblings('.submenu-js').slideToggle();
                });
            });
        }
    }

})(jQuery);








	/*! WOW wow.js - v1.3.0 - 2016-10-04
	* https://wowjs.uk
	* Copyright (c) 2016 Thomas Grainger; Licensed MIT */!function(a,b){if("function"==typeof define&&define.amd)define(["module","exports"],b);else if("undefined"!=typeof exports)b(module,exports);else{var c={exports:{}};b(c,c.exports),a.WOW=c.exports}}(this,function(a,b){"use strict";function c(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function d(a,b){return b.indexOf(a)>=0}function e(a,b){for(var c in b)if(null==a[c]){var d=b[c];a[c]=d}return a}function f(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)}function g(a){var b=arguments.length<=1||void 0===arguments[1]?!1:arguments[1],c=arguments.length<=2||void 0===arguments[2]?!1:arguments[2],d=arguments.length<=3||void 0===arguments[3]?null:arguments[3],e=void 0;return null!=document.createEvent?(e=document.createEvent("CustomEvent"),e.initCustomEvent(a,b,c,d)):null!=document.createEventObject?(e=document.createEventObject(),e.eventType=a):e.eventName=a,e}function h(a,b){null!=a.dispatchEvent?a.dispatchEvent(b):b in(null!=a)?a[b]():"on"+b in(null!=a)&&a["on"+b]()}function i(a,b,c){null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c}function j(a,b,c){null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]}function k(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight}Object.defineProperty(b,"__esModule",{value:!0});var l,m,n=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),o=window.WeakMap||window.MozWeakMap||function(){function a(){c(this,a),this.keys=[],this.values=[]}return n(a,[{key:"get",value:function(a){for(var b=0;b<this.keys.length;b++){var c=this.keys[b];if(c===a)return this.values[b]}}},{key:"set",value:function(a,b){for(var c=0;c<this.keys.length;c++){var d=this.keys[c];if(d===a)return this.values[c]=b,this}return this.keys.push(a),this.values.push(b),this}}]),a}(),p=window.MutationObserver||window.WebkitMutationObserver||window.MozMutationObserver||(m=l=function(){function a(){c(this,a),"undefined"!=typeof console&&null!==console&&(console.warn("MutationObserver is not supported by your browser."),console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content."))}return n(a,[{key:"observe",value:function(){}}]),a}(),l.notSupported=!0,m),q=window.getComputedStyle||function(a){var b=/(\-([a-z]){1})/g;return{getPropertyValue:function(c){"float"===c&&(c="styleFloat"),b.test(c)&&c.replace(b,function(a,b){return b.toUpperCase()});var d=a.currentStyle;return(null!=d?d[c]:void 0)||null}}},r=function(){function a(){var b=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];c(this,a),this.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null,scrollContainer:null,resetAnimation:!0},this.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),this.vendors=["moz","webkit"],this.start=this.start.bind(this),this.resetAnimation=this.resetAnimation.bind(this),this.scrollHandler=this.scrollHandler.bind(this),this.scrollCallback=this.scrollCallback.bind(this),this.scrolled=!0,this.config=e(b,this.defaults),null!=b.scrollContainer&&(this.config.scrollContainer=document.querySelector(b.scrollContainer)),this.animationNameCache=new o,this.wowEvent=g(this.config.boxClass)}return n(a,[{key:"init",value:function(){this.element=window.document.documentElement,d(document.readyState,["interactive","complete"])?this.start():i(document,"DOMContentLoaded",this.start),this.finished=[]}},{key:"start",value:function(){var a=this;if(this.stopped=!1,this.boxes=[].slice.call(this.element.querySelectorAll("."+this.config.boxClass)),this.all=this.boxes.slice(0),this.boxes.length)if(this.disabled())this.resetStyle();else for(var b=0;b<this.boxes.length;b++){var c=this.boxes[b];this.applyStyle(c,!0)}if(this.disabled()||(i(this.config.scrollContainer||window,"scroll",this.scrollHandler),i(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live){var d=new p(function(b){for(var c=0;c<b.length;c++)for(var d=b[c],e=0;e<d.addedNodes.length;e++){var f=d.addedNodes[e];a.doSync(f)}});d.observe(document.body,{childList:!0,subtree:!0})}}},{key:"stop",value:function(){this.stopped=!0,j(this.config.scrollContainer||window,"scroll",this.scrollHandler),j(window,"resize",this.scrollHandler),null!=this.interval&&clearInterval(this.interval)}},{key:"sync",value:function(){p.notSupported&&this.doSync(this.element)}},{key:"doSync",value:function(a){if("undefined"!=typeof a&&null!==a||(a=this.element),1===a.nodeType){a=a.parentNode||a;for(var b=a.querySelectorAll("."+this.config.boxClass),c=0;c<b.length;c++){var e=b[c];d(e,this.all)||(this.boxes.push(e),this.all.push(e),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(e,!0),this.scrolled=!0)}}}},{key:"show",value:function(a){return this.applyStyle(a),a.className=a.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(a),h(a,this.wowEvent),this.config.resetAnimation&&(i(a,"animationend",this.resetAnimation),i(a,"oanimationend",this.resetAnimation),i(a,"webkitAnimationEnd",this.resetAnimation),i(a,"MSAnimationEnd",this.resetAnimation)),a}},{key:"applyStyle",value:function(a,b){var c=this,d=a.getAttribute("data-wow-duration"),e=a.getAttribute("data-wow-delay"),f=a.getAttribute("data-wow-iteration");return this.animate(function(){return c.customStyle(a,b,d,e,f)})}},{key:"resetStyle",value:function(){for(var a=0;a<this.boxes.length;a++){var b=this.boxes[a];b.style.visibility="visible"}}},{key:"resetAnimation",value:function(a){if(a.type.toLowerCase().indexOf("animationend")>=0){var b=a.target||a.srcElement;b.className=b.className.replace(this.config.animateClass,"").trim()}}},{key:"customStyle",value:function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a}},{key:"vendorSet",value:function(a,b){for(var c in b)if(b.hasOwnProperty(c)){var d=b[c];a[""+c]=d;for(var e=0;e<this.vendors.length;e++){var f=this.vendors[e];a[""+f+c.charAt(0).toUpperCase()+c.substr(1)]=d}}}},{key:"vendorCSS",value:function(a,b){for(var c=q(a),d=c.getPropertyCSSValue(b),e=0;e<this.vendors.length;e++){var f=this.vendors[e];d=d||c.getPropertyCSSValue("-"+f+"-"+b)}return d}},{key:"animationName",value:function(a){var b=void 0;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=q(a).getPropertyValue("animation-name")}return"none"===b?"":b}},{key:"cacheAnimationName",value:function(a){return this.animationNameCache.set(a,this.animationName(a))}},{key:"cachedAnimationName",value:function(a){return this.animationNameCache.get(a)}},{key:"scrollHandler",value:function(){this.scrolled=!0}},{key:"scrollCallback",value:function(){if(this.scrolled){this.scrolled=!1;for(var a=[],b=0;b<this.boxes.length;b++){var c=this.boxes[b];if(c){if(this.isVisible(c)){this.show(c);continue}a.push(c)}}this.boxes=a,this.boxes.length||this.config.live||this.stop()}}},{key:"offsetTop",value:function(a){for(;void 0===a.offsetTop;)a=a.parentNode;for(var b=a.offsetTop;a.offsetParent;)a=a.offsetParent,b+=a.offsetTop;return b}},{key:"isVisible",value:function(a){var b=a.getAttribute("data-wow-offset")||this.config.offset,c=this.config.scrollContainer&&this.config.scrollContainer.scrollTop||window.pageYOffset,d=c+Math.min(this.element.clientHeight,k())-b,e=this.offsetTop(a),f=e+a.clientHeight;return d>=e&&f>=c}},{key:"disabled",value:function(){return!this.config.mobile&&f(navigator.userAgent)}}]),a}();b["default"]=r,a.exports=b["default"]});

	new WOW().init();

	/*AOS animation index-section-slideshow*/
	!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.AOS=t()}(this,function(){"use strict";var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},t="Expected a function",n=NaN,o="[object Symbol]",i=/^\s+|\s+$/g,a=/^[-+]0x[0-9a-f]+$/i,r=/^0b[01]+$/i,c=/^0o[0-7]+$/i,s=parseInt,u="object"==typeof e&&e&&e.Object===Object&&e,d="object"==typeof self&&self&&self.Object===Object&&self,l=u||d||Function("return this")(),f=Object.prototype.toString,m=Math.max,p=Math.min,b=function(){return l.Date.now()};function v(e,n,o){var i,a,r,c,s,u,d=0,l=!1,f=!1,v=!0;if("function"!=typeof e)throw new TypeError(t);function y(t){var n=i,o=a;return i=a=void 0,d=t,c=e.apply(o,n)}function h(e){var t=e-u;return void 0===u||t>=n||t<0||f&&e-d>=r}function k(){var e=b();if(h(e))return x(e);s=setTimeout(k,function(e){var t=n-(e-u);return f?p(t,r-(e-d)):t}(e))}function x(e){return s=void 0,v&&i?y(e):(i=a=void 0,c)}function O(){var e=b(),t=h(e);if(i=arguments,a=this,u=e,t){if(void 0===s)return function(e){return d=e,s=setTimeout(k,n),l?y(e):c}(u);if(f)return s=setTimeout(k,n),y(u)}return void 0===s&&(s=setTimeout(k,n)),c}return n=w(n)||0,g(o)&&(l=!!o.leading,r=(f="maxWait"in o)?m(w(o.maxWait)||0,n):r,v="trailing"in o?!!o.trailing:v),O.cancel=function(){void 0!==s&&clearTimeout(s),d=0,i=u=a=s=void 0},O.flush=function(){return void 0===s?c:x(b())},O}function g(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function w(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&f.call(e)==o}(e))return n;if(g(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=g(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(i,"");var u=r.test(e);return u||c.test(e)?s(e.slice(2),u?2:8):a.test(e)?n:+e}var y=function(e,n,o){var i=!0,a=!0;if("function"!=typeof e)throw new TypeError(t);return g(o)&&(i="leading"in o?!!o.leading:i,a="trailing"in o?!!o.trailing:a),v(e,n,{leading:i,maxWait:n,trailing:a})},h="Expected a function",k=NaN,x="[object Symbol]",O=/^\s+|\s+$/g,j=/^[-+]0x[0-9a-f]+$/i,E=/^0b[01]+$/i,N=/^0o[0-7]+$/i,z=parseInt,C="object"==typeof e&&e&&e.Object===Object&&e,A="object"==typeof self&&self&&self.Object===Object&&self,q=C||A||Function("return this")(),L=Object.prototype.toString,T=Math.max,M=Math.min,S=function(){return q.Date.now()};function D(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function H(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&L.call(e)==x}(e))return k;if(D(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=D(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(O,"");var n=E.test(e);return n||N.test(e)?z(e.slice(2),n?2:8):j.test(e)?k:+e}var $=function(e,t,n){var o,i,a,r,c,s,u=0,d=!1,l=!1,f=!0;if("function"!=typeof e)throw new TypeError(h);function m(t){var n=o,a=i;return o=i=void 0,u=t,r=e.apply(a,n)}function p(e){var n=e-s;return void 0===s||n>=t||n<0||l&&e-u>=a}function b(){var e=S();if(p(e))return v(e);c=setTimeout(b,function(e){var n=t-(e-s);return l?M(n,a-(e-u)):n}(e))}function v(e){return c=void 0,f&&o?m(e):(o=i=void 0,r)}function g(){var e=S(),n=p(e);if(o=arguments,i=this,s=e,n){if(void 0===c)return function(e){return u=e,c=setTimeout(b,t),d?m(e):r}(s);if(l)return c=setTimeout(b,t),m(s)}return void 0===c&&(c=setTimeout(b,t)),r}return t=H(t)||0,D(n)&&(d=!!n.leading,a=(l="maxWait"in n)?T(H(n.maxWait)||0,t):a,f="trailing"in n?!!n.trailing:f),g.cancel=function(){void 0!==c&&clearTimeout(c),u=0,o=s=i=c=void 0},g.flush=function(){return void 0===c?r:v(S())},g},W=function(){};function P(e){e&&e.forEach(function(e){var t=Array.prototype.slice.call(e.addedNodes),n=Array.prototype.slice.call(e.removedNodes);if(function e(t){var n=void 0,o=void 0;for(n=0;n<t.length;n+=1){if((o=t[n]).dataset&&o.dataset.aos)return!0;if(o.children&&e(o.children))return!0}return!1}(t.concat(n)))return W()})}function Y(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver}var _={isSupported:function(){return!!Y()},ready:function(e,t){var n=window.document,o=new(Y())(P);W=t,o.observe(n.documentElement,{childList:!0,subtree:!0,removedNodes:!0})}},B=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},F=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),I=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},K=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,G=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,J=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,Q=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;function R(){return navigator.userAgent||navigator.vendor||window.opera||""}var U=new(function(){function e(){B(this,e)}return F(e,[{key:"phone",value:function(){var e=R();return!(!K.test(e)&&!G.test(e.substr(0,4)))}},{key:"mobile",value:function(){var e=R();return!(!J.test(e)&&!Q.test(e.substr(0,4)))}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}},{key:"ie11",value:function(){return"-ms-scroll-limit"in document.documentElement.style&&"-ms-ime-align"in document.documentElement.style}}]),e}()),V=function(e,t){var n=void 0;return U.ie11()?(n=document.createEvent("CustomEvent")).initCustomEvent(e,!0,!0,{detail:t}):n=new CustomEvent(e,{detail:t}),document.dispatchEvent(n)},X=function(e){return e.forEach(function(e,t){return function(e,t){var n=e.options,o=e.position,i=e.node,a=(e.data,function(){e.animated&&(function(e,t){t&&t.forEach(function(t){return e.classList.remove(t)})}(i,n.animatedClassNames),V("aos:out",i),e.options.id&&V("aos:in:"+e.options.id,i),e.animated=!1)});n.mirror&&t>=o.out&&!n.once?a():t>=o.in?e.animated||(function(e,t){t&&t.forEach(function(t){return e.classList.add(t)})}(i,n.animatedClassNames),V("aos:in",i),e.options.id&&V("aos:in:"+e.options.id,i),e.animated=!0):e.animated&&!n.once&&a()}(e,window.pageYOffset)})},Z=function(e){for(var t=0,n=0;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)t+=e.offsetLeft-("BODY"!=e.tagName?e.scrollLeft:0),n+=e.offsetTop-("BODY"!=e.tagName?e.scrollTop:0),e=e.offsetParent;return{top:n,left:t}},ee=function(e,t,n){var o=e.getAttribute("data-aos-"+t);if(void 0!==o){if("true"===o)return!0;if("false"===o)return!1}return o||n},te=function(e,t){return e.forEach(function(e,n){var o=ee(e.node,"mirror",t.mirror),i=ee(e.node,"once",t.once),a=ee(e.node,"id"),r=t.useClassNames&&e.node.getAttribute("data-aos"),c=[t.animatedClassName].concat(r?r.split(" "):[]).filter(function(e){return"string"==typeof e});t.initClassName&&e.node.classList.add(t.initClassName),e.position={in:function(e,t,n){var o=window.innerHeight,i=ee(e,"anchor"),a=ee(e,"anchor-placement"),r=Number(ee(e,"offset",a?0:t)),c=a||n,s=e;i&&document.querySelectorAll(i)&&(s=document.querySelectorAll(i)[0]);var u=Z(s).top-o;switch(c){case"top-bottom":break;case"center-bottom":u+=s.offsetHeight/2;break;case"bottom-bottom":u+=s.offsetHeight;break;case"top-center":u+=o/2;break;case"center-center":u+=o/2+s.offsetHeight/2;break;case"bottom-center":u+=o/2+s.offsetHeight;break;case"top-top":u+=o;break;case"bottom-top":u+=o+s.offsetHeight;break;case"center-top":u+=o+s.offsetHeight/2}return u+r}(e.node,t.offset,t.anchorPlacement),out:o&&function(e,t){window.innerHeight;var n=ee(e,"anchor"),o=ee(e,"offset",t),i=e;return n&&document.querySelectorAll(n)&&(i=document.querySelectorAll(n)[0]),Z(i).top+i.offsetHeight-o}(e.node,t.offset)},e.options={once:i,mirror:o,animatedClassNames:c,id:a}}),e},ne=function(){var e=document.querySelectorAll("[data-aos]");return Array.prototype.map.call(e,function(e){return{node:e}})},oe=[],ie=!1,ae={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,mirror:!1,anchorPlacement:"top-bottom",startEvent:"DOMContentLoaded",animatedClassName:"aos-animate",initClassName:"aos-init",useClassNames:!1,disableMutationObserver:!1,throttleDelay:99,debounceDelay:50},re=function(){return document.all&&!window.atob},ce=function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0]&&(ie=!0),ie&&(oe=te(oe,ae),X(oe),window.addEventListener("scroll",y(function(){X(oe,ae.once)},ae.throttleDelay)))},se=function(){if(oe=ne(),de(ae.disable)||re())return ue();ce()},ue=function(){oe.forEach(function(e,t){e.node.removeAttribute("data-aos"),e.node.removeAttribute("data-aos-easing"),e.node.removeAttribute("data-aos-duration"),e.node.removeAttribute("data-aos-delay"),ae.initClassName&&e.node.classList.remove(ae.initClassName),ae.animatedClassName&&e.node.classList.remove(ae.animatedClassName)})},de=function(e){return!0===e||"mobile"===e&&U.mobile()||"phone"===e&&U.phone()||"tablet"===e&&U.tablet()||"function"==typeof e&&!0===e()};return{init:function(e){return ae=I(ae,e),oe=ne(),ae.disableMutationObserver||_.isSupported()||(console.info('\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '),ae.disableMutationObserver=!0),ae.disableMutationObserver||_.ready("[data-aos]",se),de(ae.disable)||re()?ue():(document.querySelector("body").setAttribute("data-aos-easing",ae.easing),document.querySelector("body").setAttribute("data-aos-duration",ae.duration),document.querySelector("body").setAttribute("data-aos-delay",ae.delay),-1===["DOMContentLoaded","load"].indexOf(ae.startEvent)?document.addEventListener(ae.startEvent,function(){ce(!0)}):window.addEventListener("load",function(){ce(!0)}),"DOMContentLoaded"===ae.startEvent&&["complete","interactive"].indexOf(document.readyState)>-1&&ce(!0),window.addEventListener("resize",$(ce,ae.debounceDelay,!0)),window.addEventListener("orientationchange",$(ce,ae.debounceDelay,!0)),oe)},refresh:ce,refreshHard:se}});
	AOS.init();

