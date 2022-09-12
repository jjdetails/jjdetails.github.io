(() => {
	class TimestampSpan extends HTMLElement {
		constructor() { super(); }
		connectedCallback() {
			let ts = this.getAttribute('ts')
			if (ts != undefined) {
				ts = Number(ts) * 1000
				this.date = new Date(ts)
				this.innerText = this.date.toLocaleString()
			}
		}
	}
	class NumberSpan extends HTMLElement {
		constructor() { super(); }
		connectedCallback() {
			setTimeout( () => {
				let num = this.innerText
				if (num != "") {
					num = Number(num)
					if (!isNaN(num)) {
						this.innerText =  num.toLocaleString()
						return
					}
				}
				this.innerText = "0"
			})
		}
	}
	customElements.define('jj-time', TimestampSpan);
	customElements.define('jj-number', NumberSpan);
})();