package util;

import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public record CubeCrypto() {
	// record singleton
	private static final CubeCrypto INSTANCE = new CubeCrypto();

	public static CubeCrypto getInstance() {
		return INSTANCE;
	}

	public String encrypt(String data, byte[] key, byte[] iv) {
		try {
			SecretKey secretKey = new SecretKeySpec(key, "AES");
			IvParameterSpec ivSpec = new IvParameterSpec(iv);

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivSpec);

			byte[] encryptedBytes = cipher.doFinal(data.getBytes());

			return Base64.getEncoder().encodeToString(encryptedBytes);
		} catch (NoSuchAlgorithmException e) {
			log.error("No Such Algorithm: " + e.getMessage());
		} catch (NoSuchPaddingException e) {
			log.error("No Such Padding: " + e.getMessage());
		} catch (InvalidKeyException e) {
			log.error("Invalid Key: " + e.getMessage());
		} catch (InvalidAlgorithmParameterException e) {
			log.error("Invalid Algorithm Parameter: " + e.getMessage());
		} catch (IllegalBlockSizeException e) {
			log.error("Illegal Bloack Size: " + e.getMessage());
		} catch (BadPaddingException e) {
			log.error("Bad Padding: " + e.getMessage());
		} catch (IllegalArgumentException e) {
			log.error("Illegal Argument: " + e.getMessage());
		} catch (Exception e) {
			log.error("Etc Error: " + e.getMessage());
			e.printStackTrace();
		}

		return null;
	}

	public String decrypt(String data, byte[] key, byte[] iv) {
		try {
			SecretKey secretKey = new SecretKeySpec(key, "AES");
			IvParameterSpec ivSpec = new IvParameterSpec(iv);

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.DECRYPT_MODE, secretKey, ivSpec);

			byte[] decodedBytes = Base64.getDecoder().decode(data);
			byte[] decryptedBytes = cipher.doFinal(decodedBytes);

			return new String(decryptedBytes);
		} catch (NoSuchAlgorithmException e) {
			log.error("No Such Algorithm: " + e.getMessage());
		} catch (NoSuchPaddingException e) {
			log.error("No Such Padding: " + e.getMessage());
		} catch (InvalidKeyException e) {
			log.error("Invalid Key: " + e.getMessage());
		} catch (InvalidAlgorithmParameterException e) {
			log.error("Invalid Algorithm Parameter: " + e.getMessage());
		} catch (IllegalBlockSizeException e) {
			log.error("Illegal Bloack Size: " + e.getMessage());
		} catch (BadPaddingException e) {
			log.error("Bad Padding: " + e.getMessage());
		} catch (IllegalArgumentException e) {
			log.error("Illegal Argument: " + e.getMessage());
		} catch (Exception e) {
			log.error("Etc Error: " + e.getMessage());
			e.printStackTrace();
		}

		return null;
	}
}
