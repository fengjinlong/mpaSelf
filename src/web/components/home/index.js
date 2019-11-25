// require('./index.css')
import styles from './index.css';
console.log(styles)
let ele = `
<div class="${styles.div}">
  <ul >
    <li class="${styles.li}">1</li>
    <li>2</li>
    <li>3</li>
  </ul>
</div>
<div>111</div>
`
document.getElementById('out1').outerHTML = ele
const home = {
  init () {
    console.log('home')
  },
  click () {
    console.log('homeclick')
  }
}
document.getElementById('btn').onclick = () => {
  home.click()
}
export default home