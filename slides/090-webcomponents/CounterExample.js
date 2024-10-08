import { Signal, Computed, Effect } from './signals.js';

export class CounterExample extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = `
      <p>Count: <span id="count"></span></p>
      <p>Triple: <span id="triple"></span></p>
      <p>Is triple even: <span id="isTripleEven"></span></p>
      <p><button id="plusOneButton">+1</button></p>
    `

    this.counter = new Signal(0);
    this.triple = new Computed(() => this.counter.value * 3);
    this.isTripleEven = new Computed(() => this.triple.value % 2 === 0);

    new Effect(() => {
      this.shadowRoot.getElementById('count').textContent = this.counter.value;
      this.shadowRoot.getElementById('triple').textContent = this.triple.value;
      this.shadowRoot.getElementById('isTripleEven').textContent = this.isTripleEven.value ? 'yes' : 'no';
    })

    this.shadowRoot.getElementById('plusOneButton').addEventListener('click', () => this.counter.value += 1);
  }

  static get observedAttributes() {
    return ['initial-count']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'initial-count') {
      this.counter.value = parseInt(newValue, 10) ?? 0;
    }
  }
}

customElements.define('counter-example', CounterExample);