// Inspired by https://web.dev/patterns/web-apps/share/
class WebcareWebshare extends HTMLElement {
	static tagName = "webcare-webshare";

	static register(tagName, registry) {
		if(!registry && ("customElements" in globalThis)) {
			registry = globalThis.customElements;
		}

		registry?.define(tagName || this.tagName, this);
	}

	static attr = {
		labelAfterCopied: "label-after-copy",
		text: "share-text",
		url: "share-url",
	}

	get text() {
		return this.getAttribute(WebcareWebshare.attr.text) || document.title;
	}

	get url() {
		if(this.hasAttribute(WebcareWebshare.attr.url)) {
			return this.getAttribute(WebcareWebshare.attr.url);
		}

		let canonical = document.querySelector('link[rel="canonical"]');
  	return canonical?.href || location.href;
	}

	connectedCallback() {
		if(this.shadowRoot) {
			return;
		}

		let shadowroot = this.attachShadow({ mode: "open" });
		let slot = document.createElement("slot");
		shadowroot.appendChild(slot);

		this.button = this.querySelector("button");
		this.button?.removeAttribute("disabled");
		this.button?.addEventListener("click", () => {
			console.log( "hi" );
			this.share();
		});
	}

	async copyToClipboard() {
		if(!("clipboard" in navigator)) {
			return;
		}

		await navigator.clipboard.writeText(this.text);
		let newLabel = this.getAttribute(WebcareWebshare.attr.labelAfterCopied);
		if(this.button && newLabel) {
			this.button.textContent = newLabel;
		}
	}

	async share() {
		// Feature detection to see if the Web Share API is supported.
		if (!("share" in navigator)) {
			await this.copyToClipboard();
			return;
		}

		try {
			await navigator.share({
				url: this.url,
				text: this.text,
				title: this.text,
			});
			return;
		} catch (err) {
			// If the user cancels, an `AbortError` is thrown.
			if (err.name !== "AbortError") {
				console.error(err.name, err.message);
			}
		}
	}
}

WebcareWebshare.register();

export { WebcareWebshare }
