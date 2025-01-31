export interface CitationGroup {
    citation_group_id: number;
    citation_group_name: string;
    citations: number[];
    functional_requirement: string;
    risk_level: string;
    penalty_details: string;
    frequency: string;
    automation_level: string;
}

export interface Citation {
    citation_id: number;
    citation_number: string;
    citation_text: string;
    functional_requirement?: string;
    risk_level?: string;
    jurisdiction?: string;
    jurisdictional_nuances?: string[];
    applicable_entities?: string[];
    compliance_frequency?: string;
    compliance_frequency_nuances?: string[];
    penalty_conditions?: string[];
    penalty_conditions_nuances?: string[];
    procedural_nuances?: string[];
}

export interface Cluster {
    id: number;
    groups: CitationGroup[];
    citations: Citation[];
}
