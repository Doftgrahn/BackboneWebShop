/*--
 IN DA CLOUD
 --*/

const data = [{
    species: 'Kamel',
    price: 500,
    type: 'Mammal'
  },
  {
    species: 'Orm',
    price: 100,
    type: 'snaky'
  },
  {
    species: 'Apa',
    price: 300,
    type: 'Mammal'
  },
  {
    species: 'Unicorn',
    price: 9000000,
    type: '8'
  }
];
const newData = JSON.stringify(data);
localStorage.setItem('animals', newData);
/*--
DA CLOUD ENDZZZ HERE
--*/
/*--
Get data here from 'cloud'
--*/
const getDatafromCloud = localStorage.getItem('animals');
const animals = JSON.parse(getDatafromCloud);
/*--
Just got data from 'cloud'
--*/
/*--
 Backbone starts HERE
--*/
const AnimalModel = Backbone.Model.extend({
  defaults: {
    species: '',
    price: 0,
    type: ''
  }
});

const AnimalCollection = Backbone.Collection.extend({
  model: AnimalModel
});

const Animals = new AnimalCollection(animals);

const AnimalView = Backbone.View.extend({
  //$el: '.animalCards',
  render: function() {
    let art = this.model.get('species');
    let price = this.model.get('price');
    let type = this.model.get('type');
    let content = `Buy a ${art} for the cheap price of ${price} pesos, the animals type is ${type}`;
    this.$el.html(`<div class="card"> ${content}</div>`);
  }
});

let animalsAlmostDone = animals.map(ani => new AnimalModel(ani));
let viewThemAnimals = animalsAlmostDone.map(animalModeintance =>
  new AnimalView({
    model: animalModeintance
  })
);
function renderEverything() {
  $('.animalCards').html('');
  viewThemAnimals.forEach(view => {
    $('.animalCards').append(view.$el);
    view.render();
  })
}


window.addEventListener('load', () => {
  renderEverything();
})
