$( document ).ready( function () {

// -------------------------{  Vue Components  }-------------------------



// --------------------------{  Vue Instance  }--------------------------

var App = new Vue ({
  el: '#app',
  data: {
    message1: 'HELLO WORLD',
    message2: 'HELLO WOR'
  },
  computed: {},
  methods: {},
  components: {}
});

// --------------------------{  Key Handling  }--------------------------

function keyHandler () {

}

$( document ).keyup( keyHandler );

});
