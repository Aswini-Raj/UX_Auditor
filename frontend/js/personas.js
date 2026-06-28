/**
 * Persona Manager Agent Interface Handler
 * Fetches real-time persona data from the backend and renders full persona cards.
 * Falls back to default enriched persona profiles with trait lists if backend has no data.
 */
document.addEventListener("DOMContentLoaded", async () => {
    const matrix = document.getElementById('personaMatrix');
    if (!matrix) return;

    // Persona color themes and emoji avatars
    const personaMeta = [
        { emoji: '🧑‍💻', color: 'linear-gradient(135deg, #6366f1, #8b5cf6)', role: 'New Registrant' },
        { emoji: '👴', color: 'linear-gradient(135deg, #f59e0b, #f97316)', role: 'Senior Demographic' },
        { emoji: '📱', color: 'linear-gradient(135deg, #06b6d4, #6366f1)', role: 'Mobile-First User' },
        { emoji: '♿', color: 'linear-gradient(135deg, #10b981, #06b6d4)', role: 'Assistive Tech User' }
    ];

    try {
        const data = await API.getLatestFindings();

        // Use real backend personas if available, else fall back to enriched defaults
        const personas = (data.personas && data.personas.length > 0) ? data.personas : [
            {
                name: "First-Time User",
                focus: "Struggles with dynamic onboarding setups",
                traits: ["High intent, low friction tolerance", "Confused by multi-step inputs", "Expects inline validation cues"]
            },
            {
                name: "Elderly User",
                focus: "Readability metrics and low-contrast elements",
                traits: ["Needs 16px+ base typography", "Dependent on high text-contrast", "Requires prominent confirmation signals"]
            },
            {
                name: "Mobile Consumer",
                focus: "Viewport constraint structural rendering flaws",
                traits: ["Strict touch-target requirements", "Highly sensitive to layout shifts", "Vulnerable to intrusive layouts"]
            },
            {
                name: "Accessibility User",
                focus: "Deviations from logical keyboard DOM layouts",
                traits: ["Strict tab-navigation reliance", "Depends on explicit ARIA labels", "Vulnerable to focus containment traps"]
            }
        ];

        matrix.innerHTML = '';
        personas.forEach((p, i) => {
            const meta = personaMeta[i % personaMeta.length];
            let traitsHTML = '';
            if (p.traits && p.traits.length > 0) {
                p.traits.forEach(t => {
                    traitsHTML += `<li><span class="trait-dot"></span>${t}</li>`;
                });
            } else {
                traitsHTML = `<li><span class="trait-dot"></span>${p.focus}</li><li><span class="trait-dot"></span>Evaluating operational pipeline rules</li>`;
            }

            matrix.innerHTML += `
                <div class="persona-card" style="--persona-color: ${meta.color};">
                    <div class="p-header">
                        <div class="p-avatar" style="background: ${meta.color};">${meta.emoji}</div>
                        <div>
                            <div class="p-name">${p.name}</div>
                            <div class="p-role">${meta.role}</div>
                        </div>
                    </div>
                    <div class="p-focus-tag">
                        🎯 ${p.focus}
                    </div>
                    <ul class="trait-list">${traitsHTML}</ul>
                </div>`;
        });

    } catch (err) {
        console.error("Error building persona cards matrix: ", err);
        matrix.innerHTML = `<p style="color:var(--text-secondary);padding:2rem;text-align:center;">No personas instantiated yet. Run an audit from the initialization workspace to generate profiles.</p>`;
    }
});