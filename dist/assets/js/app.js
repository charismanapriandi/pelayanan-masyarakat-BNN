

(() => {
  const form = document.querySelector('#form-validation');
  const regex = {
    email: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  }

  const validity = {}
  let arrOfValidity = []

  let agreement = false

  const message = `this field is required!`

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const {target} = e

    for (let field of target) {
      const {name, value, required, type} = field;

      const alertElement = document.createElement('div');
      alertElement.classList.add('error-message');
      alertElement.innerHTML = message;

      if (name !== 'setuju' && required && value.length === 0) {
        validity[name] = false

        if (field.nextSibling.nextSibling === null) {
          field.parentNode.appendChild(alertElement);
        }
      }

      if (name !== 'setuju' && required && value.length > 0) {
        validity[name] = true

        if (field.nextSibling.nextSibling !== null) {
          field.parentNode.removeChild(field.nextSibling.nextSibling);
        }
      }

      if (name === 'setuju') {
        let isClassNameEqualToErrorMessage = field.parentNode.nextSibling.nextSibling.getAttribute('class') === 'error-message'
        
        agreement = field.checked
        
        if (!field.checked) {
          if (!isClassNameEqualToErrorMessage) {
            form.insertBefore(alertElement, field.parentNode.nextSibling.nextSibling)
          }
        } 
        if (field.checked) {
          if (isClassNameEqualToErrorMessage) {
            field.parentNode.parentNode.removeChild(field.parentNode.nextSibling.nextSibling)
          }
        }
      }
    }

    arrOfValidity = []
  
    Object.keys(validity).map(name => {
      arrOfValidity.push(validity[name])
    })

    if (!arrOfValidity.includes(false) && agreement) {
      form.submit()
    }
  })
})();

(() => {
  // const inputNode = document.querySelectorAll('input[type="file"')

  // for (let input of inputNode) {
  //   input.addEventListener('change', (e) => {
  //     console.log(e)
  //   })
  // }
})()
