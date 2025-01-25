<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원등록</title>
<link rel="stylesheet" href="css/main.css" type="text/css" />
</head>
<body>
	<div>
		<section class="pad-tb15 bg-gray flex-center">
			<fieldset>
				<legend>홈쇼핑 회원 등록</legend>
				<table class="width800">
					<tr class="bd-bottom">
						<td class="pad5 bd-right width35per">회원번호(자동발생)</td>
						<td class="pad5 left-align">
							<input type="text" id="member-number" class="height25" readonly />
						</td>
					</tr>
					<tr class="bd-bottom">
						<td class="pad5 bd-right width35per">회원성명</td>
						<td class="pad5 left-align">
							<input type="text" id="member-name" class="height25" />
						</td>
					</tr>
					<tr class="bd-bottom">
						<td class="pad5 bd-right width35per">회원전화</td>
						<td class="pad5 left-align">
							<input type="text" id="member-phone" class="height25" />
						</td>
					</tr>
					<tr class="bd-bottom">
						<td class="pad5 bd-right width35per">회원주소</td>
						<td class="pad5 left-align">
							<input type="text" id="member-address" class="height25 width400" />
						</td>
					</tr>
					<tr class="bd-bottom">
						<td class="pad5 bd-right width35per">가입일자</td>
						<td class="pad5 left-align">
							<input type="date" id="member-join-date" class="height25" />
						</td>
					</tr>
					<tr class="bd-bottom">
						<td class="pad5 bd-right width35per">고객등급(A: VIP, B: 일반, C: 직원)</td>
						<td class="pad5 left-align">
							<select name="languages" id="member-grade" class="height25">
								<option value="select">고객등급을 선택해주세요.</option>
								<option value="A">A</option>
								<option value="B">B</option>
								<option value="C">C</option>
							</select>
						</td>
					</tr>
					<tr class="bd-bottom">
						<td class="pad5 bd-right width35per">도시코드</td>
						<td class="pad5 left-align">
							<input type="text" id="member-city-code" class="height25" />
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<button class="bg-gray pad5 margin5" onclick="memberJoin()">
								<div class="font-size15">등&nbsp록</div>
							</button>
							<button class="bg-gray pad5" onclick="location.href='index.jsp?page=lookup_member_section.jsp'">
								<div class="font-size15">조&nbsp회</div>
							</button>
						</td>
					</tr>
				</table>
			</fieldset>
		</section>
	</div>

	<script src="js/member.js"></script>
	<!-- 자동발생번호 먼저 출력 -->
	<script>printAutoNumber()</script>
</body>
</html>