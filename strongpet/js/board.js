
// 기본 게시글 출력
output();

function output(filteredBoardList = null, page = 1) {
    let boardList = filteredBoardList || getBoardList(); // 필터링된 리스트가 있으면 사용, 없으면 전체 게시글
    let postsPerPage = 10; // 한 페이지당 게시물 수
    let start = (page - 1) * postsPerPage; // 현재 페이지의 시작 인덱스
    let end = start + postsPerPage; // 현재 페이지의 끝 인덱스

    let tbody = document.querySelector('table > tbody');
    let html = '';

    // 최신 게시글이 위로 출력되도록 정렬 (게시글 번호를 기준으로 내림차순)
    boardList.sort((a, b) => b.bno - a.bno);

    // 현재 페이지에 해당하는 게시글만 추출
    let paginatedList = boardList.slice(start, end);

    for (let board of paginatedList) {
        html += `
            <tr>
                <td>${board.bno}</td>
                <td><a class="${getCategoryColor(board.category)}" href="#">${board.category}</a></td>
                <td class="tbody_img title"><a href="#">${board.title}</a></td>
                <td>${board.name}</td>
                <td>${board.date}</td>
            </tr>`;
    }
    tbody.innerHTML = html;

    // 페이지네이션 업데이트
    createPagination(boardList.length, page);
}

// 카테고리 드롭다운 토글
document.addEventListener('click', function (e) {
    let dropdownMenu = document.getElementById('dropdownMenu'); // 드롭다운 메뉴 요소
    let categoryDropdown = document.getElementById('categoryDropdown'); // 드롭다운 버튼 요소

    // 드롭다운 버튼을 클릭하면 토글
    if (categoryDropdown.contains(e.target)) {
        dropdownMenu.classList.toggle('hidden'); // hidden 클래스를 추가/제거하여 메뉴를 표시/숨김
    } 
    // 드롭다운 외부를 클릭하면 닫기
    else if (!dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.add('hidden'); // hidden 클래스를 추가하여 메뉴를 숨김
    }
});

// 드롭다운 항목 클릭 시 카테고리 필터링
document.querySelectorAll('#dropdownMenu li a').forEach((item) => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        let selectedCategory = e.target.textContent.trim(); // 클릭한 카테고리 이름
        let boardList = getBoardList(); // 전체 게시글 리스트

        // 드롭다운 버튼에 선택된 카테고리의 색상 적용
        document.getElementById('categoryDropdown').className = `category-button ${e.target.className}`;

        if (selectedCategory === '전체보기') {
            output(); // 전체 게시글 출력
        } else {
            let filteredList = boardList.filter((board) => board.category === selectedCategory); // 선택된 카테고리의 게시글만 필터링
            output(filteredList);
        }

        // 드롭다운 메뉴 숨기기
        document.getElementById('dropdownMenu').classList.add('hidden');
    });
});

// tbody 안의 카테고리 클릭 시 해당 카테고리 필터링
document.querySelector('table > tbody').addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && e.target.closest('td')) {
        e.preventDefault();
        let selectedCategory = e.target.textContent.trim(); // 클릭한 카테고리 이름
        let boardList = getBoardList(); // 전체 게시글 리스트
        let filteredList = boardList.filter((board) => board.category === selectedCategory); // 선택된 카테고리의 게시글만 필터링
        output(filteredList);
    }
});

// 제목 클릭 시 권한 확인 메시지 출력
document.addEventListener('click', function (e) {
    if (e.target.closest('.title')) {
        e.preventDefault();
        alert('권한이 없습니다.');
        output(); // 기존 게시글 리스트 다시 렌더링
    }
});

// 검색 기능 (제목을 기준으로 검색)
document.querySelector('.search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let query = e.target.value.toLowerCase(); // 입력한 검색어 (소문자로 변환)
        let boardList = getBoardList(); // 전체 게시글 리스트
        let filteredList = boardList.filter(board => board.title.toLowerCase().includes(query)); // 제목에 검색어가 포함된 게시글 필터링
        output(filteredList); // 검색 결과 출력
    }
});

// 페이지네이션 생성 및 클릭 이벤트
function createPagination(totalPosts, currentPage) {
    let postsPerPage = 10; // 한 페이지당 게시물 수
    let totalPages = Math.ceil(totalPosts / postsPerPage); // 총 페이지 수 계산
    let pagination = document.querySelector('#b_function .b_f_bottom ul');
    let html = `<a class="left" href="#">&lt;</a>`; // 이전 버튼

    for (let i = 1; i <= totalPages; i++) {
        html += `<li class="${i === currentPage ? 'f_active' : ''}"><a href="#">${i}</a></li>`; // 각 페이지 번호
    }
    html += `<a class="right" href="#">&gt;</a>`; // 다음 버튼
    pagination.innerHTML = html;

    // 페이지 번호 클릭 이벤트 등록
    document.querySelectorAll('#b_function .b_f_bottom ul li a').forEach((link, index) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            output(null, index + 1); // 클릭된 페이지 번호로 이동
        });
    });
}

// 카테고리별 색상 클래스 정의
function getCategoryColor(category) {
    if (category === '배송') return 'red';
    if (category === '기타') return 'green';
    if (category === '상품') return 'blue';
    if (category === '회원') return 'purple';
    return ''; // 정의되지 않은 카테고리일 경우 기본값
}
