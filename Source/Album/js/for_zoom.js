const container_Zoom =document.querySelector('#container_Zoom');
const Zoom = document.querySelector("#Zoom");
const Zoom_Img = document.querySelector("#Zoom_Img");
const elements = document.querySelectorAll(".shower");
const elements_slide = document.querySelectorAll(".shower-slide");
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('click', (event) => {
    const element = event.target;

    if(Zoom_Img.src === element.src){
      Zoom.classList.add('invis');

      Zoom_Img.src = '';
    }
    else{
      if (Zoom.classList.contains('invis')) {
        Zoom.classList.remove('invis');
      }

      Zoom_Img.src = element.src;

      const meta_Zoom = Zoom;

      container_Zoom.removeChild(Zoom);
      container_Zoom.appendChild(meta_Zoom);
    }

  })
}
for (var i = 0; i < elements_slide.length; i++) {
  elements_slide[i].addEventListener('click', (event) => {
    const element_slide = event.target;

    if(Zoom_Img.src === element_slide.src){
      Zoom.classList.add('invis');

      Zoom_Img.src = '';
    }
    else{
      if (Zoom.classList.contains('invis')) {
        Zoom.classList.remove('invis');
      }

      Zoom_Img.src = element_slide.src;

      const meta_Zoom = Zoom;

      container_Zoom.removeChild(Zoom);
      container_Zoom.appendChild(meta_Zoom);
    }

  })
}

const cancellation_window = document.querySelector('#cancellation_window');

  cancellation_window.addEventListener('click', () => {
  Zoom.classList.add('invis');

  Zoom_Img.src = '';
})
window.addEventListener('keydown', (e) => {
  Zoom.classList.add('invis');

  Zoom_Img.src = '';
});
