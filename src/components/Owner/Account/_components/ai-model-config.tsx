"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAiConfig, updateAiConfig } from "@/services/ownerApi";
import { getAiModels } from "@/services/utilisApi";
import { AiModel } from "@/types/utilis";

export function AiModelConfig() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [models, setModels] = useState<AiModel[]>([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [defaultModel, setDefaultModel] = useState("");

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const config = await getAiConfig();
        if (!isMounted) return;

        setIsAvailable(config.available);
        if (!config.available) return;

        setSelectedModel(config.model || config.defaultModel);
        setDefaultModel(config.defaultModel);

        const aiModels = await getAiModels();
        if (!isMounted) return;
        setModels(aiModels);
      } catch {
        // ponytail: falha ao consultar config de IA é tratada como indisponível — a seção some, sem toast de erro no load.
        if (isMounted) setIsAvailable(false);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleModelChange = async (model: string) => {
    const previousModel = selectedModel;
    setSelectedModel(model);
    setIsSaving(true);
    try {
      await updateAiConfig({ model });
      toast.success("Modelo de IA atualizado com sucesso!");
    } catch (error) {
      setSelectedModel(previousModel);
      toast.error((error as { message: string }).message || "Erro ao atualizar modelo de IA. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !isAvailable) return null;

  return (
    <Card className="w-full max-w-4xl mx-auto bg-roxo600 mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Modelo de IA
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Modelo utilizado para as funcionalidades de IA
          </label>
          <Select value={selectedModel} onValueChange={handleModelChange} disabled={isSaving}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um modelo" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                  {model.id === defaultModel ? " (padrão)" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
