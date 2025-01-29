package controller;

import java.io.IOException;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import model.dao.DBConnectionPool;
import model.dao.MemberDao;

@Slf4j
@WebServlet("/member/{auto-number}")
public class MemberNumberController extends Controller {
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init();
		try {
			DBConnectionPool.setInstance(config);
		} catch (Exception e) {
			log.error(e.getMessage());
		}
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		log.debug("[/member/{auto-number} doGet 호출]");
		
		int nextAutoNumber = MemberDao.getInstance().getNextAutoIncrement();
		
		if (nextAutoNumber <= 0) {
			if (nextAutoNumber == 0)
				sendNotFoundError(resp, "Not found auto-increment number", "");			
			else if (nextAutoNumber < 0)
				sendInternalError(resp, "Database process is failed", "");
			return;
		}

		send(resp, nextAutoNumber);
	}
}