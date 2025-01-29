package model.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import lombok.extern.slf4j.Slf4j;
import model.dto.MemberDto;
import model.dto.MemberMoneyDto;

@Slf4j
public class MemberDao {
	private static class SingletonHolder {
		private static final MemberDao INSTANCE = new MemberDao();
	}

	private MemberDao() {
	}

	public static MemberDao getInstance() {
		return SingletonHolder.INSTANCE;
	}

	public Connection getConnection() throws SQLException {
		return DBConnectionPool.getInstance().getConnection();
	}

	// 전체 멤버 조회
	public ArrayList<MemberDto> getMemberList() {
		ArrayList<MemberDto> list = new ArrayList<>();

		String sql = "select * from member_tbl_02";
		
		try (Connection conn = getConnection();
				PreparedStatement ps = conn.prepareStatement(sql);
				ResultSet rs = ps.executeQuery()) {
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

		String sql = "select * from member_tbl_02 where custno = ?";
		
		try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
			ps.setInt(1, cust_no);

			try (ResultSet rs = ps.executeQuery()) {
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
			}
		} catch (SQLException e) {
			log.error(">> " + e);
		}

		return dto;
	}

	// 멤버 가입
	public int insertMember(MemberDto dto) {
		String sql = "insert into member_tbl_02(custname, phone, address, joindate, grade, city) values (?, ?, ?, ?, ?, ?)";
		
		try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
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
		String sql = "update member_tbl_02 set custname=?, phone=?, address=?, joindate=?, grade=?, city=? where custno=?";
		
		try (Connection conn = getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
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

		String query = "SELECT AUTO_INCREMENT FROM information_schema.tables where table_name = 'member_tbl_02' and table_schema = 'hrd'";
		try (Connection conn = getConnection();
				PreparedStatement stmt = conn.prepareStatement(query);
				ResultSet rs = stmt.executeQuery()) {
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

		String sql = "select custno, custname, grade, sum(price) as money from money_tbl_02 join member_tbl_02 using(custno) group by custno order by money desc";
		
		try (Connection conn = getConnection();
				PreparedStatement ps = conn.prepareStatement(sql);
				ResultSet rs = ps.executeQuery()) {			
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