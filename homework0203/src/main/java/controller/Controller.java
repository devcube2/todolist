package controller;

import java.net.MalformedURLException;
import java.net.URL;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import model.dao.SecureDao;

public class Controller extends HttpServlet {	
	private String sqliteDbPath = "/WEB-INF/database/homework0203.db";

	protected String getSqliteDbPath(ServletConfig config) {
		ServletContext context = config.getServletContext();

		try {
			URL resourceUrl = context.getResource(sqliteDbPath);
			if (resourceUrl != null) {
				return resourceUrl.toString();
			}
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		
		throw new NullPointerException("resourceUrl is null : " + sqliteDbPath);
	}
}
