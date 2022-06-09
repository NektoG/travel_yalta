const card = document.querySelectorAll('.card');
  let o = 0;
  const k = 0;
  while(o < card.length){
    for_price_el(o);
    o++;
  }
function for_price_el(z){
  const r = z;
  let i = 0;
  const price_el = card[r].querySelectorAll('.price_el');

  //console.log('=0');
  price_el[i].classList.add('anim_price_el');
  i++;

  setInterval(()=>{
    //console.log('i:'+i);
    //console.log('r:'+r);
      if(i > 0 && i < price_el.length){
        //console.log('>0');
        const k = i-1;
        price_el[k].classList.remove('anim_price_el');
        price_el[i].classList.add('anim_price_el');
      }
      else if(i === price_el.length){
        //console.log('=length');
        const k = i-1;
        price_el[k].classList.remove('anim_price_el');
        i = 0;
        price_el[i].classList.add('anim_price_el');
      }
      else if(i === 0){
        //console.log('=0');
        price_el[i].classList.add('anim_price_el');
      }
      i++;
  }, 6000)
}
