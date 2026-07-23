import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createScene } from "../commands/create-scene";
import { CreateSceneDTO } from "../dto/scene.create.dto";
import { sceneQueries } from "../querykeys";


export default function useCreateSceneMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateSceneDTO) => createScene(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: sceneQueries.lists()
      })
    }
  })
    
     
}