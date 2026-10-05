import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots

# Consistent color palette
COLORS = px.colors.qualitative.Prism

def get_base_layout(title=""):
    return {
        "title": title,
        "template": "plotly_white",
        "margin": dict(l=20, r=20, t=40, b=20),
        "hovermode": "closest"
    }

def plot_bar(df, x, y, title, color=None):
    fig = px.bar(df, x=x, y=y, title=title, color=color, color_discrete_sequence=COLORS)
    fig.update_layout(**get_base_layout(title))
    return fig

def plot_line(df, x, y, title, color=None):
    fig = px.line(df, x=x, y=y, title=title, color=color, color_discrete_sequence=COLORS)
    fig.update_layout(**get_base_layout(title))
    return fig

def plot_scatter(df, x, y, title, color=None, size=None):
    fig = px.scatter(df, x=x, y=y, title=title, color=color, size=size, color_discrete_sequence=COLORS)
    fig.update_layout(**get_base_layout(title))
    return fig

def plot_histogram(df, x, title, bins=10):
    fig = px.histogram(df, x=x, nbins=bins, title=title, color_discrete_sequence=[COLORS[0]])
    fig.update_layout(**get_base_layout(title))
    return fig

def plot_heatmap(df, x, y, z, title):
    pivot = df.pivot_table(values=z, index=y, columns=x, aggfunc='sum').fillna(0)
    fig = px.imshow(pivot, title=title, color_continuous_scale="Viridis", aspect="auto")
    fig.update_layout(**get_base_layout(title))
    return fig

def plot_sunburst(df, path, values, title):
    fig = px.sunburst(df, path=path, values=values, title=title, color_discrete_sequence=COLORS)
    fig.update_layout(**get_base_layout(title))
    return fig

def plot_pareto(df, category_col, value_col, title):
    df_sorted = df.groupby(category_col)[value_col].sum().reset_index().sort_values(by=value_col, ascending=False)
    df_sorted['cumulative_perc'] = df_sorted[value_col].cumsum() / df_sorted[value_col].sum() * 100
    
    fig = make_subplots(specs=[[{"secondary_y": True}]])
    fig.add_trace(go.Bar(x=df_sorted[category_col], y=df_sorted[value_col], name="Revenue", marker_color=COLORS[0]), secondary_y=False)
    fig.add_trace(go.Scatter(x=df_sorted[category_col], y=df_sorted['cumulative_perc'], name="Cumulative %", mode="lines+markers", marker_color=COLORS[1]), secondary_y=True)
    
    fig.update_layout(**get_base_layout(title))
    fig.update_yaxes(title_text="Revenue", secondary_y=False)
    fig.update_yaxes(title_text="Cumulative %", range=[0, 105], secondary_y=True)
    fig.add_hline(y=80, line_dash="dash", line_color="red", secondary_y=True, annotation_text="80% Threshold")
    return fig
