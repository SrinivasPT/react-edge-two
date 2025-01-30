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
}

export interface Cluster {
    id: number;
    groups: CitationGroup[];
    citations: Citation[];
}
