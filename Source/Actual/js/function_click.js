var elements = document.querySelectorAll(".shower");
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', (event) => {
    const element = event.target;
    const element_real = element.closest('.shower');

    if (!!element.closest('.section')) {
      const parent = element.closest('.section');
      const info_post = parent.querySelector('.info_post');

       for (let elem of info_post.children) {
        if (element_real.getAttribute('nik') === elem.getAttribute('nik')) {
          elem.classList.toggle('invis');
        }
        else{
          elem.classList.add('invis');
        }
      }
    }
  })
}
