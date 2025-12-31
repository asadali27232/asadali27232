<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Asad Ali - Data Pipeline Portfolio</title>
        <style>
            :root {
                --bg-color: #0f172a;
                --node-bg: #1e293b;
                --accent-primary: #3b82f6; /* Blue */
                --accent-secondary: #8b5cf6; /* Purple */
                --accent-success: #10b981; /* Green */
                --accent-warning: #f59e0b; /* Orange */
                --text-main: #f8fafc;
                --text-muted: #94a3b8;
                --line-color: #334155;
                --line-active: #60a5fa;
            }

            body {
                background-color: var(--bg-color);
                color: var(--text-main);
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                overflow: hidden;
                height: 100vh;
                display: flex;
                flex-direction: column;
            }

            #canvas {
                position: relative;
                flex-grow: 1;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-image: radial-gradient(#334155 1px, transparent 1px);
                background-size: 30px 30px;
            }

            /* NODES */
            .node {
                position: absolute;
                background: var(--node-bg);
                border: 2px solid var(--line-color);
                border-radius: 12px;
                padding: 12px;
                width: 220px;
                cursor: pointer;
                transition: all 0.3s ease;
                z-index: 10;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }

            .node:hover {
                transform: translateY(-5px);
                border-color: var(--accent-primary);
                box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
                z-index: 20;
            }

            .node h3 {
                margin: 0 0 5px 0;
                font-size: 14px;
                color: var(--accent-primary);
                font-weight: 600;
            }
            .node p {
                margin: 0;
                font-size: 11px;
                color: var(--text-muted);
                line-height: 1.4;
            }

            /* Node Categories */
            .node.source {
                border-color: var(--accent-success);
                width: 180px;
            }
            .node.skill {
                width: 140px;
                border-radius: 20px;
                text-align: center;
                border-color: var(--accent-secondary);
                padding: 8px;
            }
            .node.skill h3 {
                font-size: 13px;
                color: var(--text-main);
            }

            .node.exp {
                border-color: var(--line-color);
                border-left: 4px solid var(--accent-primary);
            }
            .node.cert {
                border-color: var(--line-color);
                border-left: 4px solid var(--accent-warning);
            }
            .node.proj {
                border-color: var(--line-color);
                border-left: 4px solid var(--accent-success);
            }
            .node.edu {
                border-color: var(--line-color);
                border-left: 4px solid #fff;
            }

            /* SVG LAYER */
            svg {
                position: absolute;
                top: 0;
                left: 0;
                width: 2000px; /* Force large width for overflow */
                height: 2000px; /* Force large height for overflow */
                pointer-events: none;
                z-index: 1;
            }

            path {
                fill: none;
                stroke: var(--line-color);
                stroke-width: 1.5;
                transition: stroke 0.3s, opacity 0.3s;
            }

            path.active {
                stroke: var(--line-active);
                stroke-width: 2.5;
                filter: drop-shadow(0 0 3px var(--accent-primary));
                stroke-dasharray: 10;
                animation: dash 30s linear infinite; /* Very slow flow */
            }

            @keyframes dash {
                to {
                    stroke-dashoffset: -1000;
                }
            }

            /* HEADER */
            header {
                padding: 15px 25px;
                background: rgba(15, 23, 42, 0.95);
                border-bottom: 1px solid var(--line-color);
                display: flex;
                justify-content: space-between;
                align-items: center;
                z-index: 100;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            }

            .legend {
                display: flex;
                gap: 20px;
                font-size: 12px;
                color: var(--text-muted);
            }
            .legend-item {
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
            }
        </style>
    </head>
    <body>
        <header>
            <div>
                <h1 style="margin: 0; font-size: 20px">
                    Asad Ali
                    <span
                        style="
                            font-size: 12px;
                            color: var(--accent-primary);
                            border: 1px solid var(--accent-primary);
                            padding: 2px 8px;
                            border-radius: 12px;
                            vertical-align: middle;
                            margin-left: 10px;
                        "
                        >DATA LINEAGE PORTAL</span
                    >
                </h1>
            </div>
            <div class="legend">
                <div class="legend-item">
                    <div
                        class="dot"
                        style="background: var(--accent-secondary)"></div>
                    Skill
                </div>
                <div class="legend-item">
                    <div
                        class="dot"
                        style="
                            background: var(--node-bg);
                            border: 2px solid var(--accent-primary);
                        "></div>
                    Experience
                </div>
                <div class="legend-item">
                    <div
                        class="dot"
                        style="
                            background: var(--node-bg);
                            border: 2px solid var(--accent-warning);
                        "></div>
                    Certification
                </div>
                <div class="legend-item">
                    <div
                        class="dot"
                        style="
                            background: var(--node-bg);
                            border: 2px solid var(--accent-success);
                        "></div>
                    Project
                </div>
            </div>
        </header>

        <div id="canvas">
            <svg id="connections"></svg>

            <!-- COLUMN 1: SKILL ENGINE (Left) -->
            <div
                style="
                    position: absolute;
                    top: 20px;
                    left: 50px;
                    color: var(--text-muted);
                    font-size: 12px;
                    font-weight: bold;
                ">
                SKILL NODES
            </div>

            <div
                class="node skill"
                id="skill_dbt"
                style="top: 50px; left: 50px">
                <h3>dbt</h3>
            </div>
            <div
                class="node skill"
                id="skill_snowflake"
                style="top: 120px; left: 50px">
                <h3>Snowflake</h3>
            </div>
            <div
                class="node skill"
                id="skill_de"
                style="top: 190px; left: 50px">
                <h3>Data Eng</h3>
            </div>
            <div
                class="node skill"
                id="skill_python"
                style="top: 260px; left: 50px">
                <h3>Python</h3>
            </div>
            <div
                class="node skill"
                id="skill_sql"
                style="top: 330px; left: 50px">
                <h3>SQL</h3>
            </div>
            <div
                class="node skill"
                id="skill_etl"
                style="top: 400px; left: 50px">
                <h3>ETL</h3>
            </div>
            <div
                class="node skill"
                id="skill_dw"
                style="top: 470px; left: 50px">
                <h3>Data Warehouse</h3>
            </div>
            <div
                class="node skill"
                id="skill_aws"
                style="top: 540px; left: 50px">
                <h3>AWS</h3>
            </div>
            <div
                class="node skill"
                id="skill_airflow"
                style="top: 610px; left: 50px">
                <h3>Airflow</h3>
            </div>
            <div
                class="node skill"
                id="skill_lambda"
                style="top: 680px; left: 50px">
                <h3>Lambda</h3>
            </div>
            <div
                class="node skill"
                id="skill_glue"
                style="top: 750px; left: 50px">
                <h3>Glue</h3>
            </div>
            <div
                class="node skill"
                id="skill_athena"
                style="top: 820px; left: 50px">
                <h3>Athena</h3>
            </div>
            <div
                class="node skill"
                id="skill_terraform"
                style="top: 890px; left: 50px">
                <h3>Terraform</h3>
            </div>
            <div
                class="node skill"
                id="skill_rds"
                style="top: 960px; left: 50px">
                <h3>RDS</h3>
            </div>
            <div
                class="node skill"
                id="skill_ec2"
                style="top: 1030px; left: 50px">
                <h3>EC2</h3>
            </div>

            <!-- COLUMN 2: EXPERIENCE & EDUCATION (Center-Left) -->
            <div
                style="
                    position: absolute;
                    top: 20px;
                    left: 350px;
                    color: var(--text-muted);
                    font-size: 12px;
                    font-weight: bold;
                ">
                ROLES & EDUCATION
            </div>

            <div
                class="node exp"
                id="role_devsinc"
                style="top: 100px; left: 350px">
                <h3>Devsinc</h3>
                <p>Associate Data Engineer</p>
            </div>

            <div class="node exp" id="role_ml1" style="top: 300px; left: 350px">
                <h3>Machine Learning 1</h3>
                <p>Python Developer</p>
            </div>

            <div class="node exp" id="role_wwa" style="top: 500px; left: 350px">
                <h3>WWA Hub</h3>
                <p>Associate Data Engineer</p>
            </div>

            <div
                class="node edu"
                id="edu_comsats"
                style="top: 700px; left: 350px">
                <h3>COMSATS Institute</h3>
                <p>Information Technology</p>
            </div>

            <!-- COLUMN 3: CERTIFICATIONS (Center-Right) -->
            <div
                style="
                    position: absolute;
                    top: 20px;
                    left: 650px;
                    color: var(--text-muted);
                    font-size: 12px;
                    font-weight: bold;
                ">
                CERTIFICATIONS
            </div>

            <div class="node cert" id="cert_dbt" style="top: 60px; left: 650px">
                <h3>dbt Fundamentals</h3>
                <p>dbt Labs</p>
            </div>
            <div
                class="node cert"
                id="cert_snow"
                style="top: 130px; left: 650px">
                <h3>SnowPro Core</h3>
                <p>Snowflake</p>
            </div>
            <div
                class="node cert"
                id="cert_aws_de"
                style="top: 200px; left: 650px">
                <h3>Data Eng on AWS</h3>
                <p>AWS Training</p>
            </div>
            <div
                class="node cert"
                id="cert_datacamp"
                style="top: 270px; left: 650px">
                <h3>Data Engineer</h3>
                <p>DataCamp</p>
            </div>
            <div
                class="node cert"
                id="cert_python"
                style="top: 340px; left: 650px">
                <h3>Crash Course Python</h3>
                <p>Google</p>
            </div>
            <div
                class="node cert"
                id="cert_sql"
                style="top: 410px; left: 650px">
                <h3>Querying with SQL</h3>
                <p>IBM</p>
            </div>
            <div
                class="node cert"
                id="cert_intro_de"
                style="top: 480px; left: 650px">
                <h3>Intro to Data Eng</h3>
                <p>DeepLearning.AI</p>
            </div>

            <!-- COLUMN 4: PROJECTS (Right) -->
            <div
                style="
                    position: absolute;
                    top: 20px;
                    left: 950px;
                    color: var(--text-muted);
                    font-size: 12px;
                    font-weight: bold;
                ">
                DEPLOYED PROJECTS
            </div>

            <div
                class="node proj"
                id="proj_youtube"
                style="top: 350px; left: 950px">
                <h3>YouTube ETL Pipeline</h3>
                <p>AWS Glue, Lambda, Athena</p>
            </div>

            <div
                class="node proj"
                id="proj_terraform"
                style="top: 750px; left: 950px">
                <h3>Terraform AWS ETL</h3>
                <p>IaC for Glue & RDS</p>
            </div>

            <div
                class="node proj"
                id="proj_airflow"
                style="top: 1000px; left: 950px">
                <h3>Cloud Airflow Pipe</h3>
                <p>EC2 Deployed Orchestration</p>
            </div>
        </div>

        <script>
            // CONFIGURATION: Source -> Target connections
            const connections = [
                // DBT
                ['skill_dbt', 'role_devsinc'],
                ['skill_dbt', 'cert_dbt'],

                // SNOWFLAKE
                ['skill_snowflake', 'role_devsinc'],
                ['skill_snowflake', 'cert_snow'],

                // DATA ENG
                ['skill_de', 'role_devsinc'],
                ['skill_de', 'edu_comsats'], // Implied education base
                ['skill_de', 'cert_aws_de'],
                ['skill_de', 'cert_datacamp'],

                // PYTHON
                ['skill_python', 'role_ml1'],
                ['skill_python', 'cert_python'],
                ['skill_python', 'proj_youtube'],
                ['skill_python', 'proj_terraform'],
                ['skill_python', 'proj_airflow'],
                ['skill_python', 'edu_comsats'],

                // SQL
                ['skill_sql', 'edu_comsats'],
                ['skill_sql', 'cert_sql'],
                ['skill_sql', 'role_devsinc'],
                ['skill_sql', 'proj_terraform'],

                // ETL
                ['skill_etl', 'role_wwa'],
                ['skill_etl', 'proj_youtube'],
                ['skill_etl', 'proj_terraform'],
                ['skill_etl', 'cert_intro_de'],

                // DATA WAREHOUSING
                ['skill_dw', 'edu_comsats'],
                ['skill_dw', 'role_devsinc'],

                // AWS
                ['skill_aws', 'cert_intro_de'],
                ['skill_aws', 'cert_aws_de'],
                ['skill_aws', 'role_devsinc'],
                ['skill_aws', 'proj_youtube'],
                ['skill_aws', 'proj_terraform'],
                ['skill_aws', 'proj_airflow'],

                // AIRFLOW
                ['skill_airflow', 'role_devsinc'],
                ['skill_airflow', 'proj_airflow'],

                // LAMBDA
                ['skill_lambda', 'proj_youtube'],

                // GLUE
                ['skill_glue', 'proj_youtube'],
                ['skill_glue', 'proj_terraform'],

                // ATHENA
                ['skill_athena', 'proj_youtube'],
                ['skill_athena', 'proj_terraform'],

                // TERRAFORM
                ['skill_terraform', 'proj_terraform'],

                // RDS
                ['skill_rds', 'proj_terraform'],

                // EC2
                ['skill_ec2', 'proj_airflow'],
            ];

            const svg = document.getElementById('connections');
            const canvas = document.getElementById('canvas');
            const lines = [];

            function drawLines() {
                // Clear existing
                svg.innerHTML = '';
                lines.length = 0;

                connections.forEach(([startId, endId]) => {
                    const startEl = document.getElementById(startId);
                    const endEl = document.getElementById(endId);

                    if (!startEl || !endEl) return;

                    const startRect = startEl.getBoundingClientRect();
                    const endRect = endEl.getBoundingClientRect();
                    const canvasRect = canvas.getBoundingClientRect();

                    // Calculate connection points
                    const x1 = startRect.right - canvasRect.left;
                    const y1 =
                        startRect.top + startRect.height / 2 - canvasRect.top;
                    const x2 = endRect.left - canvasRect.left;
                    const y2 =
                        endRect.top + endRect.height / 2 - canvasRect.top;

                    // Create Path
                    const path = document.createElementNS(
                        'http://www.w3.org/2000/svg',
                        'path'
                    );

                    // Bezier Curve Logic
                    const controlOffset = Math.abs(x2 - x1) / 2;
                    const d = `M ${x1} ${y1} C ${x1 + controlOffset} ${y1}, ${
                        x2 - controlOffset
                    } ${y2}, ${x2} ${y2}`;

                    path.setAttribute('d', d);
                    svg.appendChild(path);
                    lines.push({ path, startId, endId });
                });
            }

            // Draw initial and on resize
            setTimeout(drawLines, 100); // Wait for render
            window.addEventListener('resize', drawLines);

            // Interaction Logic
            const nodes = document.querySelectorAll('.node');
            nodes.forEach((node) => {
                node.addEventListener('mouseenter', () => {
                    const id = node.id;

                    // Highlight connected lines and nodes
                    lines.forEach((line) => {
                        const isConnected =
                            line.startId === id || line.endId === id;
                        if (isConnected) {
                            line.path.classList.add('active');
                            document.getElementById(
                                line.startId
                            ).style.opacity = '1';
                            document.getElementById(line.endId).style.opacity =
                                '1';
                            document.getElementById(
                                line.startId
                            ).style.borderColor = 'var(--line-active)';
                            document.getElementById(
                                line.endId
                            ).style.borderColor = 'var(--line-active)';
                        } else {
                            line.path.style.opacity = '0.05';
                        }
                    });

                    // Dim other nodes
                    nodes.forEach((n) => {
                        if (n.id !== id && !isNodeConnected(id, n.id)) {
                            n.style.opacity = '0.1';
                            n.style.borderColor = '';
                        }
                    });
                });

                node.addEventListener('mouseleave', () => {
                    // Reset
                    lines.forEach((line) => {
                        line.path.classList.remove('active');
                        line.path.style.opacity = '1';
                    });
                    nodes.forEach((n) => {
                        n.style.borderColor = '';
                        n.style.opacity = '1';
                    });
                });
            });

            function isNodeConnected(currId, targetId) {
                return connections.some(
                    ([s, e]) =>
                        (s === currId && e === targetId) ||
                        (e === currId && s === targetId)
                );
            }
        </script>
    </body>

</html>

# Hi there, I'm Asad Ali! 👋

[![DataCamp Data Engineer Certification](datacamp_banner.png)](https://www.datacamp.com/certificate/DE0015440477781)

## 🚀 About Me

I am an **Associate Data Engineer** with hands-on experience building and optimizing ETL pipelines, managing multi-source data ingestion, and working with cloud-based data warehouses including **Snowflake**, **BigQuery**, and **AWS Redshift**.

Skilled in **Python**, **SQL**, **dbt**, and modern data engineering tools such as **Apache Airflow**, **Spark**, and **AWS Glue**, I have expertise in data modeling, pipeline orchestration, and ensuring data quality, reliability, and scalability. I am experienced in transforming raw data into high-quality, analytics-ready datasets, developing data-driven solutions, and contributing to large-scale projects with hundreds of tables and multi-channel pipelines.

---

## 💼 Work Experience

### **Associate Data Engineer**

**Devsinc | Lahore** _(Dec 2025 – Present)_

-   Working on a large data project in **Snowflake**, managing data from multiple ingestion channels, and supporting ETL scheduling, monitoring, and reliability for production pipelines.
-   Managing historical data pipelines from **BigQuery**, operating ETLs deployed on **AWS MWAA**, and building scalable **dbt** transformations to standardize models, improve lineage, and ensure high-quality, trusted data for analytics.

### **Associate Python Developer**

**Machine Learning 1 Pvt. Ltd | Lahore** _(Mar 2025 – Nov 2025)_

-   Managed a large Python-based validation microservice for a global KYC product, ingesting outputs from multiple **ML models** to perform data validation, standardization, and quality controls across a high volume of traffic.
-   Implemented rule-driven checks, including regex fallbacks, anomaly detection, and checks preventing hallucinations and issues due to cropped artifacts, improving accuracy, reducing bad responses, and strengthening compliance in production.

### **Associate Data Engineer**

**World Wide Admissions Hub | Lahore** _(Aug 2024 – Feb 2025)_

-   Developed web scraping scripts, streamlining raw data collection from multiple sources, and increasing data extraction efficiency from 1 website per day to 100 websites per day, resulting in a **100% improvement**.
-   Designed and implemented an **AI-based ETL pipeline** using Python, transforming, cleaning, and ingesting data, thereby enhancing processing efficiency and ensuring consistent, high-quality data for the web app and AI model.

---

## ✨ Skills

### **Core Data Engineering**

-   **Programming**: Python, SQL
-   **Frameworks & Tools**: Apache Airflow, Apache Spark, dbt, Apache Kafka, PySpark, Pandas
-   **Cloud Components**: AWS (Glue, Lambda, Redshift, S3, Athena, MWAA), BigQuery, Snowflake, Databricks
-   **Infrastructure**: Docker, Terraform

### **Databases**

-   **Relational**: PostgreSQL, MySQL, MSSQL
-   **NoSQL**: MongoDB

### **Soft Skills**

-   Problem-Solving, Team Collaboration, Continuous Learning

---

## 💻 Projects

### [Simple Cloud-Based Data Pipeline with Apache Airflow on AWS EC2](https://github.com/asadali27232/) _(Dec 2025)_

This project implements an end-to-end data engineering pipeline using **Apache Airflow** deployed on an **AWS EC2** Ubuntu instance. The pipeline orchestrates the extraction, transformation, and loading (ETL) of NYC 311 Service Request data through a series of automated tasks. Raw JSON data is fetched from the NYC Open Data API, processed using **Pandas** for data cleaning and standardization, and ultimately stored in **Amazon S3** in Parquet format for optimized query performance.

### [Terraform-Powered AWS Glue ETL: Infrastructure as Code](https://github.com/asadali27232/) _(Dec 2025)_

ETL pipeline using **Terraform** to automate AWS infrastructure provisioning for **Glue**, **RDS**, **S3**, and **Athena**. The system extracts MySQL retail data, transforms it into a star schema via **PySpark** jobs, and loads Parquet-optimized files into S3 for serverless analytics, demonstrating Infrastructure as Code, dimensional modeling, and cost-efficient cloud data engineering.

### [YouTube's Data Engineering: ETL & Cloud Pipeline](https://github.com/asadali27232/) _(Dec 2025)_

This project demonstrates a data engineering pipeline implementation, including ingestion, ETL, and cloud-based storage using **AWS**. It processes structured and semi-structured data to create a clean dataset and builds an interactive **Power BI** dashboard for visualization. The system is scalable, automated, and cloud-based, showcasing real-world data engineering practices.

### [CardioGraph Pro - FYP](https://github.com/asadali27232/FYP) _(Feb 2024 – Jan 2025)_

Led the handling and analysis of 20,000 ECG signal files (time-series data) using Python, performing EDA with Pandas and Matplotlib, basic data cleaning, and designing a data pipeline to integrate with a machine learning model and web interface, ensuring efficient and accurate data processing.

---

## 🏆 Certifications

-   [**Certified Data Engineer** - DataCamp](https://www.datacamp.com/certificate/DE0015440477781)
-   [**Snowflake Data Engineering** - Snowflake](https://learn.snowflake.com/en/certifications/snowpro-advanced-dataengineer/)
-   [**Databricks for Data Engineering** - Databricks](https://www.databricks.com/learn/certification/data-engineer-associate)
-   [**dbt Fundamentals** - dbt Labs](https://www.getdbt.com/dbt-learn/)
-   [**Introduction to Data Engineering** - DeepLearning.AI](https://www.coursera.org/learn/introduction-to-data-engineering)
-   [**Programming in Python** - Meta](https://www.coursera.org/learn/programming-in-python-meta)
-   [**Querying Databases with SQL** - IBM](https://www.coursera.org/learn/sql-practical-introduction-for-querying-databases)

---

## 🎓 Education

**BS Computer Science** | COMSATS University Islamabad, Lahore Campus _(Feb 2021 – Jan 2025)_
Developed a strong foundation in programming and computer science principles, with specialized knowledge in data engineering, data warehousing, and database technologies.

---

## 📫 How to Reach Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/asadali27232/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:asadali27232@gmail.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/923074315952)
[![Personal Website](https://img.shields.io/badge/Personal%20Website-24292e?style=for-the-badge&logo=react&logoColor=white&color=purplr)](https://asadali27232.github.io/asadali27232/)
