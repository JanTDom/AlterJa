import { NextResponse } from "next/server";

export async function GET() {
  const openApiSpec = {
    openapi: "3.1.0",
    info: {
      title: "AlterJa Platform API",
      version: "1.0.0",
      description:
        "Oficjalny interfejs programistyczny platformy cyfrowego modelu człowieka AlterJa (alterja.pl). Umożliwia kontrolowany dostęp do stylu wypowiedzi, pamięci autobiograficznej oraz interakcji z modelem rekonstrukcyjnym pod rygorem RODO i Row Level Security.",
      contact: {
        name: "AlterJa Engineering",
        url: "https://alterja.pl",
      },
    },
    servers: [
      {
        url: "https://alterja.pl/api/v1",
        description: "Serwer produkcyjny",
      },
      {
        url: "http://localhost:3000/api/v1",
        description: "Środowisko lokalne",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "alt_live_*",
          description: "Klucz API wygenerowany w Portalu Deweloperskim AlterJa z odpowiednimi grantami.",
        },
      },
      schemas: {
        GroundingCitation: {
          type: "object",
          properties: {
            memory_id: { type: "string", format: "uuid" },
            title: { type: "string" },
            layer: { type: "string" },
            epistemic_status: { type: "string" },
            source_name: { type: "string" },
            verbatim_quote: { type: "string" },
          },
          required: ["memory_id", "title", "layer"],
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string" },
            code: { type: "string" },
          },
          required: ["error"],
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
    paths: {
      "/persona/respond": {
        post: {
          summary: "Odpowiedź modelu tożsamości",
          description: "Generuje odpowiedź modelu w jednym z 3 trybów: reconstruction (przewidywanie reakcji), assistant (pomocne rozwiązanie) lub critic (weryfikacja założeń). Każda odpowiedź zawiera cytaty dowodowe.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", description: "Wiadomość wejściowa od rozmówcy" },
                    mode: {
                      type: "string",
                      enum: ["reconstruction", "assistant", "critic"],
                      default: "reconstruction",
                    },
                    allowed_layers: {
                      type: "array",
                      items: { type: "string" },
                      description: "Opcjonalna lista dozwolonych warstw pamięci",
                    },
                  },
                  required: ["message"],
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Sukces generacji",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      response: { type: "string" },
                      mode: { type: "string" },
                      citations: {
                        type: "array",
                        items: { $ref: "#/components/schemas/GroundingCitation" },
                      },
                      latency_ms: { type: "number" },
                    },
                  },
                },
              },
            },
            "401": { description: "Brak lub nieprawidłowy token autoryzacyjny" },
          },
        },
      },
      "/style/transform": {
        post: {
          summary: "Aplikacja stylu i leksyki",
          description: "Przekształca surowy szkic tekstu zgodnie ze stylem użytkownika (leksyka, składnia, tempo wypowiedzi, normy językowe) bez ujawniania faktów biograficznych.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    draft_text: { type: "string", description: "Surowy szkic tekstu do transformacji" },
                    instruction: { type: "string", description: "Dodatkowa instrukcja kontekstowa" },
                  },
                  required: ["draft_text"],
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Przekształcony tekst",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      transformed_text: { type: "string" },
                      applied_rules: {
                        type: "array",
                        items: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
            "401": { description: "Brak lub nieprawidłowy token autoryzacyjny" },
          },
        },
      },
      "/memory/query": {
        post: {
          summary: "Bezpieczne wyszukiwanie w pamięci",
          description: "Wyszukuje zweryfikowane fakty w dopuszczonych warstwach pamięci użytkownika z rygorystyczną kontrolą dostępu.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    query: { type: "string", description: "Zapytanie semantyczne" },
                    layers: {
                      type: "array",
                      items: { type: "string" },
                    },
                    limit: { type: "integer", default: 5 },
                  },
                  required: ["query"],
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Wyniki wyszukiwania",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      results: {
                        type: "array",
                        items: { $ref: "#/components/schemas/GroundingCitation" },
                      },
                      total_found: { type: "integer" },
                    },
                  },
                },
              },
            },
            "401": { description: "Brak lub nieprawidłowy token autoryzacyjny" },
          },
        },
      },
    },
  };

  return NextResponse.json(openApiSpec, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
    },
  });
}
