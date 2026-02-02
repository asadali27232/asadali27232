// Data (COLUMNS, CONNECTIONS) is loaded from data.js
const connections = typeof CONNECTIONS !== 'undefined' ? CONNECTIONS : [];

// DOM Elements
const svg = document.getElementById('connections');
const canvas = document.getElementById('canvas');
const lines = [];

// #region agent log
function _log(location, message, data, hypothesisId) {
    fetch('http://127.0.0.1:7242/ingest/7d630465-7d64-4cee-a005-a9d882681341', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            location,
            message,
            data: data || {},
            timestamp: Date.now(),
            sessionId: 'debug-session',
            hypothesisId,
        }),
    }).catch(function () {});
}
// #endregion

// Node type to line color (matches CSS accents; edu same as exp for edge gradient)
const NODE_COLORS = {
    skill: '#8b5cf6',
    exp: '#3b82f6',
    cert: '#d4a24c',
    proj: '#0d9488',
    edu: '#3b82f6',
};

function getNodeColor(el) {
    if (el.classList.contains('skill')) return NODE_COLORS.skill;
    if (el.classList.contains('exp')) return NODE_COLORS.exp;
    if (el.classList.contains('cert')) return NODE_COLORS.cert;
    if (el.classList.contains('proj')) return NODE_COLORS.proj;
    if (el.classList.contains('edu')) return NODE_COLORS.edu;
    return '#64748b';
}

/**
 * Draw connection lines between nodes (gradient from source node color to target node color)
 */
function drawLines() {
    // #region agent log
    _log(
        'main.js:drawLines',
        'drawLines called',
        { svgNull: svg === null, canvasNull: canvas === null },
        'H1'
    );
    if (!svg || !canvas) return;
    // #endregion
    const defs = svg.querySelector('defs');
    svg.innerHTML = '';
    if (defs) svg.appendChild(defs);
    lines.length = 0;

    const scrollW = canvas.scrollWidth;
    const scrollH = canvas.scrollHeight;
    svg.setAttribute('width', scrollW);
    svg.setAttribute('height', scrollH);
    svg.setAttribute('viewBox', `0 0 ${scrollW} ${scrollH}`);

    connections.forEach((conn, index) => {
        // #region agent log
        const startId = conn && conn[0],
            endId = conn && conn[1];
        if (conn == null || !Array.isArray(conn) || conn.length < 2) {
            _log(
                'main.js:drawLines',
                'malformed connection',
                { index, conn },
                'H4'
            );
            return;
        }
        // #endregion
        const startEl = document.getElementById(startId);
        const endEl = document.getElementById(endId);
        if (!startEl || !endEl) return;

        const startRect = startEl.getBoundingClientRect();
        const endRect = endEl.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        const scrollLeft = canvas.scrollLeft;
        const scrollTop = canvas.scrollTop;

        const x1 = startRect.right - canvasRect.left + scrollLeft;
        const y1 =
            startRect.top + startRect.height / 2 - canvasRect.top + scrollTop;
        const x2 = endRect.left - canvasRect.left + scrollLeft;
        const y2 =
            endRect.top + endRect.height / 2 - canvasRect.top + scrollTop;

        const startColor = getNodeColor(startEl);
        const endColor = getNodeColor(endEl);

        const gradId = `lineGrad-${index}`;
        const grad = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'linearGradient'
        );
        grad.setAttribute('id', gradId);
        grad.setAttribute('gradientUnits', 'userSpaceOnUse');
        grad.setAttribute('x1', x1);
        grad.setAttribute('y1', y1);
        grad.setAttribute('x2', x2);
        grad.setAttribute('y2', y2);
        const stop1 = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'stop'
        );
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', startColor);
        const stop2 = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'stop'
        );
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', endColor);
        grad.appendChild(stop1);
        grad.appendChild(stop2);
        defs.appendChild(grad);

        const path = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
        );
        const controlOffset = Math.abs(x2 - x1) / 2;
        const d = `M ${x1} ${y1} C ${x1 + controlOffset} ${y1}, ${
            x2 - controlOffset
        } ${y2}, ${x2} ${y2}`;

        path.setAttribute('d', d);
        svg.appendChild(path);
        lines.push({ path, startId, endId, gradId });
    });
}

/**
 * Create a single node DOM element from node data
 */
function createNodeEl(node) {
    const div = document.createElement('div');
    div.className = `node ${node.type}`;
    div.id = node.id;

    if (node.type === 'skill') {
        div.innerHTML = `
            <div class="node-icon">
                <img src="${escapeHtml(node.icon)}" alt="${escapeHtml(
            node.alt
        )}" />
            </div>
            <h3>${escapeHtml(node.title)}</h3>
        `;
    } else if (node.type === 'exp' || node.type === 'edu') {
        div.innerHTML = `
            <div class="node-header">
                <div class="node-icon">
                    <img src="${escapeHtml(node.icon)}" alt="${escapeHtml(
            node.alt
        )}" />
                </div>
                <h3>${escapeHtml(node.title)}</h3>
            </div>
            <p class="role">${escapeHtml(node.role || '')}</p>
        `;
    } else if (node.type === 'cert' || node.type === 'proj') {
        div.innerHTML = `
            <div class="node-header">
                <div class="node-icon">
                    <img src="${escapeHtml(node.icon)}" alt="${escapeHtml(
            node.alt
        )}" />
                </div>
                <h3>${escapeHtml(node.title)}</h3>
            </div>
            <span class="badge">${escapeHtml(node.badge || '')}</span>
        `;
    }

    return div;
}

function escapeHtml(text) {
    const span = document.createElement('span');
    span.textContent = text;
    return span.innerHTML;
}

/**
 * Render all columns and nodes from COLUMNS data into #columns-container
 */
function renderNodes() {
    if (typeof COLUMNS === 'undefined') return;
    const container = document.getElementById('columns-container');
    if (!container) return;

    container.innerHTML = '';
    COLUMNS.forEach((col) => {
        const columnEl = document.createElement('div');
        columnEl.className = 'canvas-column';
        columnEl.innerHTML = `
            <div class="column-header">${escapeHtml(col.header)}</div>
            <div class="column-nodes"></div>
        `;
        const nodesContainer = columnEl.querySelector('.column-nodes');
        col.nodes.forEach((node) => {
            nodesContainer.appendChild(createNodeEl(node));
        });
        container.appendChild(columnEl);
    });
}

/**
 * Find the tallest column and set all columns to that column's width
 */
function matchColumnWidths() {
    const container = document.getElementById('columns-container');
    if (!container) return;
    const columns = container.querySelectorAll('.canvas-column');
    if (columns.length === 0) return;

    let maxHeight = 0;
    let targetWidth = 0;
    columns.forEach((col) => {
        const h = col.offsetHeight;
        if (h > maxHeight) {
            maxHeight = h;
            targetWidth = col.offsetWidth;
        }
    });
    // #region agent log
    _log(
        'main.js:matchColumnWidths',
        'matchColumnWidths result',
        { targetWidth, maxHeight, columnsLength: columns.length },
        'H5'
    );
    // #endregion
    if (targetWidth > 0) {
        container.style.setProperty('--column-width', targetWidth + 'px');
        container.classList.add('column-widths-matched');
    }
}

/**
 * Update stats bar counts from COLUMNS data
 */
function updateStats() {
    if (typeof COLUMNS === 'undefined') return;
    const statsBar = document.querySelector('.stats-bar');
    if (!statsBar) return;
    const counts = [
        COLUMNS[0]?.nodes.length ?? 0,
        COLUMNS[1]?.nodes.length ?? 0,
        COLUMNS[2]?.nodes.length ?? 0,
        COLUMNS[3]?.nodes.length ?? 0,
    ];
    const values = statsBar.querySelectorAll('.stat-value');
    values.forEach((el, i) => {
        if (counts[i] !== undefined) el.textContent = String(counts[i]);
    });
}

/**
 * Check if two nodes are connected
 */
function isNodeConnected(currId, targetId) {
    return connections.some(
        ([s, e]) =>
            (s === currId && e === targetId) || (e === currId && s === targetId)
    );
}

/**
 * Initialize node hover interactions
 */
function initNodeInteractions() {
    const nodes = document.querySelectorAll('.node');

    nodes.forEach((node) => {
        node.addEventListener('mouseenter', () => {
            const id = node.id;

            lines.forEach((line) => {
                const isConnected = line.startId === id || line.endId === id;
                if (isConnected) {
                    line.path.classList.add('active');
                    line.path.style.stroke = `url(#${line.gradId})`;
                    // #region agent log
                    const startEl = document.getElementById(line.startId),
                        endEl = document.getElementById(line.endId);
                    if (!startEl || !endEl) {
                        _log(
                            'main.js:mouseenter',
                            'missing node on hover',
                            { startId: line.startId, endId: line.endId },
                            'H2'
                        );
                        return;
                    }
                    // #endregion
                    startEl.style.opacity = '1';
                    endEl.style.opacity = '1';
                } else {
                    line.path.style.opacity = '0.1';
                    line.path.style.stroke = '';
                }
            });

            nodes.forEach((n) => {
                if (n.id !== id && !isNodeConnected(id, n.id)) {
                    n.style.opacity = '0.25';
                }
            });
        });

        node.addEventListener('mouseleave', () => {
            lines.forEach((line) => {
                line.path.classList.remove('active');
                line.path.style.stroke = '';
                line.path.style.opacity = '';
            });
            nodes.forEach((n) => {
                n.style.opacity = '';
            });
        });
    });
}

/**
 * Initialize legend filtering
 */
function initLegendFiltering() {
    const legendItems = document.querySelectorAll('.legend-item');
    const nodes = document.querySelectorAll('.node');

    legendItems.forEach((item) => {
        item.addEventListener('click', () => {
            const filter = item.dataset.filter;
            const isActive = item.classList.contains('active');

            legendItems.forEach((li) => li.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
                nodes.forEach((node) => {
                    node.style.opacity = node.classList.contains(filter)
                        ? '1'
                        : '0.2';
                });
                lines.forEach((line) => {
                    const startNode = document.getElementById(line.startId);
                    const endNode = document.getElementById(line.endId);
                    // #region agent log
                    if (!startNode || !endNode) {
                        _log(
                            'main.js:legendFilter',
                            'missing node on filter',
                            { startId: line.startId, endId: line.endId },
                            'H3'
                        );
                        return;
                    }
                    // #endregion
                    line.path.style.opacity =
                        startNode.classList.contains(filter) ||
                        endNode.classList.contains(filter)
                            ? '0.6'
                            : '0.1';
                });
            } else {
                nodes.forEach((node) => {
                    node.style.opacity = '';
                });
                lines.forEach((line) => {
                    line.path.style.opacity = '';
                });
            }
        });
    });
}

/**
 * Hide stats bar when scrolling down, show when scrolling up or at rest (with animation)
 */
function initStatsBarScroll() {
    const statsBar = document.querySelector('.stats-bar');
    if (!statsBar || !canvas) return;

    let lastScrollTop = canvas.scrollTop;
    let atRestTimeout = null;
    const atRestDelay = 250;

    function updateVisibility() {
        const scrollTop = canvas.scrollTop;
        const scrollingDown = scrollTop > lastScrollTop;

        if (scrollingDown && scrollTop > 10) {
            statsBar.classList.add('stats-bar--hidden');
        } else {
            statsBar.classList.remove('stats-bar--hidden');
        }

        lastScrollTop = scrollTop;

        clearTimeout(atRestTimeout);
        atRestTimeout = setTimeout(() => {
            statsBar.classList.remove('stats-bar--hidden');
            lastScrollTop = canvas.scrollTop;
        }, atRestDelay);
    }

    canvas.addEventListener('scroll', updateVisibility, { passive: true });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    renderNodes();
    updateStats();
    matchColumnWidths();
    initStatsBarScroll();
    setTimeout(() => {
        matchColumnWidths();
        drawLines();
    }, 100);
    initNodeInteractions();
    initLegendFiltering();
});

// Event listeners
window.addEventListener('resize', () => {
    matchColumnWidths();
    drawLines();
});
if (canvas) canvas.addEventListener('scroll', drawLines);
