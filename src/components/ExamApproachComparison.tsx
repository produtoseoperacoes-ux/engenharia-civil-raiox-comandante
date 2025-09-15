import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { BookOpen, Building2, Factory } from "lucide-react";

// Dados das abordagens específicas de cada edital baseados no CSV completo fornecido
const examApproaches = [
  // RESISTÊNCIA DOS MATERIAIS
  {
    materia: "Resistência dos materiais",
    submateria: "Carga axial",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Resistência dos materiais",
    submateria: "Torção",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Resistência dos materiais",
    submateria: "Flexão",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Resistência dos materiais",
    submateria: "Cisalhamento",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Resistência dos materiais",
    submateria: "Transformação de tensão e transformação de deformação",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Resistência dos materiais",
    submateria: "Deflexão em vigas",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Resistência dos materiais",
    submateria: "Flambagem de colunas",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Resistência dos materiais",
    submateria: "Teoremas gerais do trabalho",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  // ANÁLISE ESTRUTURAL
  {
    materia: "Análise estrutural",
    submateria: "Conceitos fundamentais",
    petrobras: "Abrangente → a ideia é cobrar uma visão geral, completa, do assunto.",
    transpetro: "Mecânicas das estruturas → já direciona para a aplicação prática da mecânica estrutural, mais específico."
  },
  {
    materia: "Análise estrutural",
    submateria: "Estruturas isostáticas",
    petrobras: "Análise de estruturas → cobram cálculos diretos de estruturas simples (isostáticas).",
    transpetro: "Análise de estruturas → cobram cálculos diretos de estruturas simples (isostáticas)."
  },
  {
    materia: "Análise estrutural",
    submateria: "Estruturas hiperestáticas",
    petrobras: "Análise de estruturas → mantém o foco em cálculos diretos.",
    transpetro: "Abrangente → pede que o candidato saiba um leque maior de métodos de resolução, não só técnicas específicas."
  },
  {
    materia: "Análise estrutural",
    submateria: "Estruturas sobre apoios elásticos",
    petrobras: "Não aparece → esse tópico não foi cobrado explicitamente.",
    transpetro: "Não aparece → esse tópico não foi cobrado explicitamente."
  },
  {
  },
  // ESTRUTURAS DE MADEIRA
  {
    materia: "Estruturas de madeira",
    submateria: "Conceitos iniciais",
    petrobras: "Não foi previsto no edital.",
    transpetro: "Não foi previsto no edital."
  },
  {
    materia: "Estruturas de madeira",
    submateria: "Noções de dimensionamento",
    petrobras: "Não foi previsto no edital.",
    transpetro: "Não foi previsto no edital."
  },
  {
    materia: "Estruturas de madeira",
    submateria: "Caracterização das madeiras",
    petrobras: "Não foi previsto no edital.",
    transpetro: "Não foi previsto no edital."
  },
  {
    materia: "Estruturas de madeira",
    submateria: "Ligações de peças estruturais",
    petrobras: "Não foi previsto no edital.",
    transpetro: "Não foi previsto no edital."
  },
  // ESTRUTURAS METÁLICAS
  {
    materia: "Estruturas metálicas",
    submateria: "Conceitos básicos e noções de dimensionamento",
    petrobras: "Estruturas de aço (tópico específico previsto no edital)",
    transpetro: "Abrangente"
  },
  {
    materia: "Estruturas metálicas",
    submateria: "Dimensionamento detalhado",
    petrobras: "Não foi previsto no edital.",
    transpetro: "Não foi previsto no edital."
  },
  {
    materia: "Estruturas metálicas",
    submateria: "Ligações metálicas",
    petrobras: "Estruturas de aço (tópico específico previsto no edital)",
    transpetro: "Abrangente"
  },
  // ESTRUTURAS DE CONCRETO ARMADO
  {
    materia: "Estruturas de concreto armado",
    submateria: "Conceitos básicos",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Estruturas de concreto armado",
    submateria: "Materiais",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Estruturas de concreto armado",
    submateria: "Durabilidade",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Estruturas de concreto armado",
    submateria: "Noções de dimensionamento",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Estruturas de concreto armado",
    submateria: "Patologia",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Estruturas de concreto armado",
    submateria: "Dimensionamento detalhado",
    petrobras: "Não foi previsto no edital.",
    transpetro: "Não foi previsto no edital."
  },
  {
    materia: "Estruturas de concreto armado",
    submateria: "Escadas",
    petrobras: "Não foi previsto no edital.",
    transpetro: "Não foi previsto no edital."
  },
  {
    materia: "Estruturas de concreto armado",
    submateria: "Caixas d'água",
    petrobras: "Não foi previsto no edital.",
    transpetro: "Não foi previsto no edital."
  },
  // ESTRUTURAS DE CONCRETO PROTENDIDO
  {
    materia: "Estruturas de concreto protendido",
    submateria: "Conceitos básicos e materiais",
    petrobras: "Abrangente",
    transpetro: "Não foi previsto no edital."
  },
  {
    materia: "Estruturas de concreto protendido",
    submateria: "Projeto e cálculo",
    petrobras: "Não foi previsto no edital.",
    transpetro: "Não foi previsto no edital."
  },
  {
  },
  // ESTRUTURAS DE CONCRETO PRÉ-MOLDADO
  {
    materia: "Estruturas de concreto pré-moldado",
    submateria: "Conceitos básicos, materiais, noções de dimensionamento, critérios de projeto, sistemas estruturais",
    petrobras: "Abrangente",
    transpetro: "Estruturas e elementos pré-moldados (tópico específico listado no edital)"
  },
  {
  },
  // GEOLOGIA E GEOTÉCNIA
  {
    materia: "Geologia e Geotécnia",
    submateria: "Noções de mineralogia e petrografia",
    petrobras: "Não foi previsto no edital.",
    transpetro: "Não foi previsto no edital."
  },
  {
    materia: "Geologia e Geotécnia",
    submateria: "Estruturas geológicas",
    petrobras: "Não foi previsto no edital.",
    transpetro: "Não foi previsto no edital."
  },
  {
    materia: "Geologia e Geotécnia",
    submateria: "Intemperismo e formação dos solos",
    petrobras: "Não foi previsto no edital.",
    transpetro: "Não foi previsto no edital."
  },
  {
    materia: "Geologia e Geotécnia",
    submateria: "Noções de geologia histórica",
    petrobras: "Não foi previsto no edital.",
    transpetro: "Não foi previsto no edital."
  },
  {
    materia: "Geologia e Geotécnia",
    submateria: "Mapas geológicos",
    petrobras: "Não foi previsto no edital.",
    transpetro: "Não foi previsto no edital."
  },
  
  // OBRAS DE TERRA
  {
    materia: "Obras de terra",
    submateria: "Movimentos de terra",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Obras de terra",
    submateria: "Estabilidade de taludes",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Obras de terra",
    submateria: "Barragens de terra e enrocamento",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  // OBRAS DE CONTENÇÃO
  {
    materia: "Obras de contenção",
    submateria: "Empuxos de terra",
    petrobras: "Não foi previsto no edital",
    transpetro: "Abrangente"
  },
  {
    materia: "Obras de contenção",
    submateria: "Estruturas de contenção",
    petrobras: "Não foi previsto no edital",
    transpetro: "Abrangente"
  },
  {
    materia: "Obras de contenção",
    submateria: "Escoramento de valas",
    petrobras: "Não foi previsto no edital",
    transpetro: "Abrangente"
  },
  // FUNDAÇÕES
  {
    materia: "Fundações",
    submateria: "Fundações rasas",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Fundações",
    submateria: "Fundações profundas",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  // TOPOGRAFIA
  {
    materia: "Topografia",
    submateria: "Conceitos básicos",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Topografia",
    submateria: "Tipos de levantamentos topográficos",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Topografia",
    submateria: "Equipamentos",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Topografia",
    submateria: "Medição de distâncias e ângulos",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Topografia",
    submateria: "Planimetria e altimetria",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  // ESTRADAS
  {
    materia: "Estradas",
    submateria: "Conceitos básicos e anteprojeto",
    petrobras: "Abrangente",
    transpetro: "Estradas e rodovias (tópico específico listado no edital)"
  },
  {
    materia: "Estradas",
    submateria: "Projeto geométrico rodoviário",
    petrobras: "Abrangente",
    transpetro: "Estradas e rodovias (tópico específico listado no edital)"
  },
  {
    materia: "Estradas",
    submateria: "Projeto geométrico ferroviário",
    petrobras: "Não foi previsto no edital.",
    transpetro: "Não foi previsto no edital."
  },
  {
    materia: "Estradas",
    submateria: "Drenagem de rodovias",
    petrobras: "Não foi previsto no edital.",
    transpetro: "Não foi previsto no edital."
  },
  // TERRAPLANAGEM
  {
    materia: "Terraplanagem",
    submateria: "Projeto",
    petrobras: "Terraplanagem, arruamento e pavimentação (tópico específico listado no edital)",
    transpetro: "Não foi previsto no edital"
  },
  {
    materia: "Terraplanagem",
    submateria: "Terraplanagem mecanizada",
    petrobras: "Terraplanagem, arruamento e pavimentação",
    transpetro: "Não foi previsto no edital"
  },
  // PAVIMENTAÇÃO
  {
    materia: "Pavimentação",
    submateria: "Fundamentos",
    petrobras: "Terraplanagem, arruamento e pavimentação",
    transpetro: "Não foi previsto no edital"
  },
  {
    materia: "Pavimentação",
    submateria: "Materiais utilizados",
    petrobras: "Terraplanagem, arruamento e pavimentação",
    transpetro: "Não foi previsto no edital"
  },
  {
    materia: "Pavimentação",
    submateria: "Camadas de revestimento asfáltico",
    petrobras: "Terraplanagem, arruamento e pavimentação",
    transpetro: "Não foi previsto no edital"
  },
  {
    materia: "Pavimentação",
    submateria: "Projeto estrutural de pavimentos asfálticos",
    petrobras: "Terraplanagem, arruamento e pavimentação",
    transpetro: "Não foi previsto no edital"
  },
  {
    materia: "Pavimentação",
    submateria: "Manutenção e reabilitação de pavimentos asfálticos",
    petrobras: "Terraplanagem, arruamento e pavimentação",
    transpetro: "Não foi previsto no edital"
  },
  // OBRAS DE ARTE
  {
    materia: "Obras de arte",
    submateria: "Obras de Arte",
    petrobras: "Pontes e obras de arte correntes",
    transpetro: "Abrangente"
  },
  // TECNOLOGIA DO CONCRETO
  {
    materia: "Tecnologia do concreto",
    submateria: "Cimento",
    petrobras: "Abrangente",
    transpetro: "Materiais de construção; Controle tecnológico"
  },
  {
    materia: "Tecnologia do concreto",
    submateria: "Agregados",
    petrobras: "Abrangente",
    transpetro: "Materiais de construção; Controle tecnológico"
  },
  {
    materia: "Tecnologia do concreto",
    submateria: "Água",
    petrobras: "Abrangente",
    transpetro: "Materiais de construção; Controle tecnológico"
  },
  {
    materia: "Tecnologia do concreto",
    submateria: "Aditivos",
    petrobras: "Abrangente",
    transpetro: "Materiais de construção; Controle tecnológico"
  },
  {
    materia: "Tecnologia do concreto",
    submateria: "Concreto no estado fresco",
    petrobras: "Abrangente",
    transpetro: "Materiais de construção; Controle tecnológico"
  },
  {
    materia: "Tecnologia do concreto",
    submateria: "Dosagem",
    petrobras: "Abrangente",
    transpetro: "Materiais de construção; Controle tecnológico"
  },
  {
    materia: "Tecnologia do concreto",
    submateria: "Controle tecnológico",
    petrobras: "Abrangente",
    transpetro: "Materiais de construção; Controle tecnológico"
  },
  {
    materia: "Tecnologia do concreto",
    submateria: "Ensaios",
    petrobras: "Abrangente",
    transpetro: "Materiais de construção; Controle tecnológico"
  },
  // MATERIAIS DE CONSTRUÇÃO
  {
    materia: "Materiais de construção",
    submateria: "Aglomerantes",
    petrobras: "Abrangente",
    transpetro: "Materiais de construção; Controle tecnológico (tópico específico listado no edital)"
  },
  {
    materia: "Materiais de construção",
    submateria: "Madeira",
    petrobras: "Abrangente",
    transpetro: "Materiais de construção; Controle tecnológico (tópico específico listado no edital)"
  },
  {
    materia: "Materiais de construção",
    submateria: "Materiais cerâmicos",
    petrobras: "Abrangente",
    transpetro: "Materiais de construção; Controle tecnológico (tópico específico listado no edital)"
  },
  {
    materia: "Materiais de construção",
    submateria: "Materiais metálicos",
    petrobras: "Abrangente",
    transpetro: "Materiais de construção; Controle tecnológico (tópico específico listado no edital)"
  },
  {
    materia: "Materiais de construção",
    submateria: "Vidros",
    petrobras: "Abrangente",
    transpetro: "Materiais de construção; Controle tecnológico (tópico específico listado no edital)"
  },
  {
    materia: "Materiais de construção",
    submateria: "Tintas",
    petrobras: "Abrangente",
    transpetro: "Materiais de construção; Controle tecnológico (tópico específico listado no edital)"
  },
  {
    materia: "Materiais de construção",
    submateria: "Polímeros",
    petrobras: "Abrangente",
    transpetro: "Materiais de construção; Controle tecnológico (tópico específico listado no edital)"
  },
  {
    materia: "Materiais de construção",
    submateria: "Materiais betuminosos",
    petrobras: "Abrangente",
    transpetro: "Materiais de construção; Controle tecnológico (tópico específico listado no edital)"
  },
  // TÉCNICAS DE CONSTRUÇÃO
  {
    materia: "Técnicas de construção",
    submateria: "Estudos e serviços preliminares",
    petrobras: "Abrangente",
    transpetro: "Técnicas e sistemas construtivos"
  },
  {
    materia: "Técnicas de construção",
    submateria: "Fundações e infraestrutura",
    petrobras: "Abrangente",
    transpetro: "Técnicas e sistemas construtivos"
  },
  {
    materia: "Técnicas de construção",
    submateria: "Superestrutura",
    petrobras: "Abrangente",
    transpetro: "Técnicas e sistemas construtivos"
  },
  {
    materia: "Técnicas de construção",
    submateria: "Sistema de vedação",
    petrobras: "Abrangente",
    transpetro: "Técnicas e sistemas construtivos"
  },
  {
    materia: "Técnicas de construção",
    submateria: "Cobertura",
    petrobras: "Abrangente",
    transpetro: "Técnicas e sistemas construtivos"
  },
  {
    materia: "Técnicas de construção",
    submateria: "Impermeabilização",
    petrobras: "Abrangente",
    transpetro: "Técnicas e sistemas construtivos"
  },
  {
    materia: "Técnicas de construção",
    submateria: "Esquadrias",
    petrobras: "Abrangente",
    transpetro: "Técnicas e sistemas construtivos"
  },
  {
    materia: "Técnicas de construção",
    submateria: "Revestimentos",
    petrobras: "Abrangente",
    transpetro: "Técnicas e sistemas construtivos"
  },
  {
    materia: "Técnicas de construção",
    submateria: "Pisos",
    petrobras: "Abrangente",
    transpetro: "Técnicas e sistemas construtivos"
  },
  {
    materia: "Técnicas de construção",
    submateria: "Pinturas",
    petrobras: "Abrangente",
    transpetro: "Técnicas e sistemas construtivos"
  },
  {
    materia: "Técnicas de construção",
    submateria: "Instalações especiais",
    petrobras: "Não foi previsto no edital",
    transpetro: "Não foi previsto no edital"
  },
  {
    materia: "Técnicas de construção",
    submateria: "Limpeza e entrega de uma obra",
    petrobras: "Abrangente",
    transpetro: "Técnicas e sistemas construtivos"
  },
  {
    materia: "Técnicas de construção",
    submateria: "Patologia",
    petrobras: "Abrangente",
    transpetro: "Técnicas e sistemas construtivos"
  },
  {
    materia: "Técnicas de construção",
    submateria: "Especificações técnicas",
    petrobras: "Não foi previsto no edital",
    transpetro: "Não foi previsto no edital"
  },
  // HIDRÁULICA
  {
    materia: "Hidráulica",
    submateria: "Introdução, Hidrostática, Hidrodinâmica",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Hidráulica",
    submateria: "Orifícios, bocais e tubos curtos, Vertedores",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Hidráulica",
    submateria: "Escoamento em tubulações sob pressão, Condutos forçados, Bombeamento, Golpe de aríete / Transiente hidráulico",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Hidráulica",
    submateria: "Condutos livres ou canais",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Hidráulica",
    submateria: "Hidrometria",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  
  // LICENCIAMENTO AMBIENTAL
  {
    materia: "Licenciamento ambiental",
    submateria: "Licenciamento ambiental",
    petrobras: "Não foi previsto no edital",
    transpetro: "Legislação, gestão, monitoramento, licenciamento e fiscalização ambiental (tópico específico listado no edital)"
  },
  
  // HIDROLOGIA
  {
    materia: "Hidrologia",
    submateria: "Bacia hidrográfica",
    petrobras: "Hidrologia aplicada",
    transpetro: "Abrangente"
  },
  {
    materia: "Hidrologia",
    submateria: "Ciclo hidrológico",
    petrobras: "Hidrologia aplicada",
    transpetro: "Abrangente"
  },
  {
    materia: "Hidrologia",
    submateria: "Balanço hídrico",
    petrobras: "Hidrologia aplicada",
    transpetro: "Abrangente"
  },
  {
    materia: "Hidrologia",
    submateria: "Precipitação",
    petrobras: "Hidrologia aplicada",
    transpetro: "Abrangente"
  },
  {
    materia: "Hidrologia",
    submateria: "Evaporação e evapotranspiração",
    petrobras: "Hidrologia aplicada",
    transpetro: "Abrangente"
  },
  {
    materia: "Hidrologia",
    submateria: "Infiltração",
    petrobras: "Hidrologia aplicada",
    transpetro: "Abrangente"
  },
  {
    materia: "Hidrologia",
    submateria: "Escoamento superficial",
    petrobras: "Hidrologia aplicada",
    transpetro: "Abrangente"
  },
  {
    materia: "Hidrologia",
    submateria: "Escoamento subterrâneo",
    petrobras: "Hidrologia aplicada",
    transpetro: "Abrangente"
  },
  {
    materia: "Hidrologia",
    submateria: "Vazão máxima e hidrograma de projeto",
    petrobras: "Hidrologia aplicada",
    transpetro: "Abrangente"
  },
  {
    materia: "Hidrologia",
    submateria: "Medições de vazão",
    petrobras: "Hidrologia aplicada",
    transpetro: "Abrangente"
  },
  {
    materia: "Hidrologia",
    submateria: "Propagação de vazão",
    petrobras: "Hidrologia aplicada",
    transpetro: "Abrangente"
  },
  {
    materia: "Hidrologia",
    submateria: "Previsão e controle de enchentes",
    petrobras: "Hidrologia aplicada",
    transpetro: "Abrangente"
  },
  {
    materia: "Hidrologia",
    submateria: "Regularização de vazões",
    petrobras: "Hidrologia aplicada",
    transpetro: "Abrangente"
  },
  
  // MECÂNICA DOS SOLOS
  {
    materia: "Mecânica dos solos",
    submateria: "Conceitos básicos",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Mecânica dos solos",
    submateria: "Classificação dos solos",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Mecânica dos solos",
    submateria: "Prospecção e amostragem",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Mecânica dos solos",
    submateria: "Compactação dos solos",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Mecânica dos solos",
    submateria: "Tensões nos solos",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Mecânica dos solos",
    submateria: "Água nos solos",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Mecânica dos solos",
    submateria: "Fluxo bidimensional",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Mecânica dos solos",
    submateria: "Compressibilidade e adensamento",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Mecânica dos solos",
    submateria: "Resistência ao cisalhamento",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  
  // SISTEMAS PREDIAIS
  {
    materia: "Sistemas prediais",
    submateria: "Água fria",
    petrobras: "Instalações prediais hidrossanitárias",
    transpetro: "Abrangente"
  },
  {
    materia: "Sistemas prediais",
    submateria: "Água quente",
    petrobras: "Instalações prediais hidrossanitárias",
    transpetro: "Abrangente"
  },
  {
    materia: "Sistemas prediais",
    submateria: "Esgoto",
    petrobras: "Instalações prediais hidrossanitárias",
    transpetro: "Abrangente"
  },
  {
    materia: "Sistemas prediais",
    submateria: "Água pluvial",
    petrobras: "Instalações prediais hidrossanitárias",
    transpetro: "Abrangente"
  },
  {
    materia: "Sistemas prediais",
    submateria: "Prevenção e combate a incêndio",
    petrobras: "Instalações prediais hidrossanitárias",
    transpetro: "Abrangente"
  },
  {
    materia: "Sistemas prediais",
    submateria: "Gás",
    petrobras: "Não foi previsto no edital",
    transpetro: "Não foi previsto no edital"
  },
  {
    materia: "Sistemas prediais",
    submateria: "Elétrica",
    petrobras: "Instalações prediais elétricas (tópico específico listado no edital)",
    transpetro: "Abrangente"
  },
  // SANEAMENTO BÁSICO
  {
    materia: "Saneamento básico",
    submateria: "Água",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Saneamento básico",
    submateria: "Esgoto",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Saneamento básico",
    submateria: "Drenagem",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  {
    materia: "Saneamento básico",
    submateria: "Resíduos sólidos",
    petrobras: "Abrangente",
    transpetro: "Abrangente"
  },
  // PLANEJAMENTO E CONTROLE DE OBRAS
  {
    materia: "Planejamento e controle de obras",
    submateria: "Ferramentas para o planejamento e controle de obras",
    petrobras: "Abrangente",
    transpetro: "Planejamento, orçamento, acompanhamento e controle de obras e serviços (tópico específico listado no edital)"
  },
  {
    materia: "Planejamento e controle de obras",
    submateria: "Tópicos especiais de planejamento",
    petrobras: "Não foi previsto no edital",
    transpetro: "Não foi previsto no edital"
  },
  // ORÇAMENTOS DE OBRAS
  {
    materia: "Orçamentos de obras",
    submateria: "Fundamentos e custos",
    petrobras: "Abrangente",
    transpetro: "Planejamento, orçamento, acompanhamento e controle de obras e serviços"
  },
  {
    materia: "Orçamentos de obras",
    submateria: "Graus de orçamento",
    petrobras: "Abrangente",
    transpetro: "Planejamento, orçamento, acompanhamento e controle de obras e serviços"
  },
  {
    materia: "Orçamentos de obras",
    submateria: "Formação de preço",
    petrobras: "Abrangente",
    transpetro: "Planejamento, orçamento, acompanhamento e controle de obras e serviços"
  },
  {
    materia: "Orçamentos de obras",
    submateria: "Tabela de custos e composições",
    petrobras: "Abrangente",
    transpetro: "Planejamento, orçamento, acompanhamento e controle de obras e serviços"
  },
  {
    materia: "Orçamentos de obras",
    submateria: "Bonificações e despesas indiretas",
    petrobras: "Abrangente",
    transpetro: "Planejamento, orçamento, acompanhamento e controle de obras e serviços"
  },
  // QUALIDADE NA CONSTRUÇÃO CIVIL
  {
    materia: "Qualidade na construção civil",
    submateria: "Qualidade na construção civil",
    petrobras: "Abrangente",
    transpetro: "Qualidade na construção civil (tópico específico listado no edital)"
  },
  // SEGURANÇA, INSPEÇÃO E MANUTENÇÃO DE EDIFICAÇÕES
  {
    materia: "Segurança, inspeção e manutenção de edificações",
    submateria: "Segurança, inspeção e manutenção de edificações",
    petrobras: "Abrangente",
    transpetro: "Segurança, inspeção e manutenção na construção civil (tópico específico listado no edital)"
  },
  // CONFORTO NAS EDIFICAÇÕES
  {
    materia: "Conforto nas edificações",
    submateria: "Conforto térmico, acústico e lumínico",
    petrobras: "Abrangente → pode cobrar de forma geral vários aspectos ligados a conforto (térmico, acústico, lumínico, etc.).",
    transpetro: "Não foi previsto no edital."
  },
  // DESEMPENHO DAS EDIFICAÇÕES
  {
    materia: "Desempenho das edificações",
    submateria: "Aspectos de desempenho construtivo",
    petrobras: "Abrangente → a banca não delimitou, então pode cobrar qualquer aspecto ligado a desempenho.",
    transpetro: "Desempenho das construções → aparece no edital como tópico específico."
  },
  // CONTRATAÇÃO E FISCALIZAÇÃO DE OBRAS E SERVIÇOS
  {
    materia: "Contratação e fiscalização de obras e serviços",
    submateria: "Aspectos contratuais e fiscalização",
    petrobras: "Não foi previsto no edital.",
    transpetro: "Contratação e fiscalização de obras e serviços → conteúdo previsto explicitamente no edital."
  },
  // LICENCIAMENTO AMBIENTAL
  
  // SUSTENTABILIDADE NA CONSTRUÇÃO CIVIL
  {
    materia: "Sustentabilidade na construção civil",
    submateria: "Sustentabilidade na construção civil",
    petrobras: "Não foi previsto no edital",
    transpetro: "Sustentabilidade na construção civil (tópico específico listado no edital)"
  },
  // SEGURANÇA E MEDICINA DO TRABALHO
  {
    materia: "Segurança e medicina do trabalho",
    submateria: "Segurança e medicina do trabalho",
    petrobras: "Não foi previsto no edital",
    transpetro: "Segurança e medicina do trabalho (tópico específico listado no edital)"
  },
  // TRANSPORTES
  {
    materia: "Transportes",
    submateria: "Dutovias",
    petrobras: "Abrangente",
    transpetro: "Dutovias; Regulamento Técnico de Dutos Terrestres para Movimentação de Petróleo, Derivados e Gás Natural – RTDT; Regulamentação para a construção, a ampliação e a operação de instalações de movimentação de petróleo, seus derivados, gás natural, inclusive liquefeito (GNL), biocombustíveis e demais produtos regulados pela ANP"
  },
  {
    materia: "Transportes",
    submateria: "Outros sistemas de transportes",
    petrobras: "Abrangente",
    transpetro: "Não foi previsto no edital"
  }
];

// Materias disponíveis
const uniqueMaterias = Array.from(new Set(examApproaches.map(item => item.materia))).sort();

export const ExamApproachComparison = () => {
  const [selectedMateria, setSelectedMateria] = useState<string>("");

  // Definindo apenas os concursos PETROBRAS e TRANSPETRO
  const exams = [
    { id: "petrobras", name: "PETROBRAS", icon: Building2 },
    { id: "transpetro", name: "TRANSPETRO", icon: Factory }
  ];

  const getExamBadgeColor = (examId: string) => {
    const colors = {
      petrobras: "bg-petrobras text-white",
      transpetro: "bg-transpetro text-white"
    };
    return colors[examId as keyof typeof colors] || "bg-muted text-foreground";
  };

  // Filtrar submatérias da matéria selecionada
  const selectedSubmaterias = selectedMateria && selectedMateria !== "all"
    ? examApproaches.filter(item => item.materia === selectedMateria)
    : [];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Comparação de Abordagens por Edital
        </h2>
        <p className="text-muted-foreground">
          Compare como PETROBRAS e TRANSPETRO abordam diferentes tópicos em seus editais
        </p>
      </div>

      <Card className="p-6 shadow-card animate-fade-in">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Selecione a Matéria</h3>
          </div>
          
          <Select value={selectedMateria} onValueChange={setSelectedMateria}>
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="Escolha uma matéria para comparar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as matérias</SelectItem>
              {uniqueMaterias.map((materia) => (
                <SelectItem key={materia} value={materia}>
                  {materia}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6">
          {selectedMateria && selectedMateria !== "all" && selectedSubmaterias.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-bold text-foreground">
                  {selectedMateria}
                </h3>
                <Badge variant="outline" className="font-normal">
                  {selectedSubmaterias.length} submatéria{selectedSubmaterias.length > 1 ? 's' : ''}
                </Badge>
              </div>

              <div className="grid gap-6">
                {selectedSubmaterias.map((item, index) => (
                  <Card key={`${item.submateria}-${index}`} className="p-6 border-l-4 border-l-primary">
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-foreground">
                        {item.submateria}
                      </h4>
                    </div>

                    <div className="grid gap-3">
                      {exams.map((exam) => {
                        const Icon = exam.icon;
                        const content = item[exam.id as keyof typeof item] as string;
                        const isNotCovered = content === "Não abordado" || content === "não abordado";
                        
                        return (
                          <div 
                            key={exam.id} 
                            className={`p-4 rounded-lg border ${
                              isNotCovered
                                ? 'border-muted-foreground/20 bg-muted/30'
                                : 'border-muted bg-card'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-muted/50">
                                <Icon className="h-4 w-4 text-foreground" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge className={getExamBadgeColor(exam.id)}>
                                    {exam.name}
                                  </Badge>
                                </div>
                                <p className={`text-sm ${
                                  isNotCovered 
                                    ? 'text-muted-foreground italic' 
                                    : 'text-card-foreground'
                                }`}>
                                  {content}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card className="p-8 text-center border-dashed">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Selecione uma Matéria
              </h3>
              <p className="text-muted-foreground text-sm">
                Escolha uma matéria acima para comparar como cada concurso aborda os tópicos
              </p>
            </Card>
          )}
        </div>
      </Card>
    </div>
  );
};