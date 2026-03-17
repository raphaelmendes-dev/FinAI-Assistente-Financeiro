// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Rs4Machine · Hook: useIndicadores
// Busca indicadores reais do backend
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const FALLBACK = [
  { id:"selic",  label:"SELIC",    value:"15,00%", change:"+0,00", trend:"stable", icon:"🏛", desc:"Taxa básica de juros"    },
  { id:"ipca",   label:"IPCA",     value:"4,10%",  change:"-0,12", trend:"down",   icon:"📈", desc:"Inflação acumulada 12m"  },
  { id:"dolar",  label:"USD/BRL",  value:"R$ 5,45",change:"+0,08", trend:"up",     icon:"💵", desc:"Câmbio comercial"        },
  { id:"ibov",   label:"IBOVESPA", value:"132.500",change:"+1240", trend:"up",     icon:"📊", desc:"Índice B3 (pts)"         },
  { id:"cdi",    label:"CDI",      value:"14,85%", change:"+0,00", trend:"stable", icon:"💰", desc:"Certificado de depósito" },
  { id:"euro",   label:"EUR/BRL",  value:"R$ 5,90",change:"-0,03", trend:"down",   icon:"💶", desc:"Câmbio Euro"             },
];

export function useIndicadores() {
  const [indicators, setIndicators] = useState(FALLBACK);
  const [liveStatus, setLiveStatus] = useState("connecting"); // connecting | live | offline

  useEffect(() => {
    const fetchIndicadores = async () => {
      try {
        const res  = await fetch(`${API}/api/indicadores`);
        const data = await res.json();
        if (data.success) {
          // mescla dados reais com estrutura visual do fallback
          setIndicators(prev => prev.map(ind => {
            if (ind.id === "selic")  return { ...ind, value: data.data.selic };
            if (ind.id === "ipca")   return { ...ind, value: data.data.ipca  };
            if (ind.id === "dolar")  return { ...ind, value: data.data.dolar };
            if (ind.id === "ibov")   return { ...ind, value: data.data.ibov  };
            return ind;
          }));
          setLiveStatus("live");
        }
      } catch {
        setLiveStatus("offline");
      }
    };

    fetchIndicadores();
    const interval = setInterval(fetchIndicadores, 60_000); // atualiza 1x/min
    return () => clearInterval(interval);
  }, []);

  return { indicators, liveStatus };
}