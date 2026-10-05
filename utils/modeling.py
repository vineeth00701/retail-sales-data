import pandas as pd
from sklearn.model_selection import train_test_split

def get_feature_matrix_and_target(df):
    if 'Total Amount' not in df.columns:
        return None, None
    df_copy = df.copy()
    drop_cols = ['Transaction ID', 'Customer ID', 'Date', 'Total Amount']
    drop_cols = [c for c in drop_cols if c in df_copy.columns]
    
    y = df_copy['Total Amount']
    X = df_copy.drop(columns=drop_cols)
    
    # One-hot encode Gender and Product Category
    X = pd.get_dummies(X, columns=['Gender', 'Product Category'], drop_first=True)
    return X, y
