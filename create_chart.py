import matplotlib.pyplot as plt

models = ["Decision Tree", "Random Forest", "KNN"]
accuracy = [68.85, 100, 100]

plt.figure(figsize=(8, 6))

plt.bar(models, accuracy)

plt.title("Model Performance Comparison")
plt.xlabel("Machine Learning Model")
plt.ylabel("Accuracy (%)")

plt.ylim(0, 110)

plt.tight_layout()

plt.savefig("model_performance.png", dpi=300, bbox_inches="tight")

print("Model performance chart created successfully!")