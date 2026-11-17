document.addEventListener('DOMContentLoaded', () => {
    // ---------- Theme: system default, visitor choice persisted ----------
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const currentTheme = () =>
        root.getAttribute('data-theme') || (darkQuery.matches ? 'dark' : 'light');

    const syncToggleLabel = () => {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        themeToggle.setAttribute('aria-label', `Switch to ${next} theme`);
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', getComputedStyle(root).getPropertyValue('--paper').trim());
    };

    themeToggle.addEventListener('click', () => {
        const next = currentTheme() === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
        syncToggleLabel();
    });
    darkQuery.addEventListener('change', syncToggleLabel);
    syncToggleLabel();

    // ---------- Case study dialog ----------
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    let lastTrigger = null;

    const openCaseStudy = (projectId, trigger) => {
        const data = projectsData[projectId];
        if (!data || !modal) return;

        document.getElementById('modalCategory').textContent = data.category;
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalTags').textContent = data.tags.join(', ');
        document.getElementById('modalProblem').innerHTML = data.problem;
        document.getElementById('modalMethodology').innerHTML = data.methodology;
        document.getElementById('modalInsights').innerHTML = data.insights;
        document.getElementById('modalRecommendations').innerHTML = data.recommendations;

        document.getElementById('modalGithubLink').href = data.github;
        const liveLink = document.getElementById('modalLiveLink');
        if (data.live) {
            liveLink.href = data.live;
            liveLink.hidden = false;
        } else {
            liveLink.hidden = true;
        }

        lastTrigger = trigger;
        modal.showModal();
        modal.scrollTop = 0;
        document.body.classList.add('modal-open');
    };

    document.querySelectorAll('[data-project]').forEach((btn) => {
        btn.addEventListener('click', () => openCaseStudy(btn.dataset.project, btn));
    });

    if (modal) {
        closeBtn.addEventListener('click', () => modal.close());

        // Click on the backdrop (outside the dialog box) closes it
        modal.addEventListener('click', (e) => {
            const r = modal.getBoundingClientRect();
            const inside = e.clientX >= r.left && e.clientX <= r.right &&
                           e.clientY >= r.top && e.clientY <= r.bottom;
            if (!inside) modal.close();
        });

        // Esc is handled natively by <dialog>; restore state on any close
        modal.addEventListener('close', () => {
            document.body.classList.remove('modal-open');
            if (lastTrigger) lastTrigger.focus();
        });
    }

    // ---------- Copy email ----------
    const copyBtn = document.getElementById('copyEmailBtn');
    const copyStatus = document.getElementById('copyStatus');
    let copyTimer;

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const email = document.getElementById('emailText').textContent.trim();
            navigator.clipboard.writeText(email).then(() => {
                copyStatus.textContent = 'Email copied';
            }).catch(() => {
                copyStatus.textContent = 'Copy failed. Select the address above instead.';
            }).finally(() => {
                clearTimeout(copyTimer);
                copyTimer = setTimeout(() => { copyStatus.textContent = ''; }, 2500);
            });
        });
    }
});

// Case Study Data for Projects
// NOTE: You can customize the content for each project here. Feel free to update the text, tags, and links.
const projectsData = {
    // 1. Olist E-Commerce Project
    olist: {
        title: "Olist E-Commerce: Customer Satisfaction Analysis",
        category: "Business Analytics",
        tags: ["SQLite", "Tableau", "Root Cause Analysis"], // Add or remove skills/tags here
        problem: `<p>This project analyzes the primary drivers of customer satisfaction on the Olist Brazilian E-commerce platform. Using Exploratory Data Analysis (EDA) and Root Cause Analysis, the study identified that while 92% of orders are successfully delivered on time, severe delivery delays (defined as latency exceeding 7 days past the estimate) disproportionately drive negative 1-star reviews. I developed an interactive Tableau Customer Satisfaction Dashboard to monitor these operational metrics and proposed data-driven interventions.</p>`,
        methodology: `<p>1. <strong>Database Querying:</strong> Querying transactional e-commerce databases using DB Browser for SQLite to merge customer, order, and logistics data.</p>
                      <p>2. <strong>Exploratory Data Analysis (EDA):</strong> Conducted to establish correlation baselines between delivery performance and review scores.</p>
                      <p>3. <strong>Root Cause Analysis:</strong> Deployed a comprehensive Root Cause Analysis (Issue Branches) framework to map out operational friction points.</p>
                      <p>4. <strong>Interactive Dashboard:</strong> Built an interactive dashboard in Tableau to visualize key business metrics, including Average Review Score, Average Order Value (AOV), and Delivery Performance Rate.</p>`,
        insights: `<ul>
                      <li><strong>Delivery Comes First:</strong> Delivery performance was the strongest predictor of review scores in the data, with a larger effect than the product-related factors examined.</li>
                      <li><strong>The 7-Day Threshold:</strong> Customer patience drops drastically after a 7-day delay, where the probability of receiving a 1-star review increases by over 60%.</li>
                      <li><strong>Communication Gap:</strong> Reviews on delayed orders suggest that a lack of proactive updates during transit adds to customer frustration, lowering scores even when the product eventually arrives intact.</li>
                   </ul>`,
        recommendations: `<ul>
                             <li><strong>Deploy an Early-Warning System:</strong> Establish automated triggers within the logistics pipeline to flag orders that are falling behind schedule, allowing the support team to intervene before the customer experiences a severe delay.</li>
                             <li><strong>Proactive Customer Compensation:</strong> Automatically issue discount vouchers or shipping refunds to users whose deliveries cross the critical 7-day delay threshold, mitigating negative sentiment before they leave a review.</li>
                             <li><strong>Logistics Partner Optimization:</strong> Implement a dynamic rating system for third-party logistics carriers, penalizing routes with consistent bottlenecks and shifting order volumes to higher-performing delivery partners.</li>
                          </ul>`,
        github: "https://github.com/rayarama/Olist_E-Commerce_Analysis", // 
        live: "https://public.tableau.com/views/DEEPP_olist_dashboard_fix/OlistDashboard" // Update with your interactive Tableau Dashboard URL (set to null if none)
    },
    // 2. TokoBli A/B Testing Project
    tokobli: {
        title: "TokoBli: Campaign Evaluation & Product Page A/B Testing",
        category: "A/B Testing & Experimentation",
        tags: ["Google Sheets", "Statistics", "A/B Testing"],
        problem: `<p>This project evaluates marketing campaign performance and validates user interface optimizations for TokoBli using statistical experiments. By designing and analyzing an A/B test, the project assessed whether a newly designed product page layout changed customer purchasing behavior. The test found a statistically significant increase in transaction value for the new variant, supporting a full rollout.</p>`,
        methodology: `<p>1. <strong>Data Preparation:</strong> Data preparation and cleaning were entirely executed within Google Sheets, which included filtering out duplicate records.</p>
                      <p>2. <strong>Outlier Treatment:</strong> Handled statistical anomalies using the Interquartile Range (IQR) Method to remove extreme outliers.</p>
                      <p>3. <strong>Hypothesis Testing:</strong> The core experimentation utilized a Two-Sample T-Test Assuming Equal Variances to test whether the difference in transaction value between the two variants was statistically significant.</p>
                      <p>4. <strong>Metrics Tracking:</strong> Key metrics tracked included Conversion Rate, Bounce Rate, and Average Order Value (AOV) to ensure a holistic view of user engagement.</p>`,
        insights: `<ul>
                      <li><strong>Statistical Significance:</strong> The test returned a p-value below 0.05, indicating that the increase in transaction value on the new product page is unlikely to be due to random chance.</li>
                      <li><strong>Lower Bounce Rate:</strong> Bounce rate was lower on the variant page, which suggests the new visual hierarchy made product details easier to find.</li>
                      <li><strong>Mobile Signal:</strong> The lift appeared strongest among mobile users. A follow-up test segmented by device would confirm whether the mobile-first layout changes are driving it.</li>
                   </ul>`,
        recommendations: `<ul>
                             <li><strong>Full-Scale Page Rollout:</strong> Roll out the new product page design to all users, since the test shows a significant lift in transaction value, and keep monitoring revenue after launch to confirm the effect holds at full scale.</li>
                             <li><strong>Iterate Mobile Optimizations:</strong> Given the early signal from mobile shoppers, prioritize the next UI/UX experiments on the mobile checkout funnel.</li>
                             <li><strong>Continuous Experimentation Pipeline:</strong> Institutionalize the A/B testing framework built in Google Sheets across other product categories, making data-validated design changes standard operational procedure.</li>
                          </ul>`,
        github: "https://github.com/rayarama/TokoBli_AB_Testing", // Update with your GitHub URL
        live: null // Set to null if there is no live deployment/dashboard link
    },
    // 3. RevoGrocers SQL Sales Project
    revogrocers: {
        title: "RevoGrocers: Sales Performance Analysis",
        category: "Sales Analytics",
        tags: ["SQL", "BigQuery", "Analytics"],
        problem: `<p>This project delivers a comprehensive sales performance and customer retention evaluation for RevoGrocers. By looking into multi-layered relational databases, the analysis identifies top-performing product categories, evaluates revenue trajectories, and monitors customer loyalty metrics. The project provides actionable business insights to maximize customer lifetime value and optimize inventory distribution.</p>`,
        methodology: `<p>1. <strong>Database Querying:</strong> The technical core of this project relied on writing advanced, optimized queries in SQL (Google BigQuery).</p>
                      <p>2. <strong>Data Integration:</strong> Complex data extraction was achieved by performing multi-table JOINs across sales, products, and customer categories.</p>
                      <p>3. <strong>Advanced Analytics:</strong> Advanced Window Functions were utilized to compute running totals and calculate the Repeat Purchase Rate over time.</p>
                      <p>4. <strong>Customer Segmentation:</strong> Business logic segmentation was engineered using conditional CASE WHEN statements to bucket transaction volumes into distinct performance tiers.</p>`,
        insights: `<ul>
                      <li><strong>Core Revenue Drivers:</strong> A minor subset of grocery categories generates over 70% of total revenue, highlighting a heavy reliance on specific high-volume staples.</li>
                      <li><strong>Retention Bottlenecks:</strong> While initial customer acquisition is strong, the repeat purchase rate drops significantly after the second transaction, indicating a retention leak in the early user lifecycle.</li>
                      <li><strong>Basket Size Trends:</strong> High-frequency shoppers do not necessarily have the highest average order value, meaning cross-selling strategies are underperforming.</li>
                   </ul>`,
        recommendations: `<ul>
                             <li><strong>Targeted Retargeting Campaigns:</strong> Deploy automated email or push-notification marketing campaigns specifically aimed at customers right after their second purchase, offering tailored incentives to break through the retention bottleneck.</li>
                             <li><strong>Cross-Selling Bundles:</strong> Utilize the SQL insights regarding basket composition to design product bundles, pairing high-volume staples with lower-velocity, high-margin products to increase overall basket size.</li>
                             <li><strong>Inventory Allocation Alignment:</strong> Re-align warehouse supply schedules to mirror the high-volume categories identified in the data, reducing holding costs for slow-moving products and preventing stockouts on revenue drivers.</li>
                          </ul>`,
        github: "https://github.com/rayarama", // Update with your GitHub URL
        live: null // Set to null if there is no live dashboard link
    },
    // 4. RevoFinance Tableau Dashboard Project
    revofinance: {
        title: "RevoFinance: Expense & Budget Utilization Dashboard",
        category: "Data Visualization",
        tags: ["Tableau", "Dashboard Design", "Data Viz"],
        problem: `<p>This project focuses on designing an interactive Expense and Budget Utilization Dashboard for RevoFinance, a fintech platform designed to help individuals track their personal financial health. The primary objective is to empower users to understand their spending patterns across various categories and merchants, monitor monthly expense trends, and strictly compare actual expenditures against predefined annual budgets. The dashboard shows that spending is concentrated among a few merchants, builds up steadily through the year, and pushes some categories to or past 100% of their budget.</p>`,
        methodology: `<p>1. <strong>Data Integration:</strong> Processed and integrated three distinct datasets: Personal Expenses, Merchant Metadata, and Budget Allocations by establishing proper Tableau Relationships to prevent data duplication during multi-table evaluation.</p>
                      <p>2. <strong>Advanced Analytics:</strong> Implemented Level of Detail (LOD) FIXED Expressions to compute precise total expenditures per merchant independent of the worksheet visualization granularity.</p>
                      <p>3. <strong>Dynamic Highlighting:</strong> Utilized Rank Functions to dynamically isolate and highlight the Top 5 Spending areas, ensuring an intuitive user interface for end-users tracking critical financial leaks.</p>`,
        insights: `<ul>
                      <li><strong>Expense Concentration:</strong> Personal spending is heavily skewed toward a small group of primary merchants, likely reflecting fixed recurring costs or habitual vendors.</li>
                      <li><strong>Steady Accumulation:</strong> Monthly expenses rise at a fairly even pace with no large seasonal spikes, so the budget is drawn down consistently through the year.</li>
                      <li><strong>Budget Strain:</strong> Several critical expense categories consistently hover near the threshold of their predefined annual limits, frequently breaking past the 100% budget utilization mark, which signals a clear need for stricter variance controls or realistic budget adjustments.</li>
                   </ul>`,
        recommendations: `<ul>
                             <li><strong>Implement Automated Alerts:</strong> Develop a proactive notification system within the app that triggers when a user's category spending reaches 80% and 90% of their allocated budget, preventing accidental overspending before it happens.</li>
                             <li><strong>Merchant Partnership Programs:</strong> Since spending is highly concentrated, RevoFinance should establish strategic partnerships or cashback programs with those top-tier merchants to provide exclusive discounts, directly lowering the users' highest expense drivers.</li>
                             <li><strong>Dynamic Budget Re-allocation:</strong> Introduce an algorithmic feature that allows users to dynamically shift unused funds from under-utilized categories into high-strain categories mid-year, optimizing their overall financial runway.</li>
                          </ul>`,
        github: "https://github.com/rayarama/RevoFinance_Expense_Dashboard", 
        live: "https://public.tableau.com/views/RevoU_DataViz/MainDashboard?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link" // Update with your actual dashboard link
    },
    // 5. RevoBank Python Customer Segmentation Project
    revobank: {
        title: "RevoBank: Customer Segmentation Analysis",
        category: "Customer Analytics",
        tags: ["Python", "Pandas", "NumPy"],
        problem: `<p>This project focuses on executing data-driven credit card customer segmentation for RevoBank to optimize marketing spend and enhance portfolio transaction frequencies. By applying behavioral analytics to transaction histories, the project categorizes the customer base into distinct, actionable profiles, allowing the bank to move away from generic marketing toward highly personalized life-cycle management.</p>`,
        methodology: `<p>1. <strong>Stack Selection:</strong> The analytics pipeline was built entirely in Python, leveraging libraries such as Pandas for heavy data manipulation and NumPy for vector operations.</p>
                      <p>2. <strong>Data Engineering:</strong> Data cleaning covered including dropping duplicate records, correcting structural data types, and handling missing values.</p>
                      <p>3. <strong>Behavioral Modeling:</strong> The core segmentation was executed using a custom RFM (Recency, Frequency, Monetary) Model, assigning behavioral scores to each customer to group them into strategic segments.</p>`,
        insights: `<ul>
                      <li><strong>The High-Value Core:</strong> A small "High-Value" segment accounts for a disproportionate share of the bank's total credit card volume, requiring dedicated retention focus.</li>
                      <li><strong>The "At Risk" Layer:</strong> A significant portion of previously active users has drifted into the "At Risk" category, showing a steep decline in recency despite historical high monetary value.</li>
                      <li><strong>The Latent Loyalist Segment:</strong> A large middle-tier of customers transacts frequently but with low monetary values, representing a clear opportunity for up-selling.</li>
                   </ul>`,
        recommendations: `<ul>
                             <li><strong>Exclusive VIP Loyalty Perks:</strong> Create a premium tier of rewards specifically for the "High-Value" segment, to support their retention.</li>
                             <li><strong>Win-Back Re-engagement Campaigns:</strong> Launch immediate, targeted promotional campaigns offering high-incentive rewards for "At Risk" customers to reactivate their spending habits.</li>
                             <li><strong>Credit Limit Upsell Strategy:</strong> Offer systematic credit limit increases and targeted cashback rewards for high-frequency categories to the "Latent Loyalist" segment, encouraging them to use their cards for larger transactions.</li>
                          </ul>`,
        github: "https://github.com/rayarama/RevoBank_Customer_Segmentation", // Update with your GitHub URL
        live: null // Set to null if there is no live link
    }
};
