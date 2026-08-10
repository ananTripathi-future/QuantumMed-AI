import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

def generate_statistical_plots():
    """
    Generates four statistical graphs for the QuantumMed AI project using the local ML training datasets:
    1. Histogram - Distribution of symptoms per record
    2. Box Plot - Spread and outliers of symptom count
    3. Correlation Heatmap - Relationship between top 15 symptoms
    4. Bar Chart - Top 10 diseases by record count
    """
    # 1. Resolve paths
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    symptoms_csv = os.path.join(base_dir, "backend", "symptoms.csv")
    output_dir = os.path.join(base_dir, "backend", "static", "graphs")
    
    if not os.path.exists(symptoms_csv):
        print(f"[Error] Dataset not found at: {symptoms_csv}")
        return
        
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"[Info] Created output directory: {output_dir}")
        
    print(f"[Info] Loading dataset from: {symptoms_csv}")
    df = pd.read_csv(symptoms_csv)
    
    # Pre-calculate row symptom count (excluding the 'disease' label column)
    symptom_cols = df.drop(columns=['disease'])
    symptoms_per_record = symptom_cols.sum(axis=1)
    
    # ----------------------------------------------------
    # Plot 1: Histogram - Distribution of symptoms per record
    # ----------------------------------------------------
    print("[Generating Plot 1/4] Histogram...")
    plt.figure(figsize=(10, 6))
    plt.hist(symptoms_per_record, 
             bins=range(int(symptoms_per_record.min()), int(symptoms_per_record.max()) + 2), 
             color='#3B82F6', edgecolor='white', alpha=0.85, rwidth=0.85)
    
    # Adding a kernel density approximation curve dynamically using matplotlib
    plt.title('Distribution of Symptoms per Patient Record', fontsize=14, fontweight='bold', pad=15)
    plt.xlabel('Number of Symptoms', fontsize=12)
    plt.ylabel('Number of Patient Records', fontsize=12)
    plt.grid(True, which='both', linestyle='--', alpha=0.4)
    plt.tight_layout()
    plot1_path = os.path.join(output_dir, 'symptom_distribution_histogram.png')
    plt.savefig(plot1_path, dpi=300)
    plt.close()
    print(f"-> Saved: {plot1_path}")
    
    # ----------------------------------------------------
    # Plot 2: Box Plot - Spread and outliers
    # ----------------------------------------------------
    print("[Generating Plot 2/4] Box Plot...")
    plt.figure(figsize=(8, 6))
    plt.boxplot(symptoms_per_record, patch_artist=True,
                boxprops=dict(facecolor='#93C5FD', color='#1E40AF', linewidth=1.5),
                capprops=dict(color='#1E40AF', linewidth=1.5),
                whiskerprops=dict(color='#1E40AF', linewidth=1.5),
                flierprops=dict(marker='o', markerfacecolor='#EF4444', markersize=6, linestyle='none', markeredgecolor='none'),
                medianprops=dict(color='#1E3A8A', linewidth=2),
                labels=['Symptoms per Record'])
    
    plt.title('Box Plot of Symptoms per Record (Spread & Outliers)', fontsize=14, fontweight='bold', pad=15)
    plt.ylabel('Symptom Count', fontsize=12)
    plt.grid(True, linestyle='--', alpha=0.4)
    plt.tight_layout()
    plot2_path = os.path.join(output_dir, 'symptom_count_boxplot.png')
    plt.savefig(plot2_path, dpi=300)
    plt.close()
    print(f"-> Saved: {plot2_path}")
    
    # ----------------------------------------------------
    # Plot 3: Correlation Heatmap - Relationship between symptoms
    # ----------------------------------------------------
    # We select the top 15 most frequent symptoms to ensure clean annotation sizing
    print("[Generating Plot 3/4] Correlation Heatmap...")
    top_symptoms = symptom_cols.sum().nlargest(15).index
    correlation_matrix = symptom_cols[top_symptoms].corr()
    
    plt.figure(figsize=(12, 10))
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt=".2f", linewidths=0.5, 
                cbar_kws={'label': 'Correlation Coefficient'}, annot_kws={"size": 9})
    
    plt.title('Correlation Heatmap of Top 15 Most Frequent Symptoms', fontsize=14, fontweight='bold', pad=15)
    plt.xticks(rotation=45, ha='right')
    plt.yticks(rotation=0)
    plt.tight_layout()
    plot3_path = os.path.join(output_dir, 'symptom_correlation_heatmap.png')
    plt.savefig(plot3_path, dpi=300)
    plt.close()
    print(f"-> Saved: {plot3_path}")
    
    # ----------------------------------------------------
    # Plot 4: Bar Chart - Top 10 diseases by record count
    # ----------------------------------------------------
    print("[Generating Plot 4/4] Bar Chart...")
    top_diseases = df['disease'].value_counts().nlargest(10)
    
    plt.figure(figsize=(12, 6))
    colors = ['#1E3A8A', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE', '#EFF6FF', '#F3F4F6', '#E5E7EB']
    
    # Horizontal bar plot for easy reading of disease names
    top_diseases.plot(kind='barh', color=colors[::-1], edgecolor='none', width=0.7)
    
    plt.title('Top 10 Diseases by Record Count in ML Dataset', fontsize=14, fontweight='bold', pad=15)
    plt.xlabel('Number of Patient Records', fontsize=12)
    plt.ylabel('Disease Class', fontsize=12)
    plt.grid(True, axis='x', linestyle='--', alpha=0.4)
    plt.gca().invert_yaxis()  # Rank highest disease at the top of the chart
    plt.tight_layout()
    plot4_path = os.path.join(output_dir, 'top_diseases_bar_chart.png')
    plt.savefig(plot4_path, dpi=300)
    plt.close()
    print(f"-> Saved: {plot4_path}")
    
    print("\n[Success] Statistical graph generation complete!")

if __name__ == "__main__":
    generate_statistical_plots()
