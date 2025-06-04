import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy.stats import expon
import ipywidgets as widgets
from IPython.display import display, clear_output

# Widgets de entrada
lambda_input = widgets.FloatText(value=0.5, description='λ (lambda):')
sample_size_input = widgets.IntText(value=1000, description='Amostras:')
button = widgets.Button(description="Gerar Distribuição")
output = widgets.Output()

def gerar_distribuicao(b):
    with output:
        clear_output()
        lambd = lambda_input.value
        sample_size = sample_size_input.value

        # Simular dados
        np.random.seed(42)
        samples = np.random.exponential(scale=1/lambd, size=sample_size)

        # Estatísticas
        media = np.mean(samples)
        desvio_padrao = np.std(samples)
        variancia = np.var(samples)
        coef_variacao = desvio_padrao / media

        # Gráfico
        plt.figure(figsize=(10, 6))
        sns.histplot(samples, bins=30, kde=True, stat="density", color="skyblue", label="Histograma com KDE")
        x = np.linspace(0, np.max(samples), 1000)
        plt.plot(x, expon.pdf(x, scale=1/lambd), 'r-', lw=2, label=f'Densidade Teórica (λ={lambd})')
        plt.axvline(media, color='green', linestyle='--', label=f'Média: {media:.2f}')
        plt.title("Distribuição Exponencial")
        plt.xlabel("Tempo")
        plt.ylabel("Densidade de Probabilidade")
        plt.legend()
        plt.grid(True)
        plt.tight_layout()
        plt.show()

        print(f"Média: {media:.4f}")
        print(f"Desvio Padrão: {desvio_padrao:.4f}")
        print(f"Variância: {variancia:.4f}")
        print(f"Coeficiente de Variação: {coef_variacao:.4f}")

button.on_click(gerar_distribuicao)

# Exibir interface
display(lambda_input, sample_size_input, button, output)
