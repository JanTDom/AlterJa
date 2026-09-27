// ==============================================================================
// AlterJa (alterja.pl) — Typy domenowe i kontrakty modeli
// ==============================================================================

export type MemoryLayer =
  | "biography"
  | "knowledge"
  | "style"
  | "preferences"
  | "values"
  | "decisions"
  | "context";

export type EpistemicStatus =
  | "source_record"
  | "user_declaration"
  | "observed_behavior"
  | "hypothesis"
  | "disputed"
  | "superseded"
  | "synthetic_ai";

export type ConfidenceLevel = "confirmed" | "provisional" | "disputed";

export type ConversationMode = "reconstruction" | "assistant" | "critic";

export type ConsentScope =
  | "analysis"
  | "style_modeling"
  | "voice_synthesis"
  | "api_sharing"
  | "postmortem";

export type IngestionJobStatus =
  | "queued"
  | "running"
  | "succeeded"
  | "failed"
  | "cancelled";

export interface Profile {
  id: string;
  display_name: string | null;
  email: string | null;
  avatar_url: string | null;
  learning_paused: boolean;
  quiet_hours_enabled: boolean;
  quiet_hours_start: string;
  quiet_hours_end: string;
  created_at: string;
  updated_at: string;
  full_name?: string;
  style_summary?: string;
}

export interface Consent {
  id: string;
  user_id: string;
  scope: ConsentScope;
  is_granted: boolean;
  granted_at: string | null;
  revoked_at: string | null;
  version: string;
  created_at: string;
}

export interface SourceItem {
  id: string;
  user_id: string;
  title: string;
  raw_content: string | null;
  mime_type: string;
  size_bytes: number;
  source_author: string | null;
  is_third_party: boolean;
  is_synthetic_ai: boolean;
  event_timestamp: string | null;
  created_at: string;
}

export interface MemoryItem {
  id: string;
  user_id: string;
  layer: MemoryLayer;
  title: string;
  content: string;
  epistemic_status: EpistemicStatus;
  confidence: ConfidenceLevel;
  is_superseded: boolean;
  superseded_by_id?: string | null;
  created_at: string;
  updated_at: string;
  evidence?: MemoryEvidence[];
  keywords?: string[];
  confidence_score?: number;
}

export interface MemoryEvidence {
  id: string;
  user_id: string;
  memory_item_id: string;
  source_item_id: string;
  exact_quote: string;
  char_start?: number | null;
  char_end?: number | null;
  source_title?: string;
  created_at: string;
}

export interface Hypothesis {
  id: string;
  user_id: string;
  hypothesis_text: string;
  alternative_explanation: string | null;
  supporting_evidence_count: number;
  status: "pending" | "confirmed" | "rejected" | "situational";
  rejection_reason?: string | null;
  created_at: string;
  reviewed_at?: string | null;
}

export interface DecisionCase {
  id: string;
  user_id: string;
  situation: string;
  options_considered: string[];
  chosen_option: string;
  user_justification: string | null;
  observed_outcome: string | null;
  post_hoc_reflection: string | null;
  decision_date: string | null;
  created_at: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  mode: ConversationMode;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  mode?: ConversationMode;
  grounding_citations?: {
    memory_id: string;
    title: string;
    quote: string;
  }[];
  uncertainty_level?: "high" | "moderate" | "unknown";
  created_at: string;
}

export interface GroundingCitation {
  memory_id: string;
  title: string;
  layer: string;
  epistemic_status: string;
  source_name: string;
  verbatim_quote: string;
}

export interface LegacyDirective {
  id: string;
  user_id: string;
  is_enabled: boolean;
  primary_contact_name: string | null;
  primary_contact_email: string | null;
  on_verified_death: "delete_all" | "archive_only" | "reconstruction_allowed";
  allow_simulation: boolean;
  status: "dormant" | "verification_pending" | "active" | "completed";
  created_at: string;
  updated_at: string;
  // Pola rozszerzone dla UI i protokołu
  mode?: "archive_only" | "interactive_memorial" | "total_erasure";
  trusted_contact_email?: string;
  inactivity_period_days?: number;
  require_death_certificate?: boolean;
  posthumous_intro_message?: string;
}

export interface ApiClient {
  id: string;
  user_id: string;
  name: string;
  key_prefix: string;
  is_active: boolean;
  rate_limit_per_minute: number;
  created_at: string;
  last_used_at: string | null;
  grants?: AccessGrant[];
  api_key?: string;
  client_id?: string;
}

export interface AccessGrant {
  id: string;
  client_id: string;
  user_id: string;
  grant_type: "style_only" | "memory_query" | "preference_predict" | "reconstruction";
  allowed_layers: MemoryLayer[];
  prohibited_topics: string[];
  is_revoked: boolean;
  expires_at: string | null;
  created_at: string;
}
