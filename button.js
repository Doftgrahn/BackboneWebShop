const CheckedboxModel = Backbone.Model.extend({
  defaults: {
    checked: 'false',
    htmlContent: "radio"
  },
  isCheckedTrue: function() {
    let isTrue = this.get('checked')
    this.set({
      checked: 'true'
    })
  },
  isFalse: function() {
    let isFalse = this.get('checked')
    this.set({
      checked: 'false'
    })
  }
});

const finalModel = new CheckedboxModel({});

const ViewCheckBox = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
  },
  render: function() {
    let checked = this.model.get('checked');
    let checkBox = this.model.get('htmlContent');
    let checkBoxTrue = `<input type="${checkBox}" id="trueBox"/>`;
    let checkBoxFalse = `<input type="${checkBox}" id="falseBox"/>`;
    this.$el.html(`<div class="inputDiv"> ${checkBoxTrue} ${checkBoxFalse}</div>`);
  }
});


window.addEventListener('load', () => {

  let showIt = new ViewCheckBox({
    el: '.buttonElement',
    model: finalModel
  });

  showIt.render();

});
