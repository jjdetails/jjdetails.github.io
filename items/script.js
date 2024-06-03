(()=>{
const main = document.getElementById('main')

const locales = {"#ar": "ar-SA", "#sa": "ar-SA", "#ar-SA": "ar-SA", "#da": "da-DK", "#dk": "da-DK", "#da-DK": "da-DK", "#de": "de-DE", "#de-DE": "de-DE", "#en": "en-US", "#us": "en-US", "#en-US": "en-US", "#es": "es-ES", "#es-ES": "es-ES", "#mx": "es-MX", "#es-MX": "es-MX", "#fr": "fr-FR", "#fr-FR": "fr-FR", "#id": "id-ID", "#id-ID": "id-ID", "#it": "it-IT", "#it-IT": "it-IT", "#ja": "ja-JP", "#jp": "ja-JP", "#ja-JP": "ja-JP", "#ko": "ko-KR", "#kr": "ko-KR", "#ko-KR": "ko-KR", "#nl": "nl-NL", "#nl-NL": "nl-NL", "#no": "no-NO", "#no-NO": "no-NO", "#pl": "pl-PL", "#pl-PL": "pl-PL", "#pt": "pt-BR", "#br": "pt-BR", "#pt-BR": "pt-BR", "#ru": "ru-RU", "#ru-RU": "ru-RU", "#sv": "sv-SE", "#se": "sv-SE", "#sv-SE": "sv-SE", "#tr": "tr-TR", "#tr-TR": "tr-TR", "#zh": "zh-CN", "#cn": "zh-CN", "#zh-CN": "zh-CN", "#tw": "zh-TW", "#zh-TW": "zh-TW"}

const loc = locales[location.hash]
const src = `/locale/${loc ? loc : 'en-US'}.js` 
let scr = document.createElement("script");
scr.src = src
scr.type = "text/javascript"
scr.charset = "UTF-8"

document.body.appendChild(scr);

let content = "<div class=\"info-grid\">"
content += "<div class=\"category-title\">"
content += "</div>"
content += "<div class=\"category-title-bg\"></div>"
content += "<div class=\"info-table\">"

scr.onload = () => {
	let table = document.querySelector('div.info-table')

	let title = document.querySelector('div.category-title')
	
	let _tspan = document.createElement("span")
	_tspan.innerText = TEXTS["text.deco"]
	title.append(_tspan)

	let content = ""
	
	for (let item of ITEMS) {
		let cls = "item-name"
		if (item.wip) { cls += " wip" }
		cls = 'class="' + cls + '"'
		let n = TEXTS[item.n]
		if (!n) n = item.n
		let sz = `${item.s}x${item.s}`
		content += `<span>
			<span class='item-img'><img src="/items/${item.id}.webp" loading="lazy"></span>
			<span class='item-details'><span ${cls}>${n}</span><span class="item-info"><span><i class="tle tiles"></i><span>${sz}</span></span><span><i class="tle flowers"></i><span>${item.f}</span></span></span></span>
		</span>`
	}
	
	table.innerHTML = content

	const modal = document.createElement("div")
	modal.classList.add("modal")
	
	let span = document.createElement("span")
	span.innerHTML = "&times;"
	span.classList.add("modal-close")
	
	
	
	const modal_img = document.createElement("img")
	modal_img.classList.add("modal-img")
	
	const modal_caption = document.createElement("div")
	modal_caption.classList.add("modal-caption")
	
	modal.appendChild(span)
	modal.appendChild(modal_img)
	modal.appendChild(modal_caption)
	
	document.body.appendChild(modal)
	
	let images = table.getElementsByTagName('img')
	
	function openModal() {
		modal.style.display = "block";
		modal_img.src = this.src;
		modal_caption.innerText = this.parentNode.parentNode.lastElementChild.firstChild.innerText
	}
	
	for (let img of images) {
		img.onclick = openModal
	}
	
	modal.style.display = "none";
	span.onclick = modal.onclick = function(evt) {
		if (evt.target == this)
			modal.style.display = "none";
	}

	var items = undefined
	function setup_items() {
		items = table.querySelectorAll('.info-table>span')
		for (let item of items) {
			item.name = item.querySelector("span.item-name").innerText.toLowerCase();
		}
	}
	// TODO: search tags
	const search = document.createElement('input')

	search.placeholder = `${TEXTS["text.search"]}...`
	search.id = 'itemsearch'
	search.type = 'text'
	
	title.append(search)
	
	search.addEventListener("input", function() {
		if (!items) setup_items()
		let filter = this.value.toLowerCase()
		for (let item of items) {
			if (item.name.indexOf(filter) > -1) {
				item.style.display = "";
			} else {
				item.style.display = "none";
			}
		}
	});
}

content += "</div>" // end category
content += "</div>" // end of info grid
main.innerHTML = content
})()