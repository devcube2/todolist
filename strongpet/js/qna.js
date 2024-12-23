
document.addEventListener('DOMContentLoaded', function () {
    // DOMContentLoaded 이벤트: HTML 문서가 완전히 로드되고 파싱되면 실행
    // 페이지 초기화 로직을 여기에 작성
    
    // >> 자물쇠 active 구현 <<
    let secret = document.querySelector('.secret'); // 비밀글 토글 버튼의 부모 요소
    let secretBox = secret.querySelector('.secret_box'); // 비밀글 여부를 표시하는 툴팁 박스

    // 비밀글 클릭 시 active 상태 토글
    secret.addEventListener('click', function (e) {
        e.preventDefault(); // 기본 동작(a 태그 링크 이동) 방지
        let isActive = secretBox.style.display === 'block'; // 현재 표시 상태 확인
        secretBox.style.display = isActive ? 'none' : 'block'; // 상태 토글
    });

    // >> 카테고리 드롭다운 구현 <<
    let category = document.querySelector('.category'); // 카테고리 선택 영역
    let dropdown = category.querySelector('ul'); // 드롭다운 메뉴
    let categoryButton = category.querySelector('a'); // 드롭다운을 열고 닫는 버튼

    // 카테고리 버튼 클릭 시 드롭다운 열기/닫기
    categoryButton.addEventListener('click', function (e) {
        e.preventDefault(); // 기본 동작(a 태그 링크 이동) 방지
        let isDropdownVisible = dropdown.style.display === 'block'; // 현재 드롭다운 표시 상태 확인
        dropdown.style.display = isDropdownVisible ? 'none' : 'block'; // 드롭다운 상태 토글
    });

    // 드롭다운 내부 항목 클릭 이벤트
    dropdown.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') { // 클릭한 요소가 <a> 태그인지 확인
            e.preventDefault(); 
            
            // 선택된 항목의 텍스트 및 클래스 정보 가져오기
            let selectedText = e.target.textContent.trim(); // 항목 텍스트
            let selectedClass = e.target.className; // 항목 클래스 (색상 관련)

            // 카테고리 버튼에 선택한 텍스트와 색상 반영
            categoryButton.textContent = selectedText; 
            categoryButton.className = `category-button ${selectedClass}`; // 기존 버튼에 클래스 추가

            // 드롭다운 닫기
            dropdown.style.display = 'none';

            // 드롭다운 내 모든 항목의 'selected' 클래스 초기화
            dropdown.querySelectorAll('li').forEach(li => li.classList.remove('selected'));

            // 현재 선택한 항목에 'selected' 클래스 추가
            e.target.parentElement.classList.add('selected');
        }
    });
});

// >> 글 작성 후 등록 <<
function register() {
    // 작성자 이름, 비밀번호, 제목, 내용, 카테고리 값 가져오기
    let name = document.querySelector('.q_b_name').value; // 작성자 이름
    let password = document.querySelector('.q_b_password').value; // 비밀번호
    let title = document.querySelector('.q_b_title').value; // 제목
    let content = document.querySelector('.q_b_content').value; // 내용
    let category = document.querySelector('.category > a').textContent; // 선택된 카테고리

    // 현재 날짜 생성
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear(); // 연도
    let nowMonth = nowDate.getMonth() + 1; // 월 (0부터 시작하므로 1을 더함)
    let nowDay = nowDate.getDate(); // 일
    let date = `${nowYear}-${nowMonth}-${nowDay}`; // YYYY-MM-DD 형식으로 날짜 생성

    // 필수 요소 체크 (값이 비어 있거나, 기본 카테고리 텍스트인 '카테고리'인 경우)
    if (category === '카테고리' || category.trim() === '') {
        alert("카테고리를 선택해주세요.");
        return;
    }
    if (!name || !password || !title || !content || category === '카테고리') {
        alert("모든 요소를 입력해주세요."); // 경고 메시지 표시
        return; // 함수 종료
    }

    // 로컬 스토리지에서 기존 게시글 리스트 가져오기
    let boardList = getBoardList();

    // 새로운 게시글 번호 생성 (리스트가 비어 있으면 1, 아니면 마지막 번호 + 1)
    let bno = boardList.length !== 0 ? boardList[boardList.length - 1].bno + 1 : 1;

    // 새로운 게시글 객체 생성
    let board = {
        bno: bno, // 게시글 번호
        name: name, // 작성자 이름
        password: password, // 비밀번호
        title: title, // 제목
        content: content, // 내용
        category: category, // 선택된 카테고리
        date: date // 작성 날짜
    };

    // 새 게시글을 리스트에 추가
    boardList.push(board);

    // 로컬 스토리지에 업데이트된 리스트 저장
    setBoardList(boardList);

    alert("글이 등록되었습니다."); // 성공 메시지 표시
    location.href = 'board.html'; // 게시판 페이지로 이동
}


// 구현하지 못한 것
// 카테고리 눌렀을 때 선택된 카테고리 왼쪽에 check 이미지가 나와야 하는데 못함