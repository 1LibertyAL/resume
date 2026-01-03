const header = document.querySelector('header')
const ul = document.querySelector('ul')
const box1 = document.querySelector('.box-1')
const box2= document.querySelector('.box-2')
const experience = document.querySelector('.experience')
const box3 = document.querySelector('.box-3')

const headerRect = header.getBoundingClientRect()
const headerBottomPosition = headerRect.bottom
document.addEventListener('scroll', () => {
  const scrolly = window.scrollY
  if (scrolly !== 0){
    header.style.backgroundPosition = `calc(50% + ${scrolly}px) calc(50% + ${scrolly}px)`
    ul.style.backgroundPosition = `calc(50% + ${scrolly}px) calc(50% + ${scrolly}px)`
  }else{
    header.style.backgroundPosition = ''
  }
  if (scrolly > headerBottomPosition ){
    box1.style.backgroundPosition = `calc(50% + ${scrolly}px) calc(50% + ${scrolly}px)`
    experience.style.backgroundPosition = `calc(50% + ${scrolly}px) calc(50% + ${scrolly}px)`
    box3.style.backgroundPosition = `calc(50% + ${scrolly}px) calc(50% + ${scrolly}px)`
  }else{
    box1.style.backgroundPosition = ''
    experience.style.backgroundPosition = ''
    box3.style.backgroundPosition = ''
  }
})

//导航栏点击事件
const navItemsClick = () =>{
  const navList = document.querySelectorAll('[data-id]')
  navList.forEach(item => {
    console.log('获取内容', item);
    item.addEventListener('click', (e) => {
      const targetId = e.target.getAttribute('data-id')
      console.log('点击了',targetId);
      selectedNavClick(targetId)
    });
  })

}
const selectedNavClick = (id) => {
  const targetElement = document.getElementById(id)
  if(targetElement){
    const offsetTop = targetElement.offsetTop

    const start = window.pageYOffset
    const distance = offsetTop - start
    const duration = 700
    let startTime = null

    const animation = (currenTime) => {
      if (startTime === null) startTime = currenTime
      const timeElapsed = currenTime - startTime;
      const run = ease(timeElapsed, start, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(animation);
  }
}

//添加卡片样式
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth <= 768;
}
//卡片轮播图
const track = document.querySelector('.experience-img')
const cards = document.querySelectorAll('.carousel-slide')
console.log(track)
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let active = 0
const totalCards = cards.length

const  updateCarousel = () => {

  const angle = isMobile() ? 45 : 360/totalCards;
  const translateZ = isMobile() ? 200 : 350;
  cards.forEach((card, index) => {
    let rotation;
    if(index >= active){
      rotation = (index - active) * angle;
    }else{
      rotation = (index + totalCards - active) * angle;
    }
    card.style.transform = isMobile() ? `rotateY(${rotation}deg) translateZ(${translateZ}px)` : `rotateY(${rotation}deg) translateZ(350px)`
    if(index !== active){
      if(isMobile()){
        card.style.width = '80vw';
        card.style.height = '35vh';
        card.style.left = '5%';
        card.style.top = '50%';
      }else{
        card.style.width = '50vw';
        card.style.height = '40vh';
        card.style.left = '20%';
        card.style.top = '50%';
      }
      card.style.opacity = '0.6';
      card.style.filter = 'blur(2px)';
      card.style.zIndex = 1;
      card.style.objectFit = 'cover';
    }else{
      if (isMobile()){
        card.style.width = '80vw';
        card.style.height = '35vh';
        card.style.left = '35%';
        card.style.top = '50%';
      }else{
        card.style.width = '55vw';
        card.style.height = '60vh';
        card.style.left = '21%';
        card.style.top = '37%';
      }
      card.style.opacity = '1';
      card.style.filter = 'none';
      card.style.zIndex = 20;
      card.style.objectFit = 'contain';
      card.style.transform =`rotateY(10deg)`;
    }
  })
  if(isMobile()){
    cards[active].style.transform = `rotateY(5deg) translateZ(400px)`;
  } else {
    cards[active].style.transform = `rotateY(7deg) translateZ(650px)`;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  if (track && cards && cards.length > 0) {
    // 设置卡片3D样式
    cards.forEach((card) => {
      card.style.position = 'absolute';
      card.style.marginLeft = '-150px';
      card.style.marginTop = '-150px';
      card.style.transformStyle = 'preserve-3d';
      card.style.transition = 'transform 1s, opacity 1s, z-index 1s';
      card.style.objectFit = 'contain';
      card.style.zIndex = -1;
      card.style.filter = `none`;
    });
    updateCarousel()
    prevBtn.onclick = () => {
      active = active - 1 >= 0 ? active - 1 : cards.length - 1;
      updateCarousel()
    };

    nextBtn.onclick = () => {
      active = active + 1 < cards.length ? active + 1 : 0;
      updateCarousel()
    };
  }
  navItemsClick();
});
