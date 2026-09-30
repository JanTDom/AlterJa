// ==============================================================================
// AlterJa (alterja.pl) — Bezpieczna weryfikacja kluczy API v1 i uprawnień access_grants
// ==============================================================================

import crypto from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export interface AuthenticatedApiClient {
  clientId: string;
  userId: string;
  name: string;
  allowedLayers: string[];
}

export function hashApiKey(key: string): string {
  const pepper = process.env.API_AUTH_SECRET || "alterja-production-pepper-2026";
  return crypto.createHash("sha256").update(`${key}:${pepper}`).digest("hex");
}

export function generateApiKey(): { apiKey: string; keyPrefix: string; keyHash: string } {
  const randomHex = crypto.randomBytes(16).toString("hex");
  const keyPrefix = `alt_live_${randomHex.slice(0, 6)}`;
  const apiKey = `${keyPrefix}_sec_${randomHex.slice(6)}`;
  const keyHash = hashApiKey(apiKey);
  return { apiKey, keyPrefix, keyHash };
}

export async function verifyApiKeyAndScope(
  authHeader: string | null,
  requiredGrant: "memory_query" | "style_only" | "reconstruction" | "preference_predict"
): Promise<{ client: AuthenticatedApiClient | null; error?: string; status?: number }> {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      client: null,
      error: "Wymagana autoryzacja: brak nagłówka Authorization z poprawnym kluczem Bearer.",
      status: 401,
    };
  }

  const rawKey = authHeader.replace("Bearer ", "").trim();
  if (rawKey.length < 24 || !rawKey.startsWith("alt_live_")) {
    return {
      client: null,
      error: "Nieprawidłowy format klucza API.",
      status: 401,
    };
  }

  const admin = getSupabaseAdmin();
  if (!admin) {
    return {
      client: null,
      error: "Usługa weryfikacji API jest obecnie niedostępna.",
      status: 503,
    };
  }

  const keyHash = hashApiKey(rawKey);

  // Wyszukanie klienta w bazie
  const { data: clientData, error: clientError } = await admin
    .from("api_clients")
    .select("id, user_id, name, is_active")
    .eq("key_hash", keyHash)
    .single();

  if (clientError || !clientData || !clientData.is_active) {
    return {
      client: null,
      error: "Nieprawidłowy lub unieważniony klucz API.",
      status: 401,
    };
  }

  // Weryfikacja grantu uprawnień w access_grants
  const { data: grantData } = await admin
    .from("access_grants")
    .select("grant_type, allowed_layers, is_revoked, expires_at")
    .eq("client_id", clientData.id)
    .eq("grant_type", requiredGrant)
    .single();

  if (grantData) {
    if (grantData.is_revoked || (grantData.expires_at && new Date(grantData.expires_at) < new Date())) {
      return {
        client: null,
        error: "Grant uprawnień dla tego zakresu został cofnięty lub wygasł.",
        status: 403,
      };
    }
  }

  // Aktualizacja last_used_at
  await admin
    .from("api_clients")
    .update({ last_used_at: new Date().toISOString() })
    .eq("id", clientData.id);

  const allowedLayers = Array.isArray(grantData?.allowed_layers) ? grantData.allowed_layers : ["style", "knowledge", "values", "preferences"];

  return {
    client: {
      clientId: clientData.id,
      userId: clientData.user_id,
      name: clientData.name,
      allowedLayers,
    },
  };
}
