import { Button } from "@/components/ui/button";

interface StudyHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'overview', label: 'Visão Geral', icon: '📋' },
  { id: 'analysis', label: 'Análise de Questões', icon: '📊' },
  { id: 'subjects', label: 'Top Matérias', icon: '📚' },
  { id: 'group', label: 'Estudo Conjunto', icon: '👥' },
  { id: 'schedule', label: 'Cronograma', icon: '📅' }
];

export const StudyHeader = ({ activeTab, onTabChange }: StudyHeaderProps) => {
  return (
    <div className="bg-gradient-header shadow-elevated">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              Concursos de Engenharia Civil
            </h1>
            <p className="text-white/80 text-lg">
             Sua plataforma completa de preparação para concursos públicos
            </p>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "secondary" : "ghost"}
                onClick={() => onTabChange(tab.id)}
                className={`
                  text-sm font-medium px-4 py-2 rounded-full transition-all duration-200
                  ${activeTab === tab.id 
                    ? 'bg-white text-primary shadow-md' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};