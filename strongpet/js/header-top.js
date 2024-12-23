document.addEventListener('DOMContentLoaded', function () {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        const emailInput = loginModal.querySelector('input[type="email"]');
        loginModal.addEventListener('shown.bs.modal', () => {
            emailInput.focus();
        });
    }

    const rememberMeCheckbox = document.getElementById('rememberMe');
    if (rememberMeCheckbox) {
        rememberMeCheckbox.addEventListener('change', (event) => {
            if (event.target.checked) {
                console.log("로그인 상태 유지 활성화");
            } else {
                console.log("로그인 상태 유지 비활성화");
            }
        });
    }
});

function allcheck(){
    const agreeAll = document.getElementById('agreeAll');
    const agreeTerms = document.getElementById('agreeTerms');
    const agreePrivacy = document.getElementById('agreePrivacy');
    const agreeAge = document.getElementById('agreeAge');

    if (agreeAll.checked) {
        agreeTerms.checked = true;
        agreePrivacy.checked = true;
        agreeAge.checked = true;
    } else {
        agreeTerms.checked = false;
        agreePrivacy.checked = false;
        agreeAge.checked = false;
    }
}

function keywordSearch() {
    const inputbox = document.querySelector('#top-search-inputbox')
    console.log(inputbox.value)
    // <a href="search.html?category=&keyword="><span>전체상품</span></a>
    location.href=`search.html?category=&keyword=${inputbox.value}`
}
let users = JSON.parse(localStorage.getItem('users')) || [];

function joinBtn() {
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
    const confirmPassword = document.querySelectorAll('input[type="password"]')[1].value;
    const name = document.querySelector('input[type="name"]').value;
    const phoneNum = document.querySelector('input[type="phoneNum"]').value;
    const address = document.querySelector('input[placeholder="주소"]').value;
    const detailAddress = document.querySelector('input[placeholder="상세주소"]').value;

    const user = {
        email: email,
        password: password,
        name: name,
        phoneNum: phoneNum,
        address: address,
        detailAddress: detailAddress,
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    document.querySelector('form').reset();
    alert("가입완료!");
}

function loginBtn() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const email = document.querySelector('input[placeholder="이메일"]').value;
    const password = document.querySelector('input[placeholder="비밀번호"]').value;

    let userFound = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            userFound = users[i];
            alert("로그인 성공!");
            localStorage.setItem('loggedInUser', JSON.stringify(userFound));
            updateAuthButtons(userFound);
            break;
        }
    }

    if (!userFound) {
        alert("이메일 또는 비밀번호가 잘못되었습니다.");
    }
}

function updateAuthButtons(user) {
    const authButtons = document.getElementById('auth-buttons');
    if (!authButtons) {
        return;
    }
    

    if (user) {
        authButtons.innerHTML = `
            <span>${user.name}님 환영합니다!</span>
            <button id="logout-btn" class="btn btn-danger">로그아웃</button>
        `;

        const logoutBtn = document.getElementById('logout-btn');
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            alert("로그아웃되었습니다.");
            updateAuthButtons(null); 
        });
    } else {
        
        authButtons.innerHTML = `
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
                로그인
            </button>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#registerModal">
                회원가입
            </button>
            <button>장바구니</button>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    updateAuthButtons(loggedInUser);
});