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
		text: "share-text",
		url: "share-url",
		copyContent: "copy-text", // optional, defaults to url
		labelCopy: "label-copy",
		labelAfterCopied: "label-after-copy",
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

	get copyLabel() {
		return this.getAttribute(WebcareWebshare.attr.labelAfterCopied) || "Copied.";
	}

	get copyContent() {
		return this.getAttribute(WebcareWebshare.attr.copyContent) || this.url;
	}

	canShare() {
		return "share" in navigator;
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
		let copyLabel = this.getAttribute(WebcareWebshare.attr.labelCopy);
		if(this.button && !this.canShare() && copyLabel) {
			this.button.innerText = copyLabel;
		}
		this.button?.addEventListener("click", () => {
			this.share();
		});
	}

	async copyToClipboard() {
		if(!("clipboard" in navigator)) {
			return;
		}

		await navigator.clipboard.writeText(this.copyContent);

		if(this.button) {
			this.button.textContent = this.copyLabel;
		}
	}

	async share() {
		// Feature detection to see if the Web Share API is supported.
		if (!this.canShare()) {
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
