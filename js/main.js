// Connections config - defines relationships between skills and other nodes
const connections = [
    ['skill_dbt', 'role_devsinc'],
    ['skill_dbt', 'cert_dbt'],
    ['skill_snowflake', 'role_devsinc'],
    ['skill_snowflake', 'cert_snow'],
    ['skill_de', 'role_devsinc'],
    ['skill_de', 'edu_comsats'],
    ['skill_de', 'cert_aws_de'],
    ['skill_de', 'cert_datacamp'],
    ['skill_python', 'role_ml1'],
    ['skill_python', 'cert_python'],
    ['skill_python', 'proj_youtube'],
    ['skill_python', 'proj_terraform'],
    ['skill_python', 'proj_airflow'],
    ['skill_python', 'edu_comsats'],
    ['skill_sql', 'edu_comsats'],
    ['skill_sql', 'cert_sql'],
    ['skill_sql', 'role_devsinc'],
    ['skill_sql', 'proj_terraform'],
    ['skill_etl', 'role_wwa'],
    ['skill_etl', 'proj_youtube'],
    ['skill_etl', 'proj_terraform'],
    ['skill_etl', 'cert_intro_de'],
    ['skill_dw', 'edu_comsats'],
    ['skill_dw', 'role_devsinc'],
    ['skill_aws', 'cert_intro_de'],
    ['skill_aws', 'cert_aws_de'],
    ['skill_aws', 'role_devsinc'],
    ['skill_aws', 'proj_youtube'],
    ['skill_aws', 'proj_terraform'],
    ['skill_aws', 'proj_airflow'],
    ['skill_airflow', 'role_devsinc'],
    ['skill_airflow', 'proj_airflow'],
    ['skill_lambda', 'proj_youtube'],
    ['skill_glue', 'proj_youtube'],
    ['skill_glue', 'proj_terraform'],
    ['skill_athena', 'proj_youtube'],
    ['skill_athena', 'proj_terraform'],
    ['skill_terraform', 'proj_terraform'],
    ['skill_rds', 'proj_terraform'],
    ['skill_ec2', 'proj_airflow'],
];

// DOM Elements
const svg = document.getElementById('connections');
const canvas = document.getElementById('canvas');
const lines = [];

/**
 * Draw connection lines between nodes
 */
function drawLines() {
    const defs = svg.querySelector('defs');
    svg.innerHTML = '';
    if (defs) svg.appendChild(defs);
    lines.length = 0;

    connections.forEach(([startId, endId]) => {
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
        lines.push({ path, startId, endId });
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
                    document.getElementById(line.startId).style.opacity = '1';
                    document.getElementById(line.endId).style.opacity = '1';
                } else {
                    line.path.style.opacity = '0.1';
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
                line.path.style.opacity = '';
            });
            nodes.forEach((n) => {
                n.style.opacity = '1';
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
                    line.path.style.opacity =
                        startNode.classList.contains(filter) ||
                        endNode.classList.contains(filter)
                            ? '0.6'
                            : '0.1';
                });
            } else {
                nodes.forEach((node) => {
                    node.style.opacity = '1';
                });
                lines.forEach((line) => {
                    line.path.style.opacity = '';
                });
            }
        });
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(drawLines, 100);
    initNodeInteractions();
    initLegendFiltering();
});

// Event listeners
window.addEventListener('resize', drawLines);
canvas.addEventListener('scroll', drawLines);
