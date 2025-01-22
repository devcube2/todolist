<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%
String redirect_page = request.getParameter("page");

if (redirect_page == null) {
	redirect_page = "index_section.jsp";
}
%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="main.css" type="text/css" />
</head>

<body>
	<div id="wrap">
		<jsp:include page="header.jsp"></jsp:include>
		<jsp:include page="nav.jsp"></jsp:include>
		<jsp:include page="<%=redirect_page%>" />
		<jsp:include page="footer.jsp"></jsp:include>
	</div>
</body>
</html>