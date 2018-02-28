// ------------------------{  Data Preparation  }------------------------

var appData = {
  'A': { 'char': 'A', 'code': Array.from('.-'), 'enabled': true },
  'B': { 'char': 'B', 'code': Array.from('-...'), 'enabled': true },
  'C': { 'char': 'C', 'code': Array.from('-.-.'), 'enabled': true },
  'D': { 'char': 'D', 'code': Array.from('-..'), 'enabled': true },
  'E': { 'char': 'E', 'code': Array.from('.'), 'enabled': true },
  'F': { 'char': 'F', 'code': Array.from('..-.'), 'enabled': true },
  'G': { 'char': 'G', 'code': Array.from('--.'), 'enabled': true },
  'H': { 'char': 'H', 'code': Array.from('....'), 'enabled': true },
  'I': { 'char': 'I', 'code': Array.from('..'), 'enabled': true },
  'J': { 'char': 'J', 'code': Array.from('.---'), 'enabled': true },
  'K': { 'char': 'K', 'code': Array.from('-.-'), 'enabled': true },
  'L': { 'char': 'L', 'code': Array.from('.-..'), 'enabled': true },
  'M': { 'char': 'M', 'code': Array.from('--'), 'enabled': true },
  'N': { 'char': 'N', 'code': Array.from('-.'), 'enabled': true },
  'O': { 'char': 'O', 'code': Array.from('---'), 'enabled': true },
  'P': { 'char': 'P', 'code': Array.from('.--.'), 'enabled': true },
  'Q': { 'char': 'Q', 'code': Array.from('--.-'), 'enabled': true },
  'R': { 'char': 'R', 'code': Array.from('.-.'), 'enabled': true },
  'S': { 'char': 'S', 'code': Array.from('...'), 'enabled': true },
  'T': { 'char': 'T', 'code': Array.from('-'), 'enabled': true },
  'U': { 'char': 'U', 'code': Array.from('..-'), 'enabled': true },
  'V': { 'char': 'V', 'code': Array.from('...-'), 'enabled': true },
  'W': { 'char': 'W', 'code': Array.from('.--'), 'enabled': true },
  'X': { 'char': 'X', 'code': Array.from('-..-'), 'enabled': true },
  'Y': { 'char': 'Y', 'code': Array.from('-.--'), 'enabled': true },
  'Z': { 'char': 'Z', 'code': Array.from('--..'), 'enabled': true },
  '01': { 'char': '1', 'code': Array.from('.----'), 'enabled': true },
  '02': { 'char': '2', 'code': Array.from('..---'), 'enabled': true },
  '03': { 'char': '3', 'code': Array.from('...--'), 'enabled': true },
  '04': { 'char': '4', 'code': Array.from('....-'), 'enabled': true },
  '05': { 'char': '5', 'code': Array.from('.....'), 'enabled': true },
  '06': { 'char': '6', 'code': Array.from('-....'), 'enabled': true },
  '07': { 'char': '7', 'code': Array.from('--...'), 'enabled': true },
  '08': { 'char': '8', 'code': Array.from('---..'), 'enabled': true },
  '09': { 'char': '9', 'code': Array.from('----.'), 'enabled': true },
  '00': { 'char': '0', 'code': Array.from('-----'), 'enabled': true }
}

$( document ).ready( function () {

// -------------------------{  Vue Components  }-------------------------

var KeyPaddle = {
  template: `
    <div class='holder'>
      <img
        :id="'paddle-' + type"
        :src="'paddle-' + type + '.svg'"
        :alt='imgAlt'
        class='paddle'
        :class='{ down: down }'
        @mousedown='paddleDown'
        @mouseup='paddleUp'
      >
      <label :class='{ hidden: mobile }'>{{ hotkey }}</label>
    </div>
  `,
  props: ['type', 'hotkey', 'down', 'mobile'],
  computed: {
    imgAlt: function () {
      var type = this.type.charAt(0).toUpperCase() + this.type.slice(1);
      return type + ' paddle (' + this.hotkey + ')';
    }
  },
  methods: {
    paddleDown: function () {
      App[this.type + 'PaddleDown'] = true;
    },
    paddleUp: function () {
      App[this.type + 'PaddleDown'] = false;
    }
  }
}

var FooterTab = {
  template: `
    <div class='tab' :class='tabClass' @click='switchTab'>
      {{ capitalize(name) }}
    </div>
  `,
  props: ['name', 'tab'],
  computed: {
    tabClass: function () {
      return {
        active: this.name === this.tab,
        inactive: this.name !== this.tab
      }
    }
  },
  methods: {
    switchTab: function () {
      App.tab = this.name;
    },
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
      <input type='checkbox' :id='charData.char' v-model='charData.enabled'>
      <label :for='charData.char'>{{ charData.char }}</label>
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
    dotPaddleDown: false,
    dashPaddleDown: false,
    tab: 'instructions',
    mobile: false
  },
  computed: {},
  methods: {},
  components: {
    'key-paddle': KeyPaddle,
    'footer-tab': FooterTab,
    'instructions': Instructions,
    'reference': Reference,
    'settings': Settings
  }
});

// --------------------------{  Key Handling  }--------------------------

function keyHandler () {
  // console.log('keyCode: ' + event.keyCode); // Developer mode
  var eventType = event.type.replace('key', 'mouse');
  switch (event.keyCode) {
    case 16: // Shift
      $( '#paddle-dash' ).trigger( eventType );
      break;
    case 191: // forward slash
      $( '#paddle-dot' ).trigger( eventType );
      break;
  }
}

$( document ).keydown( keyHandler );
$( document ).keyup( keyHandler );

});
