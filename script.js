// ---------------------------{  Utilities  }----------------------------

$( document ).ready( function () {

// -------------------------{  Vue Components  }-------------------------

var FooterTab = {
  template: `
    <div :id='name' class='tab' :class='tabClass'>{{ capitalize(name) }}</div>
  `,
  props: ['name', 'active'],
  computed: {
    tabClass: function () {
      var isActive = this.name === this.active;
      return {
        active: isActive,
        inactive: !isActive
      }
    }
  },
  methods: {
    capitalize: function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
}

var InstContent = {
  template: `
    <div>
      <p v-if='mobile'>Use the dot and dash buttons to code in the message shown
      above.</p>
      <p v-else>Use the / and Shift keys on your keyboard to code in the message
      shown on the left.</p>
      <ul>
        <li>Leave a short pause to start a new letter.</li>
        <li>Leave a medium-length pause to insert a space.</li>
        <li>Leave a long pause to send the message.</li>
      </ul>
      <p>If you make a mistake, just wait for the message to send and you’ll be
      able to start over.</p>
      <p>You can choose which characters you want to practice with on the
      Settings tab.</p>
    </div>
  `,
  props: ['mobile']
}

// --------------------------{  Vue Instance  }--------------------------

var App = new Vue ({
  el: '#app',
  data: {
    message1: 'HELLO WORLD',
    message2: 'HELLO WOR',
    activeTab: 'instructions',
    isMobile: true
  },
  computed: {},
  methods: {},
  components: {
    'footer-tab': FooterTab,
    'inst-content': InstContent
  }
});

// --------------------------{  Key Handling  }--------------------------

function keyHandler () {

}

$( document ).keyup( keyHandler );

});
