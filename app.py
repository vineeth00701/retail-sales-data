import streamlit as st
from streamlit_option_menu import option_menu
import pandas as pd
import numpy as np

# Set page config FIRST
st.set_page_config(
    page_title="Retail Analytics Pro",
    layout="wide",
    initial_sidebar_state="expanded"
)

from utils.ui import apply_custom_css, render_hero
from utils.filters import init_session_state, global_sidebar_filters
from utils.data_loader import load_data
import modules.home as home
import modules.cleaning as cleaning
import modules.eda as eda
import modules.modeling as modeling
import modules.segmentation as segmentation
import modules.forecasting as forecasting
import modules.simulator as simulator
import modules.ask_data as ask_data
import modules.reporting as reporting

def main():
    init_session_state()
    
    # Theme toggle in sidebar
    theme_col1, theme_col2 = st.sidebar.columns([3, 1])
    theme_col1.write("Dark Mode")
    dark_mode = theme_col2.toggle("", value=st.session_state['dark_mode'], key="theme_toggle")
    st.session_state['dark_mode'] = dark_mode
    
    # Apply CSS and Theme
    apply_custom_css()
    if dark_mode:
        st.markdown('<div data-theme="dark">', unsafe_allow_html=True)
        
    # Sidebar navigation
    with st.sidebar:
        selected = option_menu(
            "Main Menu", 
            ["Home", "Data Cleaning", "Advanced EDA", "Modeling", "Segmentation", "Forecasting", "Simulator", "Ask the Data", "Reporting"],
            icons=['house', 'magic', 'bar-chart', 'cpu', 'pie-chart', 'graph-up-arrow', 'sliders', 'chat-left-text', 'file-earmark-pdf'],
            menu_icon="cast", default_index=0
        )
    
    # Load and Filter Data globally
    df = load_data()
    
    if df is not None:
        filtered_df = global_sidebar_filters(df)
    else:
        filtered_df = None
        
    # Routing
    if selected == "Home":
        home.render(filtered_df)
    elif selected == "Data Cleaning":
        cleaning.render(df) # Cleaning page might need full df
    elif selected == "Advanced EDA":
        eda.render(filtered_df)
    elif selected == "Modeling":
        modeling.render(filtered_df)
    elif selected == "Segmentation":
        segmentation.render(filtered_df)
    elif selected == "Forecasting":
        forecasting.render(filtered_df)
    elif selected == "Simulator":
        simulator.render(filtered_df)
    elif selected == "Ask the Data":
        ask_data.render(filtered_df)
    elif selected == "Reporting":
        reporting.render(filtered_df)

    if dark_mode:
        st.markdown('</div>', unsafe_allow_html=True)

if __name__ == "__main__":
    main()
