import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import litLogo from '../../assets/lit.svg'

@customElement('flo-button')
export class FloButton extends LitElement {
	@property()
	label = 'Click me'

	@property({ type: Number })
	count = 0

	render() {
		return html`
			<button @click=${this._onClick}>
				<img src=${litLogo} alt="Icon" />
				<span>${this.label} is ${this.count}</span>
			</button>
		`
	}

	private _onClick() {
		this.count++
	}

	static styles = css`
		button {
			all: unset;
			background: blue;
		}
	`
}
