import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronRight, Search, ExternalLink } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Lesson {
  id: string;
  title: string;
  type: "material" | "video" | "slides";
  url: string;
  concursos: string[];
}

interface Subject {
  name: string;
  lessons: Lesson[];
}

const studyData: Subject[] = [
  {
    name: "Dinâmica - Fundamentos",
    lessons: [
      {
        id: "1",
        title: "Material Teórico - Cinemática dos Corpos Rígidos",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4057",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "2",
        title: "Videoaula - Cinemática de Corpos Rígidos - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4058",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "3",
        title: "Videoaula - Exercícios - Cinemática de Corpos Rígidos - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=8872",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "4",
        title: "Videoaula - Cinemática de Corpos Rígidos - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4059",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "5",
        title: "Videoaula - Exercícios - Cinemática de Corpos Rígidos - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=8873",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "6",
        title: "Videoaula - Cinemática de Corpos Rígidos - Parte III",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4060",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "7",
        title: "Videoaula - Exercícios - Cinemática de Corpos Rígidos - Parte III",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=8874",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "8",
        title: "Videoaula - Cinemática de Corpos Rígidos - Parte IV",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4061",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "9",
        title: "Videoaula - Exercícios - Cinemática de Corpos Rígidos - Parte IV",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=8875",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "10",
        title: "Videoaula - Cinemática de Corpos Rígidos - Parte V",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4063",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "11",
        title: "Videoaula - Exercícios - Cinemática de Corpos Rígidos - Parte V",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=8876",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "12",
        title: "Material Teórico - Dinâmica das Partículas",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4517",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "13",
        title: "Videoaula - Fundamentos da Dinâmica, Efeito Giroscópico e Determinação de Esforços Dinâmicos em Mecanismos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4470",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      }
    ]
  },
  {
    name: "Vibrações Mecânicas",
    lessons: [
      {
        id: "14",
        title: "Videoaula - Vibração Livre Não Amortecida",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4066",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "15",
        title: "Videoaula - Exercícios - Vibração Livre Não Amortecida",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=8877",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "16",
        title: "Videoaula - Vibração Livre Amortecida",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4068",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "17",
        title: "Videoaula - Vibração Forçada Não Amortecida",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4069",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "18",
        title: "Videoaula - Exercícios - Vibração Forçada Não Amortecida",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=8879",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "19",
        title: "Videoaula - Vibração Forçada Amortecida - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4071",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "20",
        title: "Videoaula - Vibração Forçada Amortecida - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4074",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "21",
        title: "Videoaula - Exercícios - Vibração Forçada Amortecida - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=11507",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "22",
        title: "Material Teórico - Vibrações Mecânicas",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4123",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "23",
        title: "Videoaula - Vibrações Mecânicas (Conceitos Básicos) - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=13269",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "24",
        title: "Videoaula - Vibrações Mecânicas (Conceitos Básicos) - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=13270",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "25",
        title: "Videoaula - Sistema 1GDL (Vibrações Livres) - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=13271",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "26",
        title: "Videoaula - Sistema 1GDL (Vibrações Livres) - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=13272",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "27",
        title: "Videoaula - Sistema 1GDL (Vibrações Livres) - Parte III",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=13273",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "28",
        title: "Videoaula - Sistema 1GDL (Vibrações Forçadas) - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=13274",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "29",
        title: "Videoaula - Sistema 1GDL (Vibrações Forçadas) - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=13275",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "30",
        title: "Videoaula - Vibrações com mais de 1 GDL",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=13276",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "31",
        title: "Videoaula - Rotodinâmica e Instrumentos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=13277",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      }
    ]
  },
  {
    name: "Mecanismos",
    lessons: [
      {
        id: "32",
        title: "Material Teórico - Mecanismos",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4078",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "33",
        title: "Videoaula - Conceitos Iniciais",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4080",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "34",
        title: "Videoaula - Conceitos Iniciais - Exercícios",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4084",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "35",
        title: "Videoaula - Análise de Posição",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4082",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "36",
        title: "Videoaula - Análise de Posição - Exercício",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4085",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "37",
        title: "Videoaula - Análise de Velocidade e Aceleração",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4083",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "38",
        title: "Videoaula - Análise de Velocidade e Aceleração - Exercício",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4087",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "39",
        title: "Videoaula - Síntese de Mecanismos - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4090",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "40",
        title: "Videoaula - Síntese de Mecanismos - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4092",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "41",
        title: "Videoaula - Síntese de Mecanismos - Exercício - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4094",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "42",
        title: "Videoaula - Síntese de Mecanismos - Exercício - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4095",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "43",
        title: "Videoaula - Cames",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4097",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "44",
        title: "Videoaula - Exercícios - Cames",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=11682",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "45",
        title: "Videoaula - Engrenagens",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4099",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "46",
        title: "Videoaula - Exercícios - Engrenagens",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=11683",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "47",
        title: "Videoaula - Dinâmica de Mecanismos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4100",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "48",
        title: "Videoaula - Exercícios - Dinâmica de Mecanismos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=11684",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      }
    ]
  },
  {
    name: "Resistência dos Materiais",
    lessons: [
      {
        id: "49",
        title: "Material Teórico - Resistência dos Materiais",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4157",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "50",
        title: "Videoaula - Conceitos Básicos da Resistência dos Materiais",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4159",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "51",
        title: "Videoaula - Estática de Corpos Rígidos e Momento de Inércia",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4209",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "52",
        title: "Slides - Tração e Compressão",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=24612",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "53",
        title: "Videoaula - Tração e Compressão - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=24164",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "54",
        title: "Videoaula - Tração e Compressão - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=24166",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "55",
        title: "Videoaula - Esforços Internos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=24160",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "56",
        title: "Slides - Análise de Tensões",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=24614",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "57",
        title: "Videoaula - Análise de Tensões",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=24156",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "58",
        title: "Slides - Tensão e Deformação",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=24617",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "59",
        title: "Videoaula - Tensão e Deformação",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=24162",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "60",
        title: "Slides - Deformação em Vigas",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=24633",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "61",
        title: "Videoaula - Deformação em Vigas",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=24158",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "62",
        title: "Videoaula - Tensão Térmica",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4166",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "63",
        title: "Videoaula - Tensão Térmica - Exercícios",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=18078",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "64",
        title: "Videoaula - Diagrama de Esforços - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4161",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "65",
        title: "Videoaula - Diagrama de Esforços - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4163",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "66",
        title: "Videoaula - Cisalhamento Puro",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4168",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "67",
        title: "Videoaula - Momento Fletor - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4178",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "68",
        title: "Videoaula - Momento Fletor - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4179",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "69",
        title: "Videoaula - Esforço Cortante - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4180",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "70",
        title: "Videoaula - Esforço Cortante - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4181",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "71",
        title: "Videoaula - Materiais Torção - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4169",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "72",
        title: "Videoaula - Materiais Torção - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4170",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "73",
        title: "Videoaula - Materiais Torção - Exercícios",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=18079",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "74",
        title: "Videoaula - Flexão composta",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4182",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "75",
        title: "Videoaula - Círculo de Mohr",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4186",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "76",
        title: "Videoaula - Vigas - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4189",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "77",
        title: "Videoaula - Vigas - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4190",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "78",
        title: "Videoaula - Vigas - Exercícios",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=18080",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "79",
        title: "Videoaula - Vasos Finos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4193",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "80",
        title: "Videoaula - Flambagem",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4195",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "81",
        title: "Videoaula - Flambagem - Exercícios",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4197",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "82",
        title: "Videoaula - Treliça",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4198",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "83",
        title: "Videoaula - Resistência dos Materiais e Teoria da Elasticidade",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4206",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "84",
        title: "Videoaula - Flexão, Tração e Torção, Combinados; Critérios de Escoamento (Tresca-Von Mises) e Métodos de Energia",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4212",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "85",
        title: "Slides - Falha e Fadiga",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=24635",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "86",
        title: "Videoaula - Falha e Fadiga",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=24161",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "87",
        title: "Videoaula - Como Resistência de Materiais vai cair na sua prova",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4291",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      }
    ]
  },
  {
    name: "Termodinâmica e Transferência de Calor",
    lessons: [
      {
        id: "88",
        title: "Material Teórico - Termodinâmica",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=3932",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "89",
        title: "Material Teórico - Transferência de Calor",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=25519",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "90",
        title: "Slides - Estado e Gases Perfeitos",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17264",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "91",
        title: "Videoaula - Propriedades Termodinamicas",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17279",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "92",
        title: "Videoaula - Substância Pura",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17280",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "93",
        title: "Videoaula - Gases Perfeitos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17281",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "94",
        title: "Slides - Primeira e Segunda lei da Termodinâmica",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17248",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "95",
        title: "Videoaula - Primeira Lei Da Termodinâmica",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17262",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "96",
        title: "Videoaula - Segunda Lei Da Termodinâmica",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17276",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "97",
        title: "Videoaula - Refrigeradores E Bombas De Calor",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17278",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "98",
        title: "Videoaula - Ciclo De Carnot",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17277",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "99",
        title: "Slides - Ciclos Termodinâmicos",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17265",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "100",
        title: "Videoaula - Ciclos De Brayton",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17282",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "101",
        title: "Videoaula - Ciclo Rankine",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17283",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "102",
        title: "Slides - Ciclos de Refrigeração",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17266",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "103",
        title: "Videoaula - Ciclo De Refrigeração Ideal Por Compressão De Vapor",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17284",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "104",
        title: "Videoaula - Ciclo De Refrigeração Ideal Por Compressão De Vapor x Real",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17285",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "105",
        title: "Videoaula - Sistema De Refrigeração Por Absorção, Amônia e Água",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17286",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "106",
        title: "Slides - Transferência de Calor",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17267",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "107",
        title: "Videoaula - Transmissão de calor por condução",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17288",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "108",
        title: "Videoaula - Transmissão de calor por convecção e radiação",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17289",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "109",
        title: "Videoaula - Resistência Térmica",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17290",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "110",
        title: "Videoaula - Números Adimensionais",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17293",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "111",
        title: "Slides - Trocadores de Calor",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17268",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "112",
        title: "Videoaula - Trocadores De Calor",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17296",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "113",
        title: "Videoaula - Trocadores De Calor Corrente Paralela",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17298",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "114",
        title: "Videoaula - Trocadores De Calor Correntes Opostas",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17303",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "115",
        title: "Videoaula - Efetividade",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17304",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      }
    ]
  },
  {
    name: "Refrigeração e Ar Condicionado",
    lessons: [
      {
        id: "116",
        title: "Videoaula - Instalações de Refrigeração e Ar Condicionado - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4448",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "117",
        title: "Videoaula - Exercícios - Instalações de Refrigeração e Ar Condicionado - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4449",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "118",
        title: "Videoaula - Instalações de Refrigeração e Ar Condicionado - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4451",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "119",
        title: "Videoaula - Exercícios - Instalações de Refrigeração e Ar Condicionado - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4453",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "120",
        title: "Videoaula - Análise Termodinâmica do Ciclo por Compressão Mecânica - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4456",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "121",
        title: "Videoaula - Exercícios - Análise Termodinâmica do Ciclo por Compressão Mecânica - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4457",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "122",
        title: "Videoaula - Análise Termodinâmica do Ciclo por Compressão Mecânica - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4458",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "123",
        title: "Videoaula - Exercícios - Análise Termodinâmica do Ciclo por Compressão Mecânica - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4459",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "124",
        title: "Videoaula - Componentes de Instalações por Compressão Mecânica",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4461",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "125",
        title: "Videoaula - Exercícios - Componentes de Instalações por Compressão Mecânica",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4462",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "126",
        title: "Videoaula - Redes, Tubulações e Acessórios - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4463",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "127",
        title: "Videoaula - Exercícios - Redes, Tubulações e Acessórios - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4464",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "128",
        title: "Videoaula - Redes, Tubulações e Acessórios - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4465",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "129",
        title: "Videoaula - Exercícios - Redes, Tubulações e Acessórios - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4467",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "130",
        title: "Videoaula - Ciclos de Rankine e Brayton",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4509",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "131",
        title: "Videoaula - Ciclos de Refrigeração a Vapor",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4515",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      }
    ]
  },
  {
    name: "Mecânica dos Fluidos",
    lessons: [
      {
        id: "132",
        title: "Material Teórico - Mecânica dos Fluidos",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=32394",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "133",
        title: "Material Teórico - Mecânica dos Fluidos - Complemento",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4031",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "134",
        title: "Videoaula - Mecânica dos Fluidos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4053",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "135",
        title: "Slides - Propriedades dos Fluidos",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17269",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "136",
        title: "Videoaula - Viscosidade",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17305",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "137",
        title: "Videoaula - Descrição E Classificação Dos Movimentos Dos Fluidos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17306",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "138",
        title: "Videoaula - Tipos De Fluidos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17307",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "139",
        title: "Videoaula - Classificação De Escoamento Fluidos Contínuos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17308",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "140",
        title: "Slides - Equações da dinâmica dos fluidos",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17272",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "141",
        title: "Videoaula - Conservação De Massa",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17314",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "142",
        title: "Videoaula - Principio Da Quantidade De Movimento",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17315",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "143",
        title: "Videoaula - Equação De Navier Stokes",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17316",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "144",
        title: "Videoaula - Equação De Bernoulli",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17317",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "145",
        title: "Slides - Hidrostática",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17271",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "146",
        title: "Videoaula - Variação de Pressão Em Um Dos Fluidos Estático",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17309",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "147",
        title: "Videoaula - Forças Hidrostáticas Sobre Superficies Submersas",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17310",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "148",
        title: "Videoaula - Empuxo e Estabilidade",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17311",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "149",
        title: "Videoaula - Teorema De Pascal",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17312",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "150",
        title: "Slides - Análise dimensional e semelhança",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17273",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "151",
        title: "Videoaula - Teorema Dos Pi De Buckingham",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17318",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "152",
        title: "Videoaula - Grupos Adimensionais Importantes",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17319",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "153",
        title: "Videoaula - Semelhança De Escoamentos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17320",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "154",
        title: "Slides - Escoamento Interno",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17274",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "155",
        title: "Videoaula - Escoamento laminar completamente desenvolvido entre placas paralelas infinitas",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17321",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "156",
        title: "Videoaula - Escoamento em Tubo",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17322",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "157",
        title: "Videoaula - Escoamento em Tubos e Dutos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17336",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "158",
        title: "Slides - Escoamento de fluidos ao redor de corpos submersos",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17275",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "159",
        title: "Videoaula - Arrasto",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17337",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "160",
        title: "Videoaula - Arrasto sobre placa plana paralela ao escoamento",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17338",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "161",
        title: "Videoaula - Arrasto sobre placa plana Normal ao escoamento",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17339",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "162",
        title: "Videoaula - Escoamento sobre uma esfera e cilindro",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17340",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "163",
        title: "Videoaula - Sustentação",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17341",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      }
    ]
  },
  {
    name: "Máquinas de Fluxo",
    lessons: [
      {
        id: "164",
        title: "Material Teórico - Máquinas Hidráulicas",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4227",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "165",
        title: "Material Teórico - Compressores e Ventiladores",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4218",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "166",
        title: "Material Teórico - Bombas",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4219",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "167",
        title: "Material Teórico - Turbinas",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4221",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "168",
        title: "Videoaula - Como Máquinas De Fluxo Cai Na Petrobras",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=12613",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "169",
        title: "Videoaula - Classificação e Descrição das Bombas",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4239",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "170",
        title: "Videoaula - Classificação e Descrição das Bombas - Exercício",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4242",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "171",
        title: "Videoaula - Bombas Centrífugas",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4243",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "172",
        title: "Videoaula - Exercícios - Bombas Centrífugas",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4245",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "173",
        title: "Videoaula - Bombas de Deslocamento Positivo",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4248",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "174",
        title: "Videoaula - Exercícios - Bombas de Deslocamento Positivo",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4249",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "175",
        title: "Videoaula - Perdas de Carga Localizada e Distribuída",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4255",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "176",
        title: "Videoaula - Exercícios - Perdas de Carga Localizada e Distribuída",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4256",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "177",
        title: "Videoaula - Curvas Características e Cavitação",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4266",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "178",
        title: "Videoaula - Exercícios - Curvas Características e Cavitação",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4267",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "179",
        title: "Videoaula - Cavitação e NPSH",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4271",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "180",
        title: "Videoaula - Exercícios - Cavitação e NPSH",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4273",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "181",
        title: "Videoaula - Compressores e Ventiladores",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4277",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "182",
        title: "Videoaula - Exercícios - Compressores e Ventiladores",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4278",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      }
    ]
  },
  {
    name: "Motores de Combustão Interna",
    lessons: [
      {
        id: "183",
        title: "Material Teórico - Motores de Combustão",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4056",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "184",
        title: "Videoaula - Motores de Combustão Interna - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4528",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "185",
        title: "Videoaula - Exercícios - Motores de Combustão Interna - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4529",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "186",
        title: "Videoaula - Motores de Combustão Interna - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4530",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "187",
        title: "Videoaula - Exercícios - Motores de Combustão Interna - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4531",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "188",
        title: "Videoaula - Motores de Combustão Interna - Parte III",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4533",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "189",
        title: "Videoaula - Exercícios - Motores de Combustão Interna - Parte III",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4537",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "190",
        title: "Videoaula - Motores de Combustão Interna - Parte IV",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4545",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "191",
        title: "Videoaula - Exercícios - Motores de Combustão Interna - Parte IV",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4547",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "192",
        title: "Videoaula - Motores de Combustão Interna - Parte V",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4549",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "193",
        title: "Videoaula - Exercícios - Motores de Combustão Interna - Parte V",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4550",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "194",
        title: "Videoaula - Motores de Combustão Interna - Parte VI",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4552",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "195",
        title: "Videoaula - Exercícios - Motores de Combustão Interna - Parte VI",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4554",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "196",
        title: "Videoaula - Motores de Combustão Interna - Parte VII",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4556",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "197",
        title: "Slide - Motores de Combustão Interna",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=29238",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "198",
        title: "Videoaula - Motores de Combustão Interna - Fundamentos dos Motores de Combustão Interna",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=29235",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "199",
        title: "Videoaula - Motores de Combustão Interna - Características dos MCI",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=29236",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "200",
        title: "Videoaula - Tipos de Motores Diesel",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4088",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "201",
        title: "Videoaula - Funcionamento de Motores Diesel",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4101",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "202",
        title: "Videoaula - Exercícios",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4102",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "203",
        title: "Videoaula - Desempenho de Motores Diesel",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4103",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "204",
        title: "Videoaula - Exercícios",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4104",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "205",
        title: "Videoaula - Combustão em Motores Diesel",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4105",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "206",
        title: "Videoaula - Motores com Câmara de Pré-Combustão",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4106",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "207",
        title: "Videoaula - Motores com Câmara de Combustão de Turbulência e Motores Cabeça Quente",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4108",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "208",
        title: "Videoaula - Componentes e Reforma de Motores Diesel",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4109",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "209",
        title: "Videoaula - Exercícios",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4111",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "210",
        title: "Videoaula - Sistemas de Injeção, Lubrificação e Arrefecimento",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4112",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "211",
        title: "Videoaula - Exercícios",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4113",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "212",
        title: "Videoaula - Sobrealimentação em Motores Diesel",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4114",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "213",
        title: "Videoaula - Perspectivas Tecnológicas da Evolução do Motor Diesel",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4117",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "214",
        title: "Videoaula - Conceitos de Manutenção",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4118",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "215",
        title: "Videoaula - Exercícios",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4121",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      }
    ]
  },
  {
    name: "Elementos de Máquinas",
    lessons: [
      {
        id: "216",
        title: "Material Teórico - Dimensionamento de Eixos e Árvores",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4091",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "217",
        title: "Material Teórico - Dimensionamento de Freios e Embreagens",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4093",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "218",
        title: "Videoaula - Fadiga - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4096",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "219",
        title: "Videoaula - Exercícios - Fadiga - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=11688",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "220",
        title: "Videoaula - Fadiga - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4107",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "221",
        title: "Videoaula - Exercícios - Fadiga - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=11689",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "222",
        title: "Videoaula - Eixos - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4208",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "223",
        title: "Videoaula - Eixos Exercícios - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4211",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "224",
        title: "Videoaula - Eixos - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4216",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "225",
        title: "Videoaula - Eixos Exercícios - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4222",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "226",
        title: "Videoaula - Rolamentos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4252",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "227",
        title: "Videoaula - Rolamentos Exercícios",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4253",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "228",
        title: "Videoaula - Mancais Hidrodinâmicos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4428",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "229",
        title: "Videoaula - Mancais Hidrodinâmicos Exercício",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4430",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "230",
        title: "Videoaula - Lubrificantes",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4257",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "231",
        title: "Videoaula - Lubrificantes Exercícios",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4259",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "232",
        title: "Videoaula - Molas",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4431",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "233",
        title: "Videoaula - Molas Exercícios",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4432",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "234",
        title: "Videoaula - Molas Helicoidais",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4433",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "235",
        title: "Videoaula - Molas Helicoidais Exercícios",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4434",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "236",
        title: "Videoaula - Parafusos de Potência",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4224",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "237",
        title: "Videoaula - Parafusos de Potência Exercícios",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4225",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "238",
        title: "Videoaula - Parafusos de Fixação",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4231",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "239",
        title: "Videoaula - Parafusos de Fixação Exercícios",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4234",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "240",
        title: "Videoaula - Soldagem",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4237",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "241",
        title: "Videoaula - Soldagem Exercícios",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4238",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "242",
        title: "Videoaula - Freios e Embreagens",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4247",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "243",
        title: "Videoaula - Freios e Embreagens Exercícios",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4251",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "244",
        title: "Videoaula - Transmissão",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4435",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "245",
        title: "Videoaula - Transmissão Exerícios",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4436",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "246",
        title: "Videoaula - Correias - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4437",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "247",
        title: "Videoaula - Correias Exercícios - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4438",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "248",
        title: "Videoaula - Correias - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4439",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "249",
        title: "Videoaula - Correias Exercícios - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4440",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "250",
        title: "Videoaula - Engrenagens - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4443",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "251",
        title: "Videoaula - Engrenagens Exercício - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4444",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "252",
        title: "Videoaula - Engrenagens - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4445",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "253",
        title: "Videoaula - Engrenagens Exercício - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4447",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      }
    ]
  },
  {
    name: "Corrosão e Seleção de Materiais",
    lessons: [
      {
        id: "254",
        title: "Material Teórico - Corrosão de Materiais",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=3879",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "255",
        title: "Slides - Corrosão",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17552",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "256",
        title: "Videoaula - Corrosão",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17578",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "257",
        title: "Videoaula - Formas De Corrosão",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17579",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "258",
        title: "Videoaula - Meios De Controle De Corrosão",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17580",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "259",
        title: "Slides - Seleção de Materiais",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17553",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "260",
        title: "Videoaula - Introdução",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17581",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "261",
        title: "Videoaula - Materias Cerâmicos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17582",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "262",
        title: "Videoaula - Materiais Poliméricos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17583",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "263",
        title: "Videoaula - Materiais Compósitos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17584",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "264",
        title: "Videoaula - Propriedades",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17585",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "265",
        title: "Videoaula - Exercícios De Fixação",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17586",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      }
    ]
  },
  {
    name: "Materiais de Engenharia",
    lessons: [
      {
        id: "266",
        title: "Material Teórico - Materiais",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=3877",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "267",
        title: "Material Teórico - Tratamentos Térmicos",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4473",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "268",
        title: "Slides - Ensaios Mecânicos",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17545",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "269",
        title: "Videoaula - Ensaio de Tração",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17563",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "270",
        title: "Videoaula - Ensaios de Dureza",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17564",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "271",
        title: "Videoaula - Ensaio De Impacto",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17565",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "272",
        title: "Videoaula - Ensaio de Fluência",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17566",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "273",
        title: "Slides - Tratamentos Térmicos",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17546",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "274",
        title: "Videoaula - Tratamentos Térmicos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17569",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "275",
        title: "Videoaula - Temperabilidade",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17567",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "276",
        title: "Videoaula - Tratamento Termoquímico",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17568",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "277",
        title: "Slides - Estrutura Cristalina e Transformações",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17544",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "278",
        title: "Videoaula - Diagramas de Fase e Transformações",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=23120",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "279",
        title: "Videoaula - Difusão",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=23121",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "280",
        title: "Videoaula - Estrutura dos Sólidos Cristalinos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=23122",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "281",
        title: "Videoaula - Imperfeições nos Sólidos Cristalinos",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=23123",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "282",
        title: "Videoaula - Ligações Químicas",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=23125",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "283",
        title: "Slides - Mecânismos de Aumento de Resistência",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17548",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "284",
        title: "Videoaula - Mecânismos de Aumento de Resistência",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17570",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      }
    ]
  },
  {
    name: "Processos de Fabricação",
    lessons: [
      {
        id: "285",
        title: "Material Teórico - Usinagem",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4353",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "286",
        title: "Material Teórico - Soldagem",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4005",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "287",
        title: "Videoaula - Usinagem - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4354",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "288",
        title: "Videoaula - Usinagem - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4355",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "289",
        title: "Videoaula - Exercícios - Usinagem - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4358",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "290",
        title: "Videoaula - Usinagem - Parte III",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4360",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "291",
        title: "Videoaula - Exercícios - Usinagem - Parte III",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4361",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "292",
        title: "Videoaula - Usinagem - Parte IV",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4363",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "293",
        title: "Videoaula - Exercícios - Usinagem - Parte IV",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4364",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "294",
        title: "Videoaula - Usinagem - Parte V",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4367",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "295",
        title: "Videoaula - Exercícios - Usinagem - Parte V",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4369",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "296",
        title: "Slides - Fundição",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17549",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "297",
        title: "Videoaula - Fundição",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17571",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "298",
        title: "Slides - Soldagem",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17550",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "299",
        title: "Videoaula - Terminologia",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17572",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "300",
        title: "Videoaula - Defeitos Da Soldagem",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17574",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "301",
        title: "Videoaula - Processos De Soldagem",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17576",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "302",
        title: "Slides - Conformação Mecânica",
        type: "slides",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17551",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "303",
        title: "Videoaula - Conformação Mecânica",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=17577",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      }
    ]
  },
  {
    name: "Metrologia e Instrumentação",
    lessons: [
      {
        id: "304",
        title: "Material Teórico - Metrologia",
        type: "material",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4079",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "305",
        title: "Videoaula - Instrumentação e Controle de Processos, Fundamentos da Instrumentação Industrial e Medição de Pressão, Temperatura, Nível e Vazão",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4073",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "306",
        title: "Videoaula - Desenho técnico - Parte I",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4450",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "307",
        title: "Videoaula - Desenho técnico - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4452",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "308",
        title: "Videoaula - Exercícios - Desenho técnico - Parte II",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=11483",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "309",
        title: "Videoaula - Desenho técnico - Parte III",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4454",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "310",
        title: "Videoaula - Desenho técnico - Parte IV",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4455",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "311",
        title: "Videoaula - Exercícios - Desenho técnico - Parte IV",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=11484",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      },
      {
        id: "312",
        title: "Videoaula - Estatística Descritiva",
        type: "video",
        url: "https://concurseirozero1.curseduca.pro/m/lessons/engenharia-mecanica-1733407438635?classId=4075",
        concursos: ["Petrobras", "Transpetro", "CP-CEM"]
      }
    ]
  }
];

export const StudySchedule = () => {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConcurso, setSelectedConcurso] = useState("Todos");
  const [openSubjects, setOpenSubjects] = useState<Set<string>>(new Set());

  const concursos = ["Todos", "Petrobras", "Transpetro"];

  const toggleCompletion = (lessonId: string) => {
    const newCompleted = new Set(completedLessons);
    if (newCompleted.has(lessonId)) {
      newCompleted.delete(lessonId);
    } else {
      newCompleted.add(lessonId);
    }
    setCompletedLessons(newCompleted);
  };

  const toggleSubject = (subjectName: string) => {
    const newOpen = new Set(openSubjects);
    if (newOpen.has(subjectName)) {
      newOpen.delete(subjectName);
    } else {
      newOpen.add(subjectName);
    }
    setOpenSubjects(newOpen);
  };

  const filteredData = studyData.map(subject => {
    const filteredLessons = subject.lessons.filter(lesson => {
      const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesConcurso = selectedConcurso === "Todos" || lesson.concursos.includes(selectedConcurso);
      return matchesSearch && matchesConcurso;
    });

    return {
      ...subject,
      lessons: filteredLessons
    };
  }).filter(subject => subject.lessons.length > 0);

  const totalLessons = filteredData.reduce((acc, subject) => acc + subject.lessons.length, 0);
  const completedCount = filteredData.reduce((acc, subject) =>
    acc + subject.lessons.filter(lesson => completedLessons.has(lesson.id)).length, 0
  );

  const getProgressPercentage = (subject: Subject) => {
    const subjectCompleted = subject.lessons.filter(lesson => completedLessons.has(lesson.id)).length;
    return subject.lessons.length > 0 ? (subjectCompleted / subject.lessons.length) * 100 : 0;
  };

  const getConcursoBadgeVariant = (concurso: string) => {
    switch (concurso) {
      case "Petrobras": return "default";
      case "Transpetro": return "secondary";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Pesquisar assuntos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {concursos.map((concurso) => (
          <Button
            key={concurso}
            variant={selectedConcurso === concurso ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedConcurso(concurso)}
          >
            {concurso}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        <Collapsible open={true}>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-3">
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold text-primary">ENGENHARIA MECÂNICA</h2>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{totalLessons} assuntos</span>
              <span>{completedCount} concluídas</span>
              <span>{totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0}%</span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-4">
            <Progress value={totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0} className="mb-6" />
            
            {filteredData.map((subject) => (
              <Card key={subject.name} className="border-l-4 border-l-primary">
                <CardContent className="p-0">
                  <Collapsible 
                    open={openSubjects.has(subject.name)}
                    onOpenChange={() => toggleSubject(subject.name)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50">
                      <div className="flex items-center space-x-3">
                        {openSubjects.has(subject.name) ? (
                          <ChevronDown className="h-4 w-4 text-primary" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-primary" />
                        )}
                        <h3 className="font-medium text-primary">{subject.name}</h3>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{subject.lessons.length} assuntos</span>
                        <span>{subject.lessons.filter(lesson => completedLessons.has(lesson.id)).length} concluídas</span>
                        <span>{Math.round(getProgressPercentage(subject))}%</span>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="px-4 pb-4">
                        <Progress value={getProgressPercentage(subject)} className="mb-4" />
                        <div className="space-y-2">
                          {subject.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30"
                            >
                              <div className="flex items-center space-x-3 flex-1">
                                <input
                                  type="checkbox"
                                  checked={completedLessons.has(lesson.id)}
                                  onChange={() => toggleCompletion(lesson.id)}
                                  className="h-4 w-4 rounded border-gray-300"
                                />
                                <div className="flex-1">
                                  <span className={`${completedLessons.has(lesson.id) ? 'line-through text-muted-foreground' : ''}`}>
                                    {lesson.title}
                                  </span>
                                  <div className="flex gap-1 mt-1">
                                    {lesson.concursos.map((concurso) => (
                                      <Badge key={concurso} variant={getConcursoBadgeVariant(concurso)} className="text-xs">
                                        {concurso}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(lesson.url, '_blank')}
                                className="ml-4"
                              >
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Estudar
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};
