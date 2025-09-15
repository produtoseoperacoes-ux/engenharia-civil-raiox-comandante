import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { ChevronDown, ChevronUp, Trophy, TrendingUp, Target, Calendar, BookOpen } from "lucide-react";

// Top 10 dados das matérias mais importantes baseados no CSV atualizado
const topSubjects = [
  {
    rank: 1,
    name: "Flexão",
    category: "Resistência dos materiais",
    total: 7,
    percentage: 2.8,
    description: "Análise de elementos submetidos à flexão",
    priority: "MÁXIMA",
    trend: "CRESCENTE",
    distribution: {
      petrobras: { count: 2, percentage: 28.6 },
      transpetro: { count: 5, percentage: 71.4 }
    },
    focus: ["Momentos Fletores", "Tensões", "Deformações", "Vigas"],
    historical: "2014 (1q) • 2012 (1q) • 2023 (1q) • 2018 (2q) • 2012 (2q)"
  },
  {
    rank: 2,
    name: "Estruturas isostáticas",
    category: "Análise estrutural",
    total: 7,
    percentage: 2.8,
    description: "Análise de estruturas isostáticas e cálculo de reações",
    priority: "ALTA",
    trend: "ESTÁVEL",
    distribution: {
      petrobras: { count: 3, percentage: 42.9 },
      transpetro: { count: 4, percentage: 57.1 }
    },
    focus: ["Treliças", "Vigas", "Pórticos", "Reações"],
    historical: "2021 (1q) • 2014 (1q) • 2012 (1q) • 2023 (1q) • 2018 (1q) • 2012 (2q)"
  },
  {
    rank: 3,
    name: "Conceitos fundamentais",
    category: "Análise estrutural",
    total: 6,
    percentage: 2.4,
    description: "Conceitos básicos de análise estrutural",
    priority: "ALTA",
    trend: "ESTÁVEL",
    distribution: {
      petrobras: { count: 3, percentage: 50.0 },
      transpetro: { count: 3, percentage: 50.0 }
    },
    focus: ["Cargas", "Apoios", "Vínculos", "Equilíbrio"],
    historical: "2021 (1q) • 2014 (1q) • 2012 (1q) • 2023 (1q) • 2018 (1q) • 2012 (1q)"
  },
  {
    rank: 4,
    name: "Segurança, inspeção e manutenção de edificações",
    category: "Segurança estrutural",
    total: 6,
    percentage: 2.4,
    description: "Segurança estrutural, inspeção predial e manutenção preventiva",
    priority: "ALTA",
    trend: "CRESCENTE",
    distribution: {
      petrobras: { count: 3, percentage: 50.0 },
      transpetro: { count: 3, percentage: 50.0 }
    },
    focus: ["Inspeção", "Patologia", "Manutenção", "Vida Útil"],
    historical: "2021 (1q) • 2014 (1q) • 2012 (1q) • 2023 (1q) • 2018 (1q) • 2012 (1q)"
  },
  {
    rank: 5,
    name: "Ferramentas para planejamento e controle",
    category: "Planejamento e controle de obras",
    total: 6,
    percentage: 2.4,
    description: "Ferramentas para o planejamento e controle de obras",
    priority: "ALTA",
    trend: "ESTÁVEL",
    distribution: {
      petrobras: { count: 3, percentage: 50.0 },
      transpetro: { count: 3, percentage: 50.0 }
    },
    focus: ["PERT", "CPM", "Cronogramas", "Gantt"],
    historical: "2021 (1q) • 2014 (1q) • 2012 (1q) • 2023 (1q) • 2018 (1q) • 2012 (1q)"
  },
  {
    rank: 6,
    name: "Dutovias",
    category: "Transportes",
    total: 6,
    percentage: 2.4,
    description: "Projeto e construção de dutovias",
    priority: "ALTA",
    trend: "ESTÁVEL",
    distribution: {
      petrobras: { count: 3, percentage: 50.0 },
      transpetro: { count: 3, percentage: 50.0 }
    },
    focus: ["Tubulações", "Pressão", "Materiais", "Instalação"],
    historical: "2021 (1q) • 2014 (1q) • 2012 (1q) • 2023 (1q) • 2018 (1q) • 2012 (1q)"
  },
  {
    rank: 7,
    name: "Estabilidade de taludes",
    category: "Obras de terra",
    total: 6,
    percentage: 2.4,
    description: "Análise de estabilidade de taludes naturais e artificiais",
    priority: "ALTA",
    trend: "ESTÁVEL",
    distribution: {
      petrobras: { count: 3, percentage: 50.0 },
      transpetro: { count: 3, percentage: 50.0 }
    },
    focus: ["Fator de Segurança", "Métodos de Análise", "Ruptura", "Contenção"],
    historical: "2021 (1q) • 2014 (1q) • 2012 (1q) • 2023 (1q) • 2012 (2q)"
  },
  {
    rank: 8,
    name: "Água nos solos",
    category: "Mecânica dos solos",
    total: 5,
    percentage: 2.0,
    description: "Permeabilidade e fluxo de água nos solos",
    priority: "ALTA",
    trend: "ESTÁVEL",
    distribution: {
      petrobras: { count: 2, percentage: 40.0 },
      transpetro: { count: 3, percentage: 60.0 }
    },
    focus: ["Permeabilidade", "Fluxo", "Pressão Neutra", "Rebaixamento"],
    historical: "2021 (1q) • 2012 (1q) • 2023 (1q) • 2018 (1q) • 2012 (1q)"
  },
  {
    rank: 9,
    name: "Conceitos básicos",
    category: "Mecânica dos solos",
    total: 5,
    percentage: 2.0,
    description: "Conceitos fundamentais da mecânica dos solos",
    priority: "ALTA",
    trend: "ESTÁVEL",
    distribution: {
      petrobras: { count: 3, percentage: 60.0 },
      transpetro: { count: 2, percentage: 40.0 }
    },
    focus: ["Origem dos Solos", "Propriedades", "Índices Físicos", "Classificação"],
    historical: "2021 (1q) • 2014 (1q) • 2012 (1q) • 2023 (1q) • 2012 (1q)"
  },
  {
    rank: 10,
    name: "Cisalhamento",
    category: "Resistência dos materiais",
    total: 5,
    percentage: 2.0,
    description: "Análise de tensões e deformações por cisalhamento",
    priority: "ALTA",
    trend: "ESTÁVEL",
    distribution: {
      petrobras: { count: 2, percentage: 40.0 },
      transpetro: { count: 3, percentage: 60.0 }
    },
    focus: ["Tensão de Cisalhamento", "Fluxo de Cisalhamento", "Torção", "Centro de Cisalhamento"],
    historical: "2021 (1q) • 2012 (1q) • 2023 (1q) • 2018 (1q) • 2012 (1q)"
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'MÁXIMA': return 'bg-red-500 text-white';
    case 'ALTA': return 'bg-orange-500 text-white';
    case 'MÉDIA': return 'bg-yellow-500 text-white';
    default: return 'bg-muted text-foreground';
  }
};

const getTrendColor = (trend: string) => {
  switch (trend) {
    case 'CRESCENTE': return 'bg-green-500 text-white';
    case 'ESTÁVEL': return 'bg-blue-500 text-white';
    case 'DECRESCENTE': return 'bg-red-500 text-white';
    default: return 'bg-muted text-foreground';
  }
};

const getExamColor = (examId: string) => {
  switch (examId) {
    case 'petrobras': return 'bg-petrobras';
    case 'transpetro': return 'bg-transpetro';
    case 'eaoear': return 'bg-military';
    case 'cpcem': return 'bg-red-500';
    case 'cfrm': return 'bg-cyan-500';
    default: return 'bg-muted';
  }
};

export const TopSubjects = () => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (rank: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(rank)) {
      newOpenItems.delete(rank);
    } else {
      newOpenItems.add(rank);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <h2 className="text-2xl font-bold text-foreground">
            🏆 Top 10 Matérias Mais Importantes
          </h2>
        </div>
        <p className="text-muted-foreground">
          As submatérias que mais aparecem nas provas de PETROBRAS e TRANSPETRO
        </p>
      </div>

      <div className="space-y-4">
        {topSubjects.map((subject) => {
          const isOpen = openItems.has(subject.rank);
          
          return (
            <Collapsible key={subject.rank} open={isOpen} onOpenChange={() => toggleItem(subject.rank)}>
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in">
                <CollapsibleTrigger className="w-full">
                  <div className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full font-bold">
                        {subject.rank}
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-lg text-foreground">
                          {subject.name} ({subject.category})
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {subject.total} questões • {subject.percentage}% do total
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-foreground">{subject.total}</div>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="px-4 pb-4 space-y-6 bg-muted/10">
                    {/* Descrição */}
                    <div className="pl-14">
                      <p className="text-foreground font-medium">{subject.description}</p>
                    </div>

                    {/* Tags de prioridade e tendência */}
                    <div className="pl-14 flex gap-3">
                      <Badge className={`${getTrendColor(subject.trend)} font-medium`}>
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {subject.trend} - tópico mais cobrado historicamente
                      </Badge>
                      <Badge className={`${getPriorityColor(subject.priority)} font-medium`}>
                        Prioridade {subject.priority} - {subject.percentage}% de todas as questões!
                      </Badge>
                    </div>

                    {/* Distribuição por concurso */}
                    <div className="pl-14 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 bg-chart-1 rounded"></div>
                        <h4 className="font-semibold text-foreground">Distribuição por Concurso:</h4>
                      </div>
                      
                      <div className="space-y-3">
                        {Object.entries(subject.distribution).map(([exam, data]) => (
                          <div key={exam} className="flex items-center justify-between">
                            <div className="flex items-center gap-3 min-w-[120px]">
                              <div className={`w-3 h-3 rounded-full ${getExamColor(exam)}`}></div>
                              <span className="text-sm font-medium text-foreground uppercase">
                                {exam}
                              </span>
                            </div>
                            <div className="flex-1 mx-4">
                              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${getExamColor(exam)} transition-all duration-300`}
                                  style={{ width: `${data.percentage}%` }}
                                />
                              </div>
                            </div>
                            <div className="text-right min-w-[120px]">
                              <span className="font-semibold text-foreground">{data.count} questões</span>
                              <div className="text-xs text-muted-foreground">
                                {data.percentage.toFixed(1)}% do total desta submatéria
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Histórico */}
                    <div className="pl-14 space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold text-foreground">Histórico:</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{subject.historical}</p>
                    </div>

                    {/* Foco principal */}
                    <div className="pl-14 space-y-2">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-red-500" />
                        <h4 className="font-semibold text-foreground">Foco:</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {subject.focus.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
};