package controller;

import java.io.IOException;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import model.dao.MemberDao;

@WebServlet("/member/{auto-number}")
public class MemberNumberController extends Controller {	
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init();		
		MemberDao.setInstance(getSqliteDbPath(config));
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		System.out.println("[/member/{auto-number} doGet 호출]");
		
		int nextNumber = MemberDao.getInstance().getNextAutoIncrement();		
		
		ObjectMapper mapper = new ObjectMapper();
		String jsonResult = mapper.writeValueAsString(nextNumber);
		resp.setContentType("application/json");
		resp.getWriter().print(jsonResult);
	}	
}