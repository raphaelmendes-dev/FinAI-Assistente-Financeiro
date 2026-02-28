
## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Prompt Engineering](#-prompt-engineering)
- [Roadmap](#-roadmap)
- [Contribuindo](#-contribuindo)

---

## 🎯 Visão Geral

**FinAI Companion** é um assistente financeiro digital **gratuito e acessível** que usa IA generativa para democratizar o acesso à educação financeira. O projeto combina:

- 🤖 **IA Generativa** (Google Gemini) para conversas naturais
- 📊 **Cálculos financeiros precisos** com Python
- 💬 **Interface conversacional** intuitiva
- 🧠 **Persistência de contexto** para experiências personalizadas

### Por que FinAI Companion?

Segundo o Banco Central, apenas **25% dos brasileiros** têm acesso a consultoria financeira profissional. O FinAI democratiza esse acesso oferecendo:

- ✅ Explicações em linguagem simples
- ✅ Simulações financeiras instantâneas
- ✅ Educação contínua sobre finanças
- ✅ Zero custo para o usuário

---

## ✨ Funcionalidades

### 1. 💬 FAQ Inteligente

Responde dúvidas comuns com explicações contextualizadas:

- "O que é CDB?"
- "Como funciona o Tesouro Direto?"
- "Qual a diferença entre renda fixa e variável?"

**Diferencial:** Não apenas define, mas explica **por que isso importa** para você.

### 2. 🧮 Simuladores Financeiros

Calculadoras interativas com explicações:

- **Juros Compostos:** Veja seu dinheiro crescer ao longo do tempo
- **Financiamentos:** Calcule parcelas (PRICE e SAC)
- **Objetivos Financeiros:** Quanto economizar para atingir uma meta
- **ROI:** Avalie retorno sobre investimentos

### 3. 📚 Explicações de Produtos

Compare produtos financeiros com análise imparcial:

- CDB vs Tesouro Direto
- Renda Fixa vs Renda Variável
- Poupança vs Investimentos

### 4. 🧠 Persistência de Contexto

O assistente **lembra** de conversas anteriores:

```
Você: "Quero investir R$ 10.000"
FinAI: "Ótimo! Qual seu objetivo e prazo?"
[conversa continua...]

Você: "E sobre aqueles R$ 10.000?"
FinAI: "Sobre o investimento que discutimos..."
```

### 5. 🌐 Suporte Multilíngue

Interface disponível em:
- 🇧🇷 Português
- 🇺🇸 English
- 🇪🇸 Español

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────┐
│              Interface (Streamlit)               │
│  - Chat Interface                                │
│  - Sidebar com Calculadoras                      │
│  - FAQ Rápido                                    │
└───────────────────┬─────────────────────────────┘
                    │
        ┌───────────▼───────────┐
        │   app.py (Orquestrador)│
        └───────────┬───────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
┌───────▼─────────┐    ┌───────▼──────────┐
│   ai_core.py    │    │  data_handler.py │
│                 │    │                  │
│ - Gemini API    │    │ - Cálculos       │
│ - Prompt Eng.   │    │ - Simulações     │
│ - Few-shot      │    │ - Pandas         │
│ - Chain-of-T.   │    │                  │
└─────────────────┘    └──────────────────┘
        │
┌───────▼─────────┐
│    utils.py     │
│                 │
│ - Persistência  │
│ - Validação     │
│ - Formatação    │
└─────────────────┘
```

---

## 🛠️ Tecnologias

| Categoria | Tecnologia | Versão | Uso |
|-----------|-----------|--------|-----|
| **Backend** | Python | 3.8+ | Linguagem base |
| **IA** | Google Gemini | API | Modelo de linguagem |
| **UI** | Streamlit | 1.29+ | Interface web |
| **Dados** | Pandas | 2.1+ | Manipulação de dados |
| **Persistência** | JSON | - | Armazenamento local |

---

## 🚀 Instalação

### Pré-requisitos

- Python 3.8 ou superior
- Chave de API do Google Gemini ([obter aqui](https://makersuite.google.com/app/apikey))

### Passo a Passo

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/finai-companion.git
cd finai-companion
```

2. **Crie ambiente virtual**

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

3. **Instale dependências**

```bash
pip install -r requirements.txt
```

4. **Configure API Key**

Crie arquivo `.env` na raiz do projeto:

```env
GEMINI_API_KEY=sua_chave_aqui
```

5. **Execute o aplicativo**

```bash
streamlit run app.py
```

6. **Acesse no navegador**

Abra: `http://localhost:8501`

---

## 💡 Como Usar

### 1. Perguntas Livres

Digite qualquer dúvida financeira:

```
"Como posso juntar R$ 50.000 em 3 anos?"
"Vale a pena investir em CDB?"
"Quanto vou pagar de juros nesse financiamento?"
```

### 2. Calculadoras Rápidas

Use a barra lateral para:

- Simular juros compostos
- Calcular parcelas de financiamento
- Planejar poupança mensal

### 3. FAQ Predefinido

Clique em perguntas comuns para respostas instantâneas.

### 4. Continuidade

O assistente lembra de conversas anteriores. Você pode:

- Refinar perguntas anteriores
- Comparar cenários
- Aprofundar tópicos

---

## 📁 Estrutura do Projeto

```
finai-companion/
│
├── app.py                 # Interface principal (Streamlit)
├── ai_core.py            # Motor de IA (Gemini + Prompts)
├── data_handler.py       # Calculadora financeira
├── utils.py              # Utilitários (persistência, validação)
│
├── requirements.txt      # Dependências
├── README.md            # Este arquivo
├── .env                 # Configurações (não versionado)
│
├── data/                # Armazenamento local
│   ├── conversations.json
│   └── user_profile.json
│
└── docs/                # Documentação adicional
    ├── prompt-engineering.md
    ├── architecture.md
    └── examples.md
```

---

## 🧠 Prompt Engineering

### Estrutura Modular

O FinAI usa um sistema de prompts em camadas:

#### 1. **System Prompt** (Persona)

Define identidade e comportamento:

```
Você é o FinAI Companion, um assistente financeiro digital educativo e empático.

PRINCÍPIOS:
- Clareza: linguagem simples
- Educação: explique o "porquê"
- Segurança: avise sobre riscos
- Empatia: reconheça ansiedade financeira
```

#### 2. **Few-Shot Learning**

Exemplos de qualidade para cada tipo de pergunta:

- **Conceitos básicos:** Explicações educativas
- **Simulações:** Cálculos com contexto
- **Comparações:** Análise imparcial

#### 3. **Chain-of-Thought**

Raciocínio passo a passo:

```
1. Reconhecer a pergunta
2. Explicar conceito
3. Fornecer contexto prático
4. Sugerir próximos passos
5. Encorajar
```

#### 4. **Contexto Dinâmico**

Histórico de conversa integrado ao prompt:

```python
context = f"""
CONVERSA ANTERIOR:
Usuário: "Quero investir R$ 10.000"
Você: "Ótimo! Qual seu objetivo?"

NOVA PERGUNTA:
Usuário: "Prazo de 2 anos"
"""
```

### Exemplo de Prompt Completo

```
[SYSTEM PROMPT]
Você é o FinAI Companion...

[CONTEXTO]
O usuário perguntou anteriormente sobre CDB...

[FEW-SHOT EXAMPLES]
Pergunta similar: "O que é Tesouro Direto?"
Resposta modelo: ...

[QUERY ATUAL]
Usuário: "Qual rende mais, CDB ou Tesouro?"

Responda seguindo estrutura: Acolhimento > Explicação > Contexto > Ação > Suporte
```

---

## 🎯 Roadmap

### ✅ MVP (Concluído)

- [x] FAQ inteligente
- [x] Calculadoras financeiras
- [x] Interface Streamlit
- [x] Persistência de contexto
- [x] Sistema de prompts modular

### 🚧 Próximas Features

#### Fase 2 (Em Desenvolvimento)

- [ ] Integração com voz (Whisper API)
- [ ] Dashboard de finanças pessoais
- [ ] Visualizações interativas (Plotly)
- [ ] Exportar simulações (PDF/Excel)

#### Fase 3 (Futuro)

- [ ] Gamificação (metas como missões)
- [ ] Integração com bancos (Open Finance)
- [ ] Alertas inteligentes
- [ ] Comunidade de usuários
- [ ] App mobile (Flutter)

---

## 📊 Diferenciais do Projeto

### 1. **Educação > Recomendação**

Foco em **ensinar**, não vender produtos.

### 2. **Transparência**

Explica cálculos e limitações claramente.

### 3. **Acessibilidade**

- Interface simples
- Linguagem descomplicada
- Gratuito e open-source

### 4. **Contextualização**

Relaciona conceitos com situações reais:

> "CDB é como emprestar dinheiro para o banco"

### 5. **Ética**

Aviso claro: **"Não substitui consultoria profissional"**

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. **Commit** suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um **Pull Request**

### Guidelines

- Siga PEP 8 para código Python
- Comente código complexo
- Adicione testes para novas features
- Atualize documentação

---

## 📝 Apresentação para Bootcamp

### Estrutura Sugerida

#### 1. **Abertura (2min)**

- Problema: falta de acesso a consultoria financeira
- Solução: FinAI Companion

#### 2. **Demo ao Vivo (5min)**

- Pergunta livre: "Como juntar R$ 50k em 3 anos?"
- Mostrar persistência de contexto
- Usar calculadora lateral

#### 3. **Arquitetura Técnica (3min)**

- Diagrama de componentes
- Destaque: Prompt Engineering modular
- Stack tecnológica

#### 4. **Diferenciais (2min)**

- Educação > venda
- Contextualização
- Acessibilidade

#### 5. **Roadmap e Visão (2min)**

- Próximas features
- Impacto social esperado

#### 6. **Código (1min)**

Mostrar snippet de prompt engineering:

```python
def generate_response(self, query, context):
    prompt = f"""
    {self.system_prompt}
    {self._build_context(context)}
    {self._get_few_shot_examples(query)}
    
    Usuário: {query}
    """
    return self.model.generate(prompt)
```

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🙏 Agradecimentos

- **Google Gemini** pela API de IA generativa
- **Streamlit** pela framework de UI intuitiva
- Comunidade de **educação financeira** pelo conhecimento compartilhado

---

## 📧 Contato

**Desenvolvedor:** Raphael Mendes
**Email:** python.dev.raphael@gmail.com
**GitHub:**  https://github.com/raphaelmendes-dev
**LinkedIn:** https://www.linkedin.com/in/raphaelmendes-dev/

---

## 🌟 Filosofia do Projeto

> "Finanças não são apenas números — são padrões de vida, escolhas e sonhos. O FinAI traduz a complexidade dos mercados em histórias humanas compreensíveis."

---

**⭐ Se este projeto te ajudou, considere dar uma estrela no GitHub!**

---

### Status do Projeto

![Status](https://img.shields.io/badge/Status-MVP%20Concluído-brightgreen)
![Deployment](https://img.shields.io/badge/Deployment-Local-blue)
![Tests](https://img.shields.io/badge/Tests-Em%20Desenvolvimento-yellow)

**Última atualização:** Fevereiro 2026
