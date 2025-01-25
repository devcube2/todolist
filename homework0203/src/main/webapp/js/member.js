// 멤버 전체 조회
const memberList = async () => {
	let tbody = document.querySelector('tbody');

	let html = '';
	const option = { method: 'GET' };

	try {
		const response = await fetch('/homework0203/member', option);
		const dtoList = await response.json();

		dtoList.forEach(dto => {
			html += `				
				<tr class="bd-bottom">
					<td class="pad5 bd-right"><a href="index.jsp?page=member_update_section.jsp&custno=${dto.custno}" class="color-white">${dto.custno}</a></td>
					<td class="pad5 bd-right">${dto.custname}</td>
					<td class="pad5 bd-right">${dto.phone}</td>
					<td class="pad5 bd-right">${dto.address}</td>
					<td class="pad5 bd-right">${dto.joindate}</td>
					<td class="pad5 bd-right">${dto.grade}</td>
					<td class="pad5 bd-right">${dto.city}</td>
				</tr>
			`;
		});
	} catch (error) {
		console.error('error:', error.message);
	}

	// 출력
	tbody.innerHTML = html;
}

// 멤버 한명 조회
const memberView = async () => {	
	try {		
		// 쿼리스트링 custno 값 가져오기
		const queryString = window.location.search;
		console.log('memberView...');
		console.log(queryString);
		const custno = new URLSearchParams(queryString).get('custno');
		console.log(custno);		
		
		// DB 안쓰고 쿼리스트링으로 다 받아버리면 되긴 하는데.. 이미 dao 까지 만들어서 그냥둠.. 뒤늦게 깨달음
		const option = { method: 'GET' };
		const response = await fetch(`/homework0203/member-view?custno=${custno}`, option);
		const dto = await response.json();
		
		let memberNumberElement = document.querySelector('#member-number');
		let memberNameElement = document.querySelector('#member-name');
		let memberPhoneElement = document.querySelector('#member-phone');
		let memberAddressElement = document.querySelector('#member-address');
		let memberJoinDateElement = document.querySelector('#member-join-date');
		let memberGradeElement = document.querySelector('#member-grade');
		let memberCityCodeElement = document.querySelector('#member-city-code');
		
		memberNumberElement.value = custno;
		memberNameElement.value = dto.custname;
		memberPhoneElement.value = dto.phone;
		memberAddressElement.value = dto.address;
		memberJoinDateElement.value = dto.joindate;
		memberGradeElement.value = dto.grade;
		memberCityCodeElement.value = dto.city;		
	} catch (error) {
		console.error('error:', error.message);
	}
}

const checkFutureDate = (memberJoinDate) => {
	const today = new Date();
	today.setHours(0, 0, 0, 0); // 시간 초기화하여 날짜만 비교

	// 입력된 날짜를 Date 객체로 변환
	const dateToCheck = new Date(memberJoinDate);
	dateToCheck.setHours(0, 0, 0, 0); // 시간 초기화하여 날짜만 비교

	// 입력된 날짜가 현재 날짜보다 미래인지 체크
	if (dateToCheck > today) {
	    alert("가입일자는 현재보다 미래의 날짜를 입력할 수 없습니다.");
	    return false;
	}
	
	return true;
}

// 유효성 검사 원래 정규표현식 써야하는데 그냥 적당히 타협..
const checkMemberField = () => {
	let memberNumberElement = document.querySelector('#member-number');
	let memberNameElement = document.querySelector('#member-name');
	let memberPhoneElement = document.querySelector('#member-phone');
	let memberAddressElement = document.querySelector('#member-address');
	let memberJoinDateElement = document.querySelector('#member-join-date');
	let memberGradeElement = document.querySelector('#member-grade');
	let memberCityCodeElement = document.querySelector('#member-city-code');
	
	let memberNumber = memberNumberElement.value;
	let memberName = memberNameElement.value;
	let memberPhone = memberPhoneElement.value;
	let memberAddress = memberAddressElement.value;
	let memberJoinDate = memberJoinDateElement.value;
	let memberGrade = memberGradeElement.value;
	let memberCityCode = memberCityCodeElement.value;
	
	// 입력값 확인
	if (memberName.trim() === '') {
		alert('회원성명이 입력되지 않았습니다.');
		memberNameElement.focus();
		return null;
	} else if (memberPhone.trim() === '') {
		alert('회원전화가 입력되지 않았습니다.');
		memberPhoneElement.focus();
		return null;
	} else if (memberAddress.trim() === '') {
		alert('회원주소가 입력되지 않았습니다.');
		memberAddressElement.focus();
		return null;
	} else if (memberJoinDate.trim() === '') {
		alert('가입일자가 입력되지 않았습니다.');
		memberJoinDateElement.focus();
		return null;
	} else if (memberGrade !== 'A' && memberGrade !== 'B' && memberGrade !== 'C') {
    	alert('고객등급 선택해주세요.');
    	memberGradeElement.focus();
    	return null;
    } else if (memberCityCode.trim() === '') {
		alert('도시코드가 입력되지 않았습니다.');
		memberCityCodeElement.focus();
		return null;
  	} else if (memberCityCode.length > 2) {
		alert('도시코드는 2자리를 초과할 수 없습니다.');
		memberCityCodeElement.focus();
		return null;
	  }
	
	// 날짜 체크
	if (!checkFutureDate(memberJoinDate)) {
		return;
	}
	
	// public record MemberDto(int custno, String custname, String phone, String address, Date joindate, String grade,String city) {}
	return {
		'custno': memberNumber ,
		'custname': memberName ,
		'phone': memberPhone ,
		'address': memberAddress ,
		'joindate': memberJoinDate ,
		'grade': memberGrade ,
		'city': memberCityCode		
	};
}

const printAutoNumber = async () => {
	let option = { method: 'GET' };

	let response = await fetch('/homework0203/member/{auto-number}', option);
	const nextNumber = await response.json();
	
	document.querySelector('#member-number').value = nextNumber;
}

// 멤버 가입
const memberJoin = async () => {
	try {
		// 유효성 검사가 끝난 데이터들을 DTO 객체에 담는다.
		const dto = checkMemberField();
		if (dto === null) { 
			return;
		}
		
		const option = {
			method: 'POST' ,
			headers: {
				'content-type': 'application/json'
			} ,
			body: JSON.stringify(dto)
		};
		
		const response = await fetch('/homework0203/member', option);
		const result = await response.json();
		if (result == true) {
			alert('회원등록이 완료 되었습니다.');
			location.href = 'index.jsp?page=lookup_member_section.jsp';
		} else {
			alert('회원등록 실패');
		}
	} catch (error) {
		console.error('error:', error);
	}
}

// 멤버 수정
const memberUpdate = async () => {
	try {
		// 유효성 검사가 끝난 데이터들을 DTO 객체에 담는다.
		const dto = checkMemberField();
		if (dto === null) { 
			return;
		}		
		
		const option = {
			method: 'PUT' ,
			headers: {
				'content-type': 'application/json'
			} ,
			body: JSON.stringify(dto)
		};
		
		const response = await fetch('/homework0203/member', option);
		const result = await response.json();
		if (result == true) {
			alert('회원정보 수정이 완료 되었습니다.');
			location.href = 'index.jsp?page=lookup_member_section.jsp';
		} else {
			alert('회원정보 수정 실패');
		}
	} catch (error) {
		console.error('error:', error);
	}
}

// auto_increment 번호 조회
const getNextMemberNumber = async () => {
	const option = { method: 'GET' };
	const response = await fetch('/homework0203/member/{auto-number}', option);
	const result = await response.json();
	return result;
}

// 멤버 매출 조회
const memberMoneyList = async () => {
	let tbody = document.querySelector('tbody');

	let html = '';
	const option = { method: 'GET' };

	try {
		const response = await fetch('/homework0203/member-money', option);
		const dtoList = await response.json();

		dtoList.forEach(dto => {
			switch (dto.grade) {
				case 'A':
					dto.grade = 'VIP';
					break;
				case 'B':
					dto.grade = '일반';
					break;
				case 'C':
					dto.grade = '직원';
					break;
			}
			
			html += `				
				<tr class="bd-bottom">
					<td class="pad5 bd-right">${dto.custno}</a></td>
					<td class="pad5 bd-right">${dto.custname}</td>					
					<td class="pad5 bd-right">${dto.grade}</td>
					<td class="pad5 bd-right">${dto.money}</td>
				</tr>
			`;
		});
	} catch (error) {
		console.error('error:', error.message);
	}

	// 출력
	tbody.innerHTML = html;
}