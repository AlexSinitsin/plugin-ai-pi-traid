document.addEventListener("DOMContentLoaded", () => {
  let telephones = document.querySelectorAll('[data-plugin-2="tel"]');
  telephones.forEach((node) => {

    let inputBox = document.createElement('div');
    inputBox.classList.add('input-box');
    inputBox.setAttribute('style', `height: ${node.offsetHeight}px; width: ${node.offsetWidth}px`);

    node.after(inputBox);
    const cloneNode = node.cloneNode(true);
    node.remove();
    inputBox.prepend(cloneNode);

    let placeholderInput = document.createElement('input');
    placeholderInput.value = '+7 (___) ___-__-__';
    let placeholderDefault = '+7 (___) ___-__-__';
    placeholderInput.setAttribute('type', 'text');
    placeholderInput.classList.add('placeholder-input');

    inputBox.prepend(placeholderInput);
    cloneNode.value = '+7 ('

    let inputBufer = '7';
    cloneNode.addEventListener('input', (e) => {

      let r = e.target.value.replace(/\D/g, "");
      r = r.replace(/^0/, "");
      let finalResult;

      if (inputBufer.length < r.length) {
        inputBufer = r
        finalResult = resultInputValue(r, 0)
      } else {
        inputBufer = r
        finalResult = resultInputValue(r, 1)
      }

      e.target.value = finalResult
      placeholderInput.value = finalResult + placeholderDefault.slice(finalResult.length, placeholderDefault.length);
    })
  })
});

function resultInputValue(r, num) {
  if (r.length > (8 + num)) {
    r = r.replace(/^(\d)(\d{3})(\d{3})(\d{2})(\d{0,2}).*/, "+$1 ($2) $3-$4-$5");
  } else if (r.length > (6 + num)) {
    r = r.replace(/^(\d)(\d{3})(\d{3})(\d{0,2}).*/, "+$1 ($2) $3-$4");
  } else if (r.length > (3 + num)) {
    r = r.replace(/^(\d)(\d{3})(\d{0,5})/, "+$1 ($2) $3");
  } else {
    r = r.replace(/^(\d)(\d*)/, "+$1 ($2");
  }
  return r
}