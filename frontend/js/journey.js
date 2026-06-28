/**
 * Journey Map Event Interactive Nodes Switcher
 * Accepts the element reference or element ID for reliable active-state tracking.
 */
function switchStep(title, url, clicks, time, viewport, errors, element) {
    const panelTitle = document.getElementById('panelTitle');
    const panelUrl = document.getElementById('panelUrl');
    const metaClicks = document.getElementById('metaClicks');
    const metaTime = document.getElementById('metaTime');
    const metaViewport = document.getElementById('metaViewport');
    const metaErrors = document.getElementById('metaErrors');

    if (!panelTitle) return; // Prevent scope breakage if called on non-journey views

    // Update active state on node
    document.querySelectorAll('.step-node').forEach(el => el.classList.remove('active'));
    
    let targetNode = null;
    if (typeof element === 'string') {
        targetNode = document.getElementById(element);
    } else if (element) {
        targetNode = element;
    } else if (window.event && window.event.currentTarget) {
        targetNode = window.event.currentTarget;
    }
    
    if (targetNode) targetNode.classList.add('active');

    panelTitle.innerText = title;
    
    // Dynamically manage real screenshots vs mock step buffers
    const screenshot = document.getElementById('journeyScreenshot');
    const placeholder = document.getElementById('screenshotPlaceholder');
    
    if (screenshot && placeholder) {
        if (title.includes('Home') || title.includes('Entrypoint')) {
            screenshot.src = `assets/screenshots/screenshot.png?t=${new Date().getTime()}`;
            screenshot.style.display = 'block';
            placeholder.style.display = 'none';
            if (panelUrl) panelUrl.innerText = url;
        } else {
            screenshot.style.display = 'none';
            placeholder.style.display = 'flex';
            const fallbackUrl = document.getElementById('panelUrl');
            if (fallbackUrl) fallbackUrl.innerText = url;
        }
    } else {
        if (panelUrl) panelUrl.innerText = url;
    }

    if (metaClicks) metaClicks.innerText = `${clicks} Clicks / Form Submissions`;
    if (metaTime) metaTime.innerText = `${time} Total Processing Window`;
    if (metaViewport) metaViewport.innerText = viewport;
    if (metaErrors) {
        metaErrors.innerText = errors;
        metaErrors.style.color = (errors.includes('alerts') || errors.includes('Friction') || errors.includes('anomaly'))
            ? "var(--danger)"
            : "var(--success)";
    }
}