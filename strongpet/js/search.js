// 한줄에 몇개씩 출력할건지 (이건 수정시 css 랑 연관되어있음...)
const displayLineCount = 6

function getParameter(urlStr, key) {
    const url = new URL(urlStr);
    const urlParams = url.searchParams;

    return urlParams.get(key);
}

function generateLiTag(thumbnail, thumbnailOver, name, price) {
    let liTag = `
        <li class="show-box">
            <img src="${thumbnail}" class="show-box-img" onmouseover="this.src='${thumbnailOver}'" onmouseout="this.src='${thumbnail}'">
            <span class="f-size12">${name}</span>
            <br />
            <span class="f-bold f-size12">${price}원</span>
        </li>
    `
    return liTag
}

function search(category, keyword) {
    const 전체상품목록 = JSON.parse(localStorage.getItem('stock'))

    let searchGoods = []
    if (category) {
        for (item of 전체상품목록) {
            if (item.category == category) {
                searchGoods.push(item)
            }
        }
        // console.log(searchGoods)
        return searchGoods
    }
    else if (keyword) {
        for (item of 전체상품목록) {
            if (item.name.indexOf(keyword) > -1) {
                searchGoods.push(item)
            }
        }
        return searchGoods
    }

    return 전체상품목록 // 다 없으면 전체상품 리턴한다.
}

function loadSearchHTML() {
    const urlStr = window.location.href
    const category = getParameter(urlStr, 'category')
    const keyword = getParameter(urlStr, 'keyword')

    // 검색된 상품 배열
    const searchGoods = search(category, keyword)

    // HTML 요소
    const searchMain = document.querySelector('#search-main')

    let count = 0
    let html = ''
    for (let i = 0; i < parseInt(searchGoods.length / displayLineCount); i++) {
        html += '<ul class="show-line">'
        for (let j = 0; j < displayLineCount; j++, count++) {
            html += generateLiTag(searchGoods[count].thumbnail[0], searchGoods[count].thumbnail[1], searchGoods[count].name, searchGoods[count].price)
        }
        html += '</ul>'
    }
    if (count < searchGoods.length) {
        html += '<ul class="show-line">'
        for (; count < searchGoods.length; count++) {
            html += generateLiTag(searchGoods[count].thumbnail[0], searchGoods[count].thumbnail[1], searchGoods[count].name, searchGoods[count].price)
        }
        html += '</ul>'
    }
    searchMain.innerHTML = html
}