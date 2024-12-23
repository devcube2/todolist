/* localStorage 에 상품목록 저장 */
function generateStock() {
    let 상품목록 = []

    const 상품1 = {
        no: 1,
        category: '과일-야채-치즈-노른자',
        name: '건강한펫 동결건조 꼬마양배추 35g',
        desc: [
            'img/main/과일-야채-치즈-노른자/동결건조꼬마양배추35g/content-1.webp',
            'img/main/과일-야채-치즈-노른자/동결건조꼬마양배추35g/content-2.webp',
            'img/main/과일-야채-치즈-노른자/동결건조꼬마양배추35g/content-3.webp',
            'img/main/과일-야채-치즈-노른자/동결건조꼬마양배추35g/content-4.webp',
            'img/main/과일-야채-치즈-노른자/동결건조꼬마양배추35g/content-5.webp',
            'img/main/과일-야채-치즈-노른자/동결건조꼬마양배추35g/content-6.webp'
        ],
        weekly: true,
        best: false,
        thumbnail: [
            'img/main/과일-야채-치즈-노른자/동결건조꼬마양배추35g/view-1.jpg',
            'img/main/과일-야채-치즈-노른자/동결건조꼬마양배추35g/view-2.jpg',
            'img/main/과일-야채-치즈-노른자/동결건조꼬마양배추35g/view-3.jpg'
        ],
        price: 12000,
        quantity: 10,
        star: 5
    }
    const 상품2 = {
        no: 2,
        category: '과일-야채-치즈-노른자',
        name: '건강한펫 동결건조 노른자 100g',
        desc: [
            'img/main/과일-야채-치즈-노른자/동결건조노른자100g/content-1.webp',
            'img/main/과일-야채-치즈-노른자/동결건조노른자100g/content-2.webp',
            'img/main/과일-야채-치즈-노른자/동결건조노른자100g/content-3.webp',
            'img/main/과일-야채-치즈-노른자/동결건조노른자100g/content-4.webp',
            'img/main/과일-야채-치즈-노른자/동결건조노른자100g/content-5.webp',
            'img/main/과일-야채-치즈-노른자/동결건조노른자100g/content-6.webp',
            'img/main/과일-야채-치즈-노른자/동결건조노른자100g/content-7.webp',
        ],
        weekly: true,
        best: false,
        thumbnail: [
            'img/main/과일-야채-치즈-노른자/동결건조노른자100g/view-1.jpg',
            'img/main/과일-야채-치즈-노른자/동결건조노른자100g/view-2.jpg',
        ],
        price: 12000,
        quantity: 10,
        star: 5
    }
    const 상품3 = {
        no: 3,
        category: '과일-야채-치즈-노른자',
        name: '건강한펫 동결건조 야채랑 과일이랑 60g',
        desc: [
            'img/main/과일-야채-치즈-노른자/동결건조야채랑과일이랑60g/content-1.webp',
            'img/main/과일-야채-치즈-노른자/동결건조야채랑과일이랑60g/content-2.webp',
            'img/main/과일-야채-치즈-노른자/동결건조야채랑과일이랑60g/content-3.webp',
            'img/main/과일-야채-치즈-노른자/동결건조야채랑과일이랑60g/content-4.webp',
            'img/main/과일-야채-치즈-노른자/동결건조야채랑과일이랑60g/content-5.webp',
            'img/main/과일-야채-치즈-노른자/동결건조야채랑과일이랑60g/content-6.webp',
            'img/main/과일-야채-치즈-노른자/동결건조야채랑과일이랑60g/content-7.webp',
            'img/main/과일-야채-치즈-노른자/동결건조야채랑과일이랑60g/content-8.webp',
            'img/main/과일-야채-치즈-노른자/동결건조야채랑과일이랑60g/content-9.webp'
        ],
        weekly: true,
        best: false,
        thumbnail: [
            'img/main/과일-야채-치즈-노른자/동결건조야채랑과일이랑60g/view-1.jpg',
            'img/main/과일-야채-치즈-노른자/동결건조야채랑과일이랑60g/view-2.jpg',
            'img/main/과일-야채-치즈-노른자/동결건조야채랑과일이랑60g/view-3.jpg',
            'img/main/과일-야채-치즈-노른자/동결건조야채랑과일이랑60g/view-4.jpg',
            'img/main/과일-야채-치즈-노른자/동결건조야채랑과일이랑60g/view-5.jpg',
            'img/main/과일-야채-치즈-노른자/동결건조야채랑과일이랑60g/view-6.jpg'
        ],
        price: 17000,
        quantity: 10,
        star: 5
    }
    const 상품4 = {
        no: 4,
        category: '과일-야채-치즈-노른자',
        name: '건강한펫 동결건조 풀떼기 밀싹,보리싹 2g',
        desc: [
            'img/main/과일-야채-치즈-노른자/동결건조풀떼기밀싹보리싹2g/content-1.webp',
            'img/main/과일-야채-치즈-노른자/동결건조풀떼기밀싹보리싹2g/content-2.webp',
            'img/main/과일-야채-치즈-노른자/동결건조풀떼기밀싹보리싹2g/content-3.webp',
            'img/main/과일-야채-치즈-노른자/동결건조풀떼기밀싹보리싹2g/content-4.webp',
            'img/main/과일-야채-치즈-노른자/동결건조풀떼기밀싹보리싹2g/content-5.webp',
            'img/main/과일-야채-치즈-노른자/동결건조풀떼기밀싹보리싹2g/content-6.webp',
            'img/main/과일-야채-치즈-노른자/동결건조풀떼기밀싹보리싹2g/content-7.webp'
        ],
        weekly: true,
        best: false,
        thumbnail: [
            'img/main/과일-야채-치즈-노른자/동결건조풀떼기밀싹보리싹2g/view-1.jpg',
            'img/main/과일-야채-치즈-노른자/동결건조풀떼기밀싹보리싹2g/view-2.jpg'
        ],
        price: 4000,
        quantity: 10,
        star: 5
    }
    const 상품5 = {
        no: 5,
        category: '꼬마트릿',
        name: '건강한펫 동결건조 꼬마가자미 대봉 160g',
        desc: [
            'img/main/꼬마트릿/동결건조꼬마가자미160g/content-1.webp',
            'img/main/꼬마트릿/동결건조꼬마가자미160g/content-2.webp',
            'img/main/꼬마트릿/동결건조꼬마가자미160g/content-3.webp',
            'img/main/꼬마트릿/동결건조꼬마가자미160g/content-4.webp',
            'img/main/꼬마트릿/동결건조꼬마가자미160g/content-5.webp',
            'img/main/꼬마트릿/동결건조꼬마가자미160g/content-6.webp',
            'img/main/꼬마트릿/동결건조꼬마가자미160g/content-7.webp',
            'img/main/꼬마트릿/동결건조꼬마가자미160g/content-8.webp',
            'img/main/꼬마트릿/동결건조꼬마가자미160g/content-9.webp',
            'img/main/꼬마트릿/동결건조꼬마가자미160g/content-10.webp'
        ],
        weekly: false,
        best: true,
        thumbnail: [
            'img/main/꼬마트릿/동결건조꼬마가자미160g/view-1.jpg',
            'img/main/꼬마트릿/동결건조꼬마가자미160g/view-2.jpg'
        ],
        price: 30000,
        quantity: 10,
        star: 5
    }
    const 상품6 = {
        no: 6,
        category: '꼬마트릿',
        name: '건강한펫 동결건조 리코타치즈 미니 3종',
        desc: [
            'img/main/꼬마트릿/동결건조리코타치즈미니3종/content-1.webp',
            'img/main/꼬마트릿/동결건조리코타치즈미니3종/content-2.webp',
            'img/main/꼬마트릿/동결건조리코타치즈미니3종/content-3.webp',
            'img/main/꼬마트릿/동결건조리코타치즈미니3종/content-4.webp',
            'img/main/꼬마트릿/동결건조리코타치즈미니3종/content-5.webp',
            'img/main/꼬마트릿/동결건조리코타치즈미니3종/content-6.webp'
        ],
        weekly: true,
        best: false,
        thumbnail: [
            'img/main/꼬마트릿/동결건조리코타치즈미니3종/view-1.jpg',
            'img/main/꼬마트릿/동결건조리코타치즈미니3종/view-2.jpg',
            'img/main/꼬마트릿/동결건조리코타치즈미니3종/view-3.jpg',
            'img/main/꼬마트릿/동결건조리코타치즈미니3종/view-4.jpg',
            'img/main/꼬마트릿/동결건조리코타치즈미니3종/view-5.jpg',
            'img/main/꼬마트릿/동결건조리코타치즈미니3종/view-6.jpg'
        ],
        price: 7000,
        quantity: 10,
        star: 5
    }
    const 상품7 = {
        no: 7,
        category: '우주최초츄르-파우더',
        name: '우주최초츄르',
        desc: [
            'img/main/우주최초츄르-파우더/우주최초츄르/content-1.webp',
            'img/main/우주최초츄르-파우더/우주최초츄르/content-2.webp',
            'img/main/우주최초츄르-파우더/우주최초츄르/content-3.webp',
            'img/main/우주최초츄르-파우더/우주최초츄르/content-4.webp',
            'img/main/우주최초츄르-파우더/우주최초츄르/content-5.webp',
            'img/main/우주최초츄르-파우더/우주최초츄르/content-6.webp'
        ],
        weekly: false,
        best: true,
        thumbnail: [
            'img/main/우주최초츄르-파우더/우주최초츄르/view-1.jpg',
            'img/main/우주최초츄르-파우더/우주최초츄르/view-2.jpg',
            'img/main/우주최초츄르-파우더/우주최초츄르/view-3.jpg'
        ],
        price: 3500,
        quantity: 10,
        star: 5
    }
    const 상품8 = {
        no: 8,
        category: '우주최초츄르-파우더',
        name: '동결건조 북어 파우더 100g',
        desc: [
            'img/main/우주최초츄르-파우더/동결건조북어파우더100g/content-1.webp',
            'img/main/우주최초츄르-파우더/동결건조북어파우더100g/content-2.webp',
            'img/main/우주최초츄르-파우더/동결건조북어파우더100g/content-3.webp',
            'img/main/우주최초츄르-파우더/동결건조북어파우더100g/content-4.webp',
            'img/main/우주최초츄르-파우더/동결건조북어파우더100g/content-5.webp',
            'img/main/우주최초츄르-파우더/동결건조북어파우더100g/content-6.webp',
            'img/main/우주최초츄르-파우더/동결건조북어파우더100g/content-7.webp'
        ],
        weekly: false,
        best: true,
        thumbnail: [
            'img/main/우주최초츄르-파우더/동결건조북어파우더100g/view-1.jpg',
            'img/main/우주최초츄르-파우더/동결건조북어파우더100g/view-2.jpg',
            'img/main/우주최초츄르-파우더/동결건조북어파우더100g/view-3.jpg'
        ],
        price: 8000,
        quantity: 10,
        star: 5
    }
    const 상품9 = {
        no: 9,
        category: '우주최초츄르-파우더',
        name: '동결건조 연어 파우더 100g',
        desc: [
            'img/main/우주최초츄르-파우더/동결건조연어파우더100g/content-1.webp',
            'img/main/우주최초츄르-파우더/동결건조연어파우더100g/content-2.webp',
            'img/main/우주최초츄르-파우더/동결건조연어파우더100g/content-3.webp',
            'img/main/우주최초츄르-파우더/동결건조연어파우더100g/content-4.webp',
            'img/main/우주최초츄르-파우더/동결건조연어파우더100g/content-5.webp',
            'img/main/우주최초츄르-파우더/동결건조연어파우더100g/content-6.webp',
            'img/main/우주최초츄르-파우더/동결건조연어파우더100g/content-7.webp'
        ],
        weekly: false,
        best: true,
        thumbnail: [
            'img/main/우주최초츄르-파우더/동결건조연어파우더100g/view-1.jpg',
            'img/main/우주최초츄르-파우더/동결건조연어파우더100g/view-2.jpg',
            'img/main/우주최초츄르-파우더/동결건조연어파우더100g/view-3.jpg'
        ],
        price: 8000,
        quantity: 10,
        star: 5
    }
    const 상품10 = {
        no: 10,
        category: '우주최초츄르-파우더',
        name: '동결건조 치킨 파우더 100g',
        desc: [
            'img/main/우주최초츄르-파우더/동결건조치킨파우더100g/content-1.webp',
            'img/main/우주최초츄르-파우더/동결건조치킨파우더100g/content-2.webp',
            'img/main/우주최초츄르-파우더/동결건조치킨파우더100g/content-3.webp',
            'img/main/우주최초츄르-파우더/동결건조치킨파우더100g/content-4.webp',
            'img/main/우주최초츄르-파우더/동결건조치킨파우더100g/content-5.webp',
            'img/main/우주최초츄르-파우더/동결건조치킨파우더100g/content-6.webp',
            'img/main/우주최초츄르-파우더/동결건조치킨파우더100g/content-7.webp'
        ],
        weekly: false,
        best: true,
        thumbnail: [
            'img/main/우주최초츄르-파우더/동결건조치킨파우더100g/view-1.jpg',
            'img/main/우주최초츄르-파우더/동결건조치킨파우더100g/view-2.jpg',
            'img/main/우주최초츄르-파우더/동결건조치킨파우더100g/view-3.jpg'
        ],
        price: 8000,
        quantity: 10,
        star: 5
    }

    상품목록.push(상품1);
    상품목록.push(상품2);
    상품목록.push(상품3);
    상품목록.push(상품4);
    상품목록.push(상품5);
    상품목록.push(상품6);
    상품목록.push(상품7);
    상품목록.push(상품8);
    상품목록.push(상품9);
    상품목록.push(상품10);

    localStorage.setItem('stock', JSON.stringify(상품목록))
}

// 한줄에 몇개씩 출력할건지 (이건 수정시 css 랑 연관되어있음...)
const displayLineCount = 5

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

function isWeeklyBest(item) {
    return item.weekly;
}

function isBest(item) {
    return item.best;
}

function loadHTML() {
    generateStock()

    const 상품목록 = JSON.parse(localStorage.getItem('stock'))
    const 주간베스트상품 = 상품목록.filter(isWeeklyBest)
    const 베스트상품 = 상품목록.filter(isBest)

    const weeklyGoods = document.querySelector('#weekly-best-goods')
    const bestGoods = document.querySelector('#best-goods')

    // 주간 베스트 상품
    let count = 0
    let html = '<p class="f-size24 f-bold top-bottom-pad15">WEEKLY BEST PRODUCT</p>'
    for (let i = 0; i < parseInt(주간베스트상품.length / displayLineCount); i++) {
        html += '<ul class="show-line">'
        for (let j = 0; j < displayLineCount; j++, count++) {
            html += generateLiTag(주간베스트상품[count].thumbnail[0], 주간베스트상품[count].thumbnail[1], 주간베스트상품[count].name, 주간베스트상품[count].price)
        }
        html += '</ul>'
    }
    if (count < 주간베스트상품.length) {
        html += '<ul class="show-line">'
        for (; count < 주간베스트상품.length; count++) {
            html += generateLiTag(주간베스트상품[count].thumbnail[0], 주간베스트상품[count].thumbnail[1], 주간베스트상품[count].name, 주간베스트상품[count].price)
        }
        html += '</ul>'
    }
    weeklyGoods.innerHTML = html

    // 베스트 상품
    count = 0
    html = '<p class="f-size24 f-bold top-bottom-pad15">BEST PRODUCT</p>'
    for (let i = 0; i < parseInt(베스트상품.length / displayLineCount); i++) {
        html += '<ul class="show-line">'
        for (let j = 0; j < displayLineCount; j++, count++) {
            html += generateLiTag(베스트상품[count].thumbnail[0], 베스트상품[count].thumbnail[1], 베스트상품[count].name, 베스트상품[count].price)
        }
        html += '</ul>'
    }
    if (count < 베스트상품.length) {
        html += '<ul class="show-line">'
        for (; count < 베스트상품.length; count++) {
            html += generateLiTag(베스트상품[count].thumbnail[0], 베스트상품[count].thumbnail[1], 베스트상품[count].name, 베스트상품[count].price)
        }
        html += '</ul>'
    }
    bestGoods.innerHTML = html
}

function search() {

}