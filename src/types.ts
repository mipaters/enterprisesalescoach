export type SalesStage = "Discovery" | "Qualification" | "Solution validation" | "Business case" | "Negotiation";
export type ForecastCategory = "Pipeline" | "Upside" | "Best case" | "Commit";
export type BuyingRole = "Economic buyer" | "Executive sponsor" | "Champion" | "Technical decision maker" | "Business decision maker" | "Procurement" | "Influencer" | "Blocker" | "User" | "Legal approver";
export type Relationship = "Strong" | "Developing" | "Neutral" | "Weak" | "Unknown";

export interface Account { id: string; name: string; industry: string; region: string; }
export interface EvidenceSource { type: string; label: string; }
export interface Evidence { id: string; date: string; title: string; detail: string; source: EvidenceSource; confidence: number; status?: "supporting" | "conflicting" | "missing"; }
export interface CustomerCommitment { id: string; label: string; status: "confirmed" | "pending" | "missing"; date?: string; }
export interface DealDimension { id: string; name: string; score: number; confidence: number; change: number; supporting: string; conflicting: string; missing: string; action: string; }
export interface DealHealth { score: number; confidence: string; dimensions: DealDimension[]; }
export interface Stakeholder { id: string; name: string; title: string; buyingRole: BuyingRole; influence: "High" | "Medium" | "Low"; authority: "High" | "Medium" | "Low"; relationship: Relationship; sentiment: "Positive" | "Neutral" | "Cautious" | "Unknown"; engagement: string; lastInteraction: string; ownerRole: string; priorities: string[]; concerns: string[]; recommendedEngagement: string; confidence: number; x: number; y: number; }
export interface Competitor { name: string; position: string; risk: "High" | "Medium" | "Low"; }
export interface Risk { id: string; title: string; severity: "Critical" | "High" | "Medium" | "Low"; detail: string; mitigation: string; }
export interface Assumption { id: string; statement: string; owner: string; validation: "Validated" | "Pending" | "Unvalidated"; }
export interface Agent { id: string; name: string; description: string; task: string; inputs: string[]; output: string; confidence: number; evidence: number; policy: string; authority: string; }
export interface AgentActivity { agentId: string; status: "idle" | "running" | "complete"; timestamp: string; }
export interface Recommendation { id: string; title: string; purpose: string[]; whyNow: string; evidence: string[]; commitment: string; ownerRole: string; confidence: number; risks: string[]; alternative: string; status: "proposed" | "accepted" | "modified" | "rejected" | "deferred"; }
export interface CoachingQuestion { id: string; theme: string; question: string; }
export interface CoachingSession { id: string; opportunityId: string; messages: { speaker: "Seller" | "Coach"; text: string }[]; recommendationId: string; }
export interface Objection { title: string; response: string; }
export interface TalkTrack { stakeholder: string; themes: string[]; }
export interface MeetingBrief { objective: string; audience: string[]; summary: string[]; narrative: string[]; questions: string[]; objections: Objection[]; ask: string; commitments: string[]; }
export interface ActionItem { id: string; workstream: string; action: string; ownerRole: string; due: string; status: "Not started" | "In progress" | "Complete"; dependency: string; evidence: string; commitment: string; risk: string; }
export interface ActionPlan { id: string; opportunityId: string; items: ActionItem[]; }
export interface Approval { id: string; action: string; decision: string; reason: string; decidedByRole: string; timestamp: string; }
export interface OpportunityOutcome { label: string; before: number; after: number; unit: string; }
export interface KPI { label: string; value: string; detail: string; }
export interface ROIScenario { name: "Conservative" | "Base" | "Upside"; winRateLift: number; cycleReduction: number; reviewReduction: number; }
export interface AuditEvent { id: string; timestamp: string; actor: string; event: string; detail: string; }
export interface GovernanceControl { id: string; name: string; status: "Active" | "Review" | "Required"; owner: string; detail: string; }
export interface Opportunity {
  id: string; account: Account; name: string; value: number; stage: SalesStage; forecast: ForecastCategory;
  closeDate: string; daysInStage: number; health: number; forecastConfidence: number; momentum: "Improving" | "Stable" | "Declining";
  stakeholderCoverage: number; economicBuyer: "Engaged" | "Identified" | "Unknown"; champion: "Strong" | "Developing" | "Missing";
  competition: string; competitiveRisk: "High" | "Medium" | "Low"; blocker: string; nextAction: string; coachingStatus: "Urgent" | "Recommended" | "On track";
}
