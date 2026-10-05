import streamlit as st
import pandas as pd
from utils.charts import plot_bar, plot_heatmap, plot_line, plot_sunburst, plot_pareto

def render(df):
    st.title("Advanced EDA")
    if df is None or df.empty:
        st.warning("No data matches the current filters.")
        return
        
    tab1, tab2, tab3 = st.tabs(["Distributions", "Seasonality & Trends", "Deep Dive"])
    
    with tab1:
        col1, col2 = st.columns(2)
        with col1:
            if 'Age' in df.columns:
                # Bin age groups
                bins = [0, 18, 25, 35, 45, 55, 65, 100]
                labels = ['<18', '18-24', '25-34', '35-44', '45-54', '55-64', '65+']
                df['Age Group'] = pd.cut(df['Age'], bins=bins, labels=labels, right=False)
                age_sales = df.groupby('Age Group')['Total Amount'].sum().reset_index()
                st.plotly_chart(plot_bar(age_sales, 'Age Group', 'Total Amount', "Sales by Age Group"), use_container_width=True)
        with col2:
            if 'Product Category' in df.columns and 'Total Amount' in df.columns:
                st.plotly_chart(plot_pareto(df, 'Product Category', 'Total Amount', "Pareto: Category Revenue"), use_container_width=True)
                
    with tab2:
        if 'Date' in df.columns and 'Total Amount' in df.columns:
            df['Date'] = pd.to_datetime(df['Date'])
            daily = df.groupby('Date')['Total Amount'].sum().reset_index()
            daily['7-Day MA'] = daily['Total Amount'].rolling(window=7).mean()
            daily['30-Day MA'] = daily['Total Amount'].rolling(window=30).mean()
            
            import plotly.graph_objects as go
            fig = go.Figure()
            fig.add_trace(go.Scatter(x=daily['Date'], y=daily['Total Amount'], mode='lines', name='Daily Sales', opacity=0.3))
            fig.add_trace(go.Scatter(x=daily['Date'], y=daily['7-Day MA'], mode='lines', name='7-Day MA'))
            fig.add_trace(go.Scatter(x=daily['Date'], y=daily['30-Day MA'], mode='lines', name='30-Day MA'))
            fig.update_layout(title="Sales Trend & Moving Averages", template="plotly_white")
            st.plotly_chart(fig, use_container_width=True)
            
    with tab3:
        if 'Product Category' in df.columns and 'Gender' in df.columns and 'Total Amount' in df.columns:
            st.plotly_chart(plot_heatmap(df, 'Gender', 'Product Category', 'Total Amount', "Category x Gender Heatmap"), use_container_width=True)
            
            if 'Age Group' in df.columns:
                # Note: Sunburst requires careful handling of zeros/nans, but we assume valid data for this mockup
                # We need a dataframe with path columns
                df_sun = df.dropna(subset=['Product Category', 'Gender', 'Age Group'])
                st.plotly_chart(plot_sunburst(df_sun, ['Product Category', 'Gender', 'Age Group'], 'Total Amount', "Category > Gender > Age Group"), use_container_width=True)
