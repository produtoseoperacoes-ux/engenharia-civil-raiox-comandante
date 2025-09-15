import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Search, Trophy, Medal, Award, Filter, X, Building2, Factory, Plane, Ship, Anchor } from "lucide-react";

// Dados das submatérias baseados no CSV atualizado fornecido pelo usuário
const subjectRankingData = [
  // Resistência dos materiais
  { rank: 1, materia: "Resistência dos materiais", submateria: "Flexão", petrobras: 2, transpetro: 5, total: 7, percentage: 2.8 },
  { rank: 2, materia: "Análise estrutural", submateria: "Conceitos fundamentais", petrobras: 3, transpetro: 3, total: 6, percentage: 2.4 },
  { rank: 3, materia: "Análise estrutural", submateria: "Estruturas isostáticas", petrobras: 3, transpetro: 4, total: 7, percentage: 2.8 },
  { rank: 4, materia: "Segurança, inspeção e manutenção de edificações", submateria: "Segurança, inspeção e manutenção de edificações", petrobras: 3, transpetro: 3, total: 6, percentage: 2.4 },
  { rank: 5, materia: "Planejamento e controle de obras", submateria: "Ferramentas para o planejamento e controle de obras", petrobras: 3, transpetro: 3, total: 6, percentage: 2.4 },
  { rank: 6, materia: "Transportes", submateria: "Dutovias", petrobras: 3, transpetro: 3, total: 6, percentage: 2.4 },
  { rank: 7, materia: "Obras de terra", submateria: "Estabilidade de taludes", petrobras: 3, transpetro: 3, total: 6, percentage: 2.4 },
  { rank: 8, materia: "Mecânica dos solos", submateria: "Água nos solos", petrobras: 2, transpetro: 3, total: 5, percentage: 2.0 },
  { rank: 9, materia: "Mecânica dos solos", submateria: "Conceitos básicos", petrobras: 3, transpetro: 2, total: 5, percentage: 2.0 },
  { rank: 10, materia: "Resistência dos materiais", submateria: "Cisalhamento", petrobras: 2, transpetro: 3, total: 5, percentage: 2.0 },
  { rank: 11, materia: "Estruturas de concreto armado", submateria: "Conceito básicos", petrobras: 3, transpetro: 2, total: 5, percentage: 2.0 },
  { rank: 12, materia: "Estruturas metálicas", submateria: "Conceitos básicos e noções de dimensionamento", petrobras: 3, transpetro: 2, total: 5, percentage: 2.0 },
  { rank: 13, materia: "Resistência dos materiais", submateria: "Carga axial", petrobras: 2, transpetro: 2, total: 4, percentage: 1.6 },
  { rank: 14, materia: "Análise estrutural", submateria: "Estruturas hiperestáticas", petrobras: 1, transpetro: 3, total: 4, percentage: 1.6 },
  { rank: 15, materia: "Estruturas de concreto pré-moldado", submateria: "Conceitos básicos", petrobras: 2, transpetro: 2, total: 4, percentage: 1.6 },
  { rank: 16, materia: "Mecânica dos solos", submateria: "Prospecção e amostragem", petrobras: 2, transpetro: 2, total: 4, percentage: 1.6 },
  { rank: 17, materia: "Mecânica dos solos", submateria: "Tensões nos solos", petrobras: 2, transpetro: 2, total: 4, percentage: 1.6 },
  { rank: 18, materia: "Hidráulica", submateria: "Hidrostática", petrobras: 2, transpetro: 2, total: 4, percentage: 1.6 },
  { rank: 19, materia: "Hidráulica", submateria: "Hidrodinâmica", petrobras: 3, transpetro: 1, total: 4, percentage: 1.6 },
  { rank: 20, materia: "Hidráulica", submateria: "Orifícios", petrobras: 1, transpetro: 3, total: 4, percentage: 1.6 },
  { rank: 21, materia: "Estradas", submateria: "Conceitos básicos e anteprojeto", petrobras: 3, transpetro: 1, total: 4, percentage: 1.6 },
  { rank: 22, materia: "Tecnologia do concreto", submateria: "Cimento", petrobras: 3, transpetro: 1, total: 4, percentage: 1.6 },
  { rank: 23, materia: "Tecnologia do concreto", submateria: "Dosagem", petrobras: 2, transpetro: 2, total: 4, percentage: 1.6 },
  { rank: 24, materia: "Materiais de construção", submateria: "Materiais metálicos", petrobras: 3, transpetro: 1, total: 4, percentage: 1.6 },
  { rank: 25, materia: "Orçamentos de obras", submateria: "Fundamentos e Custos", petrobras: 3, transpetro: 1, total: 4, percentage: 1.6 },
  { rank: 26, materia: "Qualidade na construção civil", submateria: "Qualidade na construção civil", petrobras: 3, transpetro: 1, total: 4, percentage: 1.6 },
  { rank: 27, materia: "Hidrologia", submateria: "Previsão e controle de enchentes", petrobras: 1, transpetro: 3, total: 4, percentage: 1.6 },
  { rank: 28, materia: "Saneamento básico", submateria: "Esgoto", petrobras: 2, transpetro: 2, total: 4, percentage: 1.6 },
  { rank: 29, materia: "Sistemas prediais", submateria: "Esgoto", petrobras: 2, transpetro: 2, total: 4, percentage: 1.6 },
  { rank: 30, materia: "Técnicas de construção", submateria: "Esquadrias", petrobras: 1, transpetro: 3, total: 4, percentage: 1.6 },
  { rank: 31, materia: "Resistência dos materiais", submateria: "Deflexão em vigas", petrobras: 1, transpetro: 2, total: 3, percentage: 1.2 },
  { rank: 32, materia: "Estruturas de concreto armado", submateria: "Durabilidade", petrobras: 0, transpetro: 3, total: 3, percentage: 1.2 },
  { rank: 33, materia: "Estruturas de concreto armado", submateria: "Noções de dimensionamento", petrobras: 2, transpetro: 1, total: 3, percentage: 1.2 },
  { rank: 34, materia: "Estruturas de concreto protendido", submateria: "Conceitos básicos e materiais", petrobras: 3, transpetro: 0, total: 3, percentage: 1.2 },
  { rank: 35, materia: "Mecânica dos solos", submateria: "Classificação dos solos", petrobras: 2, transpetro: 1, total: 3, percentage: 1.2 },
  { rank: 36, materia: "Mecânica dos solos", submateria: "Compactação dos solos", petrobras: 2, transpetro: 1, total: 3, percentage: 1.2 },
  { rank: 37, materia: "Mecânica dos solos", submateria: "Compressibilidade e adensamento", petrobras: 1, transpetro: 2, total: 3, percentage: 1.2 },
  { rank: 38, materia: "Fundações", submateria: "Fundações rasas", petrobras: 2, transpetro: 1, total: 3, percentage: 1.2 },
  { rank: 39, materia: "Fundações", submateria: "Fundações profundas", petrobras: 2, transpetro: 1, total: 3, percentage: 1.2 },
  { rank: 40, materia: "Topografia", submateria: "Conceitos básicos", petrobras: 2, transpetro: 1, total: 3, percentage: 1.2 },
  { rank: 41, materia: "Topografia", submateria: "Tipos de levantamento topográficos", petrobras: 1, transpetro: 2, total: 3, percentage: 1.2 },
  { rank: 42, materia: "Estradas", submateria: "Projeto geométrico rodoviário", petrobras: 1, transpetro: 2, total: 3, percentage: 1.2 },
  { rank: 43, materia: "Terraplanagem", submateria: "Terraplanagem", petrobras: 3, transpetro: 0, total: 3, percentage: 1.2 },
  { rank: 44, materia: "Hidráulica", submateria: "Escoamento em tubulações sob pressão", petrobras: 2, transpetro: 1, total: 3, percentage: 1.2 },
  { rank: 45, materia: "Hidrologia", submateria: "Escoamento superficial", petrobras: 2, transpetro: 1, total: 3, percentage: 1.2 },
  { rank: 46, materia: "Hidrologia", submateria: "Regularização de vazões", petrobras: 2, transpetro: 1, total: 3, percentage: 1.2 },
  { rank: 47, materia: "Sistemas prediais", submateria: "Água fria", petrobras: 2, transpetro: 1, total: 3, percentage: 1.2 },
  { rank: 48, materia: "Sistemas prediais", submateria: "Água quente", petrobras: 1, transpetro: 2, total: 3, percentage: 1.2 },
  { rank: 49, materia: "Sistemas prediais", submateria: "Elétrica", petrobras: 2, transpetro: 1, total: 3, percentage: 1.2 },
  { rank: 50, materia: "Saneamento básico", submateria: "Água", petrobras: 2, transpetro: 1, total: 3, percentage: 1.2 },
  { rank: 51, materia: "Técnicas de construção", submateria: "Estudos e serviços preliminares", petrobras: 2, transpetro: 1, total: 3, percentage: 1.2 },
  { rank: 52, materia: "Técnicas de construção", submateria: "Fundações e infraestrutura", petrobras: 2, transpetro: 1, total: 3, percentage: 1.2 },
  { rank: 53, materia: "Técnicas de construção", submateria: "Revestimentos", petrobras: 2, transpetro: 1, total: 3, percentage: 1.2 },
  { rank: 54, materia: "Materiais de construção", submateria: "Aglomerantes", petrobras: 2, transpetro: 1, total: 3, percentage: 1.2 },
  { rank: 55, materia: "Materiais de construção", submateria: "Madeira", petrobras: 1, transpetro: 2, total: 3, percentage: 1.2 },
  { rank: 56, materia: "Materiais de construção", submateria: "Tintas", petrobras: 2, transpetro: 1, total: 3, percentage: 1.2 },
  { rank: 57, materia: "Orçamentos de obras", submateria: "Tabela de Custos e Composições", petrobras: 1, transpetro: 2, total: 3, percentage: 1.2 },
  { rank: 58, materia: "Orçamentos de obras", submateria: "Bonificações e Despesas Indiretas", petrobras: 1, transpetro: 2, total: 3, percentage: 1.2 },
  { rank: 59, materia: "Contratação e fiscalização de obras e serviços", submateria: "Contratação e fiscalização de obras e serviços", petrobras: 0, transpetro: 3, total: 3, percentage: 1.2 },
  { rank: 60, materia: "Licenciamento ambiental", submateria: "Licenciamento ambiental", petrobras: 0, transpetro: 3, total: 3, percentage: 1.2 }
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

  const totalQuestions = subjectRankingData.reduce((acc, item) => acc + item.total, 0);
  const top10Total = subjectRankingData.slice(0, 10).reduce((acc, item) => acc + item.total, 0);
  const top10Percentage = ((top10Total / totalQuestions) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Ranking das Submatérias - Engenharia Civil
        </h2>
        <p className="text-muted-foreground mb-2">
          Baseado na análise de <strong>320</strong> questões dos últimos concursos de Engenharia Civil
        </p>
        <div className="text-xs text-muted-foreground space-y-1 mt-4 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-left">
            <div className="flex items-center gap-1"><Building2 className="h-4 w-4 text-petrobras" /><strong>PETROBRAS:</strong> 2021, 2014, 2012</div>
            <div className="flex items-center gap-1"><Factory className="h-4 w-4 text-transpetro" /><strong>TRANSPETRO:</strong> 2023, 2018, 2012</div>
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