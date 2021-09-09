HTMLAnchorElement.prototype.scrollIntoView = ({
  blockSelector,
  blockPosition = 'start',
  behavior = 'smooth',
}) => {
  try {
    if (typeof blockSelector !== 'string')
      throw new TypeError("Anchor's href must be a string")

    const blockToScroll = document.querySelector(blockSelector)

    try {
      blockToScroll.scrollIntoView({
        behavior,
        block: blockPosition,
      })
    } catch {
      console.error(new Error('Anchor must contain a valid css selector'))
    }
  } catch (error) {
    switch (error.type) {
      case TypeError:
        console.warn(error)
      default:
        console.error(error)
    }
  }
}
class ScrollingNavigation {
  constructor({ selector }) {
    this._menuItemSelector = selector
  }

  _getNavigationElements() {
    try {
      if (document.querySelectorAll(this._menuItemSelector).length !== 0) {
        return document.querySelectorAll(this._menuItemSelector)
      }

      throw new Error(`There is no ${this._menuItemSelector} elements on page`)
    } catch (e) {
      console.error(e)
    }
  }

  _handleClickOnLink(event) {
    event.preventDefault()

    const blockSelector = event.target.getAttribute('href')

    this.scrollIntoView({
      blockSelector,
    })
  }

  init() {
    const menuLinks = this._getNavigationElements()

    menuLinks.forEach((elem) => {
      if (elem.tagName.toLowerCase() !== 'a')
        throw new TypeError('Every navigation element must be an anchor')

      elem.addEventListener('click', this._handleClickOnLink)
    })
  }
}

const navigation = new ScrollingNavigation({
  selector: '.menu__link',
})

navigation.init()
