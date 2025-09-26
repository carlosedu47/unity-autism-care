import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Save, LogOut } from "lucide-react";
import { useContent } from "@/hooks/useContent";
import { showSuccess } from "@/utils/notifications";

const ContentManager = () => {
  const { content, updateContent, resetToDefault } = useContent();
  const [isEditing, setIsEditing] = useState(false);

  const addNewItem = (categoryIndex: number) => {
    const newContent = { ...content };
    newContent.resources[categoryIndex].items.push({
      title: "",
      description: "",
      type: "PDF",
      url: ""
    });
    updateContent(newContent);
  };

  const removeItem = (categoryIndex: number, itemIndex: number) => {
    const newContent = { ...content };
    newContent.resources[categoryIndex].items.splice(itemIndex, 1);
    updateContent(newContent);
  };

  const updateItem = (categoryIndex: number, itemIndex: number, field: string, value: string) => {
    const newContent = { ...content };
    (newContent.resources[categoryIndex].items[itemIndex] as any)[field] = value;
    updateContent(newContent);
  };



  if (!isEditing) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciador de Conteúdo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Gerencie o conteúdo do site sem mexer no código.</p>
            <div className="space-x-2">
              <Button onClick={() => setIsEditing(true)}>
                Editar Conteúdo
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  localStorage.removeItem("adminAuth");
                  window.location.reload();
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gerenciador de Conteúdo</h1>
        <div className="space-x-2">
          <div className="bg-green-100 text-green-800 px-3 py-2 rounded-md text-sm">
            ✓ Salvamento Automático
          </div>
          <Button 
            variant="secondary" 
            onClick={() => {
              resetToDefault();
              showSuccess('Conteúdo restaurado para o padrão!');
            }}
          >
            Restaurar Original
          </Button>
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancelar
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => {
              localStorage.removeItem("adminAuth");
              window.location.reload();
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {content.resources.map((category, categoryIndex) => (
        <Card key={categoryIndex}>
          <CardHeader>
            <CardTitle>{category.category}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">Item {itemIndex + 1}</h4>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItem(categoryIndex, itemIndex)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">Título</label>
                    <Input
                      value={item.title}
                      onChange={(e) => updateItem(categoryIndex, itemIndex, 'title', e.target.value)}
                      placeholder="Título do recurso"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Tipo</label>
                    <Select
                      value={item.type}
                      onValueChange={(value) => updateItem(categoryIndex, itemIndex, 'type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PDF">PDF</SelectItem>
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="Atividade">Atividade</SelectItem>
                        <SelectItem value="Vídeo">Vídeo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Descrição</label>
                  <Textarea
                    value={item.description}
                    onChange={(e) => updateItem(categoryIndex, itemIndex, 'description', e.target.value)}
                    placeholder="Descrição do recurso"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">URL/Link</label>
                  <Input
                    value={item.url}
                    onChange={(e) => updateItem(categoryIndex, itemIndex, 'url', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>
            ))}
            
            <Button
              variant="outline"
              onClick={() => addNewItem(categoryIndex)}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Novo Item
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContentManager;