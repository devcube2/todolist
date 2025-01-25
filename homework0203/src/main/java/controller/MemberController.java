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

@WebServlet("/member")
public class MemberController extends Controller {	
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init();		
		MemberDao.setInstance(getSqliteDbPath(config));
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("[/member/doPost 호출]");

		ObjectMapper mapper = new ObjectMapper();
		MemberDto dto = mapper.readValue(req.getReader(), MemberDto.class);

		boolean result = MemberDao.getInstance().insertMember(dto);
		resp.setContentType("application/json");
		resp.getWriter().print(result);
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("[/member/doGet 호출]");
		
		ArrayList<MemberDto> list = MemberDao.getInstance().getMemberList();
		
		ObjectMapper mapper = new ObjectMapper();		
		mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // 날짜를 타임스탬프가 아닌 문자열로 직렬화
		
		String jsonResult = mapper.writeValueAsString(list);
		
		resp.setContentType("application/json");
		resp.getWriter().print(jsonResult);
	}

	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("[/member/doPut 호출]");
		
		ObjectMapper mapper = new ObjectMapper();
		MemberDto dto = mapper.readValue(req.getReader(), MemberDto.class);

		boolean result = MemberDao.getInstance().updateMember(dto);
		resp.setContentType("application/json");
		resp.getWriter().print(result);
	}
}