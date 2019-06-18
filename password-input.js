'use strict';

(function () {
    const hearLabel = "Hear password as you type. Password will not be visible";
    const seeLabel  = "Show Password. Password will be visible on the screen";

    const shadowTemplate = document.createElement('template');
    shadowTemplate.innerHTML = `
    <style>
        .icon:before {
          font-family: "fontello";
          font-style: normal;
          font-weight: normal;
          speak: none;
          display: inline-block;
          text-decoration: inherit;
          width: 1em;
          margin-right: .2em;
          text-align: center;
          font-variant: normal;
          text-transform: none;
          line-height: 1em;
          margin-left: .2em;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .hear .icon:before { content: '\\e802'; }
        .hear[aria-checked="true"] .icon:before { content: '\\e800'; }
        .see .icon:before { content: '\\e805'; }
        .see[aria-checked="true"] .icon:before { content: '\\e806'; }

        button {
            position: var(--pi-button-position, absolute);
            background: var(--pi-button-background, #fff);
            left: var(--pi-button-left, -2em);
            width: var(--pi-button-with, 2em);
            height: var(--pi-button-height, 2em);
            margin: var(--pi-button-margin, 2px 0 0 -2px);
            border: var(--pi-button-border, 0);
            padding: var(--pi-button-padding, 0);
        }

        button:focus {
            outline: var(--pi-button-outline, dotted);
            background: var(--pi-button-focus-background, #fff);
        }

        .sr-only {
        	position: absolute;
        	left: -10000px;
        }

        .sr-only-focusable:focus,
        .sr-only-focusable:active {
            left: var(--pi-button-focus-left, calc(var(--pi-button-left, -2em) * 2 - 4px));
        }
    </style>
    <button class="sr-only sr-only-focusable hear" role="switch" aria-checked="false" title="${hearLabel}"><i class="icon"></i></button> <button role="switch" aria-checked="false" class="see" title="${seeLabel}"><i class="icon"></i></button>
    `;

    class PasswordInputButtons extends HTMLElement {
        constructor () {
            super();
            if (!this.disableShadow) {
                this._shadowRoot = this.attachShadow({ 'mode': 'open' });
                this._shadowRoot.appendChild(shadowTemplate.content.cloneNode(true));
                this.$buttons = {
                    hear: this._shadowRoot.querySelector('.hear'),
                    see: this._shadowRoot.querySelector('.see')
                };
            }
        }

        connectedCallback () {
            this.style.position = 'relative';
            const state = {hear: false, see: false};
            if (this.disableShadow) {
                this.appendChild(shadowTemplate.content.cloneNode(true));
                this.$buttons = {
                    hear: this.querySelector('.hear'),
                    see: this.querySelector('.see')
                };
            }

            this.$buttons.hear.addEventListener('click', this.handleChangeEvent.bind(this, 'hear', state));
            this.$buttons.see.addEventListener('click', this.handleChangeEvent.bind(this, 'see', state));
        }

        check (el) {
            el.setAttribute('aria-checked', true);
        }

        uncheck (el) {
            el.setAttribute('aria-checked', false);
        }

        isChecked (el) {
            var checked = el.getAttribute('aria-checked');
            return checked && checked !== 'false' || false;
        }

        toggleState (key, state) {
            const isChecked = state[key];
            if (isChecked) {
                this.uncheck(this.$buttons[key]);
                state[key] = false;
            } else {
                this.check(this.$buttons[key]);
                const altKey = key === 'hear' ? 'see' : 'hear';
                this.uncheck(this.$buttons[altKey]);
                state[key] = true;
                state[altKey] = false;
            }
            return state;
        }

        handleChangeEvent (key, state, e) {
            this.toggleState(key, state);
            this.dispatchEvent(new CustomEvent('change', {detail: Object.assign({}, state)}));
            e.preventDefault();
            return false;
        }

    }

    window.customElements.define('password-input-buttons', PasswordInputButtons);

    class PasswordInput extends HTMLInputElement {
        connectedCallback () {
            let originalIndent = null;
            this.setAttribute('type', 'password');
            this.$buttons = document.createElement('password-input-buttons');
            this.parentNode.insertBefore(this.$buttons, this.nextSibling);

            this.addEventListener('focus', () => {
                 const hear = this.getAttribute('hear');
                 const see = this.getAttribute('see');
                 if (hear) {
                     originalIndent = this.style.textIndent || null;
                     this.style.textIndent = '-100000px';
                 }
                 if (hear || see) {
                     this.setAttribute('type', 'text');
                 }
            });

            this.addEventListener('blur', () => {
                 this.setAttribute('type', 'password');
                 if (this.getAttribute('hear')) {
                     this.style.textIndent = originalIndent;
                 }
            });

            this.$buttons.addEventListener('change', (e) => {
                if (e.detail.hear) {
                    this.setAttribute('hear', true);
                    this.removeAttribute('see');
                } else if (e.detail.see) {
                    this.setAttribute('see', true);
                    this.removeAttribute('hear');
                } else {
                    this.removeAttribute('see');
                    this.removeAttribute('hear');
                }
                this.focus();
            });
        }
    }
    window.customElements.define('password-input', PasswordInput, {extends: 'input'});
}());
