import pandas as pd
import numpy as np

def clean_data(df):
    # Just basic conversions if needed for EDA tools
    if 'Date' in df.columns:
        df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
    return df
