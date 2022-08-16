import { html } from 'lit'
import './button'

export const Default = () => {
	return html`<flo-button .count=${2} label="story says"></flo-button>`
}

export const Secondary = () => {
	return html`<flo-button .count=${-3} label="Secondary says"></flo-button>`
}
