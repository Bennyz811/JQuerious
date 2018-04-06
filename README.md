# jQuerious
JQuerious is a JavaScript library that makes DOM manipulation, events handling and AJAX requests easier

## Instruction
Download JQuerious library and include the webpack output in your source code.

## Demo
[demo link](https://bennyz811.github.io/JQuerious/?)

Included is a simple todo list application that can add todos and remove todos by clicking on the same todo item.
To open demo, doanload or clone the JQuerious library and view the html locally.

## DOM Manipulation
The attr method takes the value of the attribute from the first element and set it as the attribute for every second matched element
```
  attr(attribute, value){
    if (value === undefined){
      return this.array[0].getAttribute(attribute);
    } else {
      this.array.forEach(el => {
        el.setAttribute(attribute, value);
      });
    }
  }
```

## Event Handler
Capable of adding and removing event listener to each element
```
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
```

## HTTP(AJAX) Request
Sends a HTTP(AJAX) request and returns a promise.

```
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
```
