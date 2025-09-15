import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExamApproachComparison } from "./ExamApproachComparison";
import { Search, CheckCircle, X } from "lucide-react";

// Dados baseados no CSV de cruzamento de editais fornecido
const examData = {
  exams: [
    { id: 'petrobras', name: 'PETROBRAS', color: 'petrobras' },
    { id: 'transpetro', name: 'TRANSPETRO', color: 'transpetro' }
  ],
  subjects: [
    {
      name: "Resistência dos materiais",
      topics: [
        { topic: "Carga axial", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [1, 0, 1] }, total: 4 },
        { topic: "Torção", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [1, 0, 0] }, total: 2 },
        { topic: "Flexão", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 1], transpetro: [1, 2, 2] }, total: 7 },
        { topic: "Cisalhamento", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [1, 1, 1] }, total: 5 },
        { topic: "Transformação de tensão e transformação de deformação", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 0], transpetro: [0, 1, 0] }, total: 2 },
        { topic: "Deflexão em vigas", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 0], transpetro: [0, 1, 1] }, total: 3 },
        { topic: "Flambagem de colunas", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 1], transpetro: [1, 0, 0] }, total: 2 },
        { topic: "Teoremas gerais do trabalho", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [0, 0, 1] }, total: 2 }
      ]
    },
    {
      name: "Análise estrutural",
      topics: [
        { topic: "Conceitos fundamentais", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 1], transpetro: [1, 1, 1] }, total: 6, filters: { petrobras: "Abrangente", transpetro: "Mecânicas das estruturas" } },
        { topic: "Estruturas isostáticas", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 1], transpetro: [1, 1, 2] }, total: 7, filters: { petrobras: "Análise de estruturas", transpetro: "Análise de estruturas" } },
        { topic: "Estruturas hiperestáticas", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [1, 1, 1] }, total: 4, filters: { petrobras: "Análise de estruturas", transpetro: "Abrangente" } },
        { topic: "Estruturas sobre apoios elásticos", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0, filters: { petrobras: "", transpetro: "" } }
      ]
    },
    {
      name: "Estruturas de madeira",
      topics: [
        { topic: "Conceitos iniciais", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Noções de dimensionamento", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Caracterização das madeiras", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Ligações de peças estruturas", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 }
      ]
    },
    {
      name: "Estruturas metálicas",
      topics: [
        { topic: "Conceitos básicos e noções de dimensionamento", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 1], transpetro: [0, 1, 1] }, total: 5 },
        { topic: "Dimensionamento detalhado", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Ligações metálicas", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [1, 0, 0] }, total: 2 }
      ]
    },
    {
      name: "Estruturas de concreto armado",
      topics: [
        { topic: "Conceito básicos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 1], transpetro: [0, 1, 1] }, total: 5 },
        { topic: "Materiais", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 0], transpetro: [0, 1, 0] }, total: 2 },
        { topic: "Durabilidade", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [2, 1, 0] }, total: 3 },
        { topic: "Noções de dimensionamento", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [0, 0, 0] }, total: 2 },
        { topic: "Patologia", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Dimensionamento detalhado", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Escadas", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Caixas d'água", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 }
      ]
    },
    {
      name: "Estruturas de concreto protendido",
      topics: [
        { topic: "Conceitos básicos e materiais", coverage: { petrobras: true, transpetro: false }, questionCounts: { petrobras: [1, 1, 1], transpetro: [0, 0, 0] }, total: 3 },
        { topic: "Projeto e cálculo", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 }
      ]
    },
    {
      name: "Estruturas de concreto pré-moldado",
      topics: [
        { topic: "Conceitos básicos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 1], transpetro: [1, 0, 1] }, total: 4 },
        { topic: "Materiais", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Noções de dimensionamento", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [0, 1, 0] }, total: 2 },
        { topic: "Critérios de projeto", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Sistemas estruturais", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 }
      ]
    },
    {
      name: "Geologia e Geotécnia",
      topics: [
        { topic: "Noções de mineralogia e petrografia", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Estruturas geológicas", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Intemperismo e formação dos solos", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Noções de geologia histórica", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Mapas geológicos", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 }
      ]
    },
    {
      name: "Mecânica dos solos",
      topics: [
        { topic: "Conceitos básicos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 1], transpetro: [1, 0, 1] }, total: 5 },
        { topic: "Classificação dos solos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [1, 0, 0] }, total: 3 },
        { topic: "Prospecção e amostragem", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [0, 1, 1] }, total: 4 },
        { topic: "Compactação dos solos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 0], transpetro: [0, 1, 0] }, total: 3 },
        { topic: "Tensões nos solos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 0], transpetro: [0, 0, 2] }, total: 4 },
        { topic: "Água nos solos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [1, 1, 1] }, total: 5 },
        { topic: "Fluxo bidimensional", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Compressibilidade e adensamento", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [1, 1, 0] }, total: 3 },
        { topic: "Resistência ao cisalhamento", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 1], transpetro: [1, 0, 0] }, total: 2 }
      ]
    },
    {
      name: "Obras de terra",
      topics: [
        { topic: "Movimentos de terra", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Estabilidade de taludes", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 1], transpetro: [1, 0, 2] }, total: 6 },
        { topic: "Barragens de terra e enroncamento", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 }
      ]
    },
    {
      name: "Obras de contenção",
      topics: [
        { topic: "Empuxos de terra", coverage: { petrobras: false, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 1, 1] }, total: 2 },
        { topic: "Estruturas de contenção", coverage: { petrobras: false, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [1, 0, 1] }, total: 2 },
        { topic: "Escoramento de valas", coverage: { petrobras: false, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [1, 0, 0] }, total: 1 }
      ]
    },
    {
      name: "Fundações",
      topics: [
        { topic: "Fundações rasas", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 0], transpetro: [0, 1, 0] }, total: 3 },
        { topic: "Fundações profundas", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [1, 0, 0] }, total: 3 }
      ]
    },
    {
      name: "Topografia",
      topics: [
        { topic: "Conceitos básicos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [1, 0, 0] }, total: 3 },
        { topic: "Tipos de levantamento topográficos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 0], transpetro: [0, 0, 2] }, total: 3 },
        { topic: "Equipamentos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Medição de distâncias e ângulos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Planimetria, Altimetria", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 }
      ]
    },
    {
      name: "Estradas",
      topics: [
        { topic: "Conceitos básicos e anteprojeto", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 1], transpetro: [0, 0, 1] }, total: 4 },
        { topic: "Projeto geométrico rodoviário", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [1, 1, 0] }, total: 3 },
        { topic: "Projeto geométrico ferroviário", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Drenagem de rodovias", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 }
      ]
    },
    {
      name: "Terraplanagem",
      topics: [
        { topic: "Terraplanagem", coverage: { petrobras: true, transpetro: false }, questionCounts: { petrobras: [1, 1, 1], transpetro: [0, 0, 0] }, total: 3 }
      ]
    },
    {
      name: "Pavimentação",
      topics: [
        { topic: "Fundamentos", coverage: { petrobras: true, transpetro: false }, questionCounts: { petrobras: [1, 0, 1], transpetro: [0, 0, 0] }, total: 2 },
        { topic: "Materiais utilizados", coverage: { petrobras: true, transpetro: false }, questionCounts: { petrobras: [0, 0, 1], transpetro: [0, 0, 0] }, total: 1 },
        { topic: "Camadas de revestimento asfáltico", coverage: { petrobras: true, transpetro: false }, questionCounts: { petrobras: [0, 1, 0], transpetro: [0, 0, 0] }, total: 1 },
        { topic: "Projeto estrutural de pavimentos asfálticos", coverage: { petrobras: true, transpetro: false }, questionCounts: { petrobras: [1, 0, 0], transpetro: [0, 0, 0] }, total: 1 },
        { topic: "Manutenção e reabilitação de pavimentos asfálticos", coverage: { petrobras: true, transpetro: false }, questionCounts: { petrobras: [0, 0, 1], transpetro: [0, 0, 0] }, total: 1 }
      ]
    },
    {
      name: "Obras de arte",
      topics: [
        { topic: "Obras de arte", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 0], transpetro: [0, 1, 0] }, total: 3 }
      ]
    },
    {
      name: "Tecnologia do concreto",
      topics: [
        { topic: "Cimento", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 1], transpetro: [1, 0, 0] }, total: 4 },
        { topic: "Agregados", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [0, 1, 0] }, total: 2 },
        { topic: "Água", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 1], transpetro: [0, 0, 1] }, total: 2 },
        { topic: "Aditivos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 0], transpetro: [0, 1, 0] }, total: 3 },
        { topic: "Concreto no estado fresco", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 1], transpetro: [0, 0, 1] }, total: 3 },
        { topic: "Dosagem", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 0], transpetro: [1, 1, 0] }, total: 4 },
        { topic: "Controle tecnológico", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Ensaios", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 }
      ]
    },
    {
      name: "Materiais de construção",
      topics: [
        { topic: "Aglomerantes", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 0], transpetro: [0, 1, 0] }, total: 3 },
        { topic: "Madeira", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 1], transpetro: [1, 0, 1] }, total: 3 },
        { topic: "Materiais cerâmicos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 0], transpetro: [1, 0, 0] }, total: 2 },
        { topic: "Materiais metálicos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 1], transpetro: [0, 0, 1] }, total: 4 },
        { topic: "Vidros", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 0], transpetro: [0, 1, 0] }, total: 2 },
        { topic: "Tintas", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [1, 0, 0] }, total: 3 },
        { topic: "Polímeros", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 1], transpetro: [0, 1, 0] }, total: 2 },
        { topic: "Materiais betuminosos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 0], transpetro: [1, 0, 0] }, total: 2 }
      ]
    },
    {
      name: "Técnicas de construção",
      topics: [
        { topic: "Estudos e serviços preliminares", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [1, 0, 0] }, total: 3 },
        { topic: "Fundações e infraestrutura", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 0], transpetro: [0, 1, 0] }, total: 3 },
        { topic: "Superestrutura", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [0, 0, 0] }, total: 1 },
        { topic: "Sistema de vedação", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 0], transpetro: [0, 0, 0] }, total: 1 },
        { topic: "Cobertura", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [0, 0, 0] }, total: 1 },
        { topic: "Impermeabilização", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 0], transpetro: [0, 1, 0] }, total: 2 },
        { topic: "Esquadrias", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 1], transpetro: [1, 1, 1] }, total: 4 },
        { topic: "Revestimentos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [1, 0, 0] }, total: 3 },
        { topic: "Pisos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [0, 0, 0] }, total: 1 },
        { topic: "Pinturas", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 0], transpetro: [0, 0, 1] }, total: 2 },
        { topic: "Instalações especiais", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Limpeza e entrega de uma obra", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Patologia", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Especificações técnicas", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 }
      ]
    },
    {
      name: "Hidráulica",
      topics: [
        { topic: "Introdução", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 0], transpetro: [0, 0, 0] }, total: 2 },
        { topic: "Hidrostática", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 0], transpetro: [1, 1, 0] }, total: 4 },
        { topic: "Hidrodinâmica", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 1], transpetro: [0, 0, 1] }, total: 4 },
        { topic: "Orifícios", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 1], transpetro: [2, 0, 1] }, total: 4 },
        { topic: "Bocais", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 0], transpetro: [0, 1, 0] }, total: 2 },
        { topic: "Tubos curtos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [0, 1, 0] }, total: 2 },
        { topic: "Vertedores", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 1], transpetro: [0, 0, 0] }, total: 1 },
        { topic: "Escoamento em tubulações sob pressão", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 0], transpetro: [0, 0, 1] }, total: 3 },
        { topic: "Condutos forçados", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Bombeamento", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [0, 0, 0] }, total: 2 },
        { topic: "Golpe de aríete/Transiente hidráulico", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [0, 0, 0] }, total: 1 },
        { topic: "Condutos livres ou canais", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 0], transpetro: [0, 0, 0] }, total: 1 },
        { topic: "Hidrometria", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 }
      ]
    },
    {
      name: "Hidrologia",
      topics: [
        { topic: "Bacia hidrográfica", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Ciclo hidrológico", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Balanço hídrico", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Precipitação", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Evaporação e evapotranspiração", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Infiltração", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [0, 0, 0] }, total: 1 },
        { topic: "Escoamento superficial", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 0], transpetro: [1, 0, 0] }, total: 3 },
        { topic: "Escoamento subterrâneo", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Vazão máxima e hidrograma de projeto", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Medições de vazão", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Propagação de vazão", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Previsão e controle de enchentes", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 0], transpetro: [1, 0, 2] }, total: 4 },
        { topic: "Regularização de vazões", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [0, 1, 0] }, total: 3 }
      ]
    },
    {
      name: "Sistemas prediais",
      topics: [
        { topic: "Água fria", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [0, 1, 0] }, total: 3 },
        { topic: "Água quente", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [1, 0, 1] }, total: 3 },
        { topic: "Esgoto", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [1, 1, 0] }, total: 4 },
        { topic: "Água pluvial", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 0], transpetro: [0, 0, 1] }, total: 2 },
        { topic: "Prevenção e combate a incêndio", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 1], transpetro: [0, 1, 0] }, total: 2 },
        { topic: "Gás", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Elétrica", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 0], transpetro: [0, 1, 0] }, total: 3 }
      ]
    },
    {
      name: "Saneamento básico",
      topics: [
        { topic: "Água", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [0, 0, 1] }, total: 3 },
        { topic: "Esgoto", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 0], transpetro: [1, 0, 1] }, total: 4 },
        { topic: "Drenagem", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [1, 0, 0] }, total: 2 },
        { topic: "Resíduos sólidos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 0], transpetro: [0, 1, 0] }, total: 2 }
      ]
    },
    {
      name: "Planejamento e controle de obras",
      topics: [
        { topic: "Ferramentas para o planejamento e controle de obras", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 1], transpetro: [1, 1, 1] }, total: 6 },
        { topic: "Tópicos especiais de planejamento", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 }
      ]
    },
    {
      name: "Orçamentos de obras",
      topics: [
        { topic: "Fundamentos e Custos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 1], transpetro: [0, 1, 0] }, total: 4 },
        { topic: "Graus de Orçamento", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [0, 1, 0] }, total: 2 },
        { topic: "Formação de Preço", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 1], transpetro: [0, 0, 1] }, total: 2 },
        { topic: "Tabela de Custos e Composições", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 1], transpetro: [1, 0, 1] }, total: 3 },
        { topic: "Bonificações e Despesas Indiretas", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [1, 1, 0] }, total: 3 }
      ]
    },
    {
      name: "Qualidade na construção civil",
      topics: [
        { topic: "Qualidade na construção civil", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 1], transpetro: [0, 1, 0] }, total: 4 }
      ]
    },
    {
      name: "Segurança, inspeção e manutenção de edificações",
      topics: [
        { topic: "Segurança, inspeção e manutenção de edificações", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 1], transpetro: [0, 0, 0] }, total: 3 }
      ]
    },
    {
      name: "Conforto nas edificações",
      topics: [
        { topic: "Conforto nas edificações", coverage: { petrobras: true, transpetro: false }, questionCounts: { petrobras: [1, 0, 0], transpetro: [0, 0, 0] }, total: 1 }
      ]
    },
    {
      name: "Desempenho das edificações",
      topics: [
        { topic: "Desempenho das edificações", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [0, 0, 0] }, total: 1 }
      ]
    },
    {
      name: "Contratação e fiscalização de obras e serviços",
      topics: [
        { topic: "Contratação e fiscalização de obras e serviços", coverage: { petrobras: false, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [1, 1, 1] }, total: 3 }
      ]
    },
    {
      name: "Licenciamento ambiental",
      topics: [
        { topic: "Licenciamento ambiental", coverage: { petrobras: false, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [1, 1, 1] }, total: 3 }
      ]
    },
    {
      name: "Sustentabilidade na construção civil",
      topics: [
        { topic: "Sustentabilidade na construção civil", coverage: { petrobras: false, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 }
      ]
    },
    {
      name: "Segurança e medicina do trabalho",
      topics: [
        { topic: "Segurança e medicina do trabalho", coverage: { petrobras: false, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 }
      ]
    },
    {
      name: "Hidráulica",
      topics: [
        { topic: "Introdução", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 0], transpetro: [0, 0, 0] }, total: 2 },
        { topic: "Hidrostática", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 0], transpetro: [1, 1, 0] }, total: 4 },
        { topic: "Hidrodinâmica", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 1], transpetro: [0, 0, 1] }, total: 4 },
        { topic: "Orifícios", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 1], transpetro: [2, 0, 1] }, total: 4 },
        { topic: "Bocais", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 0], transpetro: [0, 1, 0] }, total: 2 },
        { topic: "Tubos curtos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [0, 1, 0] }, total: 2 },
        { topic: "Vertedores", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 1], transpetro: [0, 0, 0] }, total: 1 },
        { topic: "Escoamento em tubulações sob pressão", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 0], transpetro: [0, 0, 1] }, total: 3 },
        { topic: "Condutos forçados", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Bombeamento", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [0, 0, 0] }, total: 2 },
        { topic: "Golpe de aríete/Transiente hidráulico", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [0, 0, 0] }, total: 1 },
        { topic: "Condutos livres ou canais", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 0], transpetro: [0, 0, 0] }, total: 1 },
        { topic: "Hidrometria", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 }
      ]
    },
    {
      name: "Hidrologia",
      topics: [
        { topic: "Bacia hidrográfica", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Ciclo hidrológico", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Balanço hídrico", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Precipitação", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Evaporação e evapotranspiração", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Infiltração", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [0, 0, 0] }, total: 1 },
        { topic: "Escoamento superficial", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 0], transpetro: [1, 0, 0] }, total: 3 },
        { topic: "Escoamento subterrâneo", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Vazão máxima e hidrograma de projeto", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Medições de vazão", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Propagação de vazão", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Previsão e controle de enchentes", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 0], transpetro: [1, 0, 2] }, total: 4 },
        { topic: "Regularização de vazões", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [0, 1, 0] }, total: 3 }
      ]
    },
    {
      name: "Sistemas prediais",
      topics: [
        { topic: "Água fria", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [0, 1, 0] }, total: 3 },
        { topic: "Água quente", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [1, 0, 1] }, total: 3 },
        { topic: "Esgoto", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [1, 1, 0] }, total: 4 },
        { topic: "Água pluvial", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 0], transpetro: [0, 0, 1] }, total: 2 },
        { topic: "Prevenção e combate a incêndio", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 1], transpetro: [0, 1, 0] }, total: 2 },
        { topic: "Gás", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 },
        { topic: "Elétrica", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 0], transpetro: [0, 1, 0] }, total: 3 }
      ]
    },
    {
      name: "Saneamento básico",
      topics: [
        { topic: "Água", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 1], transpetro: [0, 0, 1] }, total: 3 },
        { topic: "Esgoto", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 0], transpetro: [1, 0, 1] }, total: 4 },
        { topic: "Drenagem", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [1, 0, 0] }, total: 2 },
        { topic: "Resíduos sólidos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 1, 0], transpetro: [0, 1, 0] }, total: 2 }
      ]
    },
    {
      name: "Planejamento e controle de obras",
      topics: [
        { topic: "Ferramentas para o planejamento e controle de obras", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 1], transpetro: [1, 1, 1] }, total: 6 },
        { topic: "Tópicos especiais de planejamento", coverage: { petrobras: false, transpetro: false }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 }
      ]
    },
    {
      name: "Orçamentos de obras",
      topics: [
        { topic: "Fundamentos e Custos", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 1], transpetro: [0, 1, 0] }, total: 4 },
        { topic: "Graus de Orçamento", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [0, 1, 0] }, total: 2 },
        { topic: "Formação de Preço", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 1], transpetro: [0, 0, 1] }, total: 2 },
        { topic: "Tabela de Custos e Composições", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [0, 0, 1], transpetro: [1, 0, 1] }, total: 3 },
        { topic: "Bonificações e Despesas Indiretas", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [1, 1, 0] }, total: 3 }
      ]
    },
    {
      name: "Qualidade na construção civil",
      topics: [
        { topic: "Qualidade na construção civil", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 1], transpetro: [0, 1, 0] }, total: 4 }
      ]
    },
    {
      name: "Segurança, inspeção e manutenção de edificações",
      topics: [
        { topic: "Segurança, inspeção e manutenção de edificações", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 1], transpetro: [1, 1, 1] }, total: 6 }
      ]
    },
    {
      name: "Conforto nas edificações",
      topics: [
        { topic: "Conforto nas edificações", coverage: { petrobras: true, transpetro: false }, questionCounts: { petrobras: [1, 0, 0], transpetro: [0, 0, 0] }, total: 1 }
      ]
    },
    {
      name: "Desempenho das edificações",
      topics: [
        { topic: "Desempenho das edificações", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 0, 0], transpetro: [0, 0, 1] }, total: 2 }
      ]
    },
    {
      name: "Contratação e fiscalização de obras e serviços",
      topics: [
        { topic: "Contratação e fiscalização de obras e serviços", coverage: { petrobras: false, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [1, 1, 1] }, total: 3 }
      ]
    },
    {
      name: "Licenciamento ambiental",
      topics: [
        { topic: "Licenciamento ambiental", coverage: { petrobras: false, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [1, 1, 1] }, total: 3 }
      ]
    },
    {
      name: "Sustentabilidade na construção civil",
      topics: [
        { topic: "Sustentabilidade na construção civil", coverage: { petrobras: false, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 }
      ]
    },
    {
      name: "Segurança e medicina do trabalho",
      topics: [
        { topic: "Segurança e medicina do trabalho", coverage: { petrobras: false, transpetro: true }, questionCounts: { petrobras: [0, 0, 0], transpetro: [0, 0, 0] }, total: 0 }
      ]
    },
    {
      name: "Transportes",
      topics: [
        { topic: "Dutovias", coverage: { petrobras: true, transpetro: true }, questionCounts: { petrobras: [1, 1, 1], transpetro: [1, 1, 1] }, total: 6 },
        { topic: "Outros sistemas de transportes", coverage: { petrobras: true, transpetro: false }, questionCounts: { petrobras: [1, 0, 0], transpetro: [0, 0, 0] }, total: 1 }
      ]
    }
  ]
};

export const ExamComparison = () => {
  const [selectedExams, setSelectedExams] = useState<string[]>(['petrobras', 'transpetro']);
  const [searchTerm, setSearchTerm] = useState("");

  const handleExamToggle = (examId: string) => {
    setSelectedExams(prev => 
      prev.includes(examId) 
        ? prev.filter(id => id !== examId)
        : [...prev, examId]
    );
  };

  const getExamBadgeColor = (examId: string) => {
    switch (examId) {
      case 'petrobras':
        return 'bg-petrobras text-white hover:bg-petrobras-hover';
      case 'transpetro':
        return 'bg-transpetro text-white hover:bg-transpetro-hover';
      default:
        return 'bg-primary text-primary-foreground hover:bg-primary/90';
    }
  };

  const filteredSubjects = examData.subjects.filter(subject => {
    if (!searchTerm) return true;
    
    const subjectMatch = subject.name.toLowerCase().includes(searchTerm.toLowerCase());
    const topicMatch = subject.topics.some(topic => 
      topic.topic.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return subjectMatch || topicMatch;
  });

  const visibleExams = examData.exams.filter(exam => selectedExams.includes(exam.id));

  // Função para calcular status do tópico
  const getTopicStatus = (coverage: any) => {
    const selectedCoverage = visibleExams.map(exam => coverage[exam.id]).filter(Boolean);
    const totalSelected = visibleExams.length;
    const covered = selectedCoverage.length;
    
    if (covered === 0) return { status: 'none', label: 'Não abordado', color: 'text-muted-foreground' };
    if (covered === totalSelected) return { status: 'all', label: 'Comum a todos', color: 'text-success' };
    if (covered === 1) return { status: 'exclusive', label: 'Exclusivo', color: 'text-warning' };
    return { status: 'partial', label: 'Parcial', color: 'text-petrobras' };
  };

  return (
    <Tabs defaultValue="comparison" className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-foreground mb-2">
          📊 Análise Estratégica dos Editais
        </h2>
        <p className="text-sm text-muted-foreground">
          Explore as diferenças e semelhanças entre os concursos
        </p>
      </div>

      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="comparison" className="flex items-center gap-2">
          📋 Cruzamento de Editais
        </TabsTrigger>
        <TabsTrigger value="approaches" className="flex items-center gap-2">
          📚 Abordagens Diferentes
        </TabsTrigger>
      </TabsList>

      <TabsContent value="comparison" className="space-y-6">
        <Card className="p-6 shadow-card animate-fade-in">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar matéria ou tópico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              {examData.exams.map((exam) => (
                <Badge
                  key={exam.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedExams.includes(exam.id)
                      ? getExamBadgeColor(exam.id)
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                  variant="default"
                  onClick={() => handleExamToggle(exam.id)}
                >
                  {exam.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Legenda */}
          <div className="mb-4 p-4 bg-muted/20 rounded-lg">
            <h4 className="text-sm font-semibold text-foreground mb-3">📖 Legenda:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-3 w-3 text-success" />
                <span className="text-muted-foreground">Abordado no concurso</span>
              </div>
              <div className="flex items-center space-x-2">
                <X className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">Não abordado</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-success font-medium">(comum)</span>
                <span className="text-muted-foreground">Todos os concursos</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-warning font-medium">(exclusivo)</span>
                <span className="text-muted-foreground">Apenas um concurso</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold text-foreground min-w-[300px]">Matéria / Tópico</th>
                  {visibleExams.map((exam) => (
                    <th key={exam.id} className="text-center p-3 min-w-[80px]">
                      <Badge className={getExamBadgeColor(exam.id)} variant="default">
                        {exam.name}
                      </Badge>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredSubjects.map((subject) => (
                  <React.Fragment key={subject.name}>
                    <tr className="border-b bg-muted/20">
                      <td className="p-3 font-bold text-foreground" colSpan={visibleExams.length + 1}>
                        {subject.name}
                      </td>
                    </tr>
                    {subject.topics.map((topic) => {
                      const topicStatus = getTopicStatus(topic.coverage);
                      const isHighlighted = topicStatus.status === 'exclusive';
                      
                      return (
                        <tr 
                          key={topic.topic} 
                          className={`border-b hover:bg-muted/30 ${isHighlighted ? 'bg-warning/5' : ''}`}
                        >
                          <td className="p-3 text-foreground pl-8 text-sm">
                            <div className="flex items-center justify-between">
                              <span>{topic.topic}</span>
                              <span className={`text-xs font-medium ${topicStatus.color} ml-2`}>
                                {topicStatus.status === 'all' && '(comum)'}
                                {topicStatus.status === 'exclusive' && '(exclusivo)'}
                                {topicStatus.status === 'partial' && '(parcial)'}
                              </span>
                            </div>
                          </td>
                          {visibleExams.map((exam) => (
                            <td key={exam.id} className="p-3 text-center">
                              {topic.coverage[exam.id as keyof typeof topic.coverage] ? (
                                <CheckCircle className="h-4 w-4 text-success mx-auto" />
                              ) : (
                                <X className="h-4 w-4 text-muted-foreground mx-auto" />
                              )}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Resumo estatístico */}
          <div className="mt-6 p-4 bg-gradient-card rounded-lg">
            <h4 className="text-sm font-semibold text-foreground mb-3">📊 Resumo da Seleção:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-success">
                  {filteredSubjects.reduce((acc, subject) => 
                    acc + subject.topics.filter(topic => getTopicStatus(topic.coverage).status === 'all').length, 0
                  )}
                </div>
                <div className="text-xs text-muted-foreground">Tópicos Comuns</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-warning">
                  {filteredSubjects.reduce((acc, subject) => 
                    acc + subject.topics.filter(topic => getTopicStatus(topic.coverage).status === 'exclusive').length, 0
                  )}
                </div>
                <div className="text-xs text-muted-foreground">Tópicos Exclusivos</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-petrobras">
                  {filteredSubjects.reduce((acc, subject) => 
                    acc + subject.topics.filter(topic => getTopicStatus(topic.coverage).status === 'partial').length, 0
                  )}
                </div>
                <div className="text-xs text-muted-foreground">Tópicos Parciais</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">
                  {filteredSubjects.reduce((acc, subject) => acc + subject.topics.length, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Total de Tópicos</div>
              </div>
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="approaches">
        <ExamApproachComparison />
      </TabsContent>
    </Tabs>
  );
};

export default ExamComparison;