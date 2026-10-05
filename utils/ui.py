import streamlit as st

def apply_custom_css():
    st.markdown("""
        <style>
        /* Modern theme variables */
        :root {
            --primary: #4F46E5;
            --secondary: #10B981;
            --background: #F3F4F6;
            --surface: #FFFFFF;
            --text: #1F2937;
            --text-light: #6B7280;
        }
        
        [data-theme="dark"] {
            --primary: #818CF8;
            --secondary: #34D399;
            --background: #111827;
            --surface: #1F2937;
            --text: #F9FAFB;
            --text-light: #9CA3AF;
        }

        /* Gradient Hero */
        .hero {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            padding: 2rem;
            border-radius: 1rem;
            color: white;
            text-align: center;
            margin-bottom: 2rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        /* Cards */
        .metric-card {
            background-color: var(--surface);
            padding: 1.5rem;
            border-radius: 1rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s, box-shadow 0.2s;
            margin-bottom: 1rem;
            text-align: center;
            border-top: 4px solid var(--primary);
        }
        
        .metric-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        .metric-title {
            font-size: 0.875rem;
            color: var(--text-light);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.5rem;
        }
        
        .metric-value {
            font-size: 2rem;
            font-weight: bold;
            color: var(--text);
            margin: 0;
        }
        
        .metric-delta {
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.5rem;
            border-radius: 9999px;
            font-weight: 500;
        }
        
        .metric-delta.positive {
            background-color: rgba(16, 185, 129, 0.1);
            color: #10B981;
        }
        
        .metric-delta.negative {
            background-color: rgba(239, 68, 68, 0.1);
            color: #EF4444;
        }
        
        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .stApp {
            animation: fadeIn 0.5s ease-out;
        }
        </style>
    """, unsafe_allow_html=True)

def render_hero(title, subtitle):
    st.markdown(f"""
        <div class="hero">
            <h1 style="color: white; margin:0;">{title}</h1>
            <p style="color: rgba(255,255,255,0.8); margin-top: 0.5rem; font-size: 1.1rem;">{subtitle}</p>
        </div>
    """, unsafe_allow_html=True)

def render_kpi_card(title, value, delta=None, delta_type="positive"):
    delta_class = "positive" if delta_type == "positive" else "negative"
    delta_html = f'<div class="metric-delta {delta_class}">{delta}</div>' if delta else ''
    
    st.markdown(f"""
        <div class="metric-card">
            <div class="metric-title">{title}</div>
            <div class="metric-value">{value}</div>
            {delta_html}
        </div>
    """, unsafe_allow_html=True)
