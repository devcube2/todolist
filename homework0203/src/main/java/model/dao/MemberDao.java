package model.dao;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Properties;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletContext;
import lombok.extern.slf4j.Slf4j;
import model.dto.MemberDto;
import model.dto.MemberMoneyDto;
import util.CubeCrypto;

@Slf4j
public class MemberDao {
	private byte[] key = { (byte) 0x67, (byte) 0x6f, (byte) 0x7a, (byte) 0x6a, (byte) 0x64, (byte) 0x69, (byte) 0x38,
			(byte) 0x30, (byte) 0x67, (byte) 0x6f, (byte) 0x7a, (byte) 0x6a, (byte) 0x64, (byte) 0x69, (byte) 0x38,
			(byte) 0x30 };
	private byte[] iv = { (byte) 0x67, (byte) 0x6f, (byte) 0x7a, (byte) 0x6a, (byte) 0x64, (byte) 0x69, (byte) 0x38,
			(byte) 0x30, (byte) 0x67, (byte) 0x6f, (byte) 0x7a, (byte) 0x6a, (byte) 0x64, (byte) 0x69, (byte) 0x38,
			(byte) 0x30 };

//	private String DBURL = "jdbc:mysql://localhost:3306/hrd";
//	private String DBID = "root";
//	private String DBPWD = "3tKosPNj38puIMbpznIivQ==";

	private Connection conn;

	// 클라우드 디비 접속정보
//	private String DBURL = "jdbc:mysql://140.245.79.114:3306/hrd";
//	private String DBID = "root";
//	private String DBPWD = "GrsIu5k4uQr5irWRowz55qum+EXCnNIylFO/CheRx90=";

	private static MemberDao instance;

	private MemberDao(ServletConfig config) {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");

			// 프로퍼티 값 가져오기
			Properties prop = getServerConfig(config);
			if (prop == null) {
				log.error("Properies object is null");
				return;
			}

			String dbUrl = prop.getProperty("database.url");
			String dbId = prop.getProperty("database.id");
			String dbPassword = prop.getProperty("database.password");

			String password = CubeCrypto.getInstance().decrypt(dbPassword, key, iv);
			if (password == null) {
				log.error("Password decryption failure");
				return;
			}			

			// DB 접속
			conn = DriverManager.getConnection(dbUrl, dbId, password);
			if (conn != null) {
				log.info("DB connection success");
			}
		} catch (ClassNotFoundException e) {
			log.error("Not found JDBC Driver: " + e);
		} catch (SQLException e) {
			log.error("Database connection failure: " + e);
		}
	}

	private Properties getServerConfig(ServletConfig config) {
		try {
			ServletContext context = config.getServletContext();

			String resourcePath = "/WEB-INF/classes/server.conf";
			URL resourceUrl = context.getResource(resourcePath);
			if (resourceUrl == null) {
				log.error("getResource() is failed: {}", resourcePath);
				return null;
			}
			
			// file:\C:\workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\homework0203\WEB-INF\classes\server.conf
			// 위와 같은 URI 형태로 나오는걸 FIleInputStream 은 직접적으로 지원하지 않는다. 그러므로 변환해서 넣어줘야한다. 
			URI resourceFileUri = new URI(resourceUrl.toString());
	        File resourceFile = new File(resourceFileUri);			
			FileInputStream inputStream = new FileInputStream(resourceFile);
			
			Properties prop = new Properties();
			prop.load(inputStream);
			
			return prop;
		} catch (MalformedURLException e) {
			log.error(e.getMessage());
		} catch (IOException e) {
			log.error(e.getMessage());
		} catch (Exception e) {
			log.error(e.getMessage());
		}

		return null;
	}

	public static void setInstance(ServletConfig config) {
		if (instance == null) {
			synchronized (MemberDao.class) {
				if (instance == null) {
					instance = new MemberDao(config);
				}
			}
		}
	}

	public static MemberDao getInstance() {
		if (instance == null) {
			log.error("MemberDao is not initialized. You must call setInstance(ServletConfig)");
		}
		return instance;
	}

	// 전체 멤버 조회
	public ArrayList<MemberDto> getMemberList() {
		ArrayList<MemberDto> list = new ArrayList<>();

		try {
			String sql = "select * from member_tbl_02";
			PreparedStatement ps = conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				int custno = rs.getInt("custno");
				String custname = rs.getString("custname");
				String phone = rs.getString("phone");
				String address = rs.getString("address");
				Date joindate = rs.getDate("joindate");
				String grade = rs.getString("grade");
				String city = rs.getString("city");
				list.add(new MemberDto(custno, custname, phone, address, joindate, grade, city));
			}
		} catch (SQLException e) {
			log.error(">> " + e);
			return null;
		} catch (Exception e) {
			log.error(">> " + e);
			return null;
		}

		return list;
	}

	// 멤버 한명 조회
	public MemberDto getMember(int cust_no) {
		MemberDto dto = null;

		try {
			String sql = "select * from member_tbl_02 where custno = ?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt(1, cust_no);

			ResultSet rs = ps.executeQuery();
			if (rs.next()) {
				int custno = rs.getInt("custno");
				String custname = rs.getString("custname");
				String phone = rs.getString("phone");
				String address = rs.getString("address");
				Date joindate = rs.getDate("joindate");
				String grade = rs.getString("grade");
				String city = rs.getString("city");
				dto = new MemberDto(custno, custname, phone, address, joindate, grade, city);
			}
		} catch (SQLException e) {
			log.error(">> " + e);
		}

		return dto;
	}

	// 멤버 가입
	public int insertMember(MemberDto dto) {
		try {
			String sql = "insert into member_tbl_02(custname, phone, address, joindate, grade, city) values (?, ?, ?, ?, ?, ?)";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, dto.custname());
			ps.setString(2, dto.phone());
			ps.setString(3, dto.address());
			ps.setDate(4, dto.joindate());
			ps.setString(5, dto.grade());
			ps.setString(6, dto.city());
			int count = ps.executeUpdate();
			if (count == 1)
				return count;
		} catch (SQLException e) {
			log.error(">> " + e);
			return -1;
		}

		return 0;
	}

	// 멤버 수정
	public int updateMember(MemberDto dto) {
		try {
			String sql = "update member_tbl_02 set custname=?, phone=?, address=?, joindate=?, grade=?, city=? where custno=?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, dto.custname());
			ps.setString(2, dto.phone());
			ps.setString(3, dto.address());
			ps.setDate(4, dto.joindate());
			ps.setString(5, dto.grade());
			ps.setString(6, dto.city());
			ps.setInt(7, dto.custno());
			int count = ps.executeUpdate();
			if (count >= 1) {
				if (count == 1) {
					return count;
				} else {
					log.error("member_tbl_02 에서 {} 행이 갱신되는 버그 발생: {}", count, sql);
					return -1;
				}
			}
		} catch (SQLException e) {
			log.error(">> " + e);
			return -1;
		}

		return 0;
	}

	// 자동증가 번호 조회
	public int getNextAutoIncrement() {
		int nextAutoIncrement = 0;

		try {
			String query = "SELECT AUTO_INCREMENT FROM information_schema.tables where table_name = 'member_tbl_02' and table_schema = 'hrd'";
			PreparedStatement stmt = conn.prepareStatement(query);

			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				nextAutoIncrement = rs.getInt("AUTO_INCREMENT");
			} else {
				log.error("Not found auto-increment number : " + query);
				return 0;
			}
		} catch (SQLException e) {
			log.error(">> " + e);
			return -1;
		}

		return nextAutoIncrement;
	}

	// 멤버전체 매출조회
	public ArrayList<MemberMoneyDto> getMemberMoneyList() {
		ArrayList<MemberMoneyDto> list = new ArrayList<>();

		try {
			String sql = "select custno, custname, grade, sum(price) as money from money_tbl_02 join member_tbl_02 using(custno) group by custno order by money desc";
			PreparedStatement ps = conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				int custno = rs.getInt("custno");
				String custname = rs.getString("custname");
				String grade = rs.getString("grade");
				int money = rs.getInt("money");
				list.add(new MemberMoneyDto(custno, custname, grade, money));
			}
		} catch (SQLException e) {
			log.error(">> " + e);
			return null;
		}

		return list;
	}
}