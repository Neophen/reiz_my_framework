window.Alpine = {
  directives: {
    "x-text": (el, value) => {
      el.innerText = value;
    },
    "x-show": (el, value) => {
      el.style.display = value ? "block" : "none";
    },
  },

  start() {
    this.root = document.querySelector("[x-data]");
    this.rawData = this.getInitialData(this.root);
    this.data = this.observe(this.rawData);
    this.registerListeners();
    this.refreshDOM();
  },

  observe(object) {
    const that = this;
    return new Proxy(object, {
      set(target, key, value) {
        target[key] = value;
        that.refreshDOM();
      },
    });
  },

  getInitialData(element) {
    return eval(`(${element.getAttribute("x-data")})`);
  },

  execute(expression) {
    return eval(`with(this.data) {(${expression})}`);
  },

  registerListeners() {
    this.walkDOM(this.root, (el) => {
      Array.from(el.attributes).forEach((attribute) => {
        if (!attribute.name.startsWith("@")) {
          return;
        }

        const event = attribute.name.replace("@", "");
        el.addEventListener(event, () => this.execute(attribute.value));
      });
    });
  },

  refreshDOM() {
    this.walkDOM(this.root, (el) => {
      Array.from(el.attributes).forEach((attribute) => {
        if (!Object.keys(this.directives).includes(attribute.name)) {
          return;
        }

        this.directives[attribute.name](el, this.execute(attribute.value));
      });
    });
  },

  walkDOM(el, callback) {
    callback(el);

    el = el.firstElementChild;

    while (el) {
      this.walkDOM(el, callback);

      el = el.nextElementSibling;
    }
  },
};

window.Alpine.start();
