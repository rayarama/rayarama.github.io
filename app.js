document.addEventListener('DOMContentLoaded', () => {
    // Dark/Light Theme Switcher
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = themeToggleBtn.querySelector('i');

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');

        if (document.body.classList.contains('light-theme')) {
            themeIcon.className = 'fa-solid fa-sun';
            themeToggleBtn.style.backgroundColor = '#f59e0b'; // Amber theme color
        } else {
            themeIcon.className = 'fa-solid fa-moon';
            themeToggleBtn.style.backgroundColor = 'var(--accent)';
        }
    });

    // Project Modal Logic
    const projectModal = document.getElementById('projectModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    
    if (projectModal && modalCloseBtn) {
        const detailButtons = document.querySelectorAll('.btn-project-details');
        
        detailButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = btn.getAttribute('data-project');
                const data = projectsData[projectId];
                
                if (data) {
                    // Populate Modal
                    document.getElementById('modalCategory').textContent = data.category;
                    document.getElementById('modalTitle').textContent = data.title;
                    
                    // Render tags
                    const tagsContainer = document.getElementById('modalTags');
                    tagsContainer.innerHTML = '';
                    data.tags.forEach(tag => {
                        const span = document.createElement('span');
                        span.textContent = tag;
                        tagsContainer.appendChild(span);
                    });
                    
                    // Render case study sections
                    document.getElementById('modalProblem').innerHTML = data.problem;
                    document.getElementById('modalMethodology').innerHTML = data.methodology;
                    document.getElementById('modalInsights').innerHTML = data.insights;
                    document.getElementById('modalRecommendations').innerHTML = data.recommendations;
                    
                    // Footer Links
                    const githubLink = document.getElementById('modalGithubLink');
                    const liveLink = document.getElementById('modalLiveLink');
                    
                    githubLink.href = data.github;
                    
                    if (data.live) {
                        liveLink.href = data.live;
                        liveLink.style.display = 'inline-flex';
                    } else {
                        liveLink.style.display = 'none';
                    }
                    
                    // Show modal and lock body scroll
                    projectModal.classList.add('active');
                    document.body.classList.add('modal-open');
                }
            });
        });
        
        // Close Modal function
        const closeModal = () => {
            projectModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        };
        
        modalCloseBtn.addEventListener('click', closeModal);
        
        // Close on background click
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeModal();
            }
        });
        
        // Close on Esc keypress
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});

// Copy email to clipboard utility function
function copyEmailToClipboard() {
    const emailTextElement = document.getElementById('emailText');
    if (!emailTextElement) return;
    
    const email = emailTextElement.textContent;
    navigator.clipboard.writeText(email).then(() => {
        const tooltip = document.getElementById('copyTooltip');
        const icon = document.getElementById('copyIcon');
        
        if (tooltip && icon) {
            // Show tooltip
            tooltip.classList.add('show');
            
            // Change icon to checkmark
            icon.className = 'fa-solid fa-check';
            icon.style.color = '#22c55e';
            
            // Reset state after 2 seconds
            setTimeout(() => {
                tooltip.classList.remove('show');
                icon.className = 'fa-regular fa-copy';
                icon.style.color = '';
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy email: ', err);
    });
}

// Case Study Data for Projects
// NOTE: You can customize the content for each project here. Feel free to update the text, tags, and links.
const projectsData = {
    // 1. Olist E-Commerce Project
    olist: {
        title: "Olist E-Commerce: Customer Satisfaction Analysis",
        category: "Business Analytics",
        tags: ["SQLite", "Tableau", "Root Cause Analysis"], // Add or remove skills/tags here
        problem: `<p>This project analyzes the primary drivers of customer satisfaction on the Olist Brazilian E-commerce platform. Using Exploratory Data Analysis (EDA) and Root Cause Analysis, the study identified that while 92% of orders are successfully delivered on time, severe delivery delays (defined as latency exceeding 7 days past the estimate) disproportionately drive negative 1-star reviews. I developed an interactive Tableau Customer Satisfaction Dashboard to monitor these operational metrics in real-time and proposed data-driven strategic interventions.</p>`,
        methodology: `<p>1. <strong>Database Querying:</strong> Querying transactional e-commerce databases using DB Browser for SQLite to merge customer, order, and logistics data.</p>
                      <p>2. <strong>Exploratory Data Analysis (EDA):</strong> Conducted to establish correlation baselines between delivery performance and review scores.</p>
                      <p>3. <strong>Root Cause Analysis:</strong> Deployed a comprehensive Root Cause Analysis (Issue Branches) framework to map out operational friction points.</p>
                      <p>4. <strong>Interactive Dashboard:</strong> Built an interactive dashboard in Tableau to visualize key business metrics, including Average Review Score, Average Order Value (AOV), and Delivery Performance Rate.</p>`,
        insights: `<ul>
                      <li><strong>Logistics Dominance:</strong> Delivery performance is the single highest predictor of customer sentiment; product quality issues pale in comparison to the negative impact of delayed shipping.</li>
                      <li><strong>The 7-Day Threshold:</strong> Customer patience drops drastically after a 7-day delay, where the probability of receiving a 1-star review increases by over 60%.</li>
                      <li><strong>Communication Gap:</strong> A lack of proactive updates during transit bottlenecks amplifies user frustration, leading to lower review scores even if the product eventually arrives intact.</li>
                   </ul>`,
        recommendations: `<ul>
                             <li><strong>Deploy an Early-Warning System:</strong> Establish automated triggers within the logistics pipeline to flag orders data shows are falling behind schedule, allowing the support team to intervene before the customer experiences a severe delay.</li>
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
        problem: `<p>This project evaluates marketing campaign performance and validates user interface optimizations for TokoBli using statistical experiments. By designing and analyzing a rigorous A/B Testing framework, the project determined whether a newly designed product page layout significantly impacted customer purchasing behavior. The study successfully validated that the new variant drove higher transaction values, justifying a full-scale deployment.</p>`,
        methodology: `<p>1. <strong>Data Preparation:</strong> Data preparation and cleaning were entirely executed within Google Sheets, which included filtering out duplicate records.</p>
                      <p>2. <strong>Outlier Treatment:</strong> Handled statistical anomalies using the Interquartile Range (IQR) Method to remove extreme outliers.</p>
                      <p>3. <strong>Hypothesis Testing:</strong> The core experimentation utilized a Two-Sample T-Test Assuming Equal Variances to evaluate the statistical significance of the conversion metrics.</p>
                      <p>4. <strong>Metrics Tracking:</strong> Key metrics tracked included Conversion Rate, Bounce Rate, and Average Order Value (AOV) to ensure a holistic view of user engagement.</p>`,
        insights: `<ul>
                      <li><strong>Statistical Significance:</strong> The A/B test yielded a p-value well below the 0.05 threshold, statistically proving that the increase in transaction value on the new product page was not a result of random chance.</li>
                      <li><strong>Reduced Friction:</strong> User journey analysis showed a notable drop in bounce rates on the variant page, confirming that the new visual hierarchy made it easier for customers to find product details.</li>
                      <li><strong>Segmented Impact:</strong> The positive impact of the new design was particularly pronounced among mobile users, highlighting the effectiveness of the mobile-first layout adjustments.</li>
                   </ul>`,
        recommendations: `<ul>
                             <li><strong>Full-Scale Page Rollout:</strong> Proceed with the 100% deployment of the new product page design across the entire platform, as the statistical evidence guarantees a positive impact on revenue.</li>
                             <li><strong>Iterate Mobile Optimizations:</strong> Given the strong response from mobile shoppers, prioritize future UI/UX experiments specifically targeting the mobile checkout funnel to further compound these gains.</li>
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
        problem: `<p>This project focuses on designing an interactive Expense and Budget Utilization Dashboard for RevoFinance, a fintech platform designed to help individuals track their personal financial health. The primary objective is to empower users to understand their spending patterns across various categories and merchants, monitor monthly expense trends, and strictly compare actual expenditures against predefined annual budgets. The analysis reveals that personal expenses are highly concentrated among a few key merchants, and that spending steadily accumulates predictably throughout the year, with certain categories frequently approaching or exceeding their 100% budget utilization limits.</p>`,
        methodology: `<p>1. <strong>Data Integration:</strong> Processed and integrated three distinct datasets: Personal Expenses, Merchant Metadata, and Budget Allocations by establishing proper Tableau Relationships to prevent data duplication during multi-table evaluation.</p>
                      <p>2. <strong>Advanced Analytics:</strong> Implemented Level of Detail (LOD) FIXED Expressions to compute precise total expenditures per merchant independent of the worksheet visualization granularity.</p>
                      <p>3. <strong>Dynamic Highlighting:</strong> Utilized Rank Functions to dynamically isolate and highlight the Top 5 Spending areas, ensuring an intuitive user interface for end-users tracking critical financial leaks.</p>`,
        insights: `<ul>
                      <li><strong>Expense Concentration:</strong> Personal spending is heavily skewed toward a small group of primary merchants, indicating a lack of diversified purchasing habits or highly fixed recurring vendor costs.</li>
                      <li><strong>Predictable Accumulation:</strong> Month-over-month expenses rise in a linear, highly predictable trajectory, showing no massive seasonal spikes but maintaining a constant drain on available capital.</li>
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
                      <p>2. <strong>Data Engineering:</strong> Phase involved exhaustive data cleaning, including dropping duplicate records, correcting structural data types, and handling missing values.</p>
                      <p>3. <strong>Behavioral Modeling:</strong> The core segmentation was executed using a custom RFM (Recency, Frequency, Monetary) Model, assigning behavioral scores to each customer to group them into strategic segments.</p>`,
        insights: `<ul>
                      <li><strong>The High-Value Core:</strong> A small, elite segment of "High-Value" customers accounts for a disproportionate share of the bank's total credit card volume, requiring dedicated retention focus.</li>
                      <li><strong>The "At Risk" Layer:</strong> A significant portion of previously active users has drifted into the "At Risk" category, showing a steep decline in recency despite historical high monetary value.</li>
                      <li><strong>The Latent Loyalist Segment:</strong> A large middle-tier of customers transacts frequently but with low monetary values, representing a massive untapped opportunity for up-selling.</li>
                   </ul>`,
        recommendations: `<ul>
                             <li><strong>Exclusive VIP Loyalty Perks:</strong> Create a premium tier of rewards specifically for the "High-Value" segment, ensuring their retention against competitor poaching.</li>
                             <li><strong>Win-Back Re-engagement Campaigns:</strong> Launch immediate, targeted promotional campaigns offering high-incentive rewards for "At Risk" customers to reactivate their spending habits.</li>
                             <li><strong>Credit Limit Upsell Strategy:</strong> Offer systematic credit limit increases and targeted cashback rewards for high-frequency categories to the "Latent Loyalist" segment, encouraging them to use their cards for larger transactions.</li>
                          </ul>`,
        github: "https://github.com/rayarama/RevoBank_Customer_Segmentation", // Update with your GitHub URL
        live: null // Set to null if there is no live link
    }
};
