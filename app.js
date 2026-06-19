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
        title: "Olist E-Commerce: Data-Driven Analysis of Customer Satisfaction",
        category: "Business Analytics",
        tags: ["SQLite", "Tableau", "Root Cause Analysis"], // Add or remove skills/tags here
        problem: `<p>Customer satisfaction ratings had dropped, with low review scores directly impacting customer retention and overall e-commerce platform growth. The primary challenge was to identify key factors behind customer dissatisfaction and locate where bottlenecks existed in the fulfillment lifecycle.</p>`,
        methodology: `<p>1. <strong>Data Wrangling:</strong> Combined and cleaned Olist's relational dataset containing orders, reviews, items, and sellers using SQLite.</p>
                      <p>2. <strong>EDA:</strong> Identified variables correlated with low scores (1-3 stars), focusing on delivery delay metrics.</p>
                      <p>3. <strong>Root Cause Analysis:</strong> Built custom queries to calculate the difference between estimated and actual delivery dates and mapped geographic lag times.</p>`,
        insights: `<ul>
                      <li><strong>Delivery Delays:</strong> Orders arriving after the estimated delivery date accounted for 68% of 1-star reviews.</li>
                      <li><strong>Regional Bottlenecks:</strong> Certain seller states (e.g., SP, RJ) exhibited disproportionately high dispatch times.</li>
                      <li><strong>Communication Gap:</strong> Customers left negative reviews before the actual delay happened if tracking updates went silent.</li>
                   </ul>`,
        recommendations: `<ul>
                             <li>Implement an automated early-warning system alerting sellers when order dispatch times exceed 48 hours.</li>
                             <li>Partner with local courier hubs in low-performing regions to optimize last-mile delivery.</li>
                             <li>Design automated customer notifications when a delivery is rescheduled to maintain transparency.</li>
                          </ul>`,
        github: "https://github.com/rayarama", // Update with your actual GitHub repository URL
        live: "https://public.tableau.com/views/DEEPP_olist_dashboard_fix/OlistDashboard" // Update with your interactive Tableau Dashboard URL (set to null if none)
    },
    // 2. TokoBli A/B Testing Project
    tokobli: {
        title: "TokoBli: Campaign Evaluation & Product Page A/B Testing",
        category: "A/B Testing & Experimentation",
        tags: ["Google Sheets", "Statistics", "A/B Testing"],
        problem: `<p>The product development team designed a new layout variant for TokoBli's product detail page. However, they needed empirical statistical proof that the new design would increase transaction values before deploying it site-wide.</p>`,
        methodology: `<p>1. <strong>Experiment Setup:</strong> Segmented users into Control (Old layout) and Treatment (New layout) groups with equal sample sizes.</p>
                      <p>2. <strong>Hypothesis Testing:</strong> Formulated Null (H0) and Alternative (H1) hypotheses regarding average order value (AOV).</p>
                      <p>3. <strong>Statistical Analysis:</strong> Conducted a Two-Sample T-Test in Google Sheets to compare means and calculated the p-value.</p>`,
        insights: `<ul>
                      <li>The treatment group achieved an 8.5% increase in Average Order Value compared to the control group.</li>
                      <li>The calculated p-value was 0.034 (which is &lt; 0.05), indicating statistical significance.</li>
                      <li>The bounce rate on the product page decreased by 4% in the treatment group, showing better engagement.</li>
                   </ul>`,
        recommendations: `<ul>
                             <li>Roll out the new product page design to 100% of users immediately since statistical significance is validated.</li>
                             <li>Perform follow-up A/B tests focusing specifically on checkout microcopy to further increase conversion rates.</li>
                          </ul>`,
        github: "https://github.com/rayarama", // Update with your GitHub URL
        live: null // Set to null if there is no live deployment/dashboard link
    },
    // 3. RevoGrocers SQL Sales Project
    revogrocers: {
        title: "RevoGrocers: SQL-Driven Sales Performance Analysis",
        category: "Sales Analytics",
        tags: ["SQL", "BigQuery", "Analytics"],
        problem: `<p>RevoGrocers' management lacked a consolidated view of sales performance, customer retention, and purchasing cycles, preventing them from optimizing marketing campaigns and stock allocation.</p>`,
        methodology: `<p>1. <strong>Query Construction:</strong> Wrote complex SQL queries in BigQuery involving multi-table JOINs, subqueries, and Common Table Expressions (CTEs).</p>
                      <p>2. <strong>Metric Definitions:</strong> Calculated Monthly Recurrency Rate (MRR), repeat purchase rate, and average order value (AOV).</p>
                      <p>3. <strong>Cohorts:</strong> Analyzed customer cohort behaviors using SQL window functions (e.g., LEAD, LAG, PARTITION BY).</p>`,
        insights: `<ul>
                      <li>Only 22% of customers made a repeat purchase within 30 days, suggesting low engagement.</li>
                      <li>Sales peaked consistently on weekends, driven by fresh produce categories.</li>
                      <li>Top 5% of customers generated over 30% of total revenue.</li>
                   </ul>`,
        recommendations: `<ul>
                             <li>Launch a targeted email campaign or discount voucher targeting 1-time buyers on day 25 post-purchase.</li>
                             <li>Increase weekend inventory stock for top fresh categories by 15% to prevent stockouts.</li>
                             <li>Establish a VIP customer loyalty program to retain top-tier spenders.</li>
                          </ul>`,
        github: "https://github.com/rayarama", // Update with your GitHub URL
        live: null // Set to null if there is no live dashboard link
    },
    // 4. RevoFinance Tableau Dashboard Project
    revofinance: {
        title: "RevoFinance: Expense & Budget Utilization Dashboard",
        category: "Data Visualization",
        tags: ["Tableau", "Dashboard Design", "Data Viz"],
        problem: `<p>The financial operations department was using disjointed Excel files to track monthly budgets across multiple departments, making expense monitoring slow and error-prone.</p>`,
        methodology: `<p>1. <strong>Data Modeling:</strong> Blended and joined budget datasets with actual transaction logs in Tableau.</p>
                      <p>2. <strong>Advanced Analytics:</strong> Utilized Level of Detail (LOD) expressions to calculate department-specific burn rates irrespective of filters.</p>
                      <p>3. <strong>UI/UX Design:</strong> Implemented clean dashboard navigation, parameter controls, and intuitive visual cues.</p>`,
        insights: `<ul>
                      <li>Marketing and IT consistently exceeded their quarterly budgets by over 12%.</li>
                      <li>Subscription-based SaaS services represented 40% of hidden, unbudgeted department expenses.</li>
                      <li>Visual trends highlighted that budget overshoot usually occurs in the final two weeks of each quarter.</li>
                   </ul>`,
        recommendations: `<ul>
                             <li>Transition from manual sheets to this dynamic Tableau dashboard for real-time tracking.</li>
                             <li>Introduce pre-approved spend thresholds for software subscriptions.</li>
                             <li>Enforce monthly review cycles for departments with history of overspending.</li>
                          </ul>`,
        github: "https://github.com/rayarama", // Update with your GitHub URL
        live: "https://public.tableau.com/views/DEEPP_olist_dashboard_fix/OlistDashboard" // Update with your actual dashboard link
    },
    // 5. RevoBank Python Customer Segmentation Project
    revobank: {
        title: "RevoBank: Customer Segmentation using RFM Model",
        category: "Customer Analytics",
        tags: ["Python", "Pandas", "NumPy"],
        problem: `<p>RevoBank wanted to identify high-value customer segments and customer churn risks to implement custom marketing strategies and lower customer acquisition costs.</p>`,
        methodology: `<p>1. <strong>Data Cleaning:</strong> Used Pandas to handle missing transactions and formatted timestamps.</p>
                      <p>2. <strong>RFM Score Calculation:</strong> Engineered features to compute Recency (days since last transaction), Frequency (total transactions), and Monetary (total value).</p>
                      <p>3. <strong>Segmentation:</strong> Applied binning techniques using NumPy to assign RFM scores (1-5) and segmented users into categories (Champions, Loyal, At-Risk, Hibernating).</p>`,
        insights: `<ul>
                      <li>15% of the customer base fell into the 'At-Risk' category, representing a potential $250k revenue loss.</li>
                      <li>The 'Champions' segment (8%) contributed to 42% of transaction volumes.</li>
                      <li>Hibernating users had a high correlation with account inactivity exceeding 90 days.</li>
                   </ul>`,
        recommendations: `<ul>
                             <li>Offer special interest rates or personalized financial products to the Champions segment.</li>
                             <li>Send automated, localized re-engagement emails to At-Risk users offering fee waivers.</li>
                             <li>Redesign the mobile app onboarding flow to encourage frequent engagement in the first 30 days.</li>
                          </ul>`,
        github: "https://github.com/rayarama", // Update with your GitHub URL
        live: null // Set to null if there is no live link
    }
};
