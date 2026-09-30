import type { ActionItem, Agent, AuditEvent, DealDimension, Evidence, GovernanceControl, KPI, MeetingBrief, Opportunity, Recommendation, Stakeholder } from "./types";

export const disclaimer = "Concept demonstration using synthetic account, opportunity, stakeholder, activity, conversation, product, competitor, financial, and CRM data. Deal scores, recommendations, forecasts, financial values, stakeholder assessments, and business outcomes are illustrative and do not represent actual customers, sellers, opportunities, systems, or commitments.";

const accounts = [
  ["northstar","Northstar Communications","Telecommunications","North America"],
  ["contoso","Contoso Retail Group","Retail","Europe"],
  ["fabrikam","Fabrikam Manufacturing","Manufacturing","North America"],
  ["adatum","A. Datum Financial","Financial services","Europe"],
  ["litware","Litware Logistics","Transportation","Asia Pacific"],
  ["woodgrove","Woodgrove Bank","Financial services","North America"],
  ["tailspin","Tailspin Energy","Energy","Middle East"],
  ["blueyonder","Blue Yonder Airlines","Travel","Europe"],
  ["proseware","Proseware Health","Healthcare","North America"],
  ["coho","Coho Foods","Consumer goods","Latin America"],
  ["treyresearch","Trey Research","Life sciences","Europe"],
  ["wideworld","Wide World Importers","Distribution","Asia Pacific"],
  ["humongous","Humongous Insurance","Insurance","North America"],
  ["graphicdesign","Graphic Design Institute","Education","Europe"],
  ["wingtip","Wingtip Toys","Retail","North America"],
] as const;

const opportunityNames = [
  "AI-enabled customer and network transformation","Unified commerce modernization","Smart factory transformation",
  "Risk intelligence platform","Connected logistics control tower","Cloud data estate renewal","Digital field operations",
  "Passenger experience modernization","Clinical operations intelligence","Supply planning transformation",
  "Research data platform","Global ERP modernization","Claims automation program","Secure learning platform","Customer insight acceleration",
];

const blockers = ["Executive access","Decision process","Value case","Procurement engagement","Data readiness","Competitive position","Commercial alignment","Security review"];
const nextActions = ["Secure executive value-alignment meeting","Validate customer-owned business case","Confirm decision process and timing","Map procurement approval path","Agree measurable success criteria","Run competitive differentiation session"];

export const opportunities: Opportunity[] = accounts.map((a, i) => ({
  id: a[0],
  account: { id: a[0], name: a[1], industry: a[2], region: a[3] },
  name: opportunityNames[i],
  value: i === 0 ? 28.5 : [42,31,24,19,37,22,16,26,12,18,34,21,14,9][i],
  stage: (["Solution validation","Business case","Qualification","Negotiation","Discovery"] as const)[i % 5],
  forecast: (["Best case","Commit","Pipeline","Upside"] as const)[i % 4],
  closeDate: `2026-${String(10 + (i % 3)).padStart(2,"0")}-${String(8 + i).padStart(2,"0")}`,
  daysInStage: i === 0 ? 47 : 18 + ((i * 9) % 55),
  health: i === 0 ? 54 : 42 + ((i * 7) % 47),
  forecastConfidence: i === 0 ? 46 : 45 + ((i * 9) % 46),
  momentum: (["Declining","Improving","Stable"] as const)[i % 3],
  stakeholderCoverage: i === 0 ? 56 : 42 + ((i * 8) % 51),
  economicBuyer: (["Identified","Engaged","Unknown"] as const)[i % 3],
  champion: (["Strong","Developing","Missing"] as const)[i % 3],
  competition: i % 4 === 0 ? "Active incumbent cloud provider" : i % 4 === 1 ? "Status quo" : i % 4 === 2 ? "Global systems integrator" : "Niche platform",
  competitiveRisk: (["High","Medium","Low"] as const)[i % 3],
  blocker: i === 0 ? "Executive sponsorship and decision process" : blockers[i % blockers.length],
  nextAction: i === 0 ? nextActions[0] : nextActions[i % nextActions.length],
  coachingStatus: (["Urgent","Recommended","On track"] as const)[i % 3],
}));

export const kpis: KPI[] = [
  { label: "Qualified pipeline", value: "$428M", detail: "37 strategic opportunities" },
  { label: "Stalled pipeline", value: "$96M", detail: "12 require intervention" },
  { label: "Stakeholder coverage", value: "64%", detail: "Across active buying groups" },
  { label: "Economic-buyer access", value: "58%", detail: "Confirmed direct access" },
  { label: "Champion coverage", value: "71%", detail: "Credible champion identified" },
  { label: "Win-rate improvement", value: "23%", detail: "Among coached opportunities" },
  { label: "Cycle reduction", value: "18 days", detail: "For progressed coached deals" },
  { label: "Recommendation acceptance", value: "82%", detail: "Accepted or modified" },
  { label: "Forecast-confidence coverage", value: "74%", detail: "Evidence-backed forecast" },
];

export const dealDimensions: DealDimension[] = [
  ["problem","Customer problem clarity",82,88,4,"Operations leadership confirmed service-cost and network-resilience pressure.","Urgency is not tied to the target close date.","Cost of inaction remains unquantified.","Quantify the cost of delay with the COO."],
  ["value","Business-value alignment",61,66,-2,"A draft value hypothesis links automation to service and operating outcomes.","Finance has not validated assumptions.","Customer-owned value measures and baseline are missing.","Validate the value model with finance and operations."],
  ["stakeholders","Stakeholder alignment",48,72,-5,"Technical and transformation relationships are active.","Executive sponsor is only indirectly informed.","Finance and procurement coverage is incomplete.","Expand the buying group before more validation."],
  ["champion","Champion strength",78,84,3,"The VP of Network Transformation is active and provides access.","Champion influence on investment approval is untested.","No evidence of internal selling to the COO.","Equip the champion with an executive value narrative."],
  ["buyer","Economic-buyer access",30,91,-8,"The COO is identified as the investment owner.","No direct meeting or validated priorities.","No customer commitment to executive engagement.","Secure direct economic-buyer engagement."],
  ["decision","Decision process",34,76,-7,"Target quarter and some criteria appear in CRM notes.","No agreed approval sequence or decision meeting.","Procurement, finance, legal, and timing are unconfirmed.","Co-create the decision path and dates."],
  ["competition","Competitive position",52,58,-4,"Technical feedback is positive.","The incumbent has an established relationship.","Customer differentiation criteria are incomplete.","Test differentiation with business stakeholders."],
  ["readiness","Commercial and delivery readiness",46,69,1,"Architecture validation is largely complete.","Procurement and legal have not started.","Budget is indicative and implementation ownership is unclear.","Sequence commercial and delivery discovery."],
].map(([id,name,score,confidence,change,supporting,conflicting,missing,action]) => ({ id: String(id), name: String(name), score: Number(score), confidence: Number(confidence), change: Number(change), supporting: String(supporting), conflicting: String(conflicting), missing: String(missing), action: String(action) }));

export const stakeholders: Stakeholder[] = [
  ["maya","Maya Desai","Chief Operating Officer","Economic buyer","High","High","Unknown","Unknown","Not engaged","None","Executive sponsor","Operating efficiency|Customer experience|Transformation risk","Business case uncertainty|Delivery disruption","Secure executive value-alignment meeting",92,50,11],
  ["daniel","Daniel Cho","Chief Information Officer","Executive sponsor","High","High","Developing","Positive","Indirectly engaged","18 days ago","Executive sponsor","Architecture|Security|Governance","Integration complexity|Data readiness","Confirm sponsorship and decision role",78,28,28],
  ["elena","Elena Ruiz","Chief Financial Officer","Business decision maker","High","High","Unknown","Unknown","Not engaged","None","Commercial lead","Return on investment|Margin|Risk","Unvalidated value assumptions","Validate financial model",83,73,29],
  ["martin","Martin Keller","Chief Procurement Officer","Procurement","High","High","Unknown","Unknown","Not engaged","None","Commercial lead","Commercial terms|Risk|Compliance","Late procurement engagement","Map approval path",88,84,52],
  ["priya","Priya Shah","VP Network Transformation","Champion","High","Medium","Strong","Positive","Highly engaged","3 days ago","Account executive","Network resilience|Automation|Delivery","Executive access|Implementation pace","Equip for internal executive advocacy",90,48,47],
  ["alex","Alex Morgan","VP Customer Experience","Business decision maker","Medium","Medium","Developing","Positive","Engaged","12 days ago","Industry advisor","Customer satisfaction|Service quality","Change adoption","Connect outcomes to customer metrics",74,16,56],
  ["sofia","Sofia Bennett","Director Enterprise Architecture","Technical decision maker","Medium","Medium","Strong","Positive","Highly engaged","2 days ago","Solution architect","Architecture|Security|Integration","Technical debt","Confirm remaining technical evidence",92,32,73],
  ["liam","Liam Carter","Director Strategic Sourcing","Procurement","Medium","Medium","Weak","Cautious","Limited","31 days ago","Commercial lead","Supplier risk|Terms|Value","Incomplete commercial detail","Schedule procurement discovery",69,70,75],
  ["jordan","Jordan Brooks","Programme Director","User","Medium","Low","Developing","Neutral","Engaged","8 days ago","Customer success","Adoption|Governance|Sequence","Resource capacity","Define implementation readiness",72,51,88],
].map(([id,name,title,buyingRole,influence,authority,relationship,sentiment,engagement,lastInteraction,ownerRole,priorities,concerns,recommendedEngagement,confidence,x,y]) => ({
  id:String(id), name:String(name), title:String(title), buyingRole:buyingRole as Stakeholder["buyingRole"], influence:influence as Stakeholder["influence"],
  authority:authority as Stakeholder["authority"], relationship:relationship as Stakeholder["relationship"], sentiment:sentiment as Stakeholder["sentiment"],
  engagement:String(engagement), lastInteraction:String(lastInteraction), ownerRole:String(ownerRole), priorities:String(priorities).split("|"), concerns:String(concerns).split("|"),
  recommendedEngagement:String(recommendedEngagement), confidence:Number(confidence), x:Number(x), y:Number(y),
}));

export const evidence: Evidence[] = [
  ["e1","Aug 14","Initial discovery workshop","Customer described service-cost pressure and fragmented operations.","Meeting evidence",87,"supporting"],
  ["e2","Aug 27","Technical architecture meeting","Architecture team validated core integration patterns.","Meeting evidence",91,"supporting"],
  ["e3","Sep 3","Customer requested business case","Transformation lead requested an outcome and value model.","Email evidence",86,"supporting"],
  ["e4","Sep 10","Competitive vendor introduced","Incumbent provider invited into the evaluation.","CRM data",71,"conflicting"],
  ["e5","Sep 18","Solution validation completed","Priority technical scenarios passed the simulated review.","Customer commitment",90,"supporting"],
  ["e6","Sep 25","Executive meeting delayed","No replacement date agreed with the COO office.","Meeting evidence",88,"conflicting"],
  ["e7","Oct 1","Procurement requested more detail","Sourcing asked for scope, assumptions, and commercial structure.","Email evidence",79,"conflicting"],
  ["e8","Oct 7","Revised value model requested","Customer asked for validated operational baselines.","Customer commitment",84,"supporting"],
  ["e9","Oct 15","No confirmed decision meeting","Target close remains a seller assumption.","Agent inference",93,"missing"],
  ["e10","Today","Current coaching analysis","Five agents identify executive validation as the critical path.","Business rule",89,"supporting"],
].map(([id,date,title,detail,type,confidence,status]) => ({ id:String(id), date:String(date), title:String(title), detail:String(detail), source:{type:String(type),label:String(type)}, confidence:Number(confidence), status:status as Evidence["status"] }));

export const agents: Agent[] = [
  ["supervisor","Sales Coach Supervisor Agent","Orchestrates shared deal state and human approval.","Reconciling specialist conclusions",["Opportunity context","Specialist outputs","Authority rules"],"One explainable next move",91,42,"Human approval for material action","Recommend only"],
  ["health","Deal Health Agent","Separates demonstrated progress from activity.","Assessing eight health dimensions",["CRM","Meetings","Commitments"],"54/100, concentrated risk",88,31,"Evidence transparency","Diagnose"],
  ["stakeholder","Stakeholder Mapping Agent","Maps coverage, influence, and missing roles.","Finding buying-group gaps",["Contacts","Interactions","Role assumptions"],"Economic buyer and procurement gap",90,24,"Known vs inferred relationships","Diagnose"],
  ["coaching","Coaching Agent","Recommends the single best uncertainty-reducing action.","Ranking next moves",["Health","Stakeholders","Risks"],"Executive value-alignment meeting",86,37,"Customer commitment required","Recommend"],
  ["meeting","Meeting Prep Agent","Builds outcome-led executive preparation.","Preparing the executive conversation",["Recommendation","Audience","Evidence"],"Executive meeting brief",84,28,"No autonomous customer contact","Prepare"],
].map(([id,name,description,task,inputs,output,confidence,evidenceCount,policy,authority]) => ({ id:String(id),name:String(name),description:String(description),task:String(task),inputs:inputs as string[],output:String(output),confidence:Number(confidence),evidence:Number(evidenceCount),policy:String(policy),authority:String(authority) }));

export const recommendation: Recommendation = {
  id:"rec-1", title:"Secure an executive value-alignment meeting with the COO.",
  purpose:["Validate the business outcome","Confirm executive priority","Test the value case","Confirm decision criteria and timing","Establish a customer-owned next step"],
  whyNow:"Technical activity is increasing while decision confidence is declining. Additional validation will not resolve the missing executive and commercial evidence.",
  evidence:["No direct economic-buyer engagement","Decision process remains unconfirmed","Business case is customer-requested but unvalidated","47 days in stage","Last meaningful customer commitment was 24 days ago"],
  commitment:"The customer confirms priority outcomes, decision team, criteria, timing, and owners for open evidence.",
  ownerRole:"Account executive", confidence:86, risks:["Further technical work without decision progress","Incumbent gains executive access","Forecast slips without a customer-owned date"],
  alternative:"Run a value-model validation workshop with finance and operations.", status:"proposed",
};

export const meetingBrief: MeetingBrief = {
  objective:"Validate the transformation priority, confirm measurable business outcomes, and agree on the customer’s decision process.",
  audience:["Maya Desai — COO","Daniel Cho — CIO","Priya Shah — VP Network Transformation"],
  summary:["Northstar has strong technical engagement but incomplete executive and commercial validation.","The opportunity is stalled because no executive-owned outcome, business case, or decision process is confirmed.","The meeting should trade solution detail for an agreed business decision path."],
  narrative:["Customer challenge","Business impact","Transformation opportunity","Proposed approach","Evidence and value","Decision required","Recommended next step"],
  questions:["Which operating outcome matters most this quarter?","What is the measurable cost of leaving the current model unchanged?","How will you judge whether this transformation is successful?","Who owns the investment decision and outcome accountability?","Which assumptions in the value hypothesis require validation?","What decision criteria will the executive team apply?","Which approvals must occur, and in what sequence?","What customer-owned milestone should govern the target date?"],
  objections:[
    {title:"Business case uncertainty",response:"Validate customer-owned baselines first, then refine the model around agreed outcomes rather than vendor assumptions."},
    {title:"Implementation complexity",response:"Sequence priority use cases and decision gates; do not ask for a single irreversible transformation commitment."},
    {title:"Current vendor relationship",response:"Focus comparison on the customer’s outcome criteria and transition risk, not feature volume."},
    {title:"Data readiness",response:"Separate decision-critical data gaps from implementation work and assign owners to each."},
    {title:"Change management",response:"Define adoption measures and business ownership before finalizing the delivery sequence."},
    {title:"Security and governance",response:"Use an approved architecture and evidence plan with explicit controls and review points."},
    {title:"Investment timing",response:"Tie timing to cost of delay and a customer-owned decision milestone."},
    {title:"Outcome accountability",response:"Name the executive owner and operating teams responsible for measurable results."},
  ],
  ask:"Agree on the priority business outcomes, nominate the executive decision team, and confirm the decision process and timing.",
  commitments:["Validate the value hypothesis","Confirm stakeholder roles","Agree decision criteria","Set decision meeting","Assign owners for open evidence"],
};

const workstreams: Record<string,string[]> = {
  Seller:["Secure the executive value-alignment meeting","Confirm business outcomes","Validate the decision process","Record the customer-owned commitment"],
  "Solution team":["Simplify the technical narrative","Identify priority use cases","Confirm architecture assumptions","Document implementation dependencies"],
  "Industry advisor":["Connect the solution to industry outcomes","Strengthen the executive narrative","Clarify business-model implications"],
  "Executive sponsor":["Align with the customer executive","Validate the executive decision path","Support escalation where appropriate"],
  "Commercial team":["Validate the commercial approach","Identify approval dependencies","Confirm procurement sequence"],
  "Customer success":["Define adoption assumptions","Establish measurable outcomes","Prepare success measures"],
};

export const actionItems: ActionItem[] = Object.entries(workstreams).flatMap(([workstream, actions], wi) => actions.map((action, ai) => ({
  id:`a-${wi}-${ai}`,workstream,action,ownerRole:workstream,due:`Oct ${18 + wi * 2 + ai}`,status:wi === 0 && ai === 0 ? "In progress" : "Not started",
  dependency:ai === 0 ? "Recommendation approval" : actions[ai-1],evidence:"Documented customer or internal confirmation",commitment:wi === 0 ? "Customer-owned next step" : "Prepared pursuit input",risk:wi < 2 ? "High" : "Medium",
})));

export const governanceControls: GovernanceControl[] = [
  ["g1","Data-source authorization","Active","Data owner","Only approved synthetic sources are available in this concept."],
  ["g2","Least-privilege access","Active","Security","Role-based access and managed identity are proposed."],
  ["g3","Evidence freshness","Review","Sales operations","Stale or missing evidence remains visible."],
  ["g4","Human decision","Active","Seller / manager","Agents recommend; authorized people decide."],
  ["g5","CRM write control","Active","Platform owner","No autonomous CRM changes are permitted."],
  ["g6","Customer contact control","Active","Sales leadership","No autonomous customer communications are permitted."],
  ["g7","Recommendation audit","Active","Governance","Evidence, confidence, decision, and override reason are recorded."],
  ["g8","Outcome monitoring","Required","Revenue operations","Production outcomes require validated measurement design."],
].map(([id,name,status,owner,detail]) => ({id,name,status:status as GovernanceControl["status"],owner,detail}));

export const initialAudit: AuditEvent[] = [
  {id:"audit-1",timestamp:"09:02",actor:"System",event:"Opportunity selected",detail:"Northstar Telecom Transformation loaded from synthetic data."},
  {id:"audit-2",timestamp:"09:03",actor:"Sales Coach Supervisor Agent",event:"Analysis initialized",detail:"Read-only evidence assembly authorized for demonstration."},
];

export const walkthrough = [
  ["The Enterprise Sales Challenge","Complex Deals Stall for Reasons Hidden Across Systems and Conversations","Opportunity data, stakeholder relationships, customer commitments, competitive signals, and meeting evidence are often reviewed separately.","/"],
  ["One Deal Becomes the Priority","The Coach Identifies a Strategic Opportunity That Has Lost Momentum","The primary opportunity has meaningful value and technical activity, but no executive meeting, no confirmed decision process, and limited procurement engagement.","/deal/northstar"],
  ["Diagnose Deal Health","The Deal Health Agent Separates Progress from Activity","The coach evaluates need, value, stakeholders, competition, readiness, and next-step quality.","/health"],
  ["Find the Missing Stakeholders","The Stakeholder Mapping Agent Reveals the Buying-Group Gap","Strong technical relationships do not compensate for missing economic-buyer and procurement engagement.","/stakeholders"],
  ["Surface the Real Risk","The Most Important Risk Is Not Product Fit","The opportunity is aligned, but the customer has not agreed to a decision process, business case, or executive outcome.","/health"],
  ["Recommend the Next Best Move","The Coach Recommends One Clear Action","Secure an executive value-alignment meeting before investing further in technical validation.","/coaching"],
  ["Prepare the Seller","The Meeting Prep Agent Converts Deal Evidence into an Executive Conversation","The seller receives an outcome-led narrative, questions, objections, talking points, and a clear ask.","/meeting-prep"],
  ["Seller and Manager Remain in Control","Agents Recommend. Sales Teams Decide.","The seller and manager can accept, modify, defer, or reject and record the reason.","/coaching"],
  ["Convert Coaching into Action","The Agreed Coaching Move Becomes an Account-Team Action Plan","Accountable next steps coordinate seller, solution, sponsor, commercial, and success roles.","/actions"],
  ["Measure Deal Progression","The System Measures Whether the Coaching Changed the Deal","Executives can see relationship expansion, commitments, velocity, win rate, and forecast confidence.","/outcomes"],
  ["Microsoft Architecture and Governance","A Governed Microsoft Foundation Connects Data, Reasoning, and Seller Experience","Microsoft cloud services form a proposed, authorized foundation for data, reasoning, and seller experience.","/architecture"],
  ["Strategic Message","Better Deal Visibility Enables Better Sales Decisions","Read the deal. Find the gap. Coach the move. Prepare the seller. Measure the progress.","/"],
] as const;
