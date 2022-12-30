import { render } from 'lit'

class Story {
	path = ''
	name = ''
	stories: any = {}
	props: any = {}
	instance: any = {}
}

const loadedStories: Story[] = []

// Load and prepare all possible stories
const stories: Record<string, Function> = import.meta.glob('./components/**/*.stories.ts', { eager: true })
const definitions: Record<string, any> = import.meta.glob('./components/**/*[!.stories].ts', { eager: true })
for (const path in stories) {
	const keys = Object.keys(definitions[path.replace('.stories', '')].default.prototype)
	const o = new definitions[path.replace('.stories', '')].default()
	const story = {
		path,
		name: path.match(/(?<=\.\/components\/)([a-zA-Z-]*)/)?.[0] as string,
		stories: stories[path],
		props: Object.fromEntries(keys.map((k) => [k, typeof o[k]])),
		instance: o,
	}

	loadedStories.push(story)
}

// Display all components in a list with their respective stories
const asideDiv = document.querySelector('aside') as HTMLElement
loadedStories.forEach((file) => {
	asideDiv.innerHTML += `<h3>${file.name}</h3>`
	Object.keys(file.stories).forEach((storyName) => {
		asideDiv.innerHTML += `<a href="/${file.name}/${storyName}">${storyName}</a>`
	})
})

// Function to handle link clicks and page loads. Loads the story from route and renders it.
function renderStory(event?: Event) {
	try {
		// Stop default full page load
		event?.preventDefault()
		// Set title and route, if event was triggered by link
		if (event?.target) history.pushState({}, '', (event.target as HTMLAnchorElement).href)

		// Extract component and story name from path
		const [_, componentName, storyName] = location.pathname.split('/')
		// If invalid route, return
		if (!componentName || !storyName) throw Error('Invalid route')

		// Find component and story
		const component = loadedStories.find((s) => s.name === componentName)
		if (!component) throw Error('Component not found')
		const story = component.stories[storyName]
		if (!story) throw Error('Story not found')

		// Render story inside preview div
		render(story(), document.body.querySelector('.preview') as HTMLElement)

		// Render controls
		const controlsDiv = document.querySelector('.controls .placeholder') as HTMLElement
		controlsDiv.innerHTML = ''
		const el = document.querySelector('.preview > *') as any
		// Display a control element for each prop of the component
		Object.entries(component.props).forEach(([propName, propValue]) => {
			controlsDiv.innerHTML += `<label for="${propName}">${propName}</label>`
			if (propValue === 'string') {
				controlsDiv.innerHTML += `<input type="text" id="${propName}" value="${el[propName]}" />`
			} else if (propValue === 'number') {
				controlsDiv.innerHTML += `<input type="number" id="${propName}" value="${el[propName]}" />`
			} else if (propValue === 'boolean') {
				controlsDiv.innerHTML += `<input type="checkbox" id="${propName}" ${el[propName] ? 'checked' : ''} value="" />`
			} else if (propValue === 'object') {
				controlsDiv.innerHTML += `<textarea id="${propName}" rows="3">${JSON.stringify(el[propName])}</textarea>`
			}
		})
		// Listen for changes in controls and update the component
		document.querySelectorAll('.controls input, .controls textarea').forEach((input) => {
			input.addEventListener('change', (e) => {
				const eventEl = e.target as HTMLInputElement
				el[eventEl.id] = eventEl.value || eventEl.checked
			})
		})
	} catch (error) {
		console.error(error)
		render(`${error}`, document.querySelector('.preview') as HTMLElement)
	}
}

// Handle route load and change
window.addEventListener('load', () => renderStory())
document.querySelectorAll('aside a').forEach((a) => {
	a.addEventListener('click', renderStory)
})
