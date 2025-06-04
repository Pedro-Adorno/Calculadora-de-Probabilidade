import numpy as np
import matplotlib.pyplot as plt

def plot_distribuicao_uniforme(a, b, x1, x2):
    if x1 < a or x2 > b:
        raise ValueError("x1 e x2 devem estar dentro do intervalo [a, b]")

    # Altura da densidade e probabilidade da área sombreada
    altura = 1 / (b - a)
    prob = (x2 - x1) / (b - a)
    porcentagem = prob * 100

    # Estatísticas
    media = (a + b) / 2
    variancia = ((b - a) ** 2) / 12
    desvio_padrao = np.sqrt(variancia)
    coef_variacao = (desvio_padrao / media) * 100

    # Eixo x e y da função densidade
    x = np.linspace(a - 1, b + 1, 500)
    y = np.where((x >= a) & (x <= b), altura, 0)

    # Gráfico
    plt.figure(figsize=(12, 6))
    plt.plot(x, y, label="f(x) = 1 / (b - a)", color="blue")
    plt.fill_between(x, y, where=(x >= x1) & (x <= x2), color='orange', alpha=0.6,
                     label=f"P({x1} ≤ X ≤ {x2}) = {porcentagem:.1f}%")

    # Texto com porcentagem
    plt.text((x1 + x2)/2, altura + 0.01, f"{porcentagem:.1f}%", 
             ha='center', fontsize=12, color='black', fontweight='bold')

    # Texto com estatísticas
    estat_text = (
        f"Média: {media:.2f}\n"
        f"Variância: {variancia:.2f}\n"
        f"Desvio padrão: {desvio_padrao:.2f}\n"
        f"Coef. de variação: {coef_variacao:.2f}%"
    )
    plt.text(b + 0.5, altura / 2, estat_text, va='center', fontsize=11,
             bbox=dict(boxstyle="round", facecolor="#f0f0f0", edgecolor='gray'))

    # Detalhes do gráfico
    plt.title("Distribuição Uniforme Contínua com Estatísticas")
    plt.xlabel("x")
    plt.ylabel("Densidade de Probabilidade")
    plt.legend()
    plt.grid(True)
    plt.ylim(0, altura + 0.05)
    plt.xlim(a - 1, b + 4)
    plt.tight_layout()
    plt.show()

# Parâmetros de exemplo
a = int(input('Insira o número: '))
b = int(input('Insira o número: '))
x1 = int(input('Insira o número: '))
x2 = int(input('Insira o número: '))

plot_distribuicao_uniforme(a, b, x1, x2)
