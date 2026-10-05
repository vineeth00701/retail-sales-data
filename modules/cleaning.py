import streamlit as st
import pandas as pd
from utils.charts import plot_histogram

def render(df):
    st.title("Data Cleaning & Quality")
    if df is None:
        st.error("No data found.")
        return
        
    tab1, tab2, tab3 = st.tabs(["Overview", "Missing & Duplicates", "Outlier Detection"])
    
    with tab1:
        st.write("### Dataset Preview")
        st.dataframe(df.head())
        st.write(f"**Shape:** {df.shape[0]} rows, {df.shape[1]} columns")
        
    with tab2:
        col1, col2 = st.columns(2)
        with col1:
            st.write("### Missing Values")
            st.write(df.isnull().sum())
        with col2:
            st.write("### Duplicates")
            st.write(f"Total duplicates: {df.duplicated().sum()}")
            
    with tab3:
        st.write("### Outlier Detection")
        if 'Price per Unit' in df.columns:
            st.plotly_chart(plot_histogram(df, 'Price per Unit', 'Price Distribution'), use_container_width=True)
