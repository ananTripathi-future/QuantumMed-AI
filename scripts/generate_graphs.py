import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

def generate_combined_plot(df, symptoms_per_record, symptom_cols, output_dir):
    """
    Generates a single 2x2 grid containing all four statistical plots.
    """
    print("[Generating Combined Plot] Creating 2x2 grid summary sheet...")
    # Increase font size for high-res output
    plt.rcParams['font.size'] = 11
    
    fig, axs = plt.subplots(2, 2, figsize=(20, 14))
    plt.suptitle('QuantumMed AI - Dataset Statistical Summary (4,500 Records)', fontsize=22, fontweight='bold', y=0.98, color='#0F172A')
    
    # 1. Histogram (Top-Left)
    axs[0, 0].hist(symptoms_per_record, 
                  bins=range(int(symptoms_per_record.min()), int(symptoms_per_record.max()) + 2), 
                  color='#3B82F6', edgecolor='white', alpha=0.85, rwidth=0.85)
    axs[0, 0].set_title('Distribution of Symptoms per Patient Record', fontsize=14, fontweight='bold', pad=10, color='#1E293B')
    axs[0, 0].set_xlabel('Number of Symptoms', fontsize=12)
    axs[0, 0].set_ylabel('Number of Patient Records', fontsize=12)
    axs[0, 0].grid(True, linestyle='--', alpha=0.4)
    
    # 2. Box Plot (Top-Right)
    axs[0, 1].boxplot(symptoms_per_record, patch_artist=True,
                boxprops=dict(facecolor='#93C5FD', color='#1E40AF', linewidth=1.5),
                capprops=dict(color='#1E40AF', linewidth=1.5),
                whiskerprops=dict(color='#1E40AF', linewidth=1.5),
                flierprops=dict(marker='o', markerfacecolor='#EF4444', markersize=6, linestyle='none', markeredgecolor='none'),
                medianprops=dict(color='#1E3A8A', linewidth=2),
                tick_labels=['Symptoms per Record'])
    axs[0, 1].set_title('Box Plot of Symptoms per Record (Spread & Outliers)', fontsize=14, fontweight='bold', pad=10, color='#1E293B')
    axs[0, 1].set_ylabel('Symptom Count', fontsize=12)
    axs[0, 1].grid(True, linestyle='--', alpha=0.4)
    
    # 3. Heatmap (Bottom-Left)
    top_symptoms = symptom_cols.sum().nlargest(15).index
    correlation_matrix = symptom_cols[top_symptoms].corr()
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt=".2f", linewidths=0.5, 
                cbar_kws={'label': 'Correlation Coefficient'}, annot_kws={"size": 8}, ax=axs[1, 0])
    axs[1, 0].set_title('Correlation Heatmap of Top 15 Symptoms', fontsize=14, fontweight='bold', pad=10, color='#1E293B')
    axs[1, 0].set_xticklabels(top_symptoms, rotation=45, ha='right')
    axs[1, 0].set_yticklabels(top_symptoms, rotation=0)
    
    # 4. Bar Chart (Bottom-Right)
    top_diseases = df['disease'].value_counts().nlargest(10)
    colors = ['#1E3A8A', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE', '#EFF6FF', '#F3F4F6', '#E5E7EB']
    top_diseases.plot(kind='barh', color=colors[::-1], edgecolor='none', width=0.7, ax=axs[1, 1])
    axs[1, 1].set_title('Top 10 Diseases by Record Count', fontsize=14, fontweight='bold', pad=10, color='#1E293B')
    axs[1, 1].set_xlabel('Number of Patient Records', fontsize=12)
    axs[1, 1].set_ylabel('Disease Class', fontsize=12)
    axs[1, 1].grid(True, axis='x', linestyle='--', alpha=0.4)
    axs[1, 1].invert_yaxis()
    
    plt.tight_layout(rect=[0, 0, 1, 0.95])
    combined_path = os.path.join(output_dir, 'combined_statistical_plots.png')
    plt.savefig(combined_path, dpi=300)
    plt.close()
    print(f"-> Saved combined grid sheet: {combined_path}")

def generate_html_dashboard(output_dir):
    """
    Creates a styled HTML page containing all graphs displayed in a clean, modern grid layout.
    """
    print("[Generating HTML Dashboard] Creating standalone dashboard file...")
    html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QuantumMed AI - Dataset Statistical Analytics Dashboard</title>
    <style>
        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background-color: #0F172A;
            color: #E2E8F0;
            margin: 0;
            padding: 40px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        header {
            text-align: center;
            margin-bottom: 40px;
        }
        h1 {
            color: #38BDF8;
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        p {
            color: #94A3B8;
            font-size: 1.1rem;
        }
        .container {
            max-width: 1400px;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
        }
        .card {
            background-color: #1E293B;
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            border: 1px solid #334155;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .card h2 {
            font-size: 1.25rem;
            color: #38BDF8;
            margin-top: 0;
            margin-bottom: 20px;
            text-align: center;
            width: 100%;
            border-bottom: 1px solid #334155;
            padding-bottom: 12px;
        }
        .card img {
            max-width: 100%;
            border-radius: 6px;
            border: 1px solid #475569;
        }
        .full-width {
            grid-column: span 2;
        }
        footer {
            margin-top: 60px;
            color: #64748B;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
    <header>
        <h1>⚛️ QuantumMed AI</h1>
        <p>Dataset Statistical Analytics Dashboard — symptoms.csv (4,500 Observations)</p>
    </header>
    
    <div class="container">
        <div class="card full-width">
            <h2>Combined Analytics Sheet (All Graphs Grid)</h2>
            <img src="combined_statistical_plots.png" alt="Combined Plots">
        </div>
        
        <div class="card">
            <h2>1. Distribution of Symptoms per Patient Record</h2>
            <img src="symptom_distribution_histogram.png" alt="Histogram">
        </div>
        
        <div class="card">
            <h2>2. Spread and Outliers (Symptom Counts)</h2>
            <img src="symptom_count_boxplot.png" alt="Box Plot">
        </div>
        
        <div class="card">
            <h2>3. Correlation Heatmap (Top 15 Symptoms Relationship)</h2>
            <img src="symptom_correlation_heatmap.png" alt="Heatmap">
        </div>
        
        <div class="card">
            <h2>4. Top 10 Diseases by Record Count</h2>
            <img src="top_diseases_bar_chart.png" alt="Bar Chart">
        </div>
    </div>
    
    <footer>
        QuantumMed AI Project &copy; 2026. Built with Python, Pandas, Matplotlib, and Seaborn.
    </footer>
</body>
</html>
"""
    dashboard_path = os.path.join(output_dir, 'statistical_dashboard.html')
    with open(dashboard_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f"-> Saved HTML summary page: {dashboard_path}")

def generate_statistical_plots():
    """
    Core entrypoint.
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    symptoms_csv = os.path.join(base_dir, "backend", "symptoms.csv")
    output_dir = os.path.join(base_dir, "backend", "static", "graphs")
    
    if not os.path.exists(symptoms_csv):
        print(f"[Error] Dataset not found at: {symptoms_csv}")
        return
        
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    df = pd.read_csv(symptoms_csv)
    symptom_cols = df.drop(columns=['disease'])
    symptoms_per_record = symptom_cols.sum(axis=1)
    
    # Generate standalone plots
    # 1. Histogram
    plt.figure(figsize=(10, 6))
    plt.hist(symptoms_per_record, 
             bins=range(int(symptoms_per_record.min()), int(symptoms_per_record.max()) + 2), 
             color='#3B82F6', edgecolor='white', alpha=0.85, rwidth=0.85)
    plt.title('Distribution of Symptoms per Patient Record', fontsize=14, fontweight='bold', pad=15)
    plt.xlabel('Number of Symptoms', fontsize=12)
    plt.ylabel('Number of Patient Records', fontsize=12)
    plt.grid(True, linestyle='--', alpha=0.4)
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'symptom_distribution_histogram.png'), dpi=300)
    plt.close()
    
    # 2. Boxplot
    plt.figure(figsize=(8, 6))
    plt.boxplot(symptoms_per_record, patch_artist=True,
                boxprops=dict(facecolor='#93C5FD', color='#1E40AF', linewidth=1.5),
                capprops=dict(color='#1E40AF', linewidth=1.5),
                whiskerprops=dict(color='#1E40AF', linewidth=1.5),
                flierprops=dict(marker='o', markerfacecolor='#EF4444', markersize=6, linestyle='none', markeredgecolor='none'),
                medianprops=dict(color='#1E3A8A', linewidth=2),
                tick_labels=['Symptoms per Record'])
    plt.title('Box Plot of Symptoms per Record (Spread & Outliers)', fontsize=14, fontweight='bold', pad=15)
    plt.ylabel('Symptom Count', fontsize=12)
    plt.grid(True, linestyle='--', alpha=0.4)
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'symptom_count_boxplot.png'), dpi=300)
    plt.close()
    
    # 3. Heatmap
    top_symptoms = symptom_cols.sum().nlargest(15).index
    correlation_matrix = symptom_cols[top_symptoms].corr()
    plt.figure(figsize=(12, 10))
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt=".2f", linewidths=0.5, 
                cbar_kws={'label': 'Correlation Coefficient'}, annot_kws={"size": 9})
    plt.title('Correlation Heatmap of Top 15 Most Frequent Symptoms', fontsize=14, fontweight='bold', pad=15)
    plt.xticks(rotation=45, ha='right')
    plt.yticks(rotation=0)
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'symptom_correlation_heatmap.png'), dpi=300)
    plt.close()
    
    # 4. Bar Chart
    top_diseases = df['disease'].value_counts().nlargest(10)
    plt.figure(figsize=(12, 6))
    colors = ['#1E3A8A', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE', '#EFF6FF', '#F3F4F6', '#E5E7EB']
    top_diseases.plot(kind='barh', color=colors[::-1], edgecolor='none', width=0.7)
    plt.title('Top 10 Diseases by Record Count in ML Dataset', fontsize=14, fontweight='bold', pad=15)
    plt.xlabel('Number of Patient Records', fontsize=12)
    plt.ylabel('Disease Class', fontsize=12)
    plt.grid(True, axis='x', linestyle='--', alpha=0.4)
    plt.gca().invert_yaxis()
    plt.tight_layout()
    plt.savefig(os.path.join(output_dir, 'top_diseases_bar_chart.png'), dpi=300)
    plt.close()
    
    # Generate combined elements
    generate_combined_plot(df, symptoms_per_record, symptom_cols, output_dir)
    generate_html_dashboard(output_dir)
    print("\n[Success] All graphs generated and stored together!")

if __name__ == "__main__":
    generate_statistical_plots()
