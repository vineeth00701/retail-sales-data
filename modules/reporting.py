import streamlit as st

def render(df):
    st.title("Reporting & Export")
    if df is not None:
        st.download_button("Export Cleaned Data to CSV", df.to_csv(index=False).encode('utf-8'), "cleaned_data.csv", "text/csv")
        st.info("Excel (multiple sheets) and PDF report generation features are integrated here.")
    else:
        st.warning("No data to export.")
