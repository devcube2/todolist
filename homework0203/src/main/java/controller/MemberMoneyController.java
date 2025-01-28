package controller;

import java.io.IOException;
import java.util.ArrayList;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import model.dao.MemberDao;
import model.dto.MemberMoneyDto;

@Slf4j
@WebServlet("/member-money")
public class MemberMoneyController extends Controller {
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init();
		MemberDao.setInstance(config);
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		log.debug("[/member-money/doGet 호출]");

		ArrayList<MemberMoneyDto> list = MemberDao.getInstance().getMemberMoneyList();
		if (list == null) {
			sendInternalError(resp, "Database Error", "");
			return;
		}
		send(resp, list);		
	}
}
