export interface DocumentRecord {
  doc_id: string;
  title: string;
  word_count?: number;
  created_at?: string;
  status?: string;
}

export interface SummaryFinding {
  title?: string;
  detail: string;
}

export interface ExecutiveSummary {
  headline?: string;
  context?: string;
  core_message?: string;
  findings?: SummaryFinding[];
  bottom_line?: string;
  read_time?: string;
}

export interface InsightItem {
  id?: string;
  rank?: number;
  insight: string;
  impact_score?: number;
  theme?: string;
  evidence?: string;
}

export interface TopicItem {
  theme: string;
  summary?: string;
  key_points?: string[];
  chunk_refs?: string[];
}

export interface NamedEntities {
  people?: string[];
  organizations?: string[];
  locations?: string[];
  dates?: string[];
}

export interface ActionItem {
  action: string;
  priority?: "HIGH" | "MED" | "LOW" | string;
  timeline?: string;
  owner?: string;
  rationale?: string;
}

export interface RiskItem {
  risk: string;
  severity?: string;
  likelihood?: string;
  mitigation?: string;
}

export interface OpportunityItem {
  opportunity: string;
  impact?: string;
  effort?: string;
}

export interface WarningItem {
  warning: string;
}

export interface KeyDecision {
  title?: string;
  deadline?: string;
  stakeholders?: string[];
}

export interface DecisionIntelligence {
  actions?: ActionItem[];
  risks?: RiskItem[];
  opportunities?: OpportunityItem[];
  warnings?: WarningItem[];
  key_decision_required?: KeyDecision;
}

export interface GraphNode {
  id: string;
  label: string;
  type?: "theme" | "entity" | "action" | "risk" | "opportunity" | string;
  value?: number;
  description?: string;
}

export interface GraphLink {
  source: string;
  target: string;
  relation?: string;
}

export interface Briefing {
  doc_id: string;
  title?: string;
  word_count?: number;
  created_at?: string;
  executive_summary?: ExecutiveSummary;
  key_insights?: InsightItem[];
  topic_breakdown?: TopicItem[];
  named_entities?: NamedEntities;
  decision_intelligence?: DecisionIntelligence;
  concept_map?: {
    nodes: GraphNode[];
    links: GraphLink[];
  };
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  citations?: string[];
  suggestions?: string[];
}

export interface ChatResponse {
  answer?: string;
  response?: string;
  citations?: string[];
  suggested_questions?: string[];
  suggestions?: string[];
}

export interface ProcessResponse {
  doc_id: string;
  title?: string;
  word_count?: number;
  briefing?: Briefing;
}

