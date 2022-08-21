import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import litLogo from '../../assets/lit.svg'

@customElement('flo-button')
export default class FloButton extends LitElement {
	@property()
	label = 'Click me'

	@property({ type: Object })
	img = {
		alt: '',
		src: '',
	}

	@property({ type: Number })
	count = 0

	@property({ type: Boolean })
	isBig = false

	render() {
		return html`
			<button @click=${this._onClick} .className=${this.isBig ? 'big' : 'not-big'}>
				<img src=${this.img.src || litLogo} alt=${this.img.alt} />
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
