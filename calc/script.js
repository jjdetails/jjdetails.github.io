(()=>{
const main = document.getElementById('main')

const locales = {"#ar": "ar-SA", "#sa": "ar-SA", "#ar-SA": "ar-SA", "#da": "da-DK", "#dk": "da-DK", "#da-DK": "da-DK", "#de": "de-DE", "#de-DE": "de-DE", "#en": "en-US", "#us": "en-US", "#en-US": "en-US", "#es": "es-ES", "#es-ES": "es-ES", "#mx": "es-MX", "#es-MX": "es-MX", "#fr": "fr-FR", "#fr-FR": "fr-FR", "#id": "id-ID", "#id-ID": "id-ID", "#it": "it-IT", "#it-IT": "it-IT", "#ja": "ja-JP", "#jp": "ja-JP", "#ja-JP": "ja-JP", "#ko": "ko-KR", "#kr": "ko-KR", "#ko-KR": "ko-KR", "#nl": "nl-NL", "#nl-NL": "nl-NL", "#no": "no-NO", "#no-NO": "no-NO", "#pl": "pl-PL", "#pl-PL": "pl-PL", "#pt": "pt-BR", "#br": "pt-BR", "#pt-BR": "pt-BR", "#ru": "ru-RU", "#ru-RU": "ru-RU", "#sv": "sv-SE", "#se": "sv-SE", "#sv-SE": "sv-SE", "#tr": "tr-TR", "#tr-TR": "tr-TR", "#zh": "zh-CN", "#cn": "zh-CN", "#zh-CN": "zh-CN", "#tw": "zh-TW", "#zh-TW": "zh-TW"}

const loc = locales[location.hash]
const src = `../locale/${loc ? loc : 'en-US'}.js` 
let scr = document.createElement("script");
scr.src = src
scr.type = "text/javascript"
scr.charset = "UTF-8"

document.body.appendChild(scr);

let content = `<div class="info-grid">
	<div class="info-category">
		<div class="category-title">Calculator</div>
		<div>
			<span><span><i class='tle'></i>Level</span><input id="lv-current" type="number"></input></span>
			<span><span><i class='tle flowers'></i>to next</span><input id="lv-req" type="number"></input></span>
			<span><span><i class='tle flowers'></i>to gain</span><input id="lv-gain" type="number"></input></span>
			<span><span><i class='tle'></i>Final Level</span><input id="lv-result" type="number" disabled></input></span>
		</div>
	</div>
</div>`
main.innerHTML = content
const cur = document.getElementById('lv-current')
const req = document.getElementById('lv-req')
const gain = document.getElementById('lv-gain')
const res = document.getElementById('lv-result')
res.value = 1

function findLevel(flowers) {
	let reach = 0
	for (let lv in LEVELS) {
		if (LEVELS[lv] <= flowers) {
			reach = lv
		} else {
			break
		}
	}
	return parseInt(reach)
}

function updateResult() {
	let _cur = parseInt(cur.value)
	let next = LEVELS[_cur + 1]
	if (next == undefined) {
		res.innerText = _cur || 1
	} else {
		let diff = parseInt(req.value)
		let inc = parseInt(gain.value)
		let reach = findLevel(next - diff + inc)
		res.value = reach > _cur ? reach : _cur
	}
}

cur.onchange = updateResult
req.onchange = updateResult
gain.onchange = updateResult
})()