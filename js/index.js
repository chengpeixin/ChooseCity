import "./../less/index.less"
import BScroll from "./scroll"
import dataList from "./../data/dataList.json"


const init = () => {
  let wrapper = document.querySelector('.wrapper')
  let scroll = new BScroll(wrapper, {
    scrollY: true,
    scrollX: true,
    probeType: 3
  })
  let str = `<li class="li">默认城市</li>`
  let str2 = ``

  // await
  let ul = document.querySelector('.content')
  let nav = document.querySelector('#nav')
  // await
  dataList.map(item => {
    const cities = item.cities
    str += `<p class="anchor"> ${item.name}</p>`
    str2 += `<li class="anchor_navi_tem">${item.name[0]}</li>`
    cities.map(citie => {
      str += `<li class="li">${citie.name}</li>`
    })
  })

  // await
  ul.innerHTML = str;
  nav.innerHTML = str2;
  // await
  let TITLE_TOP = []
  let anchor = document.querySelectorAll('.anchor')
  let anchor_nav_list = document.querySelectorAll('.anchor_navi_tem')
  // await
  anchor.forEach((v, i) => {
    TITLE_TOP.push({
      el: v,
      offTop: v.offsetTop,
      offLeft: v.offsetLeft
    })
  })

  // await
  const anchor_tile = document.querySelector('#title')
  // async
  scroll.on("scroll", pos => {
    const y = pos.y,
      x = pos.x;
    for (let i = 0; i < TITLE_TOP.length - 1; i++) {
      const item = TITLE_TOP[i];
      const height1 = item.offTop;
      const height2 = TITLE_TOP[i + 1].offTop;
      if (-y >= height1 && -y < height2) {
        anchor_tile.style.display = "block"
        anchor_tile.style.transform = "translate3d(0px, 0px, 0px)"
        anchor_tile.innerHTML = item.el.innerHTML;
        anchor_nav_list.forEach(item => {
          item.style.color = "#666"
        })
        anchor_nav_list[i].style.color = "#3b99fc"
        return;
      } else {
        anchor_nav_list.forEach(item => {
          item.style.color = "#666"
        })
        if (-y < TITLE_TOP[0].offTop) {
          anchor_tile.style.display = "none"
        }
        if (-y > TITLE_TOP[TITLE_TOP.length - 1].offTop) {
          anchor_nav_list[anchor_nav_list.length - 1].style.color = "#3b99fc"
          anchor_tile.innerHTML = TITLE_TOP[TITLE_TOP.length - 1].el.innerHTML;
          return;
        }
      }
    }
  })
  scroll.getSelectedIndex()
}
window.onload = init();