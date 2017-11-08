class DOMNodeCollection {
  constructor(array){
    this.array = array;
  }

  html(string){
    if (string){
      this.array.forEach(el => {el.innerHTML = string})
    } else {
      return this.array[0].innerHTML;
    }
  }

  empty(){
    this.array.forEach(el => {el.innerHTML = ""})
  }

  append(arg){
    if(arg instanceof HTMLElement){
      this.array.forEach(el => {
        el.innerHTML = arg.outerHTML
      })
    } else if (arg instanceof DOMNodeCollection){
      arg.array.forEach(el => {
        this.array.forEach(el2 => {
          el2.HTMLElement = el.outerHTML
        });
      });
    } else {
      this.array.forEach(el => {
        el.innerHTML += arg
      });
    }
  }

  attr(attribute, value){
    if (value === undefined){
      return this.array[0].getAttribute(attribute);
    } else {
      this.array.forEach(el => {
        el.setAttribute(attribute, value);
      });
    }
  }

  addClass(arg){
    this.attr("class",arg)
  }

  removeClass(arg){
    this.array.forEach(el => {
      el.classList.remove(arg);
    });
  }

  toggleClass(arg){
    this.array.forEach(el => {el.classList.toggle(arg)});
  }

  children(){
    let childArr = [];
    this.array.forEach(el => {
      childArr = childArr.concat(Array.from(el.children));
    });
    let newNodeCollection = new DOMNodeCollection(childArr);
    return newNodeCollection;
  }

  parent(){
    return new DOMNodeCollection(this.array[0].parentNode);
  }

  find(arg){
    const found = [];
    this.array.forEach(el => {
      let foundChildren = Array.from(el.querySelectorAll(arg));
      found = found.concat(foundChildren);
    });
    return new DOMNodeCollection(found);
  }

  remove(arg){
    this.array.forEach(el => {el.parentNode.removeChild(el)})
  }

  on(eventName, callback){
    this.array.forEach(el => {
      el.addEventListener(eventName, callback);
      const eventKey = `${eventName}`;
      if (typeof el[evenbtKey] === 'undefined'){
        el[eventKey] = [];
      }
      el[eventKey].push(callback);
    });
  }

  off(eventName){
    this.array.forEach(el => {
      const eventKey = `${eventName}`;
      if (el[eventKey]){
        el[eventKey].forEach(callback => {
          el.removeEventListener(eventName, callback);
        });
      }
      el[eventKey] = [];
    });
  }


}

module.exports = DOMNodeCollection;
