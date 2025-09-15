import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Search, Trophy, Medal, Award, Filter, X, Building2, Factory, Plane, Ship, Anchor } from "lucide-react";

// Dados das submatérias baseados no CSV atualizado fornecido pelo usuário
const subjectRankingData = [
  // Top 10 matérias mais importantes com dados de todos os concursos
  { rank: 1, materia: "Análise estrutural", submateria: "Estruturas isostáticas", petrobras: 3, transpetro: 4, cfrm: 2, eaoear: 3, cpcem: 3, total: 15, percentage: 4.7 },
  { rank: 2, materia: "Planejamento e controle de obras", submateria: "Ferramentas para o planejamento e controle de obras", petrobras: 6, transpetro: 2, cfrm: 3, eaoear: 3, cpcem: 0, total: 14, percentage: 4.4 },
  { rank: 3, materia: "Resistência dos materiais", submateria: "Carga axial", petrobras: 3, transpetro: 1, cfrm: 0, eaoear: 7, cpcem: 1, total: 13, percentage: 4.0 },
  { rank: 4, materia: "Resistência dos materiais", submateria: "Flexão", petrobras: 3, transpetro: 4, cfrm: 1, eaoear: 0, cpcem: 2, total: 13, percentage: 4.0 },
  { rank: 5, materia: "Análise estrutural", submateria: "Estruturas hiperestáticas", petrobras: 4, transpetro: 1, cfrm: 1, eaoear: 0, cpcem: 2, total: 8, percentage: 2.5 },
  { rank: 6, materia: "Fundações", submateria: "Fundações profundas", petrobras: 2, transpetro: 0, cfrm: 0, eaoear: 0, cpcem: 3, total: 8, percentage: 2.5 },
  { rank: 7, materia: "Mecânica dos solos", submateria: "Conceitos básicos", petrobras: 3, transpetro: 1, cfrm: 0, eaoear: 1, cpcem: 1, total: 8, percentage: 2.5 },
  { rank: 8, materia: "Mecânica dos solos", submateria: "Água nos solos", petrobras: 5, transpetro: 0, cfrm: 0, eaoear: 1, cpcem: 1, total: 8, percentage: 2.5 },
  { rank: 9, materia: "Obras de terra", submateria: "Estabilidade de taludes", petrobras: 5, transpetro: 1, cfrm: 1, eaoear: 0, cpcem: 0, total: 8, percentage: 2.5 },
  { rank: 10, materia: "Saneamento básico", submateria: "Esgoto", petrobras: 5, transpetro: 0, cfrm: 0, eaoear: 2, cpcem: 1, total: 8, percentage: 2.5 },
  { rank: 11, materia: "Estruturas de concreto armado", submateria: "Conceitos básicos", petrobras: 5, transpetro: 0, cfrm: 0, eaoear: 1, cpcem: 0, total: 7, percentage: 2.2 },
  { rank: 12, materia: "Estruturas de concreto armado", submateria: "Dimensionamento detalhado", petrobras: 0, transpetro: 0, cfrm: 0, eaoear: 5, cpcem: 2, total: 7, percentage: 2.2 },
  { rank: 13, materia: "Estruturas metálicas", submateria: "Conceitos básicos e noções de dimensionamento", petrobras: 4, transpetro: 0, cfrm: 0, eaoear: 2, cpcem: 1, total: 7, percentage: 2.2 },
  { rank: 14, materia: "Hidráulica", submateria: "Hidrodinâmica", petrobras: 3, transpetro: 1, cfrm: 0, eaoear: 0, cpcem: 3, total: 7, percentage: 2.2 },
  { rank: 15, materia: "Mecânica dos solos", submateria: "Tensões nos solos", petrobras: 2, transpetro: 2, cfrm: 1, eaoear: 1, cpcem: 0, total: 7, percentage: 2.2 },
  { rank: 16, materia: "Obras de arte", submateria: "Obras de arte", petrobras: 2, transpetro: 0, cfrm: 0, eaoear: 5, cpcem: 0, total: 7, percentage: 2.2 },
  { rank: 17, materia: "Conforto nas edificações", submateria: "Conforto nas edificações", petrobras: 7, transpetro: 0, cfrm: 0, eaoear: 0, cpcem: 0, total: 7, percentage: 2.2 },
  { rank: 18, materia: "Terraplanagem", submateria: "Terraplanagem", petrobras: 6, transpetro: 0, cfrm: 0, eaoear: 0, cpcem: 0, total: 7, percentage: 2.2 },
  { rank: 19, materia: "Análise estrutural", submateria: "Conceitos fundamentais", petrobras: 6, transpetro: 0, cfrm: 0, eaoear: 0, cpcem: 0, total: 6, percentage: 1.9 },
  { rank: 20, materia: "Estruturas de concreto armado", submateria: "Noções de dimensionamento", petrobras: 1, transpetro: 0, cfrm: 1, eaoear: 0, cpcem: 1, total: 6, percentage: 1.9 },
  { rank: 21, materia: "Mecânica dos solos", submateria: "Compactação dos solos", petrobras: 3, transpetro: 0, cfrm: 0, eaoear: 2, cpcem: 0, total: 6, percentage: 1.9 },
  { rank: 22, materia: "Fundações", submateria: "Fundações rasas", petrobras: 3, transpetro: 0, cfrm: 0, eaoear: 1, cpcem: 0, total: 6, percentage: 1.9 },
  { rank: 23, materia: "Transportes", submateria: "Dutovias", petrobras: 6, transpetro: 0, cfrm: 0, eaoear: 0, cpcem: 0, total: 6, percentage: 1.9 },
  { rank: 24, materia: "Segurança, inspeção e manutenção de edificações", submateria: "Segurança, inspeção e manutenção de edificações", petrobras: 6, transpetro: 0, cfrm: 0, eaoear: 0, cpcem: 0, total: 6, percentage: 1.9 },
  { rank: 25, materia: "Resistência dos materiais", submateria: "Cisalhamento", petrobras: 2, transpetro: 3, cfrm: 0, eaoear: 1, cpcem: 0, total: 6, percentage: 1.9 },
  { rank: 26, materia: "Mecânica dos solos", submateria: "Classificação dos solos", petrobras: 4, transpetro: 0, cfrm: 0, eaoear: 1, cpcem: 0, total: 5, percentage: 1.6 },
  { rank: 27, materia: "Mecânica dos solos", submateria: "Prospecção e amostragem", petrobras: 4, transpetro: 0, cfrm: 0, eaoear: 1, cpcem: 0, total: 5, percentage: 1.6 },
  { rank: 28, materia: "Resistência dos materiais", submateria: "Deflexão em vigas", petrobras: 2, transpetro: 0, cfrm: 1, eaoear: 2, cpcem: 0, total: 5, percentage: 1.6 },
  { rank: 29, materia: "Mecânica dos solos", submateria: "Compressibilidade e adensamento", petrobras: 3, transpetro: 0, cfrm: 1, eaoear: 0, cpcem: 0, total: 5, percentage: 1.6 },
  { rank: 30, materia: "Mecânica dos solos", submateria: "Resistência ao cisalhamento", petrobras: 1, transpetro: 0, cfrm: 1, eaoear: 0, cpcem: 3, total: 5, percentage: 1.6 },
  { rank: 31, materia: "Obras de contenção", submateria: "Empuxos de terra", petrobras: 2, transpetro: 0, cfrm: 1, eaoear: 1, cpcem: 1, total: 5, percentage: 1.6 },
  { rank: 32, materia: "Hidráulica", submateria: "Hidrostática", petrobras: 4, transpetro: 0, cfrm: 0, eaoear: 0, cpcem: 0, total: 5, percentage: 1.6 },
  { rank: 33, materia: "Hidráulica", submateria: "Escoamento em tubulações sob pressão", petrobras: 3, transpetro: 0, cfrm: 1, eaoear: 0, cpcem: 0, total: 5, percentage: 1.6 },
  { rank: 34, materia: "Sistemas prediais", submateria: "Água fria", petrobras: 2, transpetro: 0, cfrm: 0, eaoear: 5, cpcem: 0, total: 8, percentage: 2.5 },
  { rank: 35, materia: "Sistemas prediais", submateria: "Esgoto", petrobras: 4, transpetro: 0, cfrm: 0, eaoear: 3, cpcem: 0, total: 7, percentage: 2.2 },
  { rank: 36, materia: "Sistemas prediais", submateria: "Elétrica", petrobras: 2, transpetro: 0, cfrm: 0, eaoear: 3, cpcem: 0, total: 5, percentage: 1.6 },
  { rank: 37, materia: "Tecnologia do concreto", submateria: "Dosagem", petrobras: 2, transpetro: 0, cfrm: 0, eaoear: 2, cpcem: 0, total: 5, percentage: 1.6 },
  { rank: 38, materia: "Sistemas prediais", submateria: "Água quente", petrobras: 3, transpetro: 0, cfrm: 0, eaoear: 1, cpcem: 0, total: 4, percentage: 1.3 },
  { rank: 39, materia: "Estruturas de concreto armado", submateria: "Durabilidade", petrobras: 3, transpetro: 0, cfrm: 0, eaoear: 1, cpcem: 0, total: 4, percentage: 1.3 },
  { rank: 40, materia: "Estruturas de concreto protendido", submateria: "Conceitos básicos e materiais", petrobras: 2, transpetro: 0, cfrm: 0, eaoear: 2, cpcem: 0, total: 4, percentage: 1.3 },
  { rank: 41, materia: "Estruturas metálicas", submateria: "Ligações metálicas", petrobras: 3, transpetro: 0, cfrm: 0, eaoear: 1, cpcem: 0, total: 4, percentage: 1.3 },
  { rank: 42, materia: "Tecnologia do concreto", submateria: "Cimento", petrobras: 4, transpetro: 0, cfrm: 0, eaoear: 0, cpcem: 0, total: 4, percentage: 1.3 },
  { rank: 43, materia: "Materiais de construção", submateria: "Aglomerantes", petrobras: 3, transpetro: 0, cfrm: 0, eaoear: 1, cpcem: 0, total: 4, percentage: 1.3 },
  { rank: 44, materia: "Materiais de construção", submateria: "Madeira", petrobras: 4, transpetro: 0, cfrm: 0, eaoear: 0, cpcem: 0, total: 4, percentage: 1.3 },
  { rank: 45, materia: "Técnicas de construção", submateria: "Superestrutura", petrobras: 1, transpetro: 0, cfrm: 0, eaoear: 3, cpcem: 0, total: 4, percentage: 1.3 },
  { rank: 46, materia: "Técnicas de construção", submateria: "Esquadrias", petrobras: 4, transpetro: 0, cfrm: 0, eaoear: 0, cpcem: 0, total: 4, percentage: 1.3 },
  { rank: 47, materia: "Técnicas de construção", submateria: "Revestimentos", petrobras: 3, transpetro: 0, cfrm: 0, eaoear: 1, cpcem: 0, total: 4, percentage: 1.3 },
  { rank: 48, materia: "Orçamentos de obras", submateria: "Fundamentos e Custos", petrobras: 3, transpetro: 0, cfrm: 0, eaoear: 1, cpcem: 1, total: 7, percentage: 2.2 },
  { rank: 49, materia: "Orçamentos de obras", submateria: "Formação de Preço", petrobras: 3, transpetro: 0, cfrm: 1, eaoear: 0, cpcem: 0, total: 4, percentage: 1.3 },
  { rank: 50, materia: "Contratação e fiscalização de obras e serviços", submateria: "Contratação e fiscalização de obras e serviços", petrobras: 3, transpetro: 0, cfrm: 1, eaoear: 0, cpcem: 0, total: 4, percentage: 1.3 }
];

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-500" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Award className="h-5 w-5 text-yellow-600" />;
  return null;
};

const getRankBadgeColor = (rank: number) => {
  if (rank === 1) return "bg-yellow-500 text-white";
  if (rank === 2) return "bg-gray-400 text-white";
  if (rank === 3) return "bg-yellow-600 text-white";
  if (rank <= 5) return "bg-petrobras text-white";
  if (rank <= 10) return "bg-transpetro text-white";
  return "bg-muted text-foreground";
};

export const QuestionAnalysis = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("all");

  const exams = [
    { id: "petrobras", name: "PETROBRAS", color: "text-petrobras", bgColor: "bg-petrobras/10", borderColor: "border-petrobras/30", icon: Building2 },
    { id: "transpetro", name: "TRANSPETRO", color: "text-transpetro", bgColor: "bg-transpetro/10", borderColor: "border-transpetro/30", icon: Factory },
    { id: "cfrm", name: "CFRM", color: "text-cyan-600", bgColor: "bg-cyan-50", borderColor: "border-cyan-300", icon: Ship },
    { id: "eaoear", name: "EAOEAR", color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-300", icon: Plane },
    { id: "cpcem", name: "CP-CEM", color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-300", icon: Anchor },
  ];

  // Extrair matérias únicas
  const uniqueSubjects = Array.from(new Set(subjectRankingData.map(item => item.materia))).sort();

  // Toggle seleção de concurso
  const toggleExam = (examId: string) => {
    setSelectedExams(prev => 
      prev.includes(examId) 
        ? prev.filter(id => id !== examId)
        : [...prev, examId]
    );
  };

  // Calcular compatibilidade entre concursos selecionados
  const calculateCompatibility = () => {
    if (selectedExams.length < 2) return null;

    const compatibleSubjects = subjectRankingData.filter(item => {
      return selectedExams.every(examId => {
        const examKey = examId as keyof typeof item;
        return typeof item[examKey] === 'number' && (item[examKey] as number) > 0;
      });
    });

    const totalInSelectedExams = subjectRankingData.filter(item => {
      return selectedExams.some(examId => {
        const examKey = examId as keyof typeof item;
        return typeof item[examKey] === 'number' && (item[examKey] as number) > 0;
      });
    });

    const compatibilityPercentage = totalInSelectedExams.length > 0 
      ? ((compatibleSubjects.length / totalInSelectedExams.length) * 100).toFixed(1)
      : "0.0";

    return {
      compatible: compatibleSubjects.length,
      total: totalInSelectedExams.length,
      percentage: compatibilityPercentage,
      subjects: compatibleSubjects
    };
  };

  const compatibility = calculateCompatibility();

  const filteredData = subjectRankingData.filter(item => {
    // Filtro por busca textual
    const matchesSearch = searchTerm === "" || 
      item.materia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.submateria.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtro por matéria
    const matchesSubject = selectedSubject === "all" || item.materia === selectedSubject;
    
    // Filtro por concursos selecionados
    const matchesExams = selectedExams.length === 0 || selectedExams.some(examId => {
      const examKey = examId as keyof typeof item;
      return typeof item[examKey] === 'number' && (item[examKey] as number) > 0;
    });
    
    return matchesSearch && matchesSubject && matchesExams;
  });

  // Calcular total de questões considerando todos os concursos
  const totalQuestions = subjectRankingData.reduce((acc, item) => {
    const total = (item.petrobras || 0) + (item.transpetro || 0) + (item.cfrm || 0) + (item.eaoear || 0) + (item.cpcem || 0);
    return acc + total;
  }, 0);
  
  const top10Total = subjectRankingData.slice(0, 10).reduce((acc, item) => {
    const total = (item.petrobras || 0) + (item.transpetro || 0) + (item.cfrm || 0) + (item.eaoear || 0) + (item.cpcem || 0);
    return acc + total;
  }, 0);
  
  const top10Percentage = ((top10Total / totalQuestions) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Ranking das Submatérias - Engenharia Civil
        </h2>
        <p className="text-muted-foreground mb-2">
          Baseado na análise de <strong>320+</strong> questões dos últimos concursos de Engenharia Civil
        </p>
        <div className="text-xs text-muted-foreground space-y-1 mt-4 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 text-left">
            <div className="flex items-center gap-1"><Building2 className="h-4 w-4 text-petrobras" /><strong>PETROBRAS:</strong> 2021, 2014, 2012</div>
            <div className="flex items-center gap-1"><Factory className="h-4 w-4 text-transpetro" /><strong>TRANSPETRO:</strong> 2023, 2018, 2012</div>
            <div className="flex items-center gap-1"><Ship className="h-4 w-4 text-cyan-600" /><strong>CFRM:</strong> 2023-2024, 2022-2023, 2021-2022</div>
            <div className="flex items-center gap-1"><Plane className="h-4 w-4 text-blue-600" /><strong>EAOEAR:</strong> 2018, 2016, 2015</div>
            <div className="flex items-center gap-1"><Anchor className="h-4 w-4 text-red-600" /><strong>CP-CEM:</strong> 2024, 2023, 2022</div>
          </div>
        </div>
      </div>

      <Card className="p-6 shadow-card animate-fade-in">
        {/* Filtros */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Filtros e Análise de Compatibilidade</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Coluna da esquerda - Filtros básicos */}
            <div className="space-y-4">
              {/* Busca por texto */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar matéria ou submatéria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filtro por matéria */}
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por matéria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as matérias</SelectItem>
                  {uniqueSubjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Coluna da direita - Seleção de concursos */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="h-4 w-4 text-primary" />
                <h4 className="font-medium text-foreground">Selecione os concursos para análise:</h4>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {exams.map((exam) => {
                  const Icon = exam.icon;
                  const isSelected = selectedExams.includes(exam.id);
                  return (
                    <div 
                      key={exam.id} 
                      className={`
                        relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer hover-scale
                        ${isSelected 
                          ? `${exam.borderColor} ${exam.bgColor} shadow-lg scale-[1.02]` 
                          : 'border-muted hover:border-primary/30 hover:shadow-md'
                        }
                      `}
                      onClick={() => toggleExam(exam.id)}
                    >
                      <div className="flex items-center space-x-3 p-4">
                        <div className={`
                          flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300
                          ${isSelected ? 'bg-white/20 backdrop-blur-sm' : 'bg-muted'}
                        `}>
                          <Icon className={`h-5 w-5 ${isSelected ? exam.color : 'text-muted-foreground'}`} />
                        </div>
                        
                        <div className="flex-1">
                          <label
                            htmlFor={exam.id}
                            className={`font-semibold cursor-pointer transition-colors ${
                              isSelected ? exam.color : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            {exam.name}
                          </label>
                        </div>

                        <div className="flex items-center">
                          <Checkbox
                            id={exam.id}
                            checked={isSelected}
                            onCheckedChange={() => toggleExam(exam.id)}
                            className="transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Análise de Compatibilidade */}
        {compatibility && (
          <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Análise de Compatibilidade entre Concursos
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-white/70 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{compatibility.compatible}</div>
                <div className="text-sm text-blue-700">Submatérias Comuns</div>
              </div>
              <div className="text-center p-3 bg-white/70 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{compatibility.total}</div>
                <div className="text-sm text-indigo-700">Total de Submatérias</div>
              </div>
              <div className="text-center p-3 bg-white/70 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{compatibility.percentage}%</div>
                <div className="text-sm text-purple-700">Compatibilidade</div>
              </div>
            </div>

            <div className="text-sm text-blue-700">
              <p className="mb-2"><strong>Insights Estratégicos:</strong></p>
              <ul className="space-y-1 text-xs">
                <li>• <strong>Alta compatibilidade (70%+):</strong> Estude principalmente as matérias comuns</li>
                <li>• <strong>Média compatibilidade (40-70%):</strong> Balance entre comum e específico</li>
                <li>• <strong>Baixa compatibilidade (&lt;40%):</strong> Foque nas especificidades de cada concurso</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tabela de Dados */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-muted">
                <th className="text-left p-3 font-bold text-foreground">Pos</th>
                <th className="text-left p-3 font-bold text-foreground min-w-[200px]">Matéria / Submatéria</th>
                {exams
                  .filter(exam => selectedExams.length === 0 || selectedExams.includes(exam.id))
                  .map((exam) => {
                    const Icon = exam.icon;
                    return (
                      <th key={exam.id} className="text-center p-3 min-w-[80px]">
                        <div className="flex flex-col items-center space-y-1">
                          <Icon className={`h-4 w-4 ${exam.color}`} />
                          <span className={`text-xs font-bold ${exam.color}`}>
                            {exam.name}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                <th className="text-center p-3 font-bold text-foreground">Total</th>
                <th className="text-center p-3 font-bold text-foreground">%</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr 
                  key={`${item.materia}-${item.submateria}`} 
                  className={`border-b transition-all duration-300 ${
                    item.rank === 1 
                      ? 'animate-fade-in hover:bg-muted/30' 
                      : 'hover:bg-muted/30'
                  }`}
                >
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      {getRankIcon(item.rank)}
                      <Badge className={getRankBadgeColor(item.rank)}>
                        #{item.rank}
                      </Badge>
                    </div>
                  </td>
                  <td className="p-3">
                    <div>
                      <div className="font-medium text-foreground text-sm">{item.materia}</div>
                      <div className="text-xs text-muted-foreground">{item.submateria}</div>
                    </div>
                  </td>
                  {exams
                    .filter(exam => selectedExams.length === 0 || selectedExams.includes(exam.id))
                    .map((exam) => (
                      <td key={exam.id} className="p-3 text-center">
                        <span className={`text-sm font-medium ${
                          (item[exam.id as keyof typeof item] as number) > 0 ? exam.color : 'text-muted-foreground'
                        }`}>
                          {item[exam.id as keyof typeof item] || 0}
                        </span>
                      </td>
                    ))}
                  <td className="p-3 text-center">
                    <Badge variant="outline" className="font-bold">
                      {item.total}
                    </Badge>
                  </td>
                  <td className="p-3 text-center">
                    <span className="text-xs text-muted-foreground">
                      {item.percentage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Estatísticas Resumo */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-success">
                {subjectRankingData.length}
              </div>
              <div className="text-xs text-green-700">Total de Submatérias</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-petrobras">
                {uniqueSubjects.length}
              </div>
              <div className="text-xs text-blue-700">Total de Matérias</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};