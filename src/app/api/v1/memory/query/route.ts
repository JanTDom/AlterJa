import { NextRequest, NextResponse } from "next/server";
import { verifyApiKeyAndScope } from "@/lib/auth/apiKeys";
import { getLiveMemories } from "@/lib/supabase/db";
import { GroundingCitation, MemoryLayer } from "@/domains/types";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const { client, error, status } = await verifyApiKeyAndScope(authHeader, "memory_query");

    if (!client) {
      return NextResponse.json({ error: error || "Brak autoryzacji" }, { status: status || 401 });
    }

    const body = await req.json();
    const { query, layers, limit = 5 } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Brak wymaganego pola 'query'." },
        { status: 400 }
      );
    }

    // Odczyt z bazy z izolacją do user_id przypisanego do klienta
    const allMemories = await getLiveMemories(client.userId);

    let items = allMemories.filter((m) => client.allowedLayers.includes(m.layer));

    if (Array.isArray(layers) && layers.length > 0) {
      items = items.filter((m) => layers.includes(m.layer));
    }

    const qLower = query.toLowerCase();
    const matched = items.filter(
      (m) =>
        m.title.toLowerCase().includes(qLower) ||
        m.content.toLowerCase().includes(qLower)
    );

    const finalResults = matched.length > 0 ? matched.slice(0, limit) : items.slice(0, limit);

    const citations: GroundingCitation[] = finalResults.map((m) => {
      const firstEvidence = m.evidence?.[0];
      return {
        memory_id: m.id,
        title: m.title,
        layer: m.layer as MemoryLayer,
        epistemic_status: m.epistemic_status,
        source_name: "Źródło zweryfikowane",
        verbatim_quote: firstEvidence?.exact_quote || m.content.slice(0, 160),
      };
    });

    return NextResponse.json({
      results: citations,
      total_found: citations.length,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Wystąpił błąd serwera";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
