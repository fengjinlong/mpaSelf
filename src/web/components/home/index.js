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