window.dom = {
  //增
  create(string) {//创建节点
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild; 
  },
  after(node, node2) {
    //在node后插入node2节点
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  before(node, node2) {//在node前插入节点
    node.parentNode.insertBefore(node2, node);
  },
  append(parent, node) {//创建子节点
    parent.appendChild(node);
  },
  wrap(node, parent) {//创建父亲节点
    dom.before(node, parent);
    dom.append(parent, node);
  },
  //删
  remove(node) {//删除node节点
    node.parentNode.removeChild(node);
    return node;
  },
  empty(node) {//删除整个node节点
    const { childNodes } = node;
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },
  //改
  attr(node, name, value) {
    //重载
    if (arguments.length === 3) {
      return node.setAttribute(name, value);//修改node名和值
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    //适配
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        return node.style[name];
      }
    } else if (name instanceof Object) {
      const object = name;
      for (let key in object) {
        node.style[key] = object[key];
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  //查
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  each(nodeList, fn) {
    for (i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  index(node) {
    const list = dom.children(node.parentNode);
    let i = 0;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
