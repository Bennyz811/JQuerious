/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

const docReadyCallBacks = [];
let docReady = false;

function $l(arg){
  if (typeof arg === 'string'){
    var docNode = document.querySelectorAll(arg);
    var docArr = Array.from(docNode);
    return new DOMNodeCollection(docArr);
  } else if (typeof arg === 'function'){
    return ( !docReady ? docReadyCallBacks.push(arg) : arg() );
  } else {
    return new DOMNodeCollection([arg]);
  }
}

$l.extend = (base, ...objs) => {
  objs.forEach(obj => {
    for (const prop in obj){
      base[prop] = obj[prop];
    }
  });
  return base;
}

$l.ajax = options => {
  const request = new XMLHttpRequest();
  const defaults = {
    method: 'GET',
    url: "",
    success: () => {},
    error: () => {},
    data: () => {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };
  options = $l.extends(defaults, options);
  request.open(options.method, options.url, true);
  request.onload = (e) => {
    if (request.state === 200){
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
}

document.addEventListener('DOMContentLoaded', () => {
  docReady = true;
  docReadyCallBacks.forEach(func => func());
});

window.$l = $l;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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
      const eventKey = `jqueriousEvents-${eventName}`;
      if (typeof el[evenbtKey] === 'undefined'){
        el[eventKey] = [];
      }
      el[eventKey].push(callback);
    });
  }

  off(eventName){
    this.array.forEach(el => {
      const eventKey = `jqueriousEvents-${eventName}`;
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


/***/ })
/******/ ]);