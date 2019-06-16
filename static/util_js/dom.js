export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function removeClass (el, className) {
  if (!hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  var index = newClass.findIndex(function (value, index, arr) {
    return value === className
  })
  newClass.splice(index, 1)
  el.className = newClass.join(' ')
}

export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function toggleClass (el, className) {
  if (hasClass(el, className)) {
    removeClass(el, className)
  } else {
    addClass(el, className)
  }
}