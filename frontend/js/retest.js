/**
 * Post-Fix Performance Regression Chart Analytics Simulation
 * Loads validation metrics from the backend and animates the result cards.
 */
document.addEventListener("DOMContentLoaded", async () => {
    const oldSuccessEl = document.getElementById('oldSuccess');
    if (!oldSuccessEl) return;

    try {
        const data = await API.getLatestFindings();
        if (!data || !data.retest_metrics) return;

        oldSuccessEl.innerText = data.retest_metrics.old_success;
        document.getElementById('newSuccess').innerText = data.retest_metrics.new_success;

        // Animate the after card to show improvement highlight
        setTimeout(() => {
            const afterCard = document.getElementById('afterCard');
            if (afterCard) afterCard.classList.add('active');
        }, 400);

        // Extract integer percentage values and update the comparison view
        const before = parseInt(data.retest_metrics.old_success) || 60;
        const after = parseInt(data.retest_metrics.new_success) || 98;
        
        if (typeof showComparison === 'function') {
            showComparison(before, after);
        }

    } catch (err) {
        console.error("Could not coordinate validation run parameters: ", err);
    }
});