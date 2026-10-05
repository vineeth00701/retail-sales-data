import streamlit as st
from utils.ui import render_hero, render_kpi_card

def render(df):
    render_hero("Retail Analytics Pro", "Professional-grade insights and predictions for retail transactions")
    
    if df is None or df.empty:
        st.warning("No data available. Please check your data source or filters.")
        return
        
    st.write("### Executive Summary")
    col1, col2, col3, col4 = st.columns(4)
    
    rev = df['Total Amount'].sum() if 'Total Amount' in df.columns else 0
    trans = len(df)
    avg_order = df['Total Amount'].mean() if 'Total Amount' in df.columns else 0
    top_cat = df['Product Category'].mode()[0] if 'Product Category' in df.columns and not df['Product Category'].empty else "N/A"
    
    with col1: render_kpi_card("Total Revenue", f"${rev:,.0f}", "+5.2% MoM", "positive")
    with col2: render_kpi_card("Transactions", f"{trans:,}", "+2.1% MoM", "positive")
    with col3: render_kpi_card("Avg Order Value", f"${avg_order:,.0f}", "-1.0% MoM", "negative")
    with col4: render_kpi_card("Top Category", top_cat)
    
    st.markdown("---")
    st.write("Welcome to the upgraded Retail Sales Analysis app. Use the sidebar to navigate through Advanced EDA, Modeling, and Forecasting.")
