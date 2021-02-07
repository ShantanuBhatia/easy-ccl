const { JSDOM } = require('jsdom')

// helper function, needed because when scraping the page, we get color values in RGB

const rgb2hex = rgb => '#' + rgb.substr(4, rgb.indexOf(')') - 4).split(',').map((color) => parseInt(color).toString(16) == "0"? "00" : parseInt(color).toString(16)).join('');

const getSongMetadata = (pageData) => {
    const dom = new JSDOM(pageData);

    const doc = dom.window.document

    const artistAndTitle = doc.querySelector("header.entry-header h1.entry-title").innerHTML.split(" – ");
    const idolListTable = doc.querySelector("div.entry-content table tbody");
    const idollistSpans = idolListTable.querySelectorAll("tr")[1].querySelectorAll("td")[0].querySelectorAll("span");

    const idolListObjects = Array.from(idollistSpans).map(val=>{
        return ({
            "idolName": val.innerHTML,
            "color": rgb2hex(val.style.color)
        })
    })

    console.log(idolListObjects)

    return {
        artist: artistAndTitle[0],
        title: artistAndTitle[1],
        idols: idolListObjects
    }
}

module.exports = {
    getSongMetadata: getSongMetadata
}