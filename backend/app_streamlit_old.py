import streamlit as st
import os
import pandas as pd
from ai_core import FinAIEngine
from data_handler import FinancialCalculator

# Configuração robusta
st.set_page_config(page_title="FinAI CORE v3.1", layout="wide", initial_sidebar_state="expanded")

# --- CSS FULL (Preservando a identidade visual que você gostou) ---
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap');
    .stApp { background: #010409; color: #00f2ff; font-family: 'Orbitron', sans-serif; }
    .main-header { font-size: 3.2rem; text-align: center; color: #00f2ff; text-shadow: 0 0 15px #00f2ff; padding: 20px; }
    [data-testid="stMetric"] { background: rgba(0, 242, 255, 0.05); border: 1px solid #00f2ff; border-radius: 15px; padding: 20px; }
    div[data-testid="stSidebar"] { background-color: #0a0a0a !important; border-right: 1px solid #00f2ff33; }
</style>
""", unsafe_allow_html=True)

def main():
    # Inicialização de objetos e estados
    calc = FinancialCalculator()
    if "messages" not in st.session_state: st.session_state.messages = []
    if "df_evolucao" not in st.session_state: st.session_state.df_evolucao = None
    
    # Busca dados reais via API
    try:
        stats = calc.obter_metricas_mercado()
    except Exception:
        stats = {"selic": "15,00%", "ipca": "4,10%", "dolar": "R$ 5.40", "ibov": "132.000"}

    st.markdown('<h1 class="main-header">FINAI CORE v3.1</h1>', unsafe_allow_html=True)

    # --- DASHBOARD DE MÉTRICAS REAIS ---
    m1, m2, m3, m4 = st.columns(4)
    m1.metric("SELIC (Meta)", stats["selic"])
    m2.metric("IPCA (12m)", stats["ipca"])
    m3.metric("DÓLAR (Comercial)", stats["dolar"])
    m4.metric("IBOVESPA", stats["ibov"])

    # --- SIDEBAR COM CALCULADORA ---
    with st.sidebar:
        st.markdown("<h3 style='text-align:center;'>CALCULADORA AI</h3>", unsafe_allow_html=True)
        img_path = os.path.join("assets", "robot_finAI.png")
        if os.path.exists(img_path):
            st.image(img_path, use_container_width=True)
        
        st.divider()
        cap_ini = st.number_input("Capital Inicial (R$)", min_value=0.0, value=1000.0)
        aporte = st.number_input("Aporte Mensal (R$)", min_value=0.0, value=100.0)
        tax_anu = st.number_input("Taxa Anual (%)", min_value=0.0, value=12.0)
        t_anos = st.number_input("Tempo (Anos)", min_value=1, value=5)

        if st.button("CALCULAR PROJEÇÃO", use_container_width=True):
            resultado = calc.juros_compostos(cap_ini, tax_anu/100, t_anos, aporte)
            st.session_state.df_evolucao = calc.simular_investimento_tempo(cap_ini, aporte, tax_anu/100, t_anos)
            st.success(f"Montante Final: R$ {resultado:,.2f}")

    # --- ÁREA CENTRAL ---
    if st.session_state.df_evolucao is not None:
        st.markdown("### 📈 Evolução Patrimonial")
        st.line_chart(st.session_state.df_evolucao, x="mes", y="saldo", color="#00ff88")
    
    st.divider()

    # --- CHAT ---
    for msg in st.session_state.messages:
        with st.chat_message(msg["role"]): st.markdown(msg["content"])

    if prompt := st.chat_input("Pergunte ao FinAI..."):
        st.session_state.messages.append({"role": "user", "content": prompt})
        with st.chat_message("user"): st.markdown(prompt)

        with st.chat_message("assistant"):
            try:
                engine = FinAIEngine()
                response = engine.generate_response(prompt, st.session_state.messages)
                st.markdown(response)
                st.session_state.messages.append({"role": "assistant", "content": response})
            except Exception as e:
                st.error(f"Erro na IA: Verifique sua chave de API ou conexão.")
        st.rerun()

if __name__ == "__main__":
    main()