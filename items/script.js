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
content += "<div class=\"grid-header\">"
content += "<div class=\"category-title\">"
content += "</div>"
content += "<div class=\"category-buttons\"></div>"
content += "<div class=\"category-tabs\">"
content += "</div>"
content += "</div>"
content += "<div class=\"grid-header-bg\"></div>"
content += "<div class=\"info-table\">"

scr.onload = () => {
	let table = document.querySelector('div.info-table')

	let title = document.querySelector('div.category-title')
	
	let sortbuttons = document.querySelector('div.category-buttons')
	

	let _tspan = document.createElement("span")
	_tspan.innerText = TEXTS["text.deco"]
	title.append(_tspan)

	function createItem(item) {
		let cls = "item-name"
		if (item.wip) { cls += " wip" }
		cls = 'class="' + cls + '"'
		let n = TEXTS[item.n]
		if (!n) n = item.n
		let sz = `${item.s}x${item.s}`
		let itm = document.createElement('span')
		itm.innerHTML = `<span class='item-img'><img src="${item.id}.webp" loading="lazy"></span>
			<span class='item-details'><span ${cls}>${n}</span><span class="item-info"><span><i class="tle tiles"></i><span>${sz}</span></span><span><i class="tle flowers"></i><span>${item.f}</span></span></span></span>`
			
		itm.name = n.toLowerCase()
		itm.itemid = item.id
		itm.flowers = item.f
		itm.tags = item.tags
			
		return itm
	}
	
	var items = []
	for (let item of ITEMS) {
		let itm = createItem(item)
		table.appendChild(itm)
		items.push(itm)
	}
	table.sortmode = "id"
	table.sortdir = 1
	function sortTable(sid, f) {
		if (table.sortmode == sid) {
			table.sortdir *= -1
		} else {
			table.sortmode = sid
			table.sortdir = 1
		}
		items.sort((a,b) => table.sortdir * f(a,b))
		table.innerHTML = ""
		for (let itm of items) {
			table.appendChild(itm)
		}
	}
	
	let conts = {
		"ab": {
			"n": "<span>Az</span>",
			"f": (a,b) => a.name < b.name ? -1 : +(a.name > b.name)
		},
		"id": {
			"n": "<span>ID</span>",
			"f": (a,b) => a.itemid - b.itemid
		},
		"fl": {
			"n": "<i class=\"tle flowers\"></i>",
			"f": (a,b) => a.flowers - b.flowers
		},
	}
	
	for (let _sid in conts) {
		let x = conts[_sid]
		let b = document.createElement("div")
		b.classList.add("button")
		b.innerHTML = x.n
		sortbuttons.appendChild(b)
		b.addEventListener("click", () => sortTable(_sid, x.f))
	}

	const modal = document.createElement("div")
	modal.classList.add("modal")
	
	let span = document.createElement("span")
	span.innerHTML = "&times;"
	span.classList.add("modal-close")

	const modal_img = document.createElement("img")
	modal_img.classList.add("modal-img")
	
	const modal_caption_cont = document.createElement("div")
	modal_caption_cont.classList.add("modal-caption")
	
	const modal_caption = {
		'title': document.createElement("span"),
		'itemid': document.createElement("span")
	}
	modal_caption_cont.appendChild(modal_caption.title)
	modal_caption_cont.appendChild(modal_caption.itemid)
	modal_caption.title.classList.add("modal-title")
	modal_caption.itemid.classList.add("modal-itemid")
	
	modal.appendChild(span)
	modal.appendChild(modal_img)
	modal.appendChild(modal_caption_cont)
	
	document.body.appendChild(modal)
	
	let images = table.getElementsByTagName('img')
	
	function openModal() {
		modal.style.display = "block";
		modal_img.src = this.src;
		const pp = this.parentNode.parentNode
		modal_caption.title.innerText = pp.lastElementChild.firstChild.innerText
		modal_caption.itemid.innerText = pp.itemid
	}
	
	for (let img of images) {
		img.onclick = openModal
	}
	
	modal.style.display = "none";
	span.onclick = modal.onclick = function(evt) {
		if (evt.target == this)
			modal.style.display = "none";
	}

	// TODO: search tags
	const search = document.createElement('input')

	search.placeholder = `${TEXTS["text.search"]}...`
	search.id = 'itemsearch'
	search.type = 'text'
	
	title.append(search)
	
	search.addEventListener("input", function() {
		let filter = this.value.toLowerCase()
		for (let item of items) {
			if (item.name.indexOf(filter) > -1 || item.itemid == filter || item.tags?.includes(filter)) {
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