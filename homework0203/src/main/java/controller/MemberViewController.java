package controller;

import java.io.IOException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import model.dao.DBConnectionPool;
import model.dao.MemberDao;
import model.dto.MemberDto;

@Slf4j
@WebServlet("/member-view")
public class MemberViewController extends Controller {
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
		log.debug("[/member-view/doGet 호출]");
		
		int custno = Integer.parseInt(req.getParameter("custno"));
		MemberDto dto = MemberDao.getInstance().getMember(custno);
		if (dto == null) {
			sendNotFoundError(resp, "not found member", custno);
			return;
		}
		
		ObjectMapper mapper = new ObjectMapper();		
		mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // 날짜를 타임스탬프가 아닌 문자열로 직렬화
		send(resp, dto, mapper);		
	}
}
