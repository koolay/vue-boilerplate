/* globals swal */

const ui = {

  alert (title, msg, type) {
    swal(title, msg, type)
  },

  confirm (title, msg, onApprove) {
    swal({
      title: title,
      text: msg,
      type: 'warning',
      showCancelButton: true,
      closeOnConfirm: false,
      showLoaderOnConfirm: true
    }, function () {
      onApprove()
    })
  },

  prompt (title, msg, placeholder, cb) {
    swal({
      title: title,
      text: msg,
      type: 'input',
      showCancelButton: true,
      closeOnConfirm: false,
      inputPlaceholder: 'Write something'
    }, function (inputValue) {
      if (inputValue === false) return false
      if (inputValue === '') {
        swal.showInputError('You need to write something!')
        return false
      }
      cb(inputValue)
    })
  }
}

export {
  ui
}

