import { useState } from "react";
import { StudyHeader } from "@/components/StudyHeader";
import { ExamRequirements } from "@/components/ExamRequirements";
import { QuestionAnalysis } from "@/components/QuestionAnalysis";
import { ExamComparison } from "@/components/ExamComparison";
import { TopSubjects } from "@/components/TopSubjects";
import { GroupStudy } from "@/components/GroupStudy";
import { StudySchedule } from "@/components/StudySchedule";


const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-12">
            <ExamRequirements />
            <ExamComparison />
          </div>
        );
      case 'analysis':
        return <QuestionAnalysis />;
      case 'subjects':
        return <TopSubjects />;
      case 'group':
        return <GroupStudy />;
      case 'schedule':
        return <StudySchedule />;
      default:
        return <ExamRequirements />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <StudyHeader activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-6 py-8">
        {renderContent()}
      </main>
      
      <footer className="bg-muted border-t mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Concursos de Engenharia Civil - Plataforma de Estudos</p>
            <p className="mt-1">Dados baseados em editais públicos. Sempre consulte as fontes oficiais.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;