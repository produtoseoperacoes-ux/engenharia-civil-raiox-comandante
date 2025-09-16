import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Users, 
  Target, 
  BookOpen, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp,
  Building2,
  Factory,
  Plane,
  Ship,
  Anchor,
  Clock,
  BarChart3,
  Lightbulb,
  User,
  Building
} from "lucide-react";

// Dados dos concursos baseados no CSV fornecido
const concursosData = {
  petrobras: {
    name: "PETROBRAS",
    icon: Factory,
    color: "text-green-600",
    bgColor: "bg-green-50",
    materias: [
      { nome: "Resistência dos materiais", questoes: 6 },
      { nome: "Análise estrutural", questoes: 3 },
      { nome: "Estruturas metálicas", questoes: 2 },
      { nome: "Estruturas de concreto armado", questoes: 3 },
      { nome: "Estruturas de concreto protendido", questoes: 2 },
      { nome: "Estruturas de concreto pré-moldado", questoes: 3 },
      { nome: "Mecânica dos solos", questoes: 6 },
      { nome: "Obras de terra", questoes: 3 },
      { nome: "Fundações", questoes: 2 },
      { nome: "Topografia", questoes: 2 },
      { nome: "Estradas", questoes: 2 },
      { nome: "Terraplanagem", questoes: 3 },
      { nome: "Pavimentação", questoes: 2 },
      { nome: "Obras de arte", questoes: 2 },
      { nome: "Tecnologia do concreto", questoes: 4 },
      { nome: "Materiais de construção", questoes: 5 },
      { nome: "Técnicas de construção", questoes: 5 },
      { nome: "Hidráulica", questoes: 6 },
      { nome: "Hidrologia", questoes: 3 },
      { nome: "Sistemas prediais", questoes: 4 },
      { nome: "Saneamento básico", questoes: 4 },
      { nome: "Planejamento e controle de obras", questoes: 6 },
      { nome: "Orçamentos de obras", questoes: 3 },
      { nome: "Qualidade na construção civil", questoes: 3 },
      { nome: "Segurança, inspeção e manutenção de edificações", questoes: 6 },
      { nome: "Conforto nas edificações", questoes: 1 },
      { nome: "Desempenho das edificações", questoes: 1 },
      { nome: "Transportes", questoes: 2 }
    ]
  },
  transpetro: {
    name: "TRANSPETRO",
    icon: Building2,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    materias: [
      { nome: "Resistência dos materiais", questoes: 11 },
      { nome: "Análise estrutural", questoes: 6 },
      { nome: "Estruturas de madeira", questoes: 2 },
      { nome: "Estruturas metálicas", questoes: 1 },
      { nome: "Estruturas de concreto armado", questoes: 4 },
      { nome: "Geologia e Geotécnica", questoes: 3 },
      { nome: "Mecânica dos solos", questoes: 8 },
      { nome: "Obras de terra", questoes: 5 },
      { nome: "Obras de contenção", questoes: 4 },
      { nome: "Topografia", questoes: 4 },
      { nome: "Terraplanagem", questoes: 6 },
      { nome: "Tecnologia do concreto", questoes: 3 },
      { nome: "Materiais de construção", questoes: 6 },
      { nome: "Técnicas de construção", questoes: 7 },
      { nome: "Hidráulica", questoes: 4 },
      { nome: "Hidrologia", questoes: 8 },
      { nome: "Sistemas prediais", questoes: 5 },
      { nome: "Saneamento básico", questoes: 3 },
      { nome: "Planejamento e controle de obras", questoes: 6 },
      { nome: "Orçamentos de obras", questoes: 4 },
      { nome: "Segurança, inspeção e manutenção de edificações", questoes: 6 },
      { nome: "Conforto nas edificações", questoes: 6 },
      { nome: "Contratação e fiscalização de obras e serviços", questoes: 4 },
      { nome: "Licenciamento ambiental", questoes: 3 },
      { nome: "Transportes", questoes: 6 }
    ]
  },
  cfrm: {
    name: "CFrM",
    icon: Ship,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    materias: [
      { nome: "Análise estrutural", questoes: 3 },
      { nome: "Estruturas de concreto armado", questoes: 1 },
      { nome: "Mecânica dos solos", questoes: 3 },
      { nome: "Obras de terra", questoes: 1 },
      { nome: "Obras de contenção", questoes: 1 },
      { nome: "Hidráulica", questoes: 3 },
      { nome: "Hidrologia", questoes: 1 },
      { nome: "Planejamento e controle de obras", questoes: 3 },
      { nome: "Orçamentos de obras", questoes: 1 }
    ]
  },
  eaoear: {
    name: "EAOEAR",
    icon: Plane,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    materias: [
      { nome: "Resistência dos materiais", questoes: 4 },
      { nome: "Análise estrutural", questoes: 1 },
      { nome: "Estruturas de concreto armado", questoes: 1 },
      { nome: "Estruturas de concreto protendido", questoes: 2 },
      { nome: "Estruturas de concreto pré-moldado", questoes: 1 },
      { nome: "Geologia e Geotécnica", questoes: 1 },
      { nome: "Mecânica dos solos", questoes: 3 },
      { nome: "Obras de terra", questoes: 1 },
      { nome: "Fundações", questoes: 1 },
      { nome: "Obras de arte", questoes: 5 },
      { nome: "Tecnologia do concreto", questoes: 4 },
      { nome: "Materiais de construção", questoes: 2 },
      { nome: "Técnicas de construção", questoes: 4 },
      { nome: "Hidrologia", questoes: 1 },
      { nome: "Sistemas prediais", questoes: 8 },
      { nome: "Saneamento básico", questoes: 2 },
      { nome: "Planejamento e controle de obras", questoes: 3 },
      { nome: "Orçamentos de obras", questoes: 1 }
    ]
  },
  cpcem: {
    name: "CP-CEM",
    icon: Anchor,
    color: "text-red-600",
    bgColor: "bg-red-50",
    materias: [
      { nome: "Resistência dos materiais", questoes: 1 },
      { nome: "Análise estrutural", questoes: 3 },
      { nome: "Estruturas de madeira", questoes: 1 },
      { nome: "Estruturas metálicas", questoes: 1 },
      { nome: "Estruturas de concreto armado", questoes: 1 },
      { nome: "Mecânica dos solos", questoes: 1 },
      { nome: "Fundações", questoes: 2 },
      { nome: "Estradas", questoes: 2 },
      { nome: "Hidráulica", questoes: 3 },
      { nome: "Técnicas de construção", questoes: 1 },
      { nome: "Planejamento e controle de obras", questoes: 1 }
    ]
  }
};

export const GroupStudy = () => {
  const [selectedConcursos, setSelectedConcursos] = useState<string[]>([]);

  const handleConcursoToggle = (concursoId: string) => {
    if (selectedConcursos.includes(concursoId)) {
      setSelectedConcursos(selectedConcursos.filter(id => id !== concursoId));
    } else {
      setSelectedConcursos([...selectedConcursos, concursoId]);
    }
  };

  // Análise das matérias comuns e específicas
  const getAnalise = () => {
    if (selectedConcursos.length < 2) return null;

    const selectedData = selectedConcursos.map(id => concursosData[id as keyof typeof concursosData]);
    
    // Matérias que aparecem em todos os concursos selecionados
    const materiasComuns = selectedData[0].materias
      .filter(materia => 
        selectedData.every(concurso => 
          concurso.materias.some(m => m.nome === materia.nome)
        )
      )
      .map(materia => {
        const questoesTotais = selectedData.reduce((sum, concurso) => {
          const materiaData = concurso.materias.find(m => m.nome === materia.nome);
          return sum + (materiaData?.questoes || 0);
        }, 0);
        
        return {
          nome: materia.nome,
          questoesTotais,
          concursos: selectedData.map(concurso => ({
            nome: concurso.name,
            questoes: concurso.materias.find(m => m.nome === materia.nome)?.questoes || 0
          }))
        };
      })
      .sort((a, b) => b.questoesTotais - a.questoesTotais);

    // Matérias específicas de cada concurso
    const materiasEspecificas = selectedData.map(concurso => ({
      ...concurso,
      materiasEspecificas: concurso.materias.filter(materia =>
        !materiasComuns.some(comum => comum.nome === materia.nome)
      )
    }));

    return { materiasComuns, materiasEspecificas };
  };

  const analise = getAnalise();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">
            👥 Estudo Conjunto Estratégico
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Otimize seus estudos identificando matérias comuns e específicas entre os concursos que você pretende fazer.
          Foque no que realmente importa para maximizar sua preparação.
        </p>
      </div>

      {/* Seleção de Concursos */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <Target className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold text-foreground">
            Selecione os Concursos que Pretende Fazer
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(concursosData).map(([id, concurso]) => {
            const Icon = concurso.icon;
            const isSelected = selectedConcursos.includes(id);
            
            return (
              <div
                key={id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  isSelected 
                    ? `${concurso.bgColor} border-current/30 shadow-lg` 
                    : 'border-muted hover:border-primary/30'
                }`}
                onClick={() => handleConcursoToggle(id)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Checkbox 
                    checked={isSelected}
                    onChange={() => handleConcursoToggle(id)}
                  />
                  <Icon className={`h-6 w-6 ${isSelected ? concurso.color : 'text-muted-foreground'}`} />
                  <span className={`font-semibold ${isSelected ? concurso.color : 'text-muted-foreground'}`}>
                    {concurso.name}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {concurso.materias.length} matérias principais
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Análise dos Concursos Selecionados */}
      {analise && (
        <div className="space-y-6">
          {/* Resumo da Análise */}
          <Card className="p-6 shadow-card bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">
                📊 Análise do Estudo Conjunto
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">
                  {analise.materiasComuns.length}
                </div>
                <div className="text-sm text-green-700">
                  Matérias em Comum
                </div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">
                  {analise.materiasComuns.reduce((sum, m) => sum + m.questoesTotais, 0)}
                </div>
                <div className="text-sm text-blue-700">
                  Total de Questões
                </div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">
                  {analise.materiasComuns.reduce((sum, m) => sum + m.questoesTotais, 0)}
                </div>
                <div className="text-sm text-purple-700">
                  Questões Comuns
                </div>
              </div>
            </div>
          </Card>

          {/* Matérias Comuns - Foco Principal */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-bold text-foreground">
                ✅ Matérias Comuns - Seu Foco Principal
              </h2>
            </div>
            
            <div className="space-y-4">
              {analise.materiasComuns.map((materia, index) => (
                <div
                  key={materia.nome}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-600 text-white font-bold">
                        #{index + 1}
                      </Badge>
                      <h3 className="text-lg font-semibold text-green-800">
                        {materia.nome}
                      </h3>
                      <Badge className="bg-green-100 text-green-700">
                        {materia.questoesTotais} questões
                      </Badge>
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      {materia.questoesTotais} questões totais
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {materia.concursos.map((concurso) => (
                      <div key={concurso.nome} className="text-center p-2 bg-white rounded border">
                        <div className="text-xs text-muted-foreground mb-1">
                          {concurso.nome}
                        </div>
                        <div className="font-semibold text-green-700">
                          {concurso.questoes} questões
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Matérias Específicas */}
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="h-6 w-6 text-orange-600" />
              <h2 className="text-xl font-bold text-foreground">
                ⚠️ Matérias Específicas - Estude por Concurso
              </h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              {analise.materiasEspecificas.map((concurso) => {
                const Icon = concurso.icon;
                return (
                  <div
                    key={concurso.name}
                    className={`p-4 rounded-lg border-2 ${concurso.bgColor} border-current/20`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className={`h-6 w-6 ${concurso.color}`} />
                      <h3 className={`text-lg font-bold ${concurso.color}`}>
                        {concurso.name}
                      </h3>
                    </div>
                    
                    <div className="space-y-2">
                      {concurso.materiasEspecificas.length > 0 ? (
                        concurso.materiasEspecificas.map((materia) => (
                          <div key={materia.nome} className="flex justify-between items-center p-2 bg-white/50 rounded">
                            <span className="text-sm font-medium">
                              {materia.nome}
                            </span>
                            <Badge className="text-xs">
                              {materia.questoes} questões
                            </Badge>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground italic">
                          Todas as matérias são comuns com outros concursos selecionados
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Recomendações Estratégicas */}
          <Card className="p-6 shadow-card bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="h-6 w-6 text-yellow-600" />
              <h2 className="text-xl font-bold text-yellow-800">
                💡 Recomendações Estratégicas
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-white/50 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  🎯 Cronograma de Estudos Sugerido:
                </h4>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li>• <strong>70% do tempo:</strong> Foque nas {analise.materiasComuns.length} matérias comuns</li>
                  <li>• <strong>30% do tempo:</strong> Dedique às matérias específicas de cada concurso</li>
                  <li>• <strong>Prioridade:</strong> Comece pelas 3 primeiras matérias comuns (maior peso)</li>
                </ul>
              </div>
              
              <div className="p-4 bg-white/50 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  📚 Estratégia de Estudo:
                </h4>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li>• Estude primeiro o conteúdo comum mais amplo</li>
                  <li>• Depois aprofunde nas nuances específicas de cada edital</li>
                  <li>• Use as abordagens diferentes como vantagem competitiva</li>
                  <li>• Pratique questões de todos os concursos selecionados</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Instrução inicial quando nenhum concurso selecionado */}
      {selectedConcursos.length === 0 && (
        <Card className="p-8 text-center shadow-card">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Comece Selecionando os Concursos
          </h3>
          <p className="text-muted-foreground">
            Marque pelo menos 2 concursos acima para ver a análise completa do estudo conjunto
            e descobrir como otimizar sua preparação.
          </p>
        </Card>
      )}

      {selectedConcursos.length === 1 && (
        <Card className="p-8 text-center shadow-card bg-blue-50 border border-blue-200">
          <Target className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-blue-800 mb-2">
            Selecione Mais um Concurso
          </h3>
          <p className="text-blue-700">
            Para fazer a análise do estudo conjunto, você precisa selecionar pelo menos 2 concursos.
            Marque mais um concurso acima para ver as matérias em comum e específicas.
          </p>
        </Card>
      )}
    </div>
  );
};