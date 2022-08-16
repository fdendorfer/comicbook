import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('flo-nav')
export class FloNav extends LitElement {
	@property()
	logo = '/assets/lit.svg'

	@property({ type: Array })
	items = []

	render() {
		return html` <nav><img .src=${this.logo} /></nav> `
	}

	static styles = css`
		nav {
			width: 100%;
			height: 64px;
			background: lightblue;
		}
	`
}
