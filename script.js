// ------------------------{  Data Preparation  }------------------------

var appData = {
  'A': { 'char': 'A', 'code': Array.from('.-'), 'enabled': false },
  'B': { 'char': 'B', 'code': Array.from('-...'), 'enabled': false },
  'C': { 'char': 'C', 'code': Array.from('-.-.'), 'enabled': false },
  'D': { 'char': 'D', 'code': Array.from('-..'), 'enabled': true },
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
  'T': { 'char': 'T', 'code': Array.from('-'), 'enabled': false },
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
      if (App[this.type + 'PaddleDown'] === false) {
        App[this.type + 'PaddleDown'] = true;
        // What else should happen when a paddle is pressed?
      }
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
      <input
        type='checkbox'
        :id='charData.char'
        v-model='charData.enabled'
        @click='checkSettings($event)'
      >
      <label :for='charData.char'>{{ charData.char }}</label>
    </div>
  `,
  props: ['charData'],
  methods: {
    checkSettings: function (event) {
      var chars = App.enabledChars;
      if (chars.length === 1 && chars[0] === this.charData.char) {
        event.preventDefault();
        alert('You must choose at least one character!');
      }
    }
  }
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
    message1: null,
    message2: '',
    dotPaddleDown: false,
    dashPaddleDown: false,
    tab: 'instructions',
    mobile: false
  },
  computed: {
    enabledChars: function () {
      return Object.values(this.data)
        .filter( o => o.enabled )
        .map( o => o.char);
    }
  },
  methods: {
    generateMessage: function () {
      var message = '';
      message += this.generateCallSign();
      message += ' DE ';
      message += this.generateCallSign() + ' ';
      message += this.chooseIcsCode();
      App.message1 = message;
    },
    generateCallSign: function () {
      var sign = '',
          length = Math.random() < 0.5 ? 2 : 3;
      for (var i = 0; i < length; i++) {
        sign = this.addRandomChar(sign);
      }
      return sign;
    },
    addRandomChar: function (message) {
      var chars = this.enabledChars,
          randomChar = chars[Math.floor(Math.random() * chars.length)];
      return message + randomChar;
    },
    chooseIcsCode: function () {
      var codes = icsCodes.filter(this.icsFilter);
      return codes[Math.floor(Math.random() * codes.length)];
    },
    icsFilter: function (code) {
      var keep = true;
      code.split("").forEach(function(char){
        if (!App.enabledChars.includes(char)) { keep = false }
      });
      return keep;
    }
  },
  components: {
    'key-paddle': KeyPaddle,
    'footer-tab': FooterTab,
    'instructions': Instructions,
    'reference': Reference,
    'settings': Settings
  }
});

App.generateMessage();

// --------------------------{  Key Handling  }--------------------------

function keyHandler () {
  // console.log('keyCode: ' + event.keyCode); // Developer mode
  var mouseEvent = document.createEvent('MouseEvents');
  mouseEvent.initMouseEvent(event.type.replace('key', 'mouse'), true, true,
    window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
  switch (event.keyCode) {
    case 16: // Shift
      $( '#paddle-dash' )[0].dispatchEvent(mouseEvent);
      break;
    case 191: // forward slash
      $( '#paddle-dot' )[0].dispatchEvent(mouseEvent);
      break;
  }
}

$( document ).keydown( keyHandler );
$( document ).keyup( keyHandler );

});
