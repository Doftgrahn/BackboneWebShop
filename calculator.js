const CalculatorModel = Backbone.Model.extend({
  defaults: {
    defaultValue: 0,
    htmlContent1: 'button',
    htmlContent2: 'span'
  },
  increase: function() {
    let oldValue = this.get('defaultValue');
    this.set({
      defaultValue: oldValue + 1
    });
  },
  decrease: function() {
    let oldValue = this.get('defaultValue');
    this.set({
      defaultValue: oldValue - 1
    });
  }
});

const newFinalCalculator = new CalculatorModel;

const ViewCalculator = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
  },
  render: function() {
    const defaultValue = this.model.get('defaultValue');
    const spanElement = this.model.get('htmlContent2');
    const spanView = `<${spanElement} id ="view">${defaultValue}</${spanElement}>`;
    this.$el.html(`${spanView}`);
  }
});


const Buttonpress = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },
  render: function() {
    let disabled = 'disabled';
    if (newFinalCalculator.get('defaultValue') > 0) {
      disabled = '';
    }
    const buttonElement = this.model.get('htmlContent1')
    const plusButton = `<${buttonElement} id="buttonPlus">+</${buttonElement}>`
    const minusButton = `<${buttonElement} id="buttonMinus" ${disabled}>-</${buttonElement}>`;
    const buttonContent = `${plusButton} ${minusButton}`;
    this.$el.html(`${buttonContent}`)
  },
  events: {
    "click #buttonPlus": 'addToButton',
    "click #buttonMinus": 'removeNumber'
  },
  addToButton: function() {
    this.model.increase();
  },
  removeNumber: function() {
    this.model.decrease();
  }
})

window.addEventListener('load', () => {

  const viewEverything = new ViewCalculator({
    el: '.calc-container',
    model: newFinalCalculator
  });

  const buttons = new Buttonpress({
    el: '.buttons',
    model: newFinalCalculator
  });

  viewEverything.render();
  buttons.render()
});
