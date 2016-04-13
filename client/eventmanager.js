Tankitos.EventManager = function() {
  this.observers = [];
};

Tankitos.EventManager.prototype = {
  on: function(topic, observer) {
    this.observers[topic] || (this.observers[topic] = []);
    this.observers[topic].push(observer);
  },

  notify: function(topic, data) {
    if(!this.observers[topic]) {
      return; 
    }
    this.observers[topic].forEach(function(t) { t(data); });
  },
};
