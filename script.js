// ------------------------{  Data Preparation  }------------------------

var appData = {
  'A': { 'char': 'A', 'code': Array.from('.-'), 'enabled': false },
  'B': { 'char': 'B', 'code': Array.from('-...'), 'enabled': false },
  'C': { 'char': 'C', 'code': Array.from('-.-.'), 'enabled': false },
  'D': { 'char': 'D', 'code': Array.from('-..'), 'enabled': false },
  'E': { 'char': 'E', 'code': Array.from('.'), 'enabled': true },
  'F': { 'char': 'F', 'code': Array.from('..-.'), 'enabled': false },
  'G': { 'char': 'G', 'code': Array.from('--.'), 'enabled': false },
  'H': { 'char': 'H', 'code': Array.from('....'), 'enabled': false },
  'I': { 'char': 'I', 'code': Array.from('..'), 'enabled': false },
  'J': { 'char': 'J', 'code': Array.from('.---'), 'enabled': false },
  'K': { 'char': 'K', 'code': Array.from('-.-'), 'enabled': false },
  'L': { 'char': 'L', 'code': Array.from('.-..'), 'enabled': false },
  'M': { 'char': 'M', 'code': Array.from('--'), 'enabled': false },
  'N': { 'char': 'N', 'code': Array.from('-.'), 'enabled': false },
  'O': { 'char': 'O', 'code': Array.from('---'), 'enabled': false },
  'P': { 'char': 'P', 'code': Array.from('.--.'), 'enabled': false },
  'Q': { 'char': 'Q', 'code': Array.from('--.-'), 'enabled': false },
  'R': { 'char': 'R', 'code': Array.from('.-.'), 'enabled': false },
  'S': { 'char': 'S', 'code': Array.from('...'), 'enabled': false },
  'T': { 'char': 'T', 'code': Array.from('-'), 'enabled': true },
  'U': { 'char': 'U', 'code': Array.from('..-'), 'enabled': false },
  'V': { 'char': 'V', 'code': Array.from('...-'), 'enabled': false },
  'W': { 'char': 'W', 'code': Array.from('.--'), 'enabled': false },
  'X': { 'char': 'X', 'code': Array.from('-..-'), 'enabled': false },
  'Y': { 'char': 'Y', 'code': Array.from('-.--'), 'enabled': false },
  'Z': { 'char': 'Z', 'code': Array.from('--..'), 'enabled': false },
  '01': { 'char': '1', 'code': Array.from('.----'), 'enabled': false },
  '02': { 'char': '2', 'code': Array.from('..---'), 'enabled': false },
  '03': { 'char': '3', 'code': Array.from('...--'), 'enabled': false },
  '04': { 'char': '4', 'code': Array.from('....-'), 'enabled': false },
  '05': { 'char': '5', 'code': Array.from('.....'), 'enabled': false },
  '06': { 'char': '6', 'code': Array.from('-....'), 'enabled': false },
  '07': { 'char': '7', 'code': Array.from('--...'), 'enabled': false },
  '08': { 'char': '8', 'code': Array.from('---..'), 'enabled': false },
  '09': { 'char': '9', 'code': Array.from('----.'), 'enabled': false },
  '00': { 'char': '0', 'code': Array.from('-----'), 'enabled': false }
}

$( document ).ready( function () {

// -------------------------{  Vue Components  }-------------------------

var FooterTab = {
  template: `
    <div :id="'tab-' + name" class='tab' :class='tabClass'>
      {{ capitalize(name) }}
    </div>
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

var Instructions = {
  template: `
    <div id='instructions'>
      <p v-if='mobile'>Use the dot and dash buttons to code in the message shown
      above.</p>
      <p v-else>Use the / and Shift keys on your keyboard to code in the message
      shown on the left.</p>
      <ul>
        <li>Leave a short pause to start a new letter.</li>
        <li>Leave a medium pause to insert a space.</li>
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

var RefSymbol = {
  template: `<img :src='imgSrc' class='symbol'>`,
  props: ['symbol'],
  computed: {
    imgSrc: function () {
      return this.symbol === '.' ? 'dot.svg' : 'dash.svg';
    }
  }
}

var RefItem = {
  template: `
    <p class='ref-item'>
      {{ charData.char }}
      <ref-symbol
        v-for='(symbol, index) in charData.code'
        :key='index'
        :symbol='symbol'
      ></ref-symbol>
    </p>
  `,
  props: ['charData'],
  components: {
    'ref-symbol': RefSymbol
  }
}

var Reference = {
  template: `
    <div id='reference'>
      <ref-item
        v-for='(value, key) in data'
        :key='key'
        :charData='value'
        v-if='value.enabled' 
      ></ref-item>
    </div>
  `,
  props: ['data'],
  components: {
    'ref-item': RefItem
  }
}

var CheckBox = {
  template: `
    <div class='checkbox'>
      <input type='checkbox' :name='charData.char' :value='charData.enabled'>
      <label>{{ charData.char }}</label>
    </div>
  `,
  props: ['charData']
}

var Settings = {
  template: `
    <form id='settings'>
      <check-box
        v-for='(value, key) in data'
        :key='key'
        :charData='value'
      ></check-box>
    </form>
  `,
  props: ['data'],
  components: {
    'check-box': CheckBox
  }
}

// --------------------------{  Vue Instance  }--------------------------

var App = new Vue ({
  el: '#app',
  data: {
    data: appData,
    message1: 'HELLO WORLD',
    message2: 'HELLO WOR',
    activeTab: 'reference',
    isMobile: true
  },
  computed: {},
  methods: {},
  components: {
    'footer-tab': FooterTab,
    'instructions': Instructions,
    'reference': Reference,
    'settings': Settings
  }
});

// --------------------------{  Key Handling  }--------------------------

function keyHandler () {

}

$( document ).keyup( keyHandler );

});
