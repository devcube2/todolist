package controller;

import java.io.IOException;
import java.util.ArrayList;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import model.dao.MemberDao;
import model.dto.MemberMoneyDto;

@WebServlet("/member-money")
public class MemberMoneyController extends Controller {
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init();		
		MemberDao.setInstance(getSqliteDbPath(config));
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("[/member-money/doGet 호출]");

		ArrayList<MemberMoneyDto> list = MemberDao.getInstance().getMemberMoneyList();

		ObjectMapper mapper = new ObjectMapper();
		String jsonResult = mapper.writeValueAsString(list);

		resp.setContentType("application/json");
		resp.getWriter().print(jsonResult);
	}
}
