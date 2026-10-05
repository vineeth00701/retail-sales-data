import streamlit as st
import pandas as pd
from pandasql import sqldf

def render(df):
    st.title("Ask the Data")
    st.write("Translate simple questions to pandas queries.")
    query = st.text_input("Enter SQL-like query (e.g., SELECT * FROM df LIMIT 5):")
    if query:
        try:
            result = sqldf(query, locals())
            st.dataframe(result)
        except Exception as e:
            st.error(f"Error executing query: {e}")
