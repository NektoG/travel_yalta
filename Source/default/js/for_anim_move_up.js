const anim_elements = document.querySelectorAll('._anim_elements');

if (anim_elements.length > 0) {
	window.addEventListener('scroll', anim_for_scroll);

	function anim_for_scroll(){
		for (let i = 0; i < anim_elements.length; i++) {

			const anim_element = anim_elements[i];

			const anim_element_height = anim_element.offsetHeight;
			const anim_element_top = position_element(anim_element).top;
			const anim_element_left = position_element(anim_element).left;
			const anim_piece_visible_element = 4;

			let anim_element_real_position = window.innerHeight - anim_element_height/anim_piece_visible_element;

			if (anim_element_height > window.innerHeight) {
				let anim_element_real_position = window.innerHeight - window.innerHeight/anim_piece_visible_element;
			}

			if ((pageYOffset > (anim_element_top - anim_element_real_position)) && (pageYOffset < (anim_element_top + anim_element_height))) {
				for (var k = 0; k <= i; k++) {
					if ((k != 0) && (k != i) && (anim_elements[k].classList.contains('kek'))){
						break;
					}
					else if((k == 0) || (k == i)){
						anim_elements[k].classList.remove('kek');
						anim_elements[k].classList.add('anim_active');
					}
				}

			}
		}
	}
	function position_element(element){
		const rect = element.getBoundingClientRect();

		scrollTop = window.pageYOffset || document.body.scrollTop;
		scrollLeft = window.pageXOffset || document.body.scrollLeft;

		return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
	}
	setTimeout(()=>{
		anim_for_scroll();
	}, 300);
}
