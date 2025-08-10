window.onload = async function () {
    const response = await fetch('./database/kvk-mock-db-end.json');
    const dados = await response.json();

    // Ordenar por pontuação (Score) de forma decrescente
    const ordenado = dados.sort((a, b) => b.Score - a.Score);

    // Formatadores internacionais (padrão en-US)
    const formatador = new Intl.NumberFormat('en-US');
    const formatadorDecimal = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // Seleciona o tbody da tabela
    const tabela = document.getElementById('tabela-ranking').querySelector('tbody');

    // Preenche a tabela
    ordenado.forEach((item) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td data-sort="${item.Kingdom}">${item.Kingdom}</td>
            <td data-sort="${item["LK"]}">${item["LK"]}</td>
            <td data-sort="${item["Governor ID"]}">${item["Governor ID"]}</td>
            <td>${item["Governor Name"]}</td>
            <td data-sort="${item.Power}">${formatador.format(item.Power)}</td>
            <td data-sort="${item.KP}">${formatador.format(item.KP)}</td>
            <td data-sort="${item.Dead}">${formatador.format(item.Dead)}</td>
            <td data-sort="${item.Score}">${formatadorDecimal.format(item.Score)}</td>
        `;
        tabela.appendChild(linha);
    });

    // Ativa a ordenação nas colunas (usando Tablesort)
    new Tablesort(document.getElementById('tabela-ranking'));
};