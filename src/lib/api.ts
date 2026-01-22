// API client for ClinicOS backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Client {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
    birth_date: string | null;
    location_id: string;
    total_visits: number;
    lifetime_spend: number;
    segment: string | null;
}

export interface SegmentSummary {
    total_clients: number;
    segment_counts: Record<string, number>;
    segment_details: Record<string, Array<{
        id: string;
        name: string;
        email: string;
        confidence: number;
    }>>;
}

export interface WorkflowResult {
    workflow_id: string;
    workflow_name: string;
    status: string;
    started_at: string;
    completed_at: string;
    steps: Array<{
        name: string;
        status: string;
        result: Record<string, unknown>;
    }>;
    summary: Record<string, unknown>;
}

export const api = {
    // Health check
    getInfo: async () => {
        const res = await fetch(`${API_URL}/info`);
        return res.json();
    },

    // Clients
    getClients: async (limit = 100): Promise<Client[]> => {
        const res = await fetch(`${API_URL}/clients?limit=${limit}`);
        return res.json();
    },

    classifyClient: async (id: string) => {
        const res = await fetch(`${API_URL}/clients/${id}/classify`);
        return res.json();
    },

    // Segments
    getSegmentSummary: async (): Promise<SegmentSummary> => {
        const res = await fetch(`${API_URL}/segments/summary`);
        return res.json();
    },

    // Workflows
    getWorkflows: async () => {
        const res = await fetch(`${API_URL}/workflows`);
        return res.json();
    },

    runWorkflow: async (workflowId: string): Promise<WorkflowResult> => {
        const res = await fetch(`${API_URL}/workflows/${workflowId}/run`, {
            method: 'POST',
        });
        return res.json();
    },

    // Copy Generation
    generateCopy: async (copyType: string, clientId?: string) => {
        const res = await fetch(`${API_URL}/copy/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ copy_type: copyType, client_id: clientId }),
        });
        return res.json();
    },
};
