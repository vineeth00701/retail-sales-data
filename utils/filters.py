import streamlit as st
import pandas as pd

def init_session_state():
    if 'dark_mode' not in st.session_state:
        st.session_state['dark_mode'] = False
    
def global_sidebar_filters(df):
    st.sidebar.header("Global Filters")
    
    if df is None or df.empty:
        return df
        
    filtered_df = df.copy()
    
    # Date Range
    if 'Date' in filtered_df.columns:
        filtered_df['Date'] = pd.to_datetime(filtered_df['Date'], errors='coerce')
        min_date = filtered_df['Date'].min().date() if not pd.isnull(filtered_df['Date'].min()) else None
        max_date = filtered_df['Date'].max().date() if not pd.isnull(filtered_df['Date'].max()) else None
        
        if min_date and max_date:
            date_range = st.sidebar.date_input("Date Range", [min_date, max_date], key='date_filter')
            if len(date_range) == 2:
                filtered_df = filtered_df[(filtered_df['Date'].dt.date >= date_range[0]) & (filtered_df['Date'].dt.date <= date_range[1])]

    # Gender
    if 'Gender' in filtered_df.columns:
        genders = filtered_df['Gender'].dropna().unique().tolist()
        selected_genders = st.sidebar.multiselect("Gender", options=genders, default=genders, key='gender_filter')
        filtered_df = filtered_df[filtered_df['Gender'].isin(selected_genders)]
        
    # Category
    if 'Product Category' in filtered_df.columns:
        cats = filtered_df['Product Category'].dropna().unique().tolist()
        selected_cats = st.sidebar.multiselect("Category", options=cats, default=cats, key='cat_filter')
        filtered_df = filtered_df[filtered_df['Product Category'].isin(selected_cats)]
        
    # Age Range
    if 'Age' in filtered_df.columns:
        min_age = int(filtered_df['Age'].min())
        max_age = int(filtered_df['Age'].max())
        age_range = st.sidebar.slider("Age Range", min_age, max_age, (min_age, max_age), key='age_filter')
        filtered_df = filtered_df[(filtered_df['Age'] >= age_range[0]) & (filtered_df['Age'] <= age_range[1])]
        
    # Price Range
    if 'Price per Unit' in filtered_df.columns:
        min_price = float(filtered_df['Price per Unit'].min())
        max_price = float(filtered_df['Price per Unit'].max())
        price_range = st.sidebar.slider("Price Range", min_price, max_price, (min_price, max_price), key='price_filter')
        filtered_df = filtered_df[(filtered_df['Price per Unit'] >= price_range[0]) & (filtered_df['Price per Unit'] <= price_range[1])]

    return filtered_df
