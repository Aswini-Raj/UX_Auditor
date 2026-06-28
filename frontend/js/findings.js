/**
 * Formats UX Intelligence Layer Data Layouts
 */
document.addEventListener("DOMContentLoaded", async () => {
    const wrapper = document.getElementById('issuesWrapper');
    if (!wrapper) return;

    try {
        const auditData = await API.getLatestFindings();
        
        document.getElementById('navClarity').innerText = `${auditData.heuristic_score || '--'}`;
        document.getElementById('a11yFailures').innerText = auditData.issues ? auditData.issues.filter(i => i.type === 'WCAG').length : '0';
        document.getElementById('frictionEvents').innerText = auditData.issues ? auditData.issues.filter(i => i.type === 'Friction').length : '0';

        wrapper.innerHTML = '';
        if (!auditData.issues || auditData.issues.length === 0) {
            wrapper.innerHTML = '<p>No issue elements registered for this workspace yet.</p>';
            return;
        }

        auditData.issues.forEach(issue => {
            const severityClass = issue.severity.toLowerCase();
            wrapper.innerHTML += `
                <div class="issue-card ${severityClass}">
                    <div class="issue-header">
                        <div>
                            <span class="badge badge-${severityClass}">${issue.severity}</span>
                            <strong style="font-size:1.15rem; margin-left:0.5rem; color:var(--text-primary);">${issue.title}</strong>
                        </div>
                        <span style="font-size:0.85rem; color:var(--text-muted); font-weight:bold;">${issue.type} AGENT</span>
                    </div>
                    <p style="color: var(--text-secondary); font-size:0.95rem; margin-top:0.5rem;">${issue.description}</p>
                    <div class="analysis-block">
                        <strong>🕵️ Root Cause Analysis:</strong> ${issue.root_cause}
                    </div>
                </div>`;
        });
    } catch (err) {
        wrapper.innerHTML = `<p style="color:var(--danger)">Error loading runtime findings layer: ${err.message}</p>`;
    }
});