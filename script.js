// Kirsten Peoples Portfolio - Enhanced Interactive Engine
document.addEventListener('DOMContentLoaded', () => {

  // 1. Safe Local Storage Theme Helper
  function getStoredTheme() {
    try {
      return localStorage.getItem('kp_theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem('kp_theme', theme);
    } catch (e) {}
  }

  // Theme Management
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    setStoredTheme(theme);
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
      } else {
        themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
      }
    }
  }

  setTheme(getStoredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'light' ? 'dark' : 'light');
    });
  }

  // 2. Active ScrollSpy Navigation
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Filter Buttons for Case Studies
  const filterButtons = document.querySelectorAll('.filter-btn');
  const caseCards = document.querySelectorAll('.case-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      caseCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. FAQ Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

});

// 5. Case Study Modal Data
const caseStudyData = {
  'microsun': {
    category: 'Paid Search & Multi-Channel',
    company: 'Microsun (Consumer Ergonomic Lighting)',
    title: 'Paid Search Conversion Acceleration & Omnichannel Brand Messaging',
    challenge: 'Microsun needed to accelerate direct e-commerce sales acquisition efficiently in a niche, premium category while expanding upper-funnel organic awareness and unifying fragmented social channels.',
    approach: 'Restructured Google Ads paid search architecture with disciplined negative keyword pruning and launched target-ROAS Performance Max campaigns to capture high-intent bottom-funnel queries. In parallel, mapped out a unified cross-platform messaging guide across Facebook, Instagram, LinkedIn, and YouTube, aligning educational video formats with user search intent.',
    results: [
      { val: '$17,930+', lbl: 'Attributed Revenue YTD' },
      { val: '86', lbl: 'Direct Paid Conversions' },
      { val: '44.4%', lbl: 'Q2 Instagram Engagement' },
      { val: '18.7%', lbl: 'Facebook Engagement Rate' },
      { val: '16.6%', lbl: 'LinkedIn Engagement' },
      { val: '10.5K+', lbl: 'YouTube Educational Views' }
    ],
    deliverables: [
      'Google Ads Search & Performance Max Campaign Structure',
      'Negative Keyword Exclusion Master List & Query Mining Workflows',
      'Omnichannel Brand Messaging Guideline (FB, IG, LI, YouTube)',
      'Video Intent Mapping & YouTube SEO Optimization'
    ],
    tools: ['Google Ads', 'Performance Max', 'Google Analytics 4', 'Meta Business Suite', 'YouTube Studio']
  },
  'real-chemistry': {
    category: 'Executive Thought Leadership',
    company: 'Real Chemistry (Global Healthcare Agency)',
    title: 'C-Suite Executive Presence & Thought Leadership in Regulated Healthcare',
    challenge: 'Pharmaceutical executives and clinical leaders faced strict regulatory boundaries and struggled to maintain authentic, high-impact visibility on LinkedIn that built trust with physicians, investors, and industry peers.',
    approach: 'Conducted exhaustive LinkedIn profile and competitive landscape audits for 37 senior leaders to uncover white-space narrative angles. Created personalized content roadmaps and designed 68 multi-format assets (infographics, document carousels, physician commentary) tailored to clinical and biotech decision-makers.',
    results: [
      { val: '4,500+', lbl: 'Monthly Qualified Interactions' },
      { val: '7', lbl: 'C-Suite Leaders Managed' },
      { val: '>36%', lbl: 'Avg. Engagement Lift' },
      { val: '37', lbl: 'Leadership Audits Delivered' },
      { val: '~18 / mo', lbl: 'Targeted C-Suite Connections Added' }
    ],
    deliverables: [
      '37 Comprehensive Executive Social Audits & Positioning Roadmaps',
      '68 High-Impact Multi-Format Creative Assets (Carousels & Infographics)',
      'Compliance-Aligned Scripting & Executive Perspective Guidelines',
      'Monthly Executive KPI Tracking & Relationship Scorecards'
    ],
    tools: ['LinkedIn Creator Analytics', 'Canva', 'Adobe Suite', 'Sprout Social', 'Executive Benchmarking Frameworks']
  },
  'leadtail': {
    category: 'B2B Social Engine',
    company: 'Leadtail (B2B Social Media Agency)',
    title: 'High-Velocity B2B Content Engine & Quarterly Analytics Governance',
    challenge: 'Fast-moving B2B client accounts required simultaneous management of multi-channel publishing cadences, strict brand voice alignment, and measurable quarter-over-quarter proof of business visibility.',
    approach: 'Constructed persona-driven social editorial calendars across LinkedIn, X, Facebook, and Instagram. Established agile coordination with studio designers and copywriters to process ~100 creative briefs monthly, maintaining a steady output of 700+ scheduled posts with rigorous KPI reporting.',
    results: [
      { val: '+6,000', lbl: 'QoQ Impressions Lift' },
      { val: '+22%', lbl: 'QoQ Engagement Rate Increase' },
      { val: '700+', lbl: 'Monthly Posts Coordinated' },
      { val: '~100', lbl: 'Creative Briefs Processed Monthly' }
    ],
    deliverables: [
      'Multi-Platform B2B Editorial Calendars & Persona Matrices',
      'Quarterly Business Review (QBR) Analytical Performance Decks',
      'Cross-Functional Workflow Protocols for Studio & Copywriting Teams',
      'Weekly Micro-Pacing Dashboards'
    ],
    tools: ['Sprout Social', 'LinkedIn Campaign Manager', 'X Analytics', 'Meta Business Suite', 'Google Slides / QBRs']
  },
  'antique-candle': {
    category: 'D2C Community & E-Commerce',
    company: 'Antique Candle Co. (D2C Lifestyle Brand)',
    title: 'Community Engagement Monetization & Influencer Acquisition',
    challenge: 'A massive 156,000 follower audience required fast, high-touch community care that directly contributed to commercial bottom-line sales and wholesale B2B partnership growth.',
    approach: 'Transformed daily DM and comment inquiries into an active sales consultation channel by issuing tailored Shopify invoices on the fly. Leveraged performance data to isolate high-converting post categories, executed systematic hashtag A/B testing, and built an outreach pipeline recruiting contracted influencers and PR contacts.',
    results: [
      { val: '156K', lbl: 'Total Community Followers' },
      { val: '+12%', lbl: 'Lift in Post Engagement' },
      { val: '200+', lbl: 'Wholesale B2B Accounts Managed' },
      { val: '10', lbl: 'Contracted Influencers Signed' },
      { val: '23', lbl: 'Verified PR Contacts Onboarded' }
    ],
    deliverables: [
      'Direct-to-DM Social Selling Protocol & Shopify Invoicing Guide',
      'Instagram Hashtag Experimentation & Engagement Lift Study',
      'Influencer Sourcing, Vetting & Outreach Pipeline',
      'Wholesale B2B Account Screening Workflow via Zendesk & Avalara'
    ],
    tools: ['Shopify', 'Zendesk', 'Avalara CertCapture', 'Meta Business Suite', 'Instagram Native Insights']
  }
};

function openCaseModal(caseKey) {
  const data = caseStudyData[caseKey];
  if (!data) return;

  document.getElementById('modalCategory').textContent = data.category;
  document.getElementById('modalCompany').textContent = data.company;
  document.getElementById('modalTitle').textContent = data.title;

  let html = `
    <div class="modal-section">
      <h4>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        The Challenge
      </h4>
      <p>${data.challenge}</p>
    </div>

    <div class="modal-section">
      <h4>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        Strategic Approach & Execution
      </h4>
      <p>${data.approach}</p>
    </div>

    <div class="modal-section">
      <h4>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        Quantified Business Impact
      </h4>
      <div class="modal-results-grid">
        ${data.results.map(r => `
          <div class="modal-result-box">
            <div class="modal-result-val">${r.val}</div>
            <div class="modal-result-lbl">${r.lbl}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="modal-section">
      <h4>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        Core Deliverables Produced
      </h4>
      <ul class="timeline-points" style="margin-top: 8px;">
        ${data.deliverables.map(d => `<li>${d}</li>`).join('')}
      </ul>
    </div>

    <div class="modal-section" style="margin-bottom: 0;">
      <h4>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
        Tools & Platforms Utilized
      </h4>
      <div class="case-tags" style="margin-top: 8px;">
        ${data.tools.map(t => `<span class="tool-tag" style="font-size: 0.82rem; padding: 4px 10px;">${t}</span>`).join('')}
      </div>
    </div>
  `;

  document.getElementById('modalContent').innerHTML = html;
  document.getElementById('caseModalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCaseModal() {
  const overlay = document.getElementById('caseModalOverlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function handleModalOverlayClick(e) {
  if (e.target.id === 'caseModalOverlay') {
    closeCaseModal();
  }
}

function openResumeModal() {
  const overlay = document.getElementById('resumeModalOverlay');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeResumeModal() {
  const overlay = document.getElementById('resumeModalOverlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function handleResumeOverlayClick(e) {
  if (e.target.id === 'resumeModalOverlay') {
    closeResumeModal();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCaseModal();
    closeResumeModal();
  }
});

function copyEmailToClipboard() {
  const email = 'kirstenw1993@gmail.com';
  try {
    navigator.clipboard.writeText(email).then(() => {
      showToast('Direct email copied to clipboard!');
      const copyText = document.getElementById('copyText');
      if (copyText) {
        const original = copyText.textContent;
        copyText.textContent = '✓ Copied to Clipboard!';
        setTimeout(() => {
          copyText.textContent = original;
        }, 3000);
      }
    }).catch(() => {
      showToast('Email: kirstenw1993@gmail.com');
    });
  } catch (err) {
    showToast('Email: kirstenw1993@gmail.com');
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toastMsg');
  if (toast && msg) {
    msg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const subject = document.getElementById('subject').value;
  
  showToast(`Thank you, ${name}! Your inquiry regarding "${subject}" has been received.`);
  document.getElementById('contactForm').reset();
}

// Booking Modal Handlers
function openBookingModal() {
  const overlay = document.getElementById('bookingModalOverlay');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
  const overlay = document.getElementById('bookingModalOverlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function handleBookingOverlayClick(e) {
  if (e.target.id === 'bookingModalOverlay') {
    closeBookingModal();
  }
}

function handleBookingSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('bookName').value;
  const slot = document.getElementById('bookTime').value;
  showToast(`Thank you, ${name}! Your strategy session request for ${slot} has been received.`);
  closeBookingModal();
}

// --- Iteration 3: Simulator, Progress Bar & Back-to-Top ---

// Reading Progress Bar & Back-to-Top Toggle
window.addEventListener('scroll', () => {
  const progressBar = document.getElementById('readingProgressBar');
  const backToTopBtn = document.getElementById('backToTopBtn');
  
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  if (progressBar) {
    progressBar.style.width = scrolled + '%';
  }

  if (backToTopBtn) {
    if (winScroll > 450) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Campaign ROI & Impact Simulator Logic
let currentSimModel = 'sem';

function setSimModel(model) {
  currentSimModel = model;
  document.querySelectorAll('.sim-model-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.getElementById(`simBtn_${model}`);
  if (activeBtn) activeBtn.classList.add('active');

  const slider = document.getElementById('simSlider');
  const sliderLabel = document.getElementById('simSliderLabel');

  if (model === 'sem') {
    sliderLabel.textContent = 'Monthly Ad Spend Target:';
    slider.min = 2500;
    slider.max = 25000;
    slider.step = 500;
    slider.value = 5000;
  } else if (model === 'thought-leadership') {
    sliderLabel.textContent = 'Executive Assets per Month:';
    slider.min = 4;
    slider.max = 24;
    slider.step = 2;
    slider.value = 8;
  } else if (model === 'community') {
    sliderLabel.textContent = 'Monthly Community Post Cadence:';
    slider.min = 15;
    slider.max = 80;
    slider.step = 5;
    slider.value = 35;
  }
  updateSimulator();
}

function updateSimulator() {
  const slider = document.getElementById('simSlider');
  const valDisplay = document.getElementById('simSliderVal');
  const row1Lbl = document.getElementById('simRow1Lbl');
  const row1Val = document.getElementById('simRow1Val');
  const row2Lbl = document.getElementById('simRow2Lbl');
  const row2Val = document.getElementById('simRow2Val');
  const row3Lbl = document.getElementById('simRow3Lbl');
  const row3Val = document.getElementById('simRow3Val');
  const row4Lbl = document.getElementById('simRow4Lbl');
  const row4Val = document.getElementById('simRow4Val');

  if (!slider) return;
  const val = parseFloat(slider.value);

  if (currentSimModel === 'sem') {
    valDisplay.textContent = `$${val.toLocaleString()}`;
    const estClicks = Math.round(val / 1.35);
    const estConversions = Math.round(estClicks * 0.034);
    const estRevenue = Math.round(estConversions * 208);
    const estROAS = (estRevenue / val).toFixed(1);

    row1Lbl.textContent = 'Est. High-Intent Search Clicks:';
    row1Val.textContent = estClicks.toLocaleString();
    row2Lbl.textContent = 'Projected Direct Conversions:';
    row2Val.textContent = estConversions.toLocaleString();
    row3Lbl.textContent = 'Est. Attributed Revenue:';
    row3Val.textContent = `$${estRevenue.toLocaleString()}`;
    row4Lbl.textContent = 'Projected Performance ROAS:';
    row4Val.textContent = `${estROAS}x Return`;
  } else if (currentSimModel === 'thought-leadership') {
    valDisplay.textContent = `${val} Assets / Month`;
    const qualifiedInteractions = Math.round(val * 640);
    const csuiteGrowth = Math.round(val * 2.3);
    const avgLift = '>36%';
    const pipelineTouchpoints = Math.round(val * 48);

    row1Lbl.textContent = 'Monthly Qualified Interactions:';
    row1Val.textContent = qualifiedInteractions.toLocaleString();
    row2Lbl.textContent = 'New Targeted C-Suite Connections:';
    row2Val.textContent = `+${csuiteGrowth} / month`;
    row3Lbl.textContent = 'Average Peer Engagement Lift:';
    row3Val.textContent = avgLift;
    row4Lbl.textContent = 'Strategic Pipeline Touchpoints:';
    row4Val.textContent = `${pipelineTouchpoints.toLocaleString()} Executives`;
  } else if (currentSimModel === 'community') {
    valDisplay.textContent = `${val} Posts / Month`;
    const impressions = Math.round(val * 4200);
    const dmInquiries = Math.round(val * 14);
    const invoicedOrders = Math.round(dmInquiries * 0.38);
    const engLift = '+12% to +18%';

    row1Lbl.textContent = 'Estimated Organic Impressions:';
    row1Val.textContent = impressions.toLocaleString();
    row2Lbl.textContent = 'Direct DM Consultations:';
    row2Val.textContent = `${dmInquiries} Monthly DMs`;
    row3Lbl.textContent = 'Social Commerce Orders Closed:';
    row3Val.textContent = `${invoicedOrders} Custom Invoices`;
    row4Lbl.textContent = 'Audience Interaction Lift:';
    row4Val.textContent = engLift;
  }
}

// Initial binding after DOM load
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('simSlider');
  if (slider) {
    slider.addEventListener('input', updateSimulator);
    updateSimulator();
  }
});

// --- Iteration 4: Animated Counter, Mobile Drawer, Skill Search & Modal Tabs ---

// 1. Mobile Drawer Navigation
function openMobileDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileDrawerOverlay');
  if (drawer && overlay) {
    overlay.classList.add('active');
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileDrawerOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// 2. Animated Counter for Hero Metrics
function initMetricCounters() {
  const metrics = [
    { id: 'heroRevNum', target: 17930, prefix: '$', suffix: '+', isCurrency: true },
    { id: 'heroEngNum', target: 44.4, suffix: '%', isDecimal: true },
    { id: 'heroInteractionsNum', target: 4500, suffix: '+', isFormatted: true },
    { id: 'heroAudienceNum', target: 156, suffix: 'K+', isFormatted: false }
  ];

  let animated = false;
  const impactSection = document.getElementById('impact');
  if (!impactSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        metrics.forEach(m => {
          const el = document.getElementById(m.id);
          if (!el) return;
          animateValue(el, 0, m.target, 1400, m);
        });
      }
    });
  }, { threshold: 0.2 });

  observer.observe(impactSection);
}

function animateValue(obj, start, end, duration, config) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // Ease out cubic
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = start + (end - start) * easeProgress;

    let displayVal = '';
    if (config.isDecimal) {
      displayVal = current.toFixed(1);
    } else if (config.isCurrency) {
      displayVal = `$${(current / 1000).toFixed(1)}K`;
    } else if (config.isFormatted) {
      displayVal = Math.round(current).toLocaleString();
    } else {
      displayVal = Math.round(current);
    }

    obj.innerHTML = `${displayVal}<span class="accent">${config.suffix || ''}</span>`;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// 3. Live Skill Search & Category Filter (Iteration 8)
function filterSkillCategory(category) {
  document.querySelectorAll('.skill-filter-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.getElementById('skillBtn_' + category);
  if (activeBtn) activeBtn.classList.add('active');

  const cards = document.querySelectorAll('.skill-category-card');
  cards.forEach(card => {
    const cat = card.getAttribute('data-skill-cat');
    if (category === 'all' || cat === category) {
      card.style.display = '';
      card.classList.remove('hidden-category');
    } else {
      card.style.display = 'none';
      card.classList.add('hidden-category');
    }
  });

  // Reset search input if user clicks category filter
  const searchInput = document.getElementById('skillSearchInput');
  if (searchInput && searchInput.value) {
    searchInput.value = '';
    document.querySelectorAll('.skill-item').forEach(item => item.classList.remove('hidden-skill'));
  }
}

function filterSkills() {
  const input = document.getElementById('skillSearchInput');
  if (!input) return;
  const query = input.value.toLowerCase().trim();

  // If typing query, reset category tabs to 'All' so search looks globally
  if (query !== '') {
    document.querySelectorAll('.skill-filter-btn').forEach(b => b.classList.remove('active'));
    const allBtn = document.getElementById('skillBtn_all');
    if (allBtn) allBtn.classList.add('active');
  }

  const categories = document.querySelectorAll('.skill-category-card');
  categories.forEach(cat => {
    const items = cat.querySelectorAll('.skill-item');
    let hasVisibleItem = false;

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (query === '' || text.includes(query)) {
        item.classList.remove('hidden-skill');
        hasVisibleItem = true;
      } else {
        item.classList.add('hidden-skill');
      }
    });

    if (query === '') {
      cat.classList.remove('hidden-category');
      cat.style.display = '';
    } else {
      if (hasVisibleItem) {
        cat.classList.remove('hidden-category');
        cat.style.display = '';
      } else {
        cat.classList.add('hidden-category');
        cat.style.display = 'none';
      }
    }
  });
}

// 4. Modal Tab Switcher
function switchModalTab(tabId) {
  document.querySelectorAll('.modal-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.modal-tab-pane').forEach(pane => pane.classList.remove('active'));

  const activeBtn = document.getElementById(`tabBtn_${tabId}`);
  const activePane = document.getElementById(`tabPane_${tabId}`);
  if (activeBtn) activeBtn.classList.add('active');
  if (activePane) activePane.classList.add('active');
}

// 5. Quick Share Portfolio
function sharePortfolio() {
  const shareData = {
    title: 'Kirsten Peoples | Senior Digital Marketing Strategist Portfolio',
    text: 'Explore Kirsten Peoples\'s Digital Marketing & Multi-Channel Growth Portfolio.',
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showToast('Portfolio link copied to clipboard!');
    }).catch(() => {
      showToast('URL: ' + window.location.href);
    });
  }
}

// Re-hook case modal to render tabbed view
const originalOpenCaseModal = openCaseModal;
openCaseModal = function(caseKey) {
  originalOpenCaseModal(caseKey);
  const data = caseStudyData[caseKey];
  if (!data) return;

  // Enhance modal content with tabs
  const modalContainer = document.getElementById('caseModalContainer');
  let tabsHeader = document.getElementById('modalTabsNav');
  if (!tabsHeader) {
    tabsHeader = document.createElement('div');
    tabsHeader.id = 'modalTabsNav';
    tabsHeader.className = 'modal-tabs';
    tabsHeader.innerHTML = `
      <button class="modal-tab-btn active" id="tabBtn_overview" onclick="switchModalTab('overview')">Strategy & Approach</button>
      <button class="modal-tab-btn" id="tabBtn_wireframe" onclick="switchModalTab('wireframe')">Asset Architecture</button>
      <button class="modal-tab-btn" id="tabBtn_data" onclick="switchModalTab('data')">KPI Attribution</button>
    `;
    const header = modalContainer.querySelector('.modal-header');
    header.insertAdjacentElement('afterend', tabsHeader);
  }

  const modalBody = document.getElementById('modalContent');
  const currentOverviewHtml = modalBody.innerHTML;

  let wireframeCards = '';
  if (caseKey === 'microsun') {
    wireframeCards = `
      <div class="wireframe-card"><div class="wireframe-card-badge">Module 1</div><div class="wireframe-card-title">Search Intent Cluster</div><div class="wireframe-card-desc">Exact & phrase match high-AOV lighting keywords</div></div>
      <div class="wireframe-card"><div class="wireframe-card-badge">Module 2</div><div class="wireframe-card-title">Negative Pruning</div><div class="wireframe-card-desc">Continuous search query audit excluding low-yield clicks</div></div>
      <div class="wireframe-card"><div class="wireframe-card-badge">Module 3</div><div class="wireframe-card-title">Performance Max</div><div class="wireframe-card-desc">Smart bidding targeting high-ROAS e-commerce checkouts</div></div>
      <div class="wireframe-card"><div class="wireframe-card-badge">Module 4</div><div class="wireframe-card-title">YouTube Video SEO</div><div class="wireframe-card-desc">Search-intent educational explainers (10.5K+ views)</div></div>
    `;
  } else if (caseKey === 'real-chemistry') {
    wireframeCards = `
      <div class="wireframe-card"><div class="wireframe-card-badge">Asset 1</div><div class="wireframe-card-title">C-Suite Thought Carousel</div><div class="wireframe-card-desc">Document carousels translating clinical data into POV</div></div>
      <div class="wireframe-card"><div class="wireframe-card-badge">Asset 2</div><div class="wireframe-card-title">Physician Perspective Infographic</div><div class="wireframe-card-desc">Visual breakdown of regulatory biotechnology shifts</div></div>
      <div class="wireframe-card"><div class="wireframe-card-badge">Asset 3</div><div class="wireframe-card-title">Executive Profile Optimization</div><div class="wireframe-card-desc">LinkedIn headline, featured section & positioning audits</div></div>
      <div class="wireframe-card"><div class="wireframe-card-badge">Asset 4</div><div class="wireframe-card-title">C-Suite Network Pipeline</div><div class="wireframe-card-desc">~18 high-value executive connections added monthly</div></div>
    `;
  } else if (caseKey === 'leadtail') {
    wireframeCards = `
      <div class="wireframe-card"><div class="wireframe-card-badge">Engine 1</div><div class="wireframe-card-title">Persona Matrix</div><div class="wireframe-card-desc">Buyer pain-points aligned with specific content pillars</div></div>
      <div class="wireframe-card"><div class="wireframe-card-badge">Engine 2</div><div class="wireframe-card-title">700+ Monthly Scheduler</div><div class="wireframe-card-desc">Multi-channel calendar across LinkedIn, X, FB, IG</div></div>
      <div class="wireframe-card"><div class="wireframe-card-badge">Engine 3</div><div class="wireframe-card-title">Studio Briefing Flow</div><div class="wireframe-card-desc">Agile turnaround of ~100 monthly design & copy briefs</div></div>
      <div class="wireframe-card"><div class="wireframe-card-badge">Engine 4</div><div class="wireframe-card-title">Executive QBR Decks</div><div class="wireframe-card-desc">Data synthesis verifying quarterly impression and KPI growth</div></div>
    `;
  } else {
    wireframeCards = `
      <div class="wireframe-card"><div class="wireframe-card-badge">Flow 1</div><div class="wireframe-card-title">Consultative DM Selling</div><div class="wireframe-card-desc">Direct product recommendations via IG/FB comments</div></div>
      <div class="wireframe-card"><div class="wireframe-card-badge">Flow 2</div><div class="wireframe-card-title">Shopify Custom Checkout</div><div class="wireframe-card-desc">Custom draft order invoices closed in direct messages</div></div>
      <div class="wireframe-card"><div class="wireframe-card-badge">Flow 3</div><div class="wireframe-card-title">Hashtag A/B Testing</div><div class="wireframe-card-desc">Documented +12% lift in organic post interaction</div></div>
      <div class="wireframe-card"><div class="wireframe-card-badge">Flow 4</div><div class="wireframe-card-title">Influencer Seeding</div><div class="wireframe-card-desc">10 contracted creators & 23 PR relationships onboarded</div></div>
    `;
  }

  modalBody.innerHTML = `
    <div class="modal-tab-pane active" id="tabPane_overview">
      ${currentOverviewHtml}
    </div>
    <div class="modal-tab-pane" id="tabPane_wireframe">
      <div class="modal-section">
        <h4><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg> Deliverable Architecture Blueprint</h4>
        <p>The structured visual and functional modules developed during this engagement to ensure repeatability and compliance:</p>
        <div class="wireframe-grid">
          ${wireframeCards}
        </div>
      </div>
    </div>
    <div class="modal-tab-pane" id="tabPane_data">
      <div class="modal-section">
        <h4><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> Granular KPI Performance Metrics</h4>
        <div class="modal-results-grid">
          ${data.results.map(r => `
            <div class="modal-result-box">
              <div class="modal-result-val">${r.val}</div>
              <div class="modal-result-lbl">${r.lbl}</div>
            </div>
          `).join('')}
        </div>
        <p style="margin-top: 14px; font-size: 0.88rem; color: var(--text-secondary);">
          *All figures are directly verified through platform native analytics (Google Ads, GA4, Sprout Social, Meta Business Suite, Shopify).
        </p>
      </div>
    </div>
  `;
  switchModalTab('overview');
};

document.addEventListener('DOMContentLoaded', () => {
  initMetricCounters();
  const searchInput = document.getElementById('skillSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', filterSkills);
  }
});

// --- Iteration 5: Testimonial Filter, Executive One-Sheet, & Form Validation ---

// 1. Filter Testimonials
function filterTestimonials(category) {
  document.querySelectorAll('.test-filter-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.getElementById(`testBtn_${category}`);
  if (activeBtn) activeBtn.classList.add('active');

  const cards = document.querySelectorAll('.testimonial-card');
  cards.forEach(card => {
    const cat = card.getAttribute('data-testimonial-cat');
    if (category === 'all' || cat === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// 2. Executive One-Sheet Modal
function openOneSheetModal() {
  const overlay = document.getElementById('oneSheetModalOverlay');
  if (overlay) overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeOneSheetModal() {
  const overlay = document.getElementById('oneSheetModalOverlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function handleOneSheetOverlayClick(e) {
  if (e.target.id === 'oneSheetModalOverlay') {
    closeOneSheetModal();
  }
}

// 3. Character Counter for Contact Form
document.addEventListener('DOMContentLoaded', () => {
  const msgInput = document.getElementById('message');
  const counter = document.getElementById('charCountDisplay');
  if (msgInput && counter) {
    msgInput.addEventListener('input', () => {
      counter.textContent = `${msgInput.value.length} / 500 characters`;
    });
  }
});

// --- Dropdown Menu System ---
function initDropdownMenus() {
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.nav-dropdown-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('active');
        dropdowns.forEach(d => d.classList.remove('active'));
        if (!isOpen) {
          dropdown.classList.add('active');
        }
      });
    }
  });

  // Close dropdowns on outside click or escape
  document.addEventListener('click', () => {
    dropdowns.forEach(d => d.classList.remove('active'));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdowns.forEach(d => d.classList.remove('active'));
    }
  });

  // Close dropdown when item is clicked
  document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      dropdowns.forEach(d => d.classList.remove('active'));
    });
  });
}

// --- Traffic & Section Dwell Time Tracking Engine ---
const PortfolioAnalytics = {
  sessionStart: Date.now(),
  sectionTimes: {},
  currentActiveSection: null,
  sectionEntryTimestamp: null,
  scrollMilestones: new Set(),

  init() {
    this.initSectionObserver();
    this.initScrollDepthTracker();
    this.initExitListener();
  },

  logEvent(eventName, params = {}) {
    // 1. Google Analytics 4 integration (if gtag loaded)
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
    // 2. Microsoft Clarity custom event (if clarity loaded)
    if (typeof window.clarity === 'function') {
      window.clarity('event', eventName);
    }
    // 3. Local telemetry persistence
    try {
      const history = JSON.parse(sessionStorage.getItem('kp_telemetry_events') || '[]');
      history.push({ event: eventName, params, timestamp: new Date().toISOString() });
      sessionStorage.setItem('kp_telemetry_events', JSON.stringify(history));
    } catch (e) {}
  },

  initSectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const now = Date.now();

        if (entry.isIntersecting) {
          // Exited previous section
          if (this.currentActiveSection && this.sectionEntryTimestamp && this.currentActiveSection !== id) {
            const elapsed = Math.round((now - this.sectionEntryTimestamp) / 1000);
            if (elapsed >= 2) {
              this.recordSectionDwell(this.currentActiveSection, elapsed);
            }
          }
          this.currentActiveSection = id;
          this.sectionEntryTimestamp = now;
        } else if (this.currentActiveSection === id) {
          if (this.sectionEntryTimestamp) {
            const elapsed = Math.round((now - this.sectionEntryTimestamp) / 1000);
            if (elapsed >= 2) {
              this.recordSectionDwell(id, elapsed);
            }
          }
          this.currentActiveSection = null;
          this.sectionEntryTimestamp = null;
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(s => observer.observe(s));
  },

  recordSectionDwell(sectionId, seconds) {
    this.sectionTimes[sectionId] = (this.sectionTimes[sectionId] || 0) + seconds;
    this.logEvent('section_dwell_time', {
      section_id: sectionId,
      time_spent_seconds: seconds,
      cumulative_section_seconds: this.sectionTimes[sectionId]
    });
  },

  initScrollDepthTracker() {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height <= 0) return;
      const percent = Math.round((winScroll / height) * 100);

      [25, 50, 75, 90, 100].forEach(milestone => {
        if (percent >= milestone && !this.scrollMilestones.has(milestone)) {
          this.scrollMilestones.add(milestone);
          this.logEvent('scroll_depth', { depth_percentage: milestone });
        }
      });
    }, { passive: true });
  },

  initExitListener() {
    window.addEventListener('beforeunload', () => {
      if (this.currentActiveSection && this.sectionEntryTimestamp) {
        const elapsed = Math.round((Date.now() - this.sectionEntryTimestamp) / 1000);
        if (elapsed >= 2) {
          this.recordSectionDwell(this.currentActiveSection, elapsed);
        }
      }
      const totalSession = Math.round((Date.now() - this.sessionStart) / 1000);
      this.logEvent('session_complete', {
        total_time_seconds: totalSession,
        sections_reviewed: Object.keys(this.sectionTimes).length,
        breakdown: this.sectionTimes
      });
    });
  },

  getSummary() {
    return {
      sessionDurationSeconds: Math.round((Date.now() - this.sessionStart) / 1000),
      timeSpentPerSection: this.sectionTimes,
      maxScrollDepthReached: Array.from(this.scrollMilestones)
    };
  }
};

window.getPortfolioAnalyticsSummary = () => PortfolioAnalytics.getSummary();

document.addEventListener('DOMContentLoaded', () => {
  initDropdownMenus();
  PortfolioAnalytics.init();
});

// --- Iteration 6: Case Study View Toggle & Recruiter Quick Templates ---

// 1. Case Study View Mode Switcher
function setCaseStudyView(mode) {
  const cardGrid = document.querySelector('.case-studies-grid');
  const matrixContainer = document.getElementById('caseMatrixContainer');
  const cardBtn = document.getElementById('viewBtn_card');
  const matrixBtn = document.getElementById('viewBtn_matrix');

  if (mode === 'matrix') {
    if (cardGrid) cardGrid.style.display = 'none';
    if (matrixContainer) matrixContainer.classList.add('active');
    if (cardBtn) cardBtn.classList.remove('active');
    if (matrixBtn) matrixBtn.classList.add('active');
  } else {
    if (cardGrid) cardGrid.style.display = 'grid';
    if (matrixContainer) matrixContainer.classList.remove('active');
    if (cardBtn) cardBtn.classList.add('active');
    if (matrixBtn) matrixBtn.classList.remove('active');
  }
}

// 2. Recruiter Quick-Contact Message Templates
const contactTemplates = {
  'interview': {
    subject: 'Full-Time Growth Role',
    message: 'Hi Kirsten, we came across your portfolio and were impressed by your multi-channel track record across paid search and executive thought leadership. We would love to invite you to an introductory interview for a Senior Marketing / Growth Lead role with our team.'
  },
  'audit': {
    subject: 'Paid Search & SEM Audit',
    message: 'Hi Kirsten, our brand is looking to scale paid search performance and eliminate keyword spend bleed. We would love to connect for a consultation to review our Google Ads / Performance Max structure and attribution setup.'
  },
  'advisory': {
    subject: 'Executive Thought Leadership',
    message: 'Hi Kirsten, we are looking to elevate our executive C-suite presence and physician thought leadership on LinkedIn. We would love to discuss your executive audit framework and multi-format carousel workflows.'
  }
};

function applyContactTemplate(key) {
  const data = contactTemplates[key];
  if (!data) return;

  const subjectSelect = document.getElementById('subject');
  const messageArea = document.getElementById('message');
  const counter = document.getElementById('charCountDisplay');

  if (subjectSelect) subjectSelect.value = data.subject;
  if (messageArea) {
    messageArea.value = data.message;
    if (counter) {
      counter.textContent = `${messageArea.value.length} / 500 characters`;
    }
  }

  document.querySelectorAll('.template-pill-btn').forEach(b => b.classList.remove('active'));
  const activePill = document.getElementById(`pill_${key}`);
  if (activePill) activePill.classList.add('active');

  showToast(`Applied "${data.subject}" message template!`);
}

// --- Iteration 7: vCard Download, Timeline Filter & Testimonial Carousel ---

// 1. One-Click vCard / Contact Card Generator
function downloadVCard() {
  const vcardContent = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Peoples;Kirsten;;;',
    'FN:Kirsten Peoples',
    'TITLE:Senior Digital Marketing Strategist',
    'ORG:Digital Marketing & Multi-Channel Growth',
    'EMAIL;type=INTERNET;type=WORK;type=pref:kirstenw1993@gmail.com',
    'ADR;type=WORK:;;Greater Dayton / Columbus;OH;;USA',
    'NOTE:7+ years experience leading paid search acquisition (Google Ads / PMax), C-suite executive thought leadership, and B2B/D2C content engines.',
    'URL:' + window.location.href,
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.setAttribute('download', 'kirsten_peoples_contact.vcf');
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(url);

  showToast('Digital contact card (vCard) downloaded!');
}

// 2. Timeline Category Filter
function filterTimeline(category) {
  document.querySelectorAll('.timeline-filter-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.getElementById(`tlBtn_${category}`);
  if (activeBtn) activeBtn.classList.add('active');

  const items = document.querySelectorAll('.timeline-item');
  items.forEach(item => {
    const cat = item.getAttribute('data-timeline-cat');
    if (category === 'all' || cat === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}
