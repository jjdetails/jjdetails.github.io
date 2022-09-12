function render(accinfo) {
	const main = document.getElementById('main')

	let content = `
		<div class='info-head'>
			<span class="info-header">Level: <span>${accinfo.profile.Level}</span></span>
			<span class="info-header">Created: <span>${accinfo.profile.Created}</span></span>
			<span class="info-header">Progress: <span>${accinfo.profile.Progress}</span></span>
			<span class="detail-header">
				<span><i class='tle flowers'></i><jj-number>${accinfo.profile.Flowers}</jj-number></span>
				<span><i class='tle stars'></i><jj-number>${accinfo.profile.Stars}</jj-number></span>
				<span><i class='tle energy'></i><jj-number>${accinfo.currency.Energy}</jj-number></span>
			</span>
		</div>
		<div class="info-grid">
			<div class="info-category">
				<div class="category-title">General</div>
				<span><i class='tle coins'></i><jj-number>${accinfo.currency.Coins}</jj-number></span>
				<span><i class='tle diamonds'></i><jj-number>${accinfo.currency.Diamonds}</jj-number></span>
				<span><i class='tle gold'></i><jj-number>${accinfo.currency.Gold}</jj-number></span>
				<span><i class='tle tips'></i><jj-number>${accinfo.currency.Tips}</jj-number></span>
				<span><i class='tle compasses'></i><jj-number>${accinfo.currency.Compass}</jj-number></span>
				<span><i class='tle starbooster'></i><jj-number>${accinfo.currency["Star Booster"]}</jj-number></span>
				
				<span><i class='tle starbox'></i><jj-number>${accinfo.chests["Star Box"]}</jj-number></span>
				<span><i class='tle masterybox'></i><jj-number>${accinfo.chests["5-Star Box"]}</jj-number></span>
			</div>

			<div class="info-category">
				<div class="category-title">Memoirs</div>
				<span><i class='tle pack1'></i><jj-number>${accinfo.packs["1-Star pack"]}</jj-number></span>
				<span><i class='tle pack2'></i><jj-number>${accinfo.packs["2-Star pack"]}</jj-number></span>
				<span><i class='tle pack3'></i><jj-number>${accinfo.packs["3-Star pack"]}</jj-number></span>
				<span><i class='tle pack4'></i><jj-number>${accinfo.packs["4-Star pack"]}</jj-number></span>
				<span><i class='tle pack5'></i><jj-number>${accinfo.packs["5-Star pack"]}</jj-number></span>
				<span><i class='tle mysterypiece'></i><jj-number>${accinfo.packs.Flashback}</jj-number></span>
				<span><i class='tle wildcard'></i><jj-number>${accinfo.packs.Reminder}</jj-number></span>
				<span><i class='tle dejavu'></i><jj-number>${accinfo.currency["Déjà Vu Tokens"]}</jj-number></span>
			</div>
			
			<div class="info-category">
				<div class="category-title">Materials</div>
				<span><i class='tle wood'></i><jj-number>${accinfo.materials.Wood}</jj-number></span>
				<span><i class='tle hammer'></i><jj-number>${accinfo.materials.Hammer}</jj-number></span>
				<span><i class='tle brick'></i><jj-number>${accinfo.materials.Brick}</jj-number></span>
				
				<span><i class='tle paint'></i><jj-number>${accinfo.materials.Paint}</jj-number></span>
				
				<span><i class='tle glass'></i><jj-number>${accinfo.materials.Glass}</jj-number></span>
				<span><i class='tle terracotta'></i><jj-number>${accinfo.materials.Terracotta}</jj-number></span>
				<span><i class='tle copper'></i><jj-number>${accinfo.materials.Copper}</jj-number></span>
				<span><i class='tle porcelain'></i><jj-number>${accinfo.materials.Porcelain}</jj-number></span>
				<span><i class='tle marble'></i><jj-number>${accinfo.materials.Marble}</jj-number></span>
			</div>
			
	`
	if (accinfo.beauty.length > 0) {
		content += "<div class=\"info-list\">"
		content += "<div class=\"category-title\">Beautifications</div>"
		
		for (let b of accinfo.beauty) {
			content += `<span>${b}</span>`
		}
		
		content += "</div>" // end category
	}

	if (accinfo.avatars.length > 0) {
		content += "<div class=\"info-list img-list\">"
		content += "<div class=\"category-title\">Avatars</div>"
		
		for (let b of accinfo.avatars) {
			content += `<span><img class="avatar-img" src="avatars/${b}.webp"></span>`
		}
		
		content += "</div>" // end category
	}

	if (accinfo.drinks.length > 0) {
		content += "<div class=\"info-list img-list\">"
		content += "<div class=\"category-title\">Drinks</div>"
		
		for (let b of accinfo.drinks) {
			content += `<span><img class="drink-img" src="drinks/${b}.webp"></span>`
		}
		
		content += "</div>" // end category
	}

	content += "<div class=\"info-table\">"
	content += "<div class=\"category-title\">Items</div>"

	for (let item of accinfo.items) {
		content += `<span>
			<span class='item-img'><img src="items/${item.id}.webp" loading="lazy"></span>
			<span class='item-details'><span>${item.n}</span><span>${item.a}</span></span>
		</span>`
	}

	content += "</div>" // end category

	content += "</div>" // end of info grid

	main.innerHTML = content	
}

if (document.location.hash != "") {
	if (document.location.hash.match(/^#[0-9a-f]{32}$/)) {
		let m = document.location.hash.replace("#", "")
		fetch(`accounts/${m}.json`)
		.then(r => r.json())
		.then(a => render(a))
		.catch(e => {
			/* error handling */
		})
	} else {
		/* default */
	}
}