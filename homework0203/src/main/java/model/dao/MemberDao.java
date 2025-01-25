package model.dao;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import model.dto.MemberDto;
import model.dto.MemberMoneyDto;

public class MemberDao extends SecureDao {
	private static MemberDao instance;

	MemberDao(String sqliteDbPath) {
		super(sqliteDbPath);
	}

	public static MemberDao getInstance() {
		if (instance == null) {
			throw new IllegalStateException("MemberDao Instance not initialized.");
		}
		return instance;
	}

	public static void setInstance(String sqliteDbPath) {
		if (instance == null) {
			instance = new MemberDao(sqliteDbPath);
		}
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
			System.out.println(">> " + e);
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
			System.out.println(">> " + e);
		}

		return dto;
	}

	// 멤버 가입
	public boolean insertMember(MemberDto dto) {
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
				return true;
		} catch (SQLException e) {
			System.out.println(e);
		}

		return false;
	}

	// 멤버 수정
	public boolean updateMember(MemberDto dto) {
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
			if (count == 1)
				return true;
		} catch (SQLException e) {
			System.out.println(e);
		}

		return false;
	}

	// 자동증가 번호 조회
	public int getNextAutoIncrement() {
		int nextAutoIncrement = -1;

		try {
			String query = "SELECT AUTO_INCREMENT FROM information_schema.tables where table_name = 'member_tbl_02' and table_schema = 'homework0203'";
			PreparedStatement stmt = conn.prepareStatement(query);

			ResultSet rs = stmt.executeQuery();
			if (rs.next()) {
				nextAutoIncrement = rs.getInt("AUTO_INCREMENT");
			}
		} catch (SQLException e) {
			e.printStackTrace();
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
			System.out.println(">> " + e);
		}

		return list;
	}
}