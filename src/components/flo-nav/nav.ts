import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('flo-nav')
export default class FloNav extends LitElement {
	@property()
	logo = '/src/assets/lit.svg'

	@property({ type: Array })
	items = []

	render() {
		return html` <nav><img .src=${this.logo} alt="Logo" /></nav> `
	}

	static styles = css`
		nav {
			width: 100%;
			height: 64px;
			background: lightblue;
		}
	`
}
