import pandas as pd
import streamlit as st

@st.cache_data
def load_data(file_path="retail_sales_dataset.csv"):
    try:
        df = pd.read_csv(file_path)
        return df
    except FileNotFoundError:
        return None
