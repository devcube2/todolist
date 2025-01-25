package util;

import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public record CubeCrypto() {
	// record singleton
    private static final CubeCrypto INSTANCE = new CubeCrypto();    
    public static CubeCrypto getInstance() {
    	return INSTANCE;
    }
    
    public String decrypt(String data, byte[] key, byte[] iv) throws Exception {
		SecretKey secretKey = new SecretKeySpec(key, "AES");
		IvParameterSpec ivSpec = new IvParameterSpec(iv);

		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
		cipher.init(Cipher.DECRYPT_MODE, secretKey, ivSpec);

		byte[] decodedBytes = Base64.getDecoder().decode(data);
		byte[] decryptedBytes = cipher.doFinal(decodedBytes);

		return new String(decryptedBytes);
	}
}
