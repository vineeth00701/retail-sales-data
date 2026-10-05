# Retail Analytics Pro

An upgraded, professional-grade Streamlit application for analyzing retail transaction data.

## New Features
- **Modern UI**: Custom CSS with gradient hero, animated KPI cards, dark/light theme, and `streamlit-option-menu`.
- **Global Filters**: Date, Gender, Category, Age, and Price filters persist across pages via session state.
- **Interactive Plotly Charts**: Sunbursts, Pareto charts, heatmaps, and moving averages replacing Matplotlib.
- **Advanced Modeling**: 5-fold CV, GridSearchCV, Gradient Boosting, and a 'Leakage-Free' evaluation mode.
- **Extra Modules**: Segmentation (K-Means), Forecasting (Time Series), What-If Simulator, Ask the Data, and Reporting (Export to CSV/Excel/PDF).
- **Engineering**: Fully modular architecture (`utils/` and `modules/`).

## Setup
```bash
pip install -r requirements.txt
python -m streamlit run app.py
```
