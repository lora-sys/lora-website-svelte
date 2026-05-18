/**
 * Svelte action: teleport an element to a target (default: document.body).
 * Escape ancestor containing blocks (e.g. backdrop-filter).
 */
export function portal(node: HTMLElement, target: HTMLElement | string = document.body) {
		let targetEl: HTMLElement;

		function update(newTarget: HTMLElement | string) {
			if (typeof newTarget === 'string') {
				targetEl = document.querySelector(newTarget) ?? document.body;
			} else {
				targetEl = newTarget ?? document.body;
			}
			targetEl.appendChild(node);
		}

		update(target);

		return {
			update,
			destroy() {
				node.parentNode?.removeChild(node);
			}
		};
	}
