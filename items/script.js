const main = document.getElementById('main')

let content = "<div class=\"info-grid\">"

content += "<div class=\"info-table\">"
content += "<div class=\"category-title\">Items</div>"

for (let item of ITEMS) {
	content += `<span>
		<span class='item-img'><img src="/items/${item.id}.webp" loading="lazy"></span>
		<span class='item-details'><span>${item.n}</span><span></span></span>
	</span>`
}

content += "</div>" // end category

content += "</div>" // end of info grid

main.innerHTML = content	