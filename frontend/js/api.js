/**
 * Shared Fetch Abstraction Layer
 * Interfaces directly with the FastAPI server running on localhost port 8000.
 */
const BASE_URL = 'http://127.0.0.1:8081/api';

const API = {
    async startAudit(url, goal) {
        const response = await fetch(`${BASE_URL}/audit/start`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, goal })
        });
        if (!response.ok) throw new Error('Failed to initialize Orchestrator agent pipeline.');
        return await response.json();
    },

    async getStatus(taskId) {
        const response = await fetch(`${BASE_URL}/audit/status/${taskId}`);
        if (!response.ok) throw new Error(`Error tracking execution for task: ${taskId}`);
        return await response.json();
    },

    async getLatestFindings() {
        const response = await fetch(`${BASE_URL}/audit/latest`);
        if (!response.ok) throw new Error('Could not pull latest audit intelligence profile.');
        return await response.json();
    }
};