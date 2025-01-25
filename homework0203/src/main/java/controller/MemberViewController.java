package controller;

import java.io.IOException;
import java.util.ArrayList;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.dao.MemberDao;
import model.dto.MemberDto;

@WebServlet("/member-view")
public class MemberViewController extends Controller {
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init();		
		MemberDao.setInstance(getSqliteDbPath(config));
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("[/member-view/doGet 호출]");
		
		MemberDto dto = MemberDao.getInstance().getMember(Integer.parseInt(req.getParameter("custno")));
		
		ObjectMapper mapper = new ObjectMapper();		
		mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // 날짜를 타임스탬프가 아닌 문자열로 직렬화
		
		String jsonResult = mapper.writeValueAsString(dto);
		
		resp.setContentType("application/json");
		resp.getWriter().print(jsonResult);
	}
}
