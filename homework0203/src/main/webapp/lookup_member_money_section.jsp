<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원매출조회</title>
<script src="js/member.js"></script>
</head>
<body>
	<div>
		<section class="pad-tb15 bg-gray">
			<div>
				<h3>회원매출조회</h3>
				<br />
				<div class="flex-center">
					<table class="width800">
						<thead>
							<tr class="bd-bottom">
								<th class="pad5 bd-right">회원번호</th>
								<th class="pad5 bd-right">회원성명</th>
								<th class="pad5 bd-right">고객등급</th>
								<th class="pad5 bd-right">매출</th>
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
	
	<script>memberMoneyList()</script>
</body>
</html>