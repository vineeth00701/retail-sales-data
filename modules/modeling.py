import streamlit as st
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import r2_score, mean_squared_error
from utils.modeling import get_feature_matrix_and_target
import plotly.express as px

def render(df):
    st.title("Advanced Modeling")
    if df is None:
        return
        
    st.write("Train predictive models to estimate Total Amount. Explore standard vs. leakage-free evaluation.")
    
    leakage_free = st.toggle("Enable Leakage-Free Mode (Remove Quantity and Price per Unit)", value=False)
    tune = st.toggle("Enable GridSearchCV (Takes longer)", value=False)
    
    if st.button("Train & Evaluate Models"):
        X, y = get_feature_matrix_and_target(df)
        if leakage_free:
            X = X.drop(columns=['Quantity', 'Price per Unit'], errors='ignore')
            st.warning("Leakage-free mode ON: Removed 'Quantity' and 'Price per Unit'. R2 will drop significantly since the deterministic formula is broken.")
        else:
            st.info("Standard mode: Perfect R2 expected since Total Amount = Quantity x Price per Unit.")
            
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        models = {
            "Linear Regression": LinearRegression(),
            "Decision Tree": DecisionTreeRegressor(random_state=42),
            "Random Forest": RandomForestRegressor(n_estimators=50, random_state=42),
            "Gradient Boosting": GradientBoostingRegressor(random_state=42)
        }
        
        params = {
            "Decision Tree": {'max_depth': [None, 5, 10]},
            "Random Forest": {'n_estimators': [50, 100], 'max_depth': [None, 10]},
            "Gradient Boosting": {'n_estimators': [50, 100], 'learning_rate': [0.05, 0.1]}
        }
        
        results = []
        progress = st.progress(0)
        
        for i, (name, model) in enumerate(models.items()):
            with st.spinner(f"Training {name}..."):
                if tune and name in params:
                    grid = GridSearchCV(model, params[name], cv=3, scoring='r2')
                    grid.fit(X_train, y_train)
                    best_model = grid.best_estimator_
                else:
                    best_model = model
                    best_model.fit(X_train, y_train)
                    
                preds = best_model.predict(X_test)
                r2 = r2_score(y_test, preds)
                rmse = np.sqrt(mean_squared_error(y_test, preds))
                
                # 5-fold CV
                cv_scores = cross_val_score(best_model, X, y, cv=5, scoring='r2')
                
                results.append({
                    "Model": name,
                    "R2 Score": r2,
                    "RMSE": rmse,
                    "CV R2 (5-fold)": cv_scores.mean()
                })
            progress.progress((i + 1) / len(models))
            
        res_df = pd.DataFrame(results).sort_values(by="R2 Score", ascending=False)
        
        st.write("### Model Leaderboard 🏆")
        st.dataframe(res_df.style.highlight_max(subset=['R2 Score', 'CV R2 (5-fold)'], color='lightgreen'))
        
        fig = px.bar(res_df, x='Model', y='R2 Score', title="R2 Score Comparison", color='R2 Score')
        st.plotly_chart(fig, use_container_width=True)
        
        if not leakage_free:
            st.info("💡 **Why is R2 so high?** Total Amount is a direct product of Quantity and Price. The tree-based models easily learn this exact mathematical relationship, leading to perfect scores (R2 ~ 1.0). Enable Leakage-Free Mode to see how well we can predict spending based solely on demographics and category.")
