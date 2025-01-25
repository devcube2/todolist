<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원목록조회</title>
<script src="js/member.js"></script>
</head>
<body>
	<div>
		<section class="pad-tb15 bg-gray">
			<div>
				<h3>회원목록조회/수정</h3>
				<br />
				<div class="flex-center">
					<table class="width800">						
						<thead>
							<tr class="bd-bottom">
								<th class="pad5 bd-right">회원번호</th>
								<th class="pad5 bd-right">회원성명</th>
								<th class="pad5 bd-right">전화번호</th>
								<th class="pad5 bd-right">주소</th>
								<th class="pad5 bd-right">가입일자</th>
								<th class="pad5 bd-right">고객등급</th>
								<th class="pad5 bd-right">거주지역</th>
							</tr>
						</thead>
						<tbody>
							<!-- 자바스크립트에서 생성 -->
						</tbody>						
					</table>
				</div>
			</div>
		</section>
	</div>
	
	<script>memberList()</script>
</body>
</html>