const DOMNodeCollection = require('./dom_node_collection.js');

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

$l.ajax = options = > {
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
