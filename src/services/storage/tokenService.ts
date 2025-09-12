// src/services/tokenService.ts
import * as Keychain from "react-native-keychain";
import EncryptedStorage from "react-native-encrypted-storage";

export const KEYCHAIN_SERVICE = "com.rohit1991.skillcart";
export const ACCESS_TOKEN_KEY = "access_token";
export const ID_TOKEN_KEY = "id_token";
export const EXPIRES_AT_KEY = "expires_at";

/* ---------------- Refresh Token (Keychain) ---------------- */

/** Save refresh token securely in Keychain */
export async function saveRefreshToken(
  refreshToken: string | null
): Promise<void> {
  if (!refreshToken) return;
  try {
    await Keychain.setGenericPassword("refresh", refreshToken, {
      service: KEYCHAIN_SERVICE,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    });
  } catch (error) {
    // console.warn("saveRefreshToken error", error);
  }
}

/** Get refresh token from Keychain */
export async function getRefreshToken(): Promise<string | null> {
  try {
    const creds = await Keychain.getGenericPassword({
      service: KEYCHAIN_SERVICE,
    });
    return creds ? creds.password : null;
  } catch {
    return null;
  }
}

/** Clear refresh token */
export async function clearRefreshToken(): Promise<void> {
  try {
    await Keychain.resetGenericPassword({ service: KEYCHAIN_SERVICE });
  } catch {
    // ignore
  }
}

/* ---------------- Access Token (EncryptedStorage) ---------------- */

/** Save access token */
export async function saveAccessToken(
  accessToken: string | null | undefined
): Promise<void> {
  try {
    if (accessToken) {
      await EncryptedStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    } else {
      await EncryptedStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  } catch {
    // ignore
  }
}

/** Get access token */
export async function getAccessToken(): Promise<string | null> {
  try {
    return await EncryptedStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

/** Clear access token */
export async function clearAccessToken(): Promise<void> {
  try {
    await EncryptedStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch {
    // ignore
  }
}

/* ---------------- ID Token (EncryptedStorage) ---------------- */

export async function saveIdToken(idToken: string | null): Promise<void> {
  try {
    if (idToken) {
      await EncryptedStorage.setItem(ID_TOKEN_KEY, idToken);
    } else {
      await EncryptedStorage.removeItem(ID_TOKEN_KEY);
    }
  } catch {
    // ignore
  }
}

export async function getIdToken(): Promise<string | null> {
  try {
    return await EncryptedStorage.getItem(ID_TOKEN_KEY);
  } catch {
    return null;
  }
}

export async function clearIdToken(): Promise<void> {
  try {
    await EncryptedStorage.removeItem(ID_TOKEN_KEY);
  } catch {
    // ignore
  }
}

/* ---------------- Expiry Time (EncryptedStorage) ---------------- */

export async function saveExpiresAt(expiresAt: number | null): Promise<void> {
  try {
    if (expiresAt !== null && expiresAt !== undefined) {
      await EncryptedStorage.setItem(EXPIRES_AT_KEY, expiresAt.toString());
    } else {
      await EncryptedStorage.removeItem(EXPIRES_AT_KEY);
    }
  } catch {
    // ignore
  }
}

export async function getExpiresAt(): Promise<number | null> {
  try {
    const val = await EncryptedStorage.getItem(EXPIRES_AT_KEY);
    return val ? Number(val) : null;
  } catch {
    return null;
  }
}

export async function clearExpiresAt(): Promise<void> {
  try {
    await EncryptedStorage.removeItem(EXPIRES_AT_KEY);
  } catch {
    // ignore
  }
}

/* ---------------- Convenience ---------------- */

/** Clear everything (all tokens + expiry) */
export async function clearAll(): Promise<void> {
  await clearRefreshToken();
  await clearAccessToken();
  await clearIdToken();
  await clearExpiresAt();
}
