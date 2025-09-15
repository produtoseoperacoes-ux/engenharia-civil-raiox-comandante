import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Info } from "lucide-react";

interface Requirement {
  text: string;
  status: 'met' | 'warning' | 'info';
}

interface ExamData {
  title: string;
  subtitle?: string;
  color: 'petrobras' | 'transpetro' | 'military';
  requirements: Requirement[];
}

const examData: ExamData[] = [
  {
    title: "PETROBRAS",
    color: "petrobras",
    requirements: [
      { text: "Brasileiro(a) nato ou naturalizado", status: "met" },
      { text: "Graduação em Engenharia Civil", status: "met" },
      { text: "Registro no CREA", status: "met" },
      { text: "Sem limite de idade", status: "met" },
      { text: "Quitação eleitoral e militar", status: "met" }
    ]
  },
  {
    title: "TRANSPETRO",
    color: "transpetro",
    requirements: [
      { text: "Brasileiro(a) nato ou naturalizado", status: "met" },
      { text: "Graduação em Engenharia Civil", status: "met" },
      { text: "Registro no CREA", status: "met" },
      { text: "Sem limite de idade", status: "met" },
      { text: "Quitação eleitoral e militar", status: "met" }
    ]
  }
];

const getStatusIcon = (status: Requirement['status']) => {
  switch (status) {
    case 'met':
      return <CheckCircle className="h-4 w-4 text-success" />;
    case 'warning':
      return <AlertCircle className="h-4 w-4 text-warning" />;
    case 'info':
      return <Info className="h-4 w-4 text-petrobras" />;
  }
};

const getCardClasses = (color: ExamData['color']) => {
  const baseClasses = "animate-fade-in shadow-card border-l-4 transition-all duration-200 hover:shadow-elevated";
  switch (color) {
    case 'petrobras':
      return `${baseClasses} border-l-petrobras bg-petrobras-light`;
    case 'transpetro':
      return `${baseClasses} border-l-transpetro bg-transpetro-light`;
    case 'military':
      return `${baseClasses} border-l-military bg-military-light`;
  }
};

const getBadgeColor = (color: ExamData['color']) => {
  switch (color) {
    case 'petrobras':
      return 'bg-petrobras text-white';
    case 'transpetro':
      return 'bg-transpetro text-white';
    case 'military':
      return 'bg-military text-white';
  }
};

export const ExamRequirements = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          📋 Requisitos para Prestar os Concursos
        </h2>
        <p className="text-muted-foreground">
          Compare os requisitos de cada concurso e planeje sua estratégia
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {examData.map((exam, index) => (
          <Card
            key={exam.title}
            className={getCardClasses(exam.color)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Badge className={`${getBadgeColor(exam.color)} mb-2`}>
                    {exam.title}
                  </Badge>
                  {exam.subtitle && (
                    <p className="text-sm text-muted-foreground">{exam.subtitle}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {exam.requirements.map((req, reqIndex) => (
                  <div key={reqIndex} className="flex items-center space-x-3">
                    {getStatusIcon(req.status)}
                    <span className="text-sm text-card-foreground">{req.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-card shadow-card animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="p-6 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Descubra onde estudar com mais foco!
          </h3>
          <p className="text-lg text-muted-foreground mb-6">
            Compare como cada disciplina aparece em diferentes concursos e veja o que realmente importa para sua preparação.
          </p>

          <div className="flex justify-center">
            <div className="animate-bounce">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};