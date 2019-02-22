  const CheckedboxModel = Backbone.Model.extend({
    defaults: {
      checked: false,
      htmlContent: "radio"
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
      let checkBoxTrue = `<input type="${checkBox}"" id="trueBox"/>`;
      let checkBoxFalse = `<input type="${checkBox}" id="falseBox"/>`;
      if (checked === true) {
        checkBoxTrue = `<input type="${checkBox}" checked id="trueBox"/>`
      } else {
        checkBoxFalse = `<input type="${checkBox}"  checked id="trueBox"/>`
      }
      this.$el.html(`<div class="inputDiv"> ${checkBoxTrue} ${checkBoxFalse}</div>`);
    },
    events: {
      "click #trueBox": 'onClick',
      "click #falseBox": 'onClick'
    },
    onClick: function() {
      console.log('funkar det?', this.model.get('checked'));
      if (this.model.get('checked') == true) {
        this.model.set({
          checked: false
        })
      } else {
        this.model.set({
          checked: true
        })
      }
    }
  });

  window.addEventListener('load', () => {

    let showIt = new ViewCheckBox({
      el: '.buttonElement',
      model: finalModel
    });

    showIt.render();
  });
