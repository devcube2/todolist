package model.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class SecureDao {
	private Connection conn;
	private static SecureDao instance;

	private final String sqliteDbPath;

	private byte[] key = new byte[16];
	private byte[] iv = new byte[16];

	// 클라우드 디비 접속정보
	private String DBURL = "jdbc:mysql://140.245.79.114:3306/homework0203";
	private String DBID = "root";
	private String DBPWD = "GrsIu5k4uQr5irWRowz55qum+EXCnNIylFO/CheRx90=";

	private SecureDao(String sqliteDbPath) {
		this.sqliteDbPath = sqliteDbPath;

		try {
			if (!setKeyIV()) {
				System.out.println("** 키 설정 실패 **");
				return;
			}
			System.out.println("키 설정 성공");

			String password = decrypt(DBPWD, key, iv);
//			System.out.println("password: " + password);

			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(DBURL, DBID, password);
			if (conn != null) {
				System.out.println("DB 연동 성공");
			} else {
				System.out.println("** DB 연동 실패 **");
			}
		} catch (Exception e) {
			System.out.println(e);
		}
	}

	public static SecureDao getInstance() {
		if (instance == null) {
			throw new IllegalStateException("SecureDao Instance not initialized.");
		}
		return instance;
	}

	public static SecureDao getInstance(String contextPath) {
		if (instance == null) {
			instance = new SecureDao(contextPath);
		}
		return instance;
	}

	private boolean setKeyIV() {
		Connection conn = null;
		ResultSet rs = null;
		try {
			Class.forName("org.sqlite.JDBC");

			conn = DriverManager.getConnection("jdbc:sqlite:" + sqliteDbPath);
			Statement statement = conn.createStatement();

			rs = statement.executeQuery("select key, iv from crypto_key");

			if (rs.next()) {
				key = rs.getString("key").getBytes();
				iv = rs.getString("iv").getBytes();
			} else {
				return false;
			}
			return true;
		} catch (Exception e) {
			System.out.println(e);
		} finally {
			try {
				if (conn != null)
					conn.close();
				if (rs != null)
					rs.close();
			} catch (SQLException e) {
				System.out.println(e);
			}
		}
		return false;
	}

	private String decrypt(String data, byte[] key, byte[] iv) throws Exception {
		SecretKey secretKey = new SecretKeySpec(key, "AES");
		IvParameterSpec ivSpec = new IvParameterSpec(iv);

		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
		cipher.init(Cipher.DECRYPT_MODE, secretKey, ivSpec);

		byte[] decodedBytes = Base64.getDecoder().decode(data);
		byte[] decryptedBytes = cipher.doFinal(decodedBytes);

		return new String(decryptedBytes);
	}
}