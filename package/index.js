  
  /**
   * this method is used to calculate the luminance from list of [R,G,B] color
   * @param {list}: e 
   * @returns {number}
   */
  export const luminance = (e) => {
    let redFactor = .2126
    let greenFactor = .7152
    let blueFactor = .0722
    let luminanceFactor = 1 / 12.92
  
    let redPresentage = e[0] / 255
    let greenPersentage = e[1] / 255
    let bluePersentage = e[2] / 255
    let redRelative = redPresentage <= .03928 ? redPresentage * luminanceFactor : Math.pow((redPresentage + .055) / 1.055, 2.4)
    let greenRelative = greenPersentage <= .03928 ? greenPersentage * luminanceFactor : Math.pow((greenPersentage + .055) / 1.055, 2.4)
    let blueRelative = bluePersentage <= .03928 ? bluePersentage * luminanceFactor : Math.pow((bluePersentage + .055) / 1.055, 2.4)
  
    return redRelative * redFactor + greenRelative * greenFactor + blueRelative * blueFactor
  }